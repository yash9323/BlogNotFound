"use client";
import { useState, useEffect } from "react";
import request from "graphql-request";
import queries from "../../queries";
import UserCard from "./_components/UserCard";
import { useSession } from "next-auth/react";

const FindPeople = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [result, setResult] = useState([]);

  const fetchData = async () => {
    try {
      const response = await request(
        "http://localhost:4000/",
        queries.SEARCH_USER_BY_NAME,
        { searchTerm: searchTerm }
      );
      setResult(response.searchUserByName);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const searchInput = event.target.searchbar.value;
    setSearchTerm(searchInput);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="searchbar" className="text-black" />
        </label>
        <button type="submit">Search</button>
      </form>
      {searchTerm.length === 0 ? (
        <h1>Start searching...</h1>
      ) : result.length === 0 ? (
        <h1>No results found</h1>
      ) : (
        result.map((user) => <UserCard key={user._id} data={user} />)
      )}
    </div>
  );
};

export default FindPeople;
