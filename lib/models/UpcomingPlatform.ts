import mongoose, { Document, Schema } from "mongoose";

export interface IUpcomingPlatform extends Document {
  name: string;
  description: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const UpcomingPlatformSchema = new Schema<IUpcomingPlatform>(
  {
    name: { type: String, required: true, trim: true, maxlength: 100 },
    description: { type: String, required: true, trim: true, maxlength: 500 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const UpcomingPlatform =
  mongoose.models.UpcomingPlatform || mongoose.model<IUpcomingPlatform>("UpcomingPlatform", UpcomingPlatformSchema);

export default UpcomingPlatform;