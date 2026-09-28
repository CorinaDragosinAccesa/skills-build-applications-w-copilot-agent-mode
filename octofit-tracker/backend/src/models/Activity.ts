import { Schema, model, models } from 'mongoose';

const activitySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true, trim: true },
    durationMinutes: { type: Number, required: true, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    completedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

export const Activity = models.Activity || model('Activity', activitySchema);