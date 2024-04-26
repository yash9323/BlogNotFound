"use client"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from 'react-hot-toast';
import { Editor } from "primereact/editor";
import { useSession } from "next-auth/react";

const Page = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [text, setText] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();
        let title = e.target.title.value;
        try {
            const res = await fetch("/api/createblog", {
                method: "POST",
                body: JSON.stringify({
                  title:title,
                  content:text,
                  userId: session.user._id
                }),
              });
            if (res.ok){
                toast.success(`Blog Created Successfully Redirecting`, {
                    duration: 2000
                  });
                  setTimeout(()=>{router.push('/')},1500);
                  return 
            }
            toast.error("Error while adding blog")
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <Toaster position="bottom-center"/>
           <div>
            <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
                Create a New Blog
            </h3> 
           </div>
           <div>
            <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
            <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Title
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="title"
                placeholder="Enter Your Blog Title Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <Editor value={text} onTextChange={(e) => {
                console.log(e.htmlValue);
                setText(e.htmlValue)
                }} style={{ height: '320px'}} /> 
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               <t/> Create Blog
            </button>
          </div>
            </form>
           </div>
        </div>
    );
}

export default Page;
