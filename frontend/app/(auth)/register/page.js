"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";
import {
  fnameChecker,
  lnameChecker,
  validateBio,
  checkEmail,
  checkPassword,
} from "../../validations";

const RegisterPage = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    let firstName = e.target.fname.value;
    let lastName = e.target.lname.value;
    let email = e.target.email.value;
    let bio = e.target.bio.value;
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;

    //validation
    try {
      fnameChecker(firstName);
      lnameChecker(lastName);
      validateBio(bio);
      checkEmail(email);
      checkPassword(password);
      if (password !== confirm_password) {
        throw "password and confirm password do not match";
      }
    } catch (error) {
      setError(error);
      return;
    }

    // registeration api call and redirect

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`${data.message} \n Redirecting...`, {
          duration: 1500,
        });
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(data.error);
        return;
      }
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Toaster />
      <div>
        <h2 className="text-center text-xl text-white">
          Already a Member?
          <Link
            href="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </h2>
      </div>
      <h3 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Register Here
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
                placeholder="Enter Your Email Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="password"
                placeholder="Enter Your Password Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Confirm Password
            </label>
            <div className="mt-2">
              <input
                type="password"
                name="confirm_password"
                placeholder="Re Enter Password Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
