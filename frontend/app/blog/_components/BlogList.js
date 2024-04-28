import React from "react";

const BlogList = ({ data }) => {
  return (
    <div>
      <h1>Saved Blogs</h1>
      {data
        .slice()
        .reverse()
        .map((blog, index) => (
          <div key={index} className="mt-5 border border-white">
            <h2>{blog.title} </h2>
            <pre>{blog.content}</pre>
            <h2>{blog.date}</h2>
            <a href={`/blog/${blog._id}`}>Read More</a>
          </div>
        ))}
    </div>
  );
};

export default BlogList;
