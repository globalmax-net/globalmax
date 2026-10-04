import mongoose, { Document, Schema } from "mongoose";

export interface ISuccessStat extends Document {
  value: string;
  label: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const SuccessStatSchema = new Schema<ISuccessStat>(
  {
    value: { type: String, required: true, trim: true, maxlength: 30 },
    label: { type: String, required: true, trim: true, maxlength: 80 },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const SuccessStat =
  mongoose.models.SuccessStat || mongoose.model<ISuccessStat>("SuccessStat", SuccessStatSchema);

export default SuccessStat;
