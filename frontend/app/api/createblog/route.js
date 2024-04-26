import { NextResponse } from 'next/server'
import { request } from "graphql-request";
import queries from "../../../queries"

export async function POST(req) {
    try{
        let {title,content,userId} = await req.json();
        const res = await request("http://localhost:4000/", queries.CREATE_BLOG, {
        title:title,
        content:content,
        userId:userId
    });
        return NextResponse.json({ message:"success" }, { status: 200 })
    }
    catch(e){
        return NextResponse.json({ error: "Error While Adding Blog"}, { status: 400 });
    }
}
