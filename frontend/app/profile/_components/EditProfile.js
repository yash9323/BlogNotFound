"use client"
import React from 'react';
import {useRouter} from 'next/navigation';

const EditProfile = ({data}) => {
    const router = useRouter()
    const handleSubmit = async (e) => {
        e.preventDefault();
        let fname = e.target.fname.value;
        let lname = e.target.lname.value;
        let bio = e.target.bio.value;
        let email = e.target.email.value;

        // validation here 

        data.fname = fname
        data.lname = lname
        data.bio = bio
        data.email = email

        try {
            const res = await fetch("/api/edituser",{
                method: "POST",
                body: JSON.stringify(data)
            })
            if(res.ok)
            {
              router.refresh()
                router.push(
                    `/profile?updated`
                )
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            EDIT DETAILS
        </h3>
      <div>
        <form className="mt-5 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              First Name
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="fname"
                defaultValue = {data.fname}
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
                defaultValue = {data.lname}
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
                rows="4" cols="50"
                placeholder="Enter Your Bio Here"
                defaultValue = {data.bio}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Email Address
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="email"
                defaultValue = {data.email}
                placeholder="Enter Your Email Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
               <t/> Edit
            </button>
          </div>
        </form>
      </div>
    </div>
    );
}

export default EditProfile;