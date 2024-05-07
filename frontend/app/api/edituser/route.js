import { NextResponse } from "next/server";
import { request } from "graphql-request";
import queries from "../../../queries";
import {
  fnameChecker,
  lnameChecker,
  validateBio,
  checkEmail,
  checkPassword,
} from "../../validations";

export async function POST(req) {
  try {
    let data = await req.json();

    fnameChecker(data.fname);
    lnameChecker(data.lname);
    validateBio(data.bio);
    checkEmail(data.email);

    const res = await request("http://localhost:4000/", queries.EDIT_USER, {
      id: data._id,
      fname: data.fname,
      lname: data.lname,
      email: data.email,
      bio: data.bio,
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (e) {
    if (e && e.response && e.response.errors) {
      return NextResponse.json(
        { error: e.response.errors[0].message },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ error: e }, { status: 400 });
    }
  }
}
