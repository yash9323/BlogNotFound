"use client";
import { useState, useEffect } from "react";
import queries from "../../queries";
import { request } from "graphql-request";
import BlogList from "./_components/BlogList";
import { useSession } from "next-auth/react";

const Page = () => {
  const { data: session, status } = useSession();
  const [blogData, setBlogData] = useState();
  const fetchData = async () => {
    if (session) {
      try {
        const res = await request(
          "http://localhost:4000/",
          queries.GET_SAVED_BLOGS,
          {
            userId: session.user._id,
          }
        );
        setBlogData(res.getSavedBlogs);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  if (!blogData) {
    <h1>Loading...</h1>;
  } else {
    return (
      <div className="mt-10">
        <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          &lt; Saved Blogs /&gt;
        </h1>
        {blogData.length === 0 ? (
          <div>No Saved Blogs</div>
        ) : (
          <BlogList data={blogData} />
        )}
      </div>
    );
  }
};

export default Page;
