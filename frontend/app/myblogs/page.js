"use client";
import { useState, useEffect } from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import { useSession } from "next-auth/react";
import BlogList from "../blog/_components/BlogList";

const Page = () => {
  const { data: session, status } = useSession();
  const [blogData, setBlogData] = useState();
  const fetchData = async () => {
    if (session) {
      try {
        const res = await request(
          "http://localhost:4000/",
          queries.GET_BLOGS_BY_USER_ID,
          {
            userId: session.user._id,
          }
        );
        setBlogData(res.getBlogsByUserId);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!blogData) {
    return <h1>Loading...</h1>;
  } else {
    return (
      <div className="mt-10">
        <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          &lt; Your Blogs /&gt;
        </h1>
        {blogData.length === 0 ? (
          "No Blogs found"
        ) : (
          <BlogList data={blogData} />
        )}
      </div>
    );
  }
};

export default Page;
