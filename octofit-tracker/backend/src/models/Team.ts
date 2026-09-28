import { Schema, model, models } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    description: { type: String, trim: true },
    memberIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  { timestamps: true },
);

export const Team = models.Team || model('Team', teamSchema);