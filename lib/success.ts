import { connectDB } from "@/lib/db";
import SuccessStat from "@/lib/models/SuccessStat";

export interface SuccessStatData {
  value: string;
  label: string;
}

export const DEFAULT_SUCCESS_STATS: SuccessStatData[] = [
  { value: "2022", label: "Established" },
  { value: "2000+", label: "Visa services delivered" },
  { value: "6", label: "Core service lines" },
  { value: "2", label: "Platforms in development" },
];

export async function getSuccessStats(): Promise<SuccessStatData[]> {
  try {
    await connectDB();
    const stats = await SuccessStat.find().sort({ order: 1, createdAt: 1 }).lean();
    if (stats.length > 0) {
      return stats.map(({ value, label }) => ({ value, label }));
    }
  } catch (error) {
    console.error("Failed to load success stats:", error);
  }

  return DEFAULT_SUCCESS_STATS;
}
