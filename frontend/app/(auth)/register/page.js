"use client";

import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import Link from "next/link";
import { useState } from "react";

const RegisterPage = () => {
  const router = useRouter();
  const [errors, setErrors] = useState(new Set());

  function fnamechecker(fname) {
    let newErrors = [];

    if (fname === undefined) {
      newErrors.push("Error: First Name not passed");
    } else {
      if (typeof fname !== "string") {
        newErrors.push("Error: First Name passed is not a String!");
      }
      if (fname.trim().length === 0) {
        newErrors.push("Error: First Name passed only has empty spaces");
      }
      if (!/^[A-Za-z]+$/.test(fname)) {
        newErrors.push(
          "Error: First Name passed has characters other than letters which are not accepted"
        );
      }
      if (fname.length < 2 || fname.length > 25) {
        newErrors.push("Error: First Name should be between 2-25 characters");
      }
      if (/<|>/.test(fname)) {
        newErrors.push("No injection of tags allowed!");
      }
    }

    setErrors(newErrors);
    return newErrors.length === 0;
  }
  function lnamechecker(lname) {
    let newErrors = [];

    if (lname === undefined) {
      newErrors.push("Error: Last Name not passed");
    } else {
      if (typeof lname !== "string") {
        newErrors.push("Error: Last Name passed is not a String!");
      }
      if (lname.trim().length === 0) {
        newErrors.push("Error: Last Name passed only has empty spaces");
      }
      if (!/^[A-Za-z]+$/.test(lname)) {
        newErrors.push(
          "Error: Last Name passed has characters other than letters which are not accepted"
        );
      }
      if (lname.length < 2 || lname.length > 25) {
        newErrors.push("Error: Last Name should be between 2-25 characters");
      }
      if (/<|>/.test(lname)) {
        newErrors.push("No injection of tags allowed!");
      }
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  }
  function validateBio(bio) {
    let newErrors = [];

    const minBioLength = 3;
    const maxBioLength = 150;

    if (bio === undefined) {
      newErrors.push(`Error: Biography not passed`);
    } else {
      if (typeof bio !== "string") {
        newErrors.push(`Error: Biography passed is not a String!`);
      }
      if (bio.length < minBioLength) {
        newErrors.push(
          `Error: Biography must be at least ${minBioLength} characters long`
        );
      }
      if (bio.length > maxBioLength) {
        newErrors.push(
          `Error: Biography exceeds maximum length of ${maxBioLength} characters`
        );
      }
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  }
  function checkEmail(email) {
    let newErrors = [];

    if (email === undefined) {
      newErrors.push("Error: Email Address not passed");
    } else {
      if (typeof email !== "string") {
        newErrors.push("Error: Email Address passed is not a String!");
      }
      if (email.trim().length === 0) {
        newErrors.push("Error: Email Address passed only has empty spaces");
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.trim())) {
        newErrors.push("Error: Incorrect format of Email Address");
      }
      if (email.length > 30 || email.length < 1) {
        newErrors.push(
          "Error: Email Address should be between 1-30 characters"
        );
      }
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  }
  function checkPassword(password) {
    let newErrors = [];

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    if (!passwordRegex.test(password)) {
      newErrors.push(
        "Password must contain at least one digit, one lowercase letter, one uppercase letter, and have a minimum length of 8 characters"
      );
    }

    setErrors(newErrors);

    return newErrors.length === 0;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let firstName = e.target.fname.value;
    let lastName = e.target.lname.value;
    let email = e.target.email.value;
    let bio = e.target.bio.value;
    let password = e.target.password.value;
    let confirm_password = e.target.confirm_password.value;

    //validation done

    if (!fnamechecker(firstName)) return;
    if (!lnamechecker(lastName)) return;
    if (!validateBio(bio)) return;
    if (!checkEmail(email)) return;
    if (!checkPassword(password)) return;
    if (password !== confirm_password) {
      setErrors((prevErrors) => [
        ...prevErrors,
        "password and confirm password do not match",
      ]);
      return;
    }

    // registeration api call and redirect

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        body: JSON.stringify({
          email: email,
          password: password,
          confirmPassword: confirm_password,
          firstName: firstName,
          lastName: lastName,
          bio: bio,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(`${data.message} \n Redirecting...`, {
          duration: 2000,
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
        {errors.length > 0 && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <strong className="font-bold">Holy smokes!</strong>
            {errors.map((error, index) => (
              <span key={index} className="block sm:inline">
                <ul>
                  <li key={index}>{error}</li>
                </ul>
              </span>
            ))}
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
