import { Schema, model, models } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
    points: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
  },
  { timestamps: true },
);

export const LeaderboardEntry = models.LeaderboardEntry || model('LeaderboardEntry', leaderboardEntrySchema);