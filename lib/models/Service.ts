import mongoose, { Document, Schema } from "mongoose";

export interface IService extends Document {
  code: string;
  name: string;
  tagline: string;
  statValue: string;
  statLabel: string;
  colorClass: "bg-gm-maroon" | "bg-gm-green";
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    code: { type: String, required: true, unique: true, uppercase: true, trim: true, maxlength: 6 },
    name: { type: String, required: true, trim: true, maxlength: 100 },
    tagline: { type: String, required: true, trim: true, maxlength: 500 },
    statValue: { type: String, required: true, trim: true, maxlength: 30 },
    statLabel: { type: String, required: true, trim: true, maxlength: 80 },
    colorClass: { type: String, enum: ["bg-gm-maroon", "bg-gm-green"], required: true },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Service = mongoose.models.Service || mongoose.model<IService>("Service", ServiceSchema);

export default Service;