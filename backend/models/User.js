import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, index: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['citizen', 'rescue', 'authority', 'ngo', 'admin'],
      default: 'citizen',
    },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        default: [0, 0], // [lng, lat]
      },
    },
  },
  { timestamps: true },
);

userSchema.index({ location: '2dsphere' });

export const User = mongoose.model('User', userSchema);

