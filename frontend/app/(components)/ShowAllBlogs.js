"use client";
import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import BlogList from "../blog/_components/BlogList";
import { useSession } from "next-auth/react";

const ShowAllBlogs = () => {
  const { data: session } = useSession();
  const [blogs, setBlogs] = useState([]);

  const getBlogPosts = async () => {
    try {
      const res = await request(
        "http://localhost:4000/",
        queries.GET_ALL_BLOGS
      );
      setBlogs(res.getAllBlogs);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getBlogPosts();
  }, [session]);

  if (!blogs) {
    return <div>Loading...</div>;
  } else {
    return (
      <div className="">
        <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          &lt; Trending Now /&gt;
        </h1>
        {blogs.length === 0 ? (
          <h1>No blogs found. Start creating?</h1>
        ) : (
          <BlogList data={blogs} />
        )}
      </div>
    );
  }
};

export default ShowAllBlogs;
