"use client";
import React from "react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className="mt-5 ml-5 mr-5 flex justify-between items-center">
        <div>
          <Link href="/">
            <h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">
              &lt; BLOG NOT FOUND /&gt;
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/saved">
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Saved
            </h1>
          </Link>
          <div className="flex text-center text-2xl font-bold leading-9 tracking-tight text-white">
            <Link href="/myblogs">My&nbsp;Blogs</Link>
          </div>
          <Link
            href="/createblog"
            className="flex text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
            Create&nbsp;Blog
          </Link>
          <Link
            href="/findpeople"
            className="flex text-center text-2xl font-bold leading-9 tracking-tight text-white"
          >
            Find&nbsp;People
          </Link>
          <Link href="/profile">
            <h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">
              Profile
            </h1>
          </Link>
          <button
            onClick={() => signOut()}
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ml-2"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }
};

export default Navbar;
