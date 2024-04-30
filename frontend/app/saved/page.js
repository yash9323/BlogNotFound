import React from 'react';
import queries from "../../queries"
import { request } from "graphql-request";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import BlogList from './_components/BlogList';

const Page = async () => {
  const session = await getServerSession(options);
  const res = await request("http://localhost:4000/", queries.GET_SAVED_BLOGS, {
    userId: session.user._id,
  });
  if (res.getSavedBlogs){
    return (
      <div>
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
