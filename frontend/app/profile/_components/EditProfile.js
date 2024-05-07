"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { fnameChecker, lnameChecker, validateBio } from "../../validations";
import toast, { Toaster } from "react-hot-toast";

const EditProfile = ({ data }) => {
  const router = useRouter();
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    let fname = e.target.fname.value;
    let lname = e.target.lname.value;
    let bio = e.target.bio.value;

    // validations

    try {
      fnameChecker(fname);
      lnameChecker(lname);
      validateBio(bio);
    } catch (error) {
      setError(error);
      return;
    }

    data.fname = fname;
    data.lname = lname;
    data.bio = bio;

    try {
      const res = await fetch("/api/edituser", {
        method: "POST",
        body: JSON.stringify(data),
      });
      const api = await res.json();
      if (res.ok) {
        toast.success(`${api.message} \n Redirecting...`, {
          duration: 2000,
        });
        setTimeout(() => {
          router.push(`/profile?${Math.random().toString()}`);
        }, 1500);
      } else {
        toast.error(api.error);
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster />
      <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        EDIT DETAILS
      </h3>
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
            <label className="block text-sm font-medium leading-6 text-white">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fname"
                defaultValue={data.fname}
                placeholder="Enter Your First Name Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Last Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="lname"
                defaultValue={data.lname}
                placeholder="Enter Your Last Name Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Bio
            </label>
            <div className="mt-2">
              <textarea
                name="bio"
                rows="4"
                cols="50"
                placeholder="Enter Your Bio Here"
                defaultValue={data.bio}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          {/* <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                defaultValue={data.email}
                placeholder="Enter Your Email Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div> */}
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
