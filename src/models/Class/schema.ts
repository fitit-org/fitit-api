import mongoose from 'mongoose';

const ClassSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
    unique: true,
    index: true,
    default: mongoose.Types.ObjectId,
  },
  name: { type: String, required: true, unique: true },
  isActive: { type: Boolean, required: true, unique: false, default: true },
});

ClassSchema.set('toJSON', { getters: true });

const Class = mongoose.model('Class', ClassSchema);

export default Class;
