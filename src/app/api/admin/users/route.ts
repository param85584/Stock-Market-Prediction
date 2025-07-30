import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);
  
  if (!session || (session.user as { role?: string }).role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const client = await clientPromise;
  const db = client.db();
  
  const users = await db
    .collection("users")
    .find({}, { projection: { password: 0 } })
    .toArray();

  return NextResponse.json({ users });
}