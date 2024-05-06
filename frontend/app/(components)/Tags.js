"use client";
import { useState, useEffect } from "react";
import request from "graphql-request";
import queries from "../../queries";
import BlogList from "../blog/_components/BlogList";

const Tags = ({ tag }) => {
  const [blogsData, setBlogsData] = useState([]);

  const fetchBlogs = async () => {
    try {
      const response = await request(
        "http://localhost:4000/",
        queries.GET_BLOGS_BY_TAG,
        { tag: tag }
      );
      setBlogsData(response.getBlogsByTag);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [tag]);

  return (
    <div>
      <BlogList data={blogsData} />
    </div>
  );
};

export default Tags;
