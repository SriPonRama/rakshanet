import mongoose from 'mongoose';

const alertSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    severity: {
      type: String,
      enum: ['info', 'low', 'medium', 'high', 'critical'],
      default: 'info',
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    targetArea: {
      type: {
        type: String,
        enum: ['Polygon', 'Point'],
        default: 'Point',
      },
      coordinates: {
        type: [Number],
        required: true,
      },
      radiusKm: Number,
    },
  },
  { timestamps: true },
);

export const Alert = mongoose.model('Alert', alertSchema);

