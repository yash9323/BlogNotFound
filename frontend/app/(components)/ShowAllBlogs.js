"use client";
import React, { useEffect, useState } from "react";
import { request } from "graphql-request";
import queries from "../../queries";
import BlogList from "../blog/_components/BlogList";

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

  return <BlogList data={blogs} />;
};

export default ShowAllBlogs;
