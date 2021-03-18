import Controller from '../../../types/controller.interface'
import { Router, Response, NextFunction } from 'express'
import RequestWithUser from '../../../types/requestWithUser.interface'
import authMiddleware from '../../../middleware/auth.middleware'
import ClassNotFoundException from '../../../exceptions/ClassNotFoundException'
import UnauthorizedToViewClassException from '../../../exceptions/UnauthorizedToViewClassException'
import DBException from '../../../exceptions/DBException'
import UserNotTeacherException from '../../../exceptions/UserNotTeacherException'
import Class from '../../../types/class.interface'
import User from '../../../types/user.interface'
import { populateUser, popualateUsers } from '../../../utils/db'
import { ObjectId } from 'bson'
import { getHR } from 'reversible-human-readable-id'
import CreateClassDto from './class.dto'
import JoinClassDto from './join.dto'
import validationMiddleware from '../../../middleware/validation.middleware'
import UserNotFoundException from '../../../exceptions/UserNotFoundException'
import UserIsTeacherException from '../../../exceptions/UserIsTeacherException'
import UserAlreadyInClassException from '../../../exceptions/UserAlreadyInClassException'
import { Db, Collection } from 'mongodb'

class ClassesController implements Controller {
  public path = '/classes'
  public router = Router()

  private classes: Collection<unknown>
  private users: Collection<unknown>

  constructor(db: Db) {
    this.classes = db.collection('classes')
    this.users = db.collection('users')
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get(this.path, authMiddleware, this.getAllClasses)
    this.router.get(`${this.path}/:id`, authMiddleware, this.getClassById)
    this.router.get(
      `${this.path}/:id/users`,
      authMiddleware,
      this.getClassUsers
    )
    this.router.delete(
      `${this.path}/:id/users/:uid`,
      authMiddleware,
      this.removeUserFromClass
    )
    this.router.get(`${this.path}/:id/code`, authMiddleware, this.genClassCode)
    this.router.post(
      this.path,
      authMiddleware,
      validationMiddleware(CreateClassDto),
      this.createClass
    )
    this.router.put(
      this.path,
      authMiddleware,
      validationMiddleware(JoinClassDto),
      this.joinClass
    )
  }

  private getAllClasses = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classes = (await this.classes
        .find(
          {
            _id: {
              $in: request.user.class_ids as Array<ObjectId>,
            },
          },
          { projection: { humanReadable: 0 } }
        )
        .toArray()) as Array<Class>
      let users: Array<User>
      if (request.user.isTeacher) {
        users = (await this.users
          .find(
            {
              class_ids: {
                $in: request.user.class_ids,
              },
            },
            {
              projection: {
                name: 1,
                surname: 1,
                activityLog_ids: 1,
                isTeacher: 1,
                isActive: 1,
                class_ids: 1,
              },
            }
          )
          .toArray()) as Array<User>
        users = await popualateUsers(users, false, true)
        return response.send({ classes: classes, users: users })
      } else {
        users = (await this.users
          .find(
            {
              class_ids: {
                $in: request.user.class_ids,
              },
            },
            {
              projection: {
                name: 1,
                surname: 1,
                isTeacher: 1,
                class_ids: 1,
              },
            }
          )
          .toArray()) as Array<User>
        return response.send({ classes: classes, users: users })
      }
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private getClassById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id))
      }
      const id = new ObjectId(request.params.id)
      const classCount = await this.classes.find({ _id: id }).limit(1).count()
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id))
      }
      const classObject = (await this.classes.findOne(
        {
          _id: id,
        },
        { projection: { humanReadable: 0 } }
      )) as Class
      return response.send(classObject)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private getClassUsers = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id))
      }
      const id = new ObjectId(request.params.id)
      const classCount = await this.classes.find({ _id: id }).limit(1).count()
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id))
      }
      if (!(request.user.class_ids as Array<ObjectId>).includes(id)) {
        return next(new UnauthorizedToViewClassException(request.params.id))
      }
      const users = (await this.users
        .find(
          { class_ids: id },
          {
            projection: {
              hashedPassword: 0,
              email: 0,
              birthDate: 0,
              weight: 0,
              height: 0,
            },
          }
        )
        .toArray()) as Array<User>
      if (request.user.isTeacher) {
        for (let user of users) {
          user = await populateUser(user, false)
        }
      } else {
        users.forEach((user) => {
          delete user.activityLog_ids
        })
      }
      return response.send(users)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private genClassCode = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id))
      }
      const id = new ObjectId(request.params.id)
      const classCount = await this.classes.find({ _id: id }).limit(1).count()
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id))
      }
      if (!(request.user.class_ids as Array<ObjectId>).includes(id)) {
        return next(new UnauthorizedToViewClassException(request.params.id))
      }
      if (!request.user.isTeacher) {
        return next(new UserNotTeacherException())
      }
      const classCode = ((await this.classes.findOne({ _id: id })) as Class)
        .humanReadable
      return response.send({ code: classCode })
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private createClass = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const classData: CreateClassDto = request.body
      if (!request.user.isTeacher) {
        return next(new UserNotTeacherException())
      }
      const code = getHR(classData.name)
      const insertResult = await (this.classes as Collection<{
        name: string
        humanReadable: string
        isActive: boolean
      }>).insertOne({
        name: classData.name,
        humanReadable: code,
        isActive: true,
      })
      await this.users.updateOne(
        { _id: request.user._id },
        { $push: { class_ids: insertResult.insertedId } }
      )
      const createdClass = (await this.classes.findOne({
        _id: insertResult.insertedId,
      })) as Class
      return response.status(201).send(createdClass)
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private joinClass = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const hr: JoinClassDto = request.body
      if (request.user.isTeacher) {
        return next(new UserIsTeacherException())
      }
      const classCount = await this.classes
        .find({ humanReadable: hr.humanReadable })
        .limit(1)
        .count()
      if (classCount === 0) {
        return next(new ClassNotFoundException(hr.humanReadable))
      }
      const classObj = (await this.classes.findOne({
        humanReadable: hr.humanReadable,
      })) as Class
      if ((request.user.class_ids as Array<ObjectId>).includes(classObj._id)) {
        return next(new UserAlreadyInClassException(classObj._id.toHexString()))
      }
      await this.users.updateOne(
        { _id: request.user._id },
        { $push: { class_ids: classObj._id } }
      )
      const classes = (await this.classes
        .find(
          {
            _id: {
              $in: request.user.class_ids as Array<ObjectId>,
            },
          },
          { projection: { humanReadable: 0 } }
        )
        .toArray()) as Array<Class>
      const users = (await this.users
        .find(
          {
            class_ids: {
              $in: request.user.class_ids,
            },
          },
          {
            projection: {
              name: 1,
              surname: 1,
              isTeacher: 1,
            },
          }
        )
        .toArray()) as Array<User>
      return response.status(201).send({ classes: classes, users: users })
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }

  private removeUserFromClass = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      if (!ObjectId.isValid(request.params.id)) {
        return next(new ClassNotFoundException(request.params.id))
      }
      if (!ObjectId.isValid(request.params.uid)) {
        return next(new UserNotFoundException(request.params.uid))
      }
      const id = new ObjectId(request.params.id)
      const uid = new ObjectId(request.params.uid)
      const classCount = await this.classes.find({ _id: id }).limit(1).count()
      if (classCount === 0) {
        return next(new ClassNotFoundException(request.params.id))
      }
      const userCount = await this.users.find({ _id: uid }).limit(1).count()
      if (userCount === 0) {
        return next(new UserNotFoundException(request.params.uid))
      }
      if (!(request.user.class_ids as Array<ObjectId>).includes(id)) {
        return next(new UnauthorizedToViewClassException(request.params.id))
      }
      if (!request.user.isTeacher) {
        return next(new UserNotTeacherException())
      }
      await this.users.updateOne({ _id: uid }, { $pull: { class_ids: id } })
      const classResponse = (await this.classes.findOne({ _id: id })) as Class
      const users = (await this.users
        .find(
          {
            class_ids: {
              $in: id,
            },
          },
          {
            projection: {
              name: 1,
              surname: 1,
              activityLog_ids: 1,
              isTeacher: 1,
            },
          }
        )
        .toArray()) as Array<User>
      return response.status(200).send({ class: classResponse, users: users })
    } catch (error) {
      console.log(error.stack)
      return next(new DBException(error))
    }
  }
}

export default ClassesController
