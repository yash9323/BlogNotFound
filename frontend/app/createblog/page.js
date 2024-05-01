"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { Editor } from "primereact/editor";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const [image,setImage] = useState(null);
  const renderHeader = () => {
    return (
        <span className="ql-formats">
            <button className="ql-bold" aria-label="Bold"></button>
            <button className="ql-italic" aria-label="Italic"></button>
            <button className="ql-underline" aria-label="Underline"></button>
        </span>
    );
};

const header = renderHeader();

  const handleimagechange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    const formData = new FormData();
    formData.append("file", image);
    formData.append("title", title);
    formData.append("content", text);
    formData.append("userId",session.user._id);
    try {
      const res = await fetch("/api/createblog", {
        method: "POST",
        body: formData
      });
      if (res.ok) {
        toast.success(`Blog Created Successfully Redirecting`, {
          duration: 2000,
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
        return;
      }
      toast.error("Error while adding blog");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Toaster position="bottom-center" />
      <div>
        <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
          Create a New Blog
        </h3>
      </div>
      <div>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit} >
          <div>
          {image && (
            <div>
              <h1>
                Image Preview 
              </h1>
              <Image src={URL.createObjectURL(image)} width={250} height={150} alt="" />
            </div>
          )}
          <label className="mt-5 block text-sm font-medium leading-6 text-white">
              Upload  an image for your post:
            </label>
            <input type="file" accept="image/*" name="img" onChange={handleimagechange} />
          </div>
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
            <Editor
              value={text}
              onTextChange={(e) => {
                setText(e.htmlValue);
              }}
              headerTemplate = {header}
              className="w-full"
              style={{ height: '50vh' }}
            />
          </div>
          <div>
            <button
              type="submit"
              className="flex w-30 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create Blog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
