import React from "react";
import BlogCard from "@/app/(components)/BlogCard";

const BlogList = ({ data }) => {
  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-4 gap-2 p-10">
      {data
        .slice()
        .reverse()
        .map((blog, index) => (
          <BlogCard data={blog} index={index}/>
        ))}
    </div>
  );
};

export default BlogList;
