import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/db/schema";

type CreateUserPayload = {
  name: string;
  email: string;
};

export async function GET() {
  const all = await db.select().from(users);
  return NextResponse.json(all);
}

export async function POST(req: Request) {
  const body = (await req.json()) as CreateUserPayload;
  await db.insert(users).values({ name: body.name, email: body.email });
  return NextResponse.json({ success: true });
}


