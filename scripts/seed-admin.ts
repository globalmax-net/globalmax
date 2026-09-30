import mongoose from "mongoose";
import User from "@/lib/models/User";

async function main() {
  const { MONGODB_URI, ADMIN_EMAIL, ADMIN_PASSWORD } = process.env;
  if (!MONGODB_URI || !ADMIN_EMAIL || !ADMIN_PASSWORD) {
    throw new Error("Missing MONGODB_URI, ADMIN_EMAIL or ADMIN_PASSWORD");
  }
  await mongoose.connect(MONGODB_URI);
  await User.create({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD });
  console.log("Admin created");
  await mongoose.disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});