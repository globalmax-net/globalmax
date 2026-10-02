import { connectDB } from "@/lib/db";
import Service from "@/lib/models/Service";
import UpcomingPlatform from "@/lib/models/UpcomingPlatform";
import {
  SERVICES,
  UPCOMING,
  type Service as ServiceData,
  type UpcomingPlatform as UpcomingData,
} from "@/components/types";

export async function getServices(): Promise<ServiceData[]> {
  try {
    await connectDB();
    const services = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    if (services.length > 0) {
      return services.map(({ code, name, tagline, statValue, statLabel, colorClass }) => ({
        code,
        name,
        tagline,
        statValue,
        statLabel,
        colorClass,
      }));
    }
  } catch (error) {
    console.error("Failed to load services:", error);
  }

  return SERVICES;
}

export async function getUpcomingPlatforms(): Promise<UpcomingData[]> {
  try {
    await connectDB();
    const platforms = await UpcomingPlatform.find().sort({ order: 1, createdAt: 1 }).lean();
    if (platforms.length > 0) {
      return platforms.map(({ name, description }) => ({ name, description }));
    }
  } catch (error) {
    console.error("Failed to load upcoming platforms:", error);
  }

  return UPCOMING;
}