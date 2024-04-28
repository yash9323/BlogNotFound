import React from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import BlogList from "../blog/_components/BlogList";

const Page = async () => {
  const session = await getServerSession(options);
  const res = await request("http://localhost:4000/", queries.GET_SAVED_BLOGS, {
    userId: session.user._id,
  });
  return (
    <div>
      <BlogList data={res.getSavedBlogs} />
    </div>
  );
};

export default Page;
