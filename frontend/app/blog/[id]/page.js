"use client";
import { useState, useEffect } from "react";
import { request } from "graphql-request";
import { useSession } from "next-auth/react";
import BlogPostCard from "../_components/BlogPostCard";
import queries from "../../../queries";

const graphqlEndpoint = "http://localhost:4000/";

const BlogPost = ({ params }) => {
  const { id } = params;
  const { data: session } = useSession();
  const [blogData, setBlogData] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogRes = await request(graphqlEndpoint, queries.GET_BLOG, {
          blogId: id,
        });
        setBlogData(blogRes?.getBlog || null);

        if (session && blogRes && blogRes.getBlog) {
          const userId = blogRes.getBlog.userId;
          const [authorRes, userRes] = await Promise.all([
            request(graphqlEndpoint, queries.GET_USER, { userId }),
            request(graphqlEndpoint, queries.GET_USER, {
              userId: session.user._id,
            }),
          ]);
          setAuthorData(authorRes?.getUser || null);
          setUserData(userRes?.getUser || null);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id, session]);

  if (!blogData || !authorData || !userData) return <p>Loading...</p>;

  return (
    <div>
      <BlogPostCard
        blogData={blogData}
        authorData={authorData}
        userData={userData}
      />
    </div>
  );
};

export default BlogPost;
