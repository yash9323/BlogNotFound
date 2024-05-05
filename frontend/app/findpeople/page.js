"use client";
import { useState, useEffect } from "react";
import request from "graphql-request";
import queries from "../../queries";
import UserCard from "./_components/UserCard";
import { useSession } from "next-auth/react";

const FindPeople = () => {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      if (session) {
        const response = await request(
          "http://localhost:4000/",
          queries.SEARCH_USER_BY_NAME,
          { selfId: session.user._id, searchTerm: searchTerm }
        );
        setResult(response.searchUserByName);
        setError(null);
      }
    } catch (error) {
      setError("An error occurred while fetching data.");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm, session]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchInput = event.target.searchbar.value;
    setSearchTerm(searchInput);
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form onSubmit={handleSubmit} className="mt-5 space-y-6">
      <div>
            <label className="block text-sm font-medium leading-6 text-white">
              Find Your Friend Here
            </label>
            <div className="mt-2">
              <input
                type="text"
                name="searchbar"
                placeholder="Enter Your First Name Here"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Search
            </button>
      </form>
      {error && <p>{error}</p>}
      <div className="mt-5">
        {searchTerm.length === 0 ? (
          <h1>Start searching...</h1>
        ) : result.length === 0 ? (
          <h1>No results found</h1>
        ) : (
          result.map((user) => <UserCard key={user._id} data={user} />)
        )}
      </div>
    </div>
  );
};

export default FindPeople;
