import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useSearch from "../../hooks/useSearch";

const ListUsers = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(2);
  const navigate = useNavigate();

  // Gunakan custom hook untuk pencarian
  const { search, setSearch, filteredData: filteredUsers } = useSearch(users);

  useEffect(() => {
    const isAuthenticated = !!localStorage.getItem("token");
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      fetchUsers(page);
    }
  }, [page, navigate]);

  const fetchUsers = (pageNumber) => {
    fetch(`https://reqres.in/api/users?page=${pageNumber}`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data.data);
        setTotalPages(data.total_pages);
      })
      .catch((error) => console.error("Error fetching users:", error));
  };

  return (
    <div className="p-6">
      <h1 className="mb-6 text-3xl font-bold text-center ">List Users</h1>

      {/* Search Input */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search user by name or email..."
          className="w-full max-w-md p-3 border rounded-lg shadow-md outline-none focus:border-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Users List */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <Link to={`/user/${user.id}`} key={user.id}>
              <div className="p-6 text-center transition-transform transform bg-white border rounded-lg shadow-lg cursor-pointer hover:shadow-xl hover:-translate-y-1">
                <img
                  src={user.avatar}
                  alt={user.first_name}
                  className="w-24 h-24 mx-auto mb-4 border-2 border-gray-300 rounded-full"
                />
                <h2 className="text-xl font-semibold text-gray-800">
                  {user.first_name} {user.last_name}
                </h2>
                <p className="text-gray-500">{user.email}</p>
              </div>
            </Link>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No users found.
          </p>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-4">
        <button
          className={`px-4 py-2 text-white rounded-lg ${
            page === 1
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-4 py-2 text-gray-700 border rounded-lg">
          Page {page} of {totalPages}
        </span>
        <button
          className={`px-4 py-2 text-white rounded-lg ${
            page === totalPages
              ? "bg-gray-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-700"
          }`}
          onClick={() => setPage(page + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ListUsers;
