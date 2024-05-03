import React from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import { getServerSession } from "next-auth/next";
import { options } from "../api/auth/[...nextauth]/options";
import BlogList from "../blog/_components/BlogList";

const Page = async () => {
  const session = await getServerSession(options);
  let res = null;
  if (session) {
    res = await request(
      "http://localhost:4000/",
      queries.GET_BLOGS_BY_FOLLOWING,
      {
        userId: session.user._id,
      }
    );
  }

  if (!res) {
    return <h1>Error while fetching blogs</h1>;
  }
  return (
    <div className="mt-10">
      <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        &lt; Blogs from people you follow /&gt;
      </h1>
      {res.getBlogsByFollowing.length === 0 ? (
        "No Blogs found"
      ) : (
        <BlogList data={res.getBlogsByFollowing} />
      )}
    </div>
  );
};

export default Page;
