import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(req) {
  const { password } = await req.json();

    const hash = process.env.ADMIN_HASH;

  const isValid = await bcrypt.compare(password, hash);

  if (!isValid) {
    return NextResponse.json(
      { error: "Invalid password" },
      { status: 401 }
    );
  }

  const response = NextResponse.json({ success: true });

  response.cookies.set("admin-auth", "true", {
    httpOnly: true,
    // only in  production uncomment it
    // secure: true,
    sameSite: "strict",
    path: "/",
  });

  return response;
}