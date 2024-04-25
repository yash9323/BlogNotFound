"use client"
import React from 'react';
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";

const Navbar = () => {
  const { data: session, status } = useSession();
  if (status === "authenticated") {
    return (
      <div className='mt-5 ml-5 mr-5 flex justify-between items-center'>
        <a href="/"><h1 className="mt-2 text-center text-2xl font-bold leading-9 tracking-tight text-white">&lt; BLOG NOT FOUND /&gt;</h1></a>
        <div className='flex items-center justify-center gap-4'>
          <a href="/profile"><h1 className="text-center text-2xl font-bold leading-9 tracking-tight text-white">Profile</h1></a>
          <button onClick={() => signOut()} className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Sign out</button>
        </div>
      </div>
  );
}
}

export default Navbar;
