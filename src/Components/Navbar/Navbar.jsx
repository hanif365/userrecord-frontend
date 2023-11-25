import { useState } from "react";
import { FaEquals, FaXmark } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [navbar, setNavbar] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <nav className="md:translate-y-0 w-full fixed bg-white top-0 left-0 right-0 z-10 shadow-sm">
        <div className="justify-between px-4 mx-auto lg:max-w-7xl 2xl:max-w-screen-2xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <div className="flex items-center">
                <img
                  src="/logo.png"
                  width={50}
                  height={50}
                  alt="logo"
                  className="logo_navbar cursor-pointer"
                  onClick={() => {
                    navigate("/");
                  }}
                />
              </div>

              <div className="md:hidden">
                <button
                  className="text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                  onClick={() => setNavbar((prev) => !prev)}
                >
                  {navbar ? (
                    <FaXmark
                      style={{
                        width: "35px",
                        height: "35px",
                        color: "red",
                      }}
                    />
                  ) : (
                    <FaEquals
                      style={{
                        width: "35px",
                        height: "35px",
                        color: "#000000",
                      }}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
          <div>
            <div
              className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                navbar ? "p-12 md:p-0 block" : "hidden"
              }`}
            >
              <ul className="h-screen md:h-auto items-center justify-center md:flex cursor-pointer">
                <li
                  className={`text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-500 ease-in-out }`}
                >
                  <Link
                    to="/"
                    onClick={() => {
                      setNavbar((prev) => !prev);
                    }}
                  >
                    Home
                  </Link>
                </li>
                <li
                  className={`text-xl font-bold py-2 md:px-6 text-center border-b-2 md:border-b-0 hover:text-[#7EA0FF] transition duration-500 ease-in-out }`}
                >
                  <Link
                    to="/users"
                    onClick={() => {
                      setNavbar((prev) => !prev);
                    }}
                  >
                    Users
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
