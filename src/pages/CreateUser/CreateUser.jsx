import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import data from "../../data/data";
import { Link, useNavigate, useParams } from "react-router-dom";

const CreateUser = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [selectedSectors, setselectedSectors] = useState([]);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const response = await fetch(
        //   `http://localhost:4000/api/user/${userId}`
        // );
        const response = await fetch(
          `https://userrecord-backend.vercel.app/api/user/${userId}`
        );
        if (response.ok) {
          const userData = await response.json();
          setName(userData.name);
          setAgreeTerms(userData.agreeTerms);
          setselectedSectors(userData.sectors);
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]);

  const toggleItem = (item) => {
    if (selectedSectors.includes(item)) {
      setselectedSectors(selectedSectors.filter((i) => i !== item));
    } else {
      setselectedSectors([...selectedSectors, item]);
    }
  };

  const deleteItem = (item) => {
    setselectedSectors(selectedSectors.filter((i) => i !== item));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = userId
      ? `https://userrecord-backend.vercel.app/api/user/${userId}`
      : "https://userrecord-backend.vercel.app/api/user";

    try {
      const response = await fetch(apiUrl, {
        method: userId ? "PATCH" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          sectors: selectedSectors,
          agreeTerms,
        }),
      });

      if (response.ok) {
        console.log(
          userId
            ? "User data updated successfully"
            : "User data saved successfully"
        );

        setName("");
        setselectedSectors([]);
        setAgreeTerms(false);
        if (userId) {
          navigate("/users");
        }
      } else {
        console.error(`Failed to ${userId ? "update" : "save"} user data`);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleArrowClick = () => {
    setIsOpen(!isOpen);
  };

  const toggleItemAndClose = (item) => {
    toggleItem(item);
    setIsOpen(false);
  };

  return (
    <div>
      <Link to="/users">Show User List</Link>
      <form
        className="relative w-1/3 rounded-lg m-auto pt-5"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="flex flex-wrap items-center py-5 max-h-[80px] overflow-auto p-2 space-y-2 border rounded-t-lg cursor-text relative">
          {selectedSectors.length > 0
            ? selectedSectors.map((item) => (
                <div key={item} className="mr-2">
                  <span className="px-2 py-1 bg-blue-200 rounded-full">
                    {item}
                  </span>
                  <button
                    className="ml-1 text-red-500"
                    onClick={() => deleteItem(item)}
                  >
                    X
                  </button>
                </div>
              ))
            : null}
          <div className="text-gray-500 flex">
            <p
              className={!selectedSectors.length && !isOpen ? "" : "invisible"}
            >
              Select sectors in which you are currently involved...
            </p>
            <SlArrowDown
              className="font-extrabold  self-center ml-10 cursor-pointer bg-red-800 p-2  text-white absolute right-0 top-0"
              onClick={handleArrowClick}
              size="40"
            />
          </div>
        </div>
        {isOpen && (
          <div className="absolute left-0 w-full border bg-white overflow-auto h-80">
            {data.map((menu) => (
              <div key={menu.menu} className="p-5">
                <div className="font-bold text-blue-700">{menu.menu}</div>
                {menu.submenus.map((submenu) => (
                  <div key={submenu.name} className="ml-4">
                    <div className="font-bold text-blue-400">
                      {submenu.name}
                    </div>
                    {submenu.items.map((item) => (
                      <div
                        key={item}
                        className={`py-2 pl-5 cursor-pointer hover:bg-gray-100 ${
                          selectedSectors.includes(item) ? "bg-blue-200" : ""
                        }`}
                        onClick={() => toggleItemAndClose(item)}
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        <div className="mb-4 mt-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              className=""
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <span className="ml-2 text-sm">
              I agree to the terms and conditions
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={!name || !agreeTerms || selectedSectors.length <= 0}
        >
          {userId ? "Update" : "Save"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
