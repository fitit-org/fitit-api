import Controller from '../../types/controller.interface'
import { Router, Request, Response, NextFunction } from 'express'
import User from '../../types/user.interface'
import Class from '../../types/class.interface'
import LogInDto from './login.dto'
import CreateUserDto from '../api/users/user.dto'
import { hash, compare } from 'bcrypt'
import WrongCredentialsException from '../../exceptions/WrongCredentialsException'
import validationMiddleware from '../../middleware/validation.middleware'
import UserWithThatEmailAlreadyExistsException from '../../exceptions/UserWithThatEmailAlreadyExistsException'
import NoSuchClassException from '../../exceptions/NoSuchClassException'
import DataStoredInToken from '../../types/dataStoredInToken.interface'
import TokenData from '../../types/tokenData.interface'
import { sign } from 'jsonwebtoken'
import DBException from '../../exceptions/DBException'
import { populateUser } from '../../utils/db'
import { Double, ObjectId } from 'bson'
import { Collection, Db } from 'mongodb'

class AuthenticationController implements Controller {
  public path = '/auth'
  public router = Router()

  private users: Collection<unknown>
  private classes: Collection<unknown>
  private teacherCodes: Collection<unknown>

  constructor(db: Db) {
    this.users = db.collection('users')
    this.classes = db.collection('classes')
    this.teacherCodes = db.collection('teacherCodes')
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.post(
      `${this.path}/login`,
      validationMiddleware(LogInDto),
      this.loggingIn
    )
    this.router.post(
      `${this.path}/register`,
      validationMiddleware(CreateUserDto),
      this.registration
    )
  }

  private registration = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const userData: CreateUserDto = request.body
    try {
      const userResults = await this.users
        .find({ email: userData.email })
        .limit(1)
        .count()
      if (userResults !== 0) {
        return next(new UserWithThatEmailAlreadyExistsException(userData.email))
      }
      const teacherCodesCount = await this.teacherCodes
        .find({ humanReadable: userData.classId })
        .count()
      const userInsertObject: Record<string, unknown> = {}
      const hashedPassword = await hash(userData.password, 10)
      userInsertObject.name = userData.name
      userInsertObject.surname = userData.surname
      userInsertObject.email = userData.email
      userInsertObject.hashedPassword = hashedPassword
      userInsertObject.isActive = true
      userInsertObject.dateCreated = new Date()
      if (userData.weight) {
        userInsertObject.weight = new Double(userData.weight)
      }
      if (userData.height) {
        userInsertObject.height = new Double(userData.height)
      }
      if (userData.birthDate) {
        userInsertObject.birthDate = new Date(userData.birthDate)
      }
      if (teacherCodesCount !== 0) {
        await this.teacherCodes.deleteOne({ humanReadable: userData.classId })
        userInsertObject.isTeacher = true
        userInsertObject.class_ids = [] as Array<ObjectId>
      } else {
        userInsertObject.isTeacher = false
        const classObj = (await this.classes.findOne({
          humanReadable: userData.classId,
        })) as Class
        if (!classObj) {
          return next(new NoSuchClassException(userData.classId))
        }
        userInsertObject.class_ids = [classObj._id]
      }
      const user = await this.users.insertOne(userInsertObject)
      delete userInsertObject.hashedPassword
      userInsertObject._id = user.insertedId
      const registeredUser = await populateUser(
        (userInsertObject as unknown) as User
      )
      return response.status(201).send(registeredUser)
    } catch (err) {
      console.log(err.stack)
      return next(new DBException())
    }
  }

  private loggingIn = async (
    request: Request,
    response: Response,
    next: NextFunction
  ) => {
    const logInData: LogInDto = request.body
    try {
      const user = (await this.users.findOne({
        email: logInData.email,
      })) as User
      if (!user) {
        return next(new WrongCredentialsException())
      }
      const isPasswordMatching = await compare(
        logInData.password,
        user.hashedPassword
      )
      if (!isPasswordMatching) {
        return next(new WrongCredentialsException())
      }
      user.hashedPassword = undefined
      const tokenData = this.createToken(user)
      return response.send({ user, token: tokenData.token })
    } catch (err) {
      console.log(err.stack)
      next(new DBException())
    }
  }

  private createToken(user: User): TokenData {
    const expiresIn = 60 * 60 * 24 * 7
    const secret = process.env.JWT_SECRET
    const dataStoredInToken: DataStoredInToken = {
      _id: user._id,
    }
    return {
      expiresIn,
      token: sign(dataStoredInToken, secret, { expiresIn }),
    }
  }
}

export default AuthenticationController
