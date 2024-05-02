import React from 'react';
import queries from "../../queries"
import { request } from "graphql-request";
import BlogList from './_components/BlogList';
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";

const Page = async () => {
  const session = await getServerSession(options);
  const res = await request("http://localhost:4000/", queries.GET_SAVED_BLOGS, {
    userId: session.user._id,
  });
  if (res.getSavedBlogs){
    return (
      <div className='mt-10'>
        <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              &lt; Saved Blogs /&gt;
        </h1>
        <BlogList data={res.getSavedBlogs}/>
      </div>
    );
  }
  else{
    return (
      <div>
        No Saved Blogs
      </div>
    )
  }
}

export default Page;
