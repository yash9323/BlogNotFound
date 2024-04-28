"use client";
import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import queries from "../../queries";

const ShowAllBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const getBlogPosts = async () => {
    try {
      const res = await request(
        "http://localhost:4000/",
        queries.GET_ALL_BLOGS
      );
      setBlogs(res.getAllBlogs);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getBlogPosts();
  }, []);
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog._id} className="mt-5 border border-white">
          <h2>{blog.title} </h2>
          <pre>{blog.content}</pre>
          <h2>{blog.date}</h2>
          <a href={`/blog/${blog._id}`}>Read More</a>
        </div>
      ))}
    </div>
  );
};

export default ShowAllBlogs;
