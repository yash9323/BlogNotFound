import React from "react";
import ShowAllBlogs from "@/app/(components)/ShowAllBlogs";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="mt-20">
      <h3 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white">
        Start Reading and Writing Blogs Now
      </h3>
      <div className="mt-20 flex justify-center gap-2">
        <Link href="/login">
          <button className="flex w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Login
          </button>
        </Link>
        <Link href="/register">
          <button className="flex w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            Register
          </button>
        </Link>
      </div>
      <ShowAllBlogs />
    </div>
  );
};

export default LandingPage;
