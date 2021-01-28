import mongoose from 'mongoose';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Class from '../Class/schema';

const UserSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  name: { type: String, required: true, unique: false },
  surname: { type: String, required: true, unique: false },
  password: { type: String, required: true, unique: false },
  email: { type: String, required: true, unique: true },
  dateCreated: { type: Date, required: true, unique: false },
  isActive: { type: Boolean, required: true, unique: false, default: true },
  isTeacher: { type: Boolean, required: false, unique: false, default: false },
  dateOfBirth: { type: Date, required: false, unique: false },
  height: { type: Number, required: false, unique: false },
  weight: { type: Number, required: false, unique: false },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
});

UserSchema.set('toJSON', { getters: true });

const User = mongoose.model('User', UserSchema);

export default User;
