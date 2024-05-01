import React from "react";
// import ReactQuill from 'react-quill';
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ data, index }) => {
  const modules = {
    toolbar: false,
  };
  return (
    <div
      key={index}
      className="bg-white text-black shadow-md border border-gray-200 rounded-lg max-w-sm mb-5"
    >
      <Link href="#">
        <Image
          class="rounded-t-lg"
          src="/test.avif"
          alt=""
          width={500}
          height={400}
        />
      </Link>
      <div class="p-5">
        <Link href={`/blog/${data._id}`}>
          <h5 class="text-gray-900 font-bold text-2xl tracking-tight mb-2">
            {data.title}
          </h5>
        </Link>
        {/* <ReactQuill theme="snow" value={data.content} readOnly={true} modules={modules} className='h-28 overflow-hidden'/> */}
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
