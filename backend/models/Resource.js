import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    quantity: { type: Number, required: true, min: 0 },
    available: { type: Boolean, default: true },
    location: {
      type: {
        type: String,
        enum: ['Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      name: String,
    },
    managedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

resourceSchema.index({ location: '2dsphere' });

export const Resource = mongoose.model('Resource', resourceSchema);

