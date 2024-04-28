"use client";
import { useState, useEffect } from "react";
import queries from "../../../queries";
import { request } from "graphql-request";
import BlogPostCard from "../_components/BlogPostCard";

const BlogPost = ({ params }) => {
  const { id } = params;
  const [blogData, setBlogData] = useState(null);
  const [authorData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await request("http://localhost:4000/", queries.GET_BLOG, {
        blogId: id,
      });

      if (res.getBlog) {
        const userRes = await request(
          "http://localhost:4000/",
          queries.GET_USER,
          { userId: res.getBlog.userId }
        );
        setBlogData(res.getBlog);
        setUserData(userRes.getUser);
      }
    };

    fetchData();
  }, [id]);

  if (!blogData || !authorData) return <p>Loading...</p>;

  return (
    <div>
      <BlogPostCard blogData={blogData} authorData={authorData} />
    </div>
  );
};

export default BlogPost;
