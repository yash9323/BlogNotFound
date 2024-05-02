import React from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import BlogList from "../blog/_components/BlogList";

const Page = async () => {
  const session = await getServerSession(options);
  const res = await request(
    "http://localhost:4000/",
    queries.GET_BLOGS_BY_USER_ID,
    {
      userId: session.user._id,
    }
  );
  return (
    <div className="mt-10">
      <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              &lt; Your Blogs /&gt;
      </h1>
      <BlogList data={res.getBlogsByUserId} />
    </div>
  );
};

export default Page;
