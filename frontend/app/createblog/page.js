"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Editor from "./_components/Editor";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { validateTag, validateTitle, validateContent } from "../validations";

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [bstatus, setBstatus] = useState("Create Blog");

  const handleContentChange = (newText) => {
    setText(newText);
  };

  const handleimagechange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let title = e.target.title.value;
    let tag = e.target.tag.value;

    if (!tag) {
      tag = "";
    }
    setBstatus("Validating..");
    try {
      validateTag(tag);
      validateTitle(title);
      validateContent(text);
      if (!image) {
        throw "Please Choose An Blog Image";
      }
    } catch (e) {
      setError(e);
      setBstatus("Create Blog");
      return;
    }

    setError("");
    setBstatus("Creating..");
    const formData = new FormData();
    formData.append("file", image);
    formData.append("tag", tag);
    formData.append("title", title);
    formData.append("content", text);
    formData.append("userId", session.user._id);
    try {
      const res = await fetch("/api/createblog", {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        toast.success(`Blog Created Successfully, redirecting`, {
          duration: 1500,
        });
        setTimeout(() => {
          router.push("/");
        }, 1500);
        return;
      }
      toast.error("Error while adding blog");
      setBstatus("Create Blog");
    } catch (error) {
      console.error(error);
      setBstatus("Create Blog");
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
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Holy smokes!</strong>
            <br />
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          <div>
            {image && (
              <div>
                <h1>Blog Cover Image Preview: </h1>
                <Image
                  width={200}
                  height={200}
                  src={URL.createObjectURL(image)}
                  alt=""
                  className="mt-5 w-full h-56 aspect-ratio aspect-square object-cover"
                />
              </div>
            )}
            <label className="mt-5 block text-sm font-medium leading-6 text-white">
              Upload an image for your post:
            </label>
            <input
              type="file"
              accept="image/*"
              name="img"
              onChange={handleimagechange}
            />
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Tag
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="tag"
                placeholder="Enter tag for your blog"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
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
              content={text}
              onChange={(newContent) => handleContentChange(newContent)}
            />
          </div>
          <div>
            <button
              type={bstatus === "Create Blog" ? "submit" : "button"}
              className="flex w-30 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {bstatus}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
