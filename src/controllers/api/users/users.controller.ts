import { Router, Response, NextFunction } from 'express'
import authMiddleware from '../../../middleware/auth.middleware'
import RequestWithUser from '../../../types/requestWithUser.interface'
import DBException from '../../../exceptions/DBException'
import UserDto from './user.dto'
import validationMiddleware from '../../../middleware/validation.middleware'
import UserNotFoundException from '../../../exceptions/UserNotFoundException'
import UnauthorizedToViewUserException from '../../../exceptions/UnauthorizedToViewUserException'
import User from '../../../types/user.interface'
import { populateUser } from '../../../utils/db'
import { ObjectId } from 'bson'
import { Db, Collection } from 'mongodb'

class UsersController {
  public path = '/users'
  public router = Router()

  private users: Collection<unknown>
  private activityLogs: Collection<unknown>

  constructor(db: Db) {
    this.users = db.collection('users')
    this.activityLogs = db.collection('activityLogs')
    this.initializeRoutes()
  }

  public initializeRoutes(): void {
    this.router.get(this.path, authMiddleware, this.getCurrentUser)
    this.router.get(`${this.path}/:id`, authMiddleware, this.getUser)
    this.router.patch(
      this.path,
      authMiddleware,
      validationMiddleware(UserDto, true),
      this.changeUserData
    )
    this.router.delete(this.path, authMiddleware, this.removeUser)
  }

  private getCurrentUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const userObject = await populateUser(request.user)
      return response.send(userObject)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private getUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new UserNotFoundException(request.params.id))
      }
      const userId = new ObjectId(request.params.id)
      if (userId.equals(request.user._id)) {
        const userObject = await populateUser(request.user)
        return response.send(userObject)
      }
      const userCount = await this.users
        .find({
          _id: userId,
        })
        .limit(1)
        .count()
      if (userCount === 0) {
        return next(new UserNotFoundException(request.params.id))
      }
      const user = (await this.users.findOne(
        { _id: userId },
        {
          projection: {
            name: 1,
            surname: 1,
            class_ids: 1,
            activityLog_ids: 1,
            isTeacher: 1,
            isActive: 1,
          },
        }
      )) as User
      let hasOverlap = false
      for (const classId of user.class_ids as Array<ObjectId>) {
        for (const userClassId of request.user.class_ids as Array<ObjectId>) {
          if (classId.equals(userClassId)) {
            hasOverlap = true
            break
          }
        }
      }
      if (!hasOverlap) {
        return next(new UnauthorizedToViewUserException(request.params.id))
      }
      const userObject = await populateUser(user)
      if (!request.user.isTeacher) {
        delete userObject.activityLog_ids
      }
      return response.send(userObject)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private changeUserData = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const userData: UserDto = request.body
    try {
      await this.users.updateOne({ _id: request.user._id }, { $set: userData })
      const user = (await this.users.findOne(
        { _id: request.user._id },
        { projection: { hashedPassword: 0 } }
      )) as User
      const populatedUser = await populateUser(user)
      response.send(populatedUser)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private removeUser = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (request.user.activityLog_ids) {
        await this.activityLogs.deleteMany({
          _id: {
            $in: request.user.activityLog_ids as Array<ObjectId>,
          },
        })
      }
      const userRemovalSuccess = await this.users.deleteOne({
        _id: request.user._id,
      })
      if (userRemovalSuccess.deletedCount === 1) {
        return response.status(204).send()
      } else {
        return next(new DBException({}))
      }
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }
}

export default UsersController
