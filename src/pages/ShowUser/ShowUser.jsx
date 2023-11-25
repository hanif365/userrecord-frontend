import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ShowUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const response = await fetch("http://localhost:4000/api/users");
        const response = await fetch(
          "https://userrecord-backend.vercel.app/api/users"
        );
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error("Failed to fetch users");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (userId) => {
    try {
      const response = await fetch(
        `https://userrecord-backend.vercel.app/api/user/${userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        console.log(`User deleted successfully`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user._id !== userId)
        );
        notify();
      } else {
        console.error("Failed to delete user");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  console.log(users);

  const notify = () =>
    toast.success("User deleted successfully!", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  return (
    <div className="px-5 text-center bg-[#edf2fb] min-h-screen pt-28">
      <h1 className="text-2xl font-bold mb-4 py-5">User List</h1>
      <ToastContainer />
      <table className="w-full border">
        <thead>
          <tr>
            <th className="border p-2">Name</th>
            <th className="border p-2">Sectors</th>
            <th className="border p-2">Agree Terms</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className="hover:bg-gray-100 transition duration-300"
            >
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">{user.sectors.join(", ")}</td>
              <td className="border p-2">{user.agreeTerms ? "Yes" : "No"}</td>
              <td className="border p-2 space-y-2 md:space-y-0">
                <Link
                  to={`/update/${user._id}`}
                  className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
                >
                  Edit
                </Link>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ShowUser;
