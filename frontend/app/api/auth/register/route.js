import { NextResponse } from "next/server";
import { request } from "graphql-request";
import queries from "../../../../queries";

export async function POST(req) {
  try {
    let { email, password, firstName, lastName, bio, confirmPassword } =
      await req.json();

    const res = await request("http://localhost:4000/", queries.REGISTER_USER, {
      email: email,
      password: password,
      fname: firstName,
      lname: lastName,
      bio: bio,
    });

    return NextResponse.json({ ok: "User registered successfully" });
  } catch (e) {
    return NextResponse.json({ error: e }, { status: 500 });
  }
}
