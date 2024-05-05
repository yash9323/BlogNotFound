import { NextResponse } from "next/server";
import { request } from "graphql-request";
import queries from "../../../../queries";
import bcrypt from "bcrypt"

export async function POST(req) {
  try {
    let { email, password, firstName, lastName, bio, confirmPassword } =
      await req.json();
    const encrypted_password = await bcrypt.hash(password,10);
    const res = await request("http://localhost:4000/", queries.REGISTER_USER, {
      email: email,
      password: encrypted_password,
      fname: firstName,
      lname: lastName,
      bio: bio,
    });

    return NextResponse.json(
      {
        message: `${res.registerUser.fname} ${res.registerUser.lname} Registered Successfully`,
      },
      { status: 200 }
    );
  } catch (e) {
    return NextResponse.json(
      { error: e.response.errors[0].message },
      { status: 400 }
    );
  }
}
