import pool from "../../../lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const data = await req.json();

    const {
      name,
      email,
      phone,
      attendance,
      guests,
      meal,
      message,
    } = data;

    if (!phone) {
      return NextResponse.json(
        { error: "Phone number is required" },
        { status: 400 }
      );
    }

    await pool.query(
      `INSERT INTO rsvps 
       (name, email, phone, attendance, guests, meal, message)
       VALUES ($1,$2,$3,$4,$5,$6,$7)`,
      [
        name,
        email,
        phone,
        attendance,
        attendance === "joyfully_accepts" ? parseInt(guests) : 0,
        meal || null,
        message || null,
      ]
    );

    return NextResponse.json({ success: true });

  } catch (err) {
    // 23505 = unique violation in PostgreSQL
    if (err.code === "23505") {
      return NextResponse.json(
        { error: "This phone number has already submitted RSVP." },
        { status: 409 }
      );
    }

    console.error(err);
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const result = await pool.query(
    "SELECT * FROM rsvps ORDER BY created_at DESC"
  );

  return NextResponse.json(result.rows);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  await pool.query("DELETE FROM rsvps WHERE id = $1", [id]);

  return NextResponse.json({ success: true });
}