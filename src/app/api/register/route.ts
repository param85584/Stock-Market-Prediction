import { hash } from "bcryptjs";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    console.log("Registration attempt started");
    console.log("MONGODB_URI exists:", !!process.env.MONGODB_URI);
    
    const { name, email, password } = await req.json();
    console.log("Request data received:", { name, email, passwordLength: password?.length });

    if (!name || !email || !password) {
      console.log("Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    console.log("Connecting to MongoDB...");
    const client = await clientPromise;
    console.log("MongoDB client connected");
    
    const db = client.db();
    console.log("Database reference obtained");

    const existing = await db.collection("users").findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await hash(password, 12);

    const result = await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user",
      createdAt: new Date(),
    });

    console.log("User created successfully with ID:", result.insertedId);
    return NextResponse.json({ success: true, userId: result.insertedId });
  } catch (error) {
    console.error("Registration error:", error);
    console.error("Error stack:", error instanceof Error ? error.stack : "No stack trace");
    
    if (error instanceof Error) {
      if (error.message.includes("MONGODB_URI")) {
        return NextResponse.json({ error: "Database configuration error" }, { status: 500 });
      }
      if (error.message.includes("connection")) {
        return NextResponse.json({ error: "Database connection failed" }, { status: 500 });
      }
    }
    
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}