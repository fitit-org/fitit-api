import mongoose from 'mongoose';
import validator from 'validator';
import User from '../../../types/user.interface';

export const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    surname: {
      type: String,
      required: true,
    },
    class_ids: {
      type: [mongoose.Schema.Types.ObjectId],
      required: true,
    },
    hashedPassword: {
      type: String,
      required: true,
    },
    dateCreated: {
      type: Date,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: validator.isEmail,
        message: 'NOT_A_VALID_EMAIL',
      },
    },
    isActive: {
      type: Boolean,
      required: true,
    },
    isTeacher: {
      type: Boolean,
      required: true,
    },
    activityLog_ids: {
      type: [mongoose.Schema.Types.ObjectId],
    },
    birthDate: {
      type: Date,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'users',
  }
);

const userModel = mongoose.model<User & mongoose.Document>('User', UserSchema);

export default userModel;
