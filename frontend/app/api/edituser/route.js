import { NextResponse } from 'next/server'
import { request } from "graphql-request";
import queries from "../../../queries"

export async function POST(req) {
    try{
        let data = await req.json()
        const res = await request("http://localhost:4000/", queries.EDIT_USER,{
            id: data._id,
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            bio: data.bio,
        });
        return NextResponse.json({ message:"success" }, { status: 200 })
    }
    catch(e){
        return NextResponse.json({ error: "Error While Adding Blog"}, { status: 400 });
    }
}

