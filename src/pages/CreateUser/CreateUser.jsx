import React, { useState, useEffect } from "react";
import { SlArrowDown } from "react-icons/sl";
import data from "../../data/data";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

        notify();
        setName("");
        setselectedSectors([]);
        setAgreeTerms(false);
        // if (userId) {
        //   navigate("/users");
        // }
        setTimeout(() => {
          navigate("/users");
        }, 2000);
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

  const notify = () =>
    toast.success(`User ${userId ? "Update" : "Save"} successfully!`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  return (
    <div className="bg-[#edf2fb] min-h-screen pt-32">
      <ToastContainer />
      <form
        className="relative mx-5 md:m-auto p-5 md:w-1/3 space-y-8 rounded-lg  bg-[#abc4ff]"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="py-5 px-5 w-full border outline-none rounded-md text-xl"
            required
          />
        </div>
        <div
          className={`flex flex-wrap items-center p-5 min-h-[150px] overflow-auto space-y-2 border cursor-text relative bg-white ${
            isOpen ? "rounded-t-lg" : "rounded-lg"
          }`}
        >
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
          <div className="text-gray-500">
            <p
              className={
                !selectedSectors.length && !isOpen ? "text-xl" : "invisible"
              }
            >
              Select your current sectors of involvement
            </p>
            <div className="">
              <SlArrowDown
                className="self-center cursor-pointer bg-[#2196f3] w-20 px-5 text-white absolute right-0 top-0 rounded-bl-lg"
                onClick={handleArrowClick}
                size="30"
              />
            </div>
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
              className="w-5 h-5"
              checked={agreeTerms}
              onChange={() => setAgreeTerms(!agreeTerms)}
              required
            />
            <span className="ml-2 text-base">
              I agree to the terms and conditions
            </span>
          </label>
        </div>
        <button
          type="submit"
          className={`py-4 rounded w-full text-xl font-bold tracking-widest cursor-pointer transition-all ease-in-out ${
            !name || !agreeTerms || selectedSectors.length <= 0
              ? "bg-[#c1d3fe] text-gray-700 cursor-not-allowed"
              : "bg-[#2196f3] text-white hover:bg-blue-600"
          }`}
          disabled={!name || !agreeTerms || selectedSectors.length <= 0}
        >
          {userId ? "UPDATE" : "SAVE"}
        </button>
      </form>
    </div>
  );
};

export default CreateUser;
