import React from "react";
import Link from "next/link";

const BlogCard = ({ data, index }) => {
  return (
    <div
      key={data._id}
      className="bg-white text-black shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
    >
      <Link href={`/blog/${data._id}`}>
        <img
          className="rounded-t-lg"
          src={data.image}
          alt=""
          width={500}
          height={400}
        />
      </Link>
      <div className="p-5">
        <Link href={`/blog/${data._id}`}>
          <h5 className="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {data.title}
          </h5>
        </Link>
        <Link
          href={`/blog/${data._id}`}
          className="mt-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center"
        >
          Read more
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
