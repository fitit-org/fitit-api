import mongoose from 'mongoose';
import Class from '../../../types/class.interface';

export const ClassSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
    collection: 'classes',
  }
);

const classModel = mongoose.model<Class & mongoose.Document>(
  'Class',
  ClassSchema
);

export default classModel;
