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
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="text" name="searchbar" className="text-black" />
        </label>
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
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
