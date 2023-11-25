// import React, { useState } from "react";
// import { SlArrowDown } from "react-icons/sl";
// import data from "../../data/data";
// import { Link } from "react-router-dom";

// const CreateUser = () => {
//   const [name, setName] = useState("");
//   const [selectedSectors, setselectedSectors] = useState([]);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   const toggleItem = (item) => {
//     if (selectedSectors.includes(item)) {
//       setselectedSectors(selectedSectors.filter((i) => i !== item));
//     } else {
//       setselectedSectors([...selectedSectors, item]);
//     }
//   };

//   const deleteItem = (item) => {
//     setselectedSectors(selectedSectors.filter((i) => i !== item));
//   };

//   const handleSave = async (e) => {
//     e.preventDefault();

//     console.log({
//       name: name,
//       selectedSectors: selectedSectors,
//       agreeTerms: agreeTerms,
//     });

//     try {
//       const response = await fetch(`http://localhost:4000/api/user`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           sectors: selectedSectors,
//           agreeTerms,
//         }),
//       });

//       if (response.ok) {
//         console.log("User data saved successfully");

//         setName("");
//         setselectedSectors([]);
//         setAgreeTerms(false);
//       } else {
//         console.error("Failed to save user data");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleArrowClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleItemAndClose = (item) => {
//     toggleItem(item);
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <Link to="/users">Show User List</Link>
//       <form
//         className="relative w-1/3 rounded-lg m-auto pt-5"
//         onSubmit={handleSave}
//       >
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 p-2 w-full border rounded-md"
//             required
//           />
//         </div>
//         <div className="flex flex-wrap items-center py-5 max-h-[80px] overflow-auto p-2 space-y-2 border rounded-t-lg cursor-text relative">
//           {selectedSectors.length > 0
//             ? selectedSectors.map((item) => (
//                 <div key={item} className="mr-2">
//                   <span className="px-2 py-1 bg-blue-200 rounded-full">
//                     {item}
//                   </span>
//                   <button
//                     className="ml-1 text-red-500"
//                     onClick={() => deleteItem(item)}
//                   >
//                     X
//                   </button>
//                 </div>
//               ))
//             : null}
//           <div className="text-gray-500 flex">
//             <p
//               className={!selectedSectors.length && !isOpen ? "" : "invisible"}
//             >
//               Select sectors in which you are currently involved...
//             </p>
//             <SlArrowDown
//               className="font-extrabold  self-center ml-10 cursor-pointer bg-red-800 p-2  text-white absolute right-0 top-0"
//               onClick={handleArrowClick}
//               size="40"
//             />
//           </div>
//         </div>
//         {isOpen && (
//           <div className="absolute left-0 w-full border bg-white overflow-auto h-80">
//             {data.map((menu) => (
//               <div key={menu.menu} className="p-5">
//                 <div className="font-bold text-blue-700">{menu.menu}</div>
//                 {menu.submenus.map((submenu) => (
//                   <div key={submenu.name} className="ml-4">
//                     <div className="font-bold text-blue-400">
//                       {submenu.name}
//                     </div>
//                     {submenu.items.map((item) => (
//                       <div
//                         key={item}
//                         className={`py-2 pl-5 cursor-pointer hover:bg-gray-100 ${
//                           selectedSectors.includes(item) ? "bg-blue-200" : ""
//                         }`}
//                         onClick={() => toggleItemAndClose(item)}
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="mb-4 mt-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               className=""
//               checked={agreeTerms}
//               onChange={() => setAgreeTerms(!agreeTerms)}
//               required
//             />
//             <span className="ml-2 text-sm">
//               I agree to the terms and conditions
//             </span>
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           disabled={!name || !agreeTerms || selectedSectors.length <= 0}
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default CreateUser;





// import React, { useEffect, useState } from "react";
// import { SlArrowDown } from "react-icons/sl";
// import data from "../../data/data";
// import { Link, useNavigate, useParams } from "react-router-dom";

// const UpdateUser = () => {
//   const { userId } = useParams();
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [selectedSectors, setselectedSectors] = useState([]);
//   const [agreeTerms, setAgreeTerms] = useState(false);
//   const [isOpen, setIsOpen] = useState(false);

//   console.log(userId);

//   useEffect(() => {
//     const fetchCurrentUsers = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:4000/api/user/${userId}`
//         );
//         if (response.ok) {
//           const data = await response.json();
//           console.log("Current user data: ", data);
//           setName(data.name);
//           setAgreeTerms(data.agreeTerms);
//           setselectedSectors(data.sectors);
//         } else {
//           console.error("Failed to fetch user");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchCurrentUsers();
//   }, []);

//   const toggleItem = (item) => {
//     if (selectedSectors.includes(item)) {
//       setselectedSectors(selectedSectors.filter((i) => i !== item));
//     } else {
//       setselectedSectors([...selectedSectors, item]);
//     }
//   };

//   const deleteItem = (item) => {
//     setselectedSectors(selectedSectors.filter((i) => i !== item));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();

//     console.log({
//       name: name,
//       selectedSectors: selectedSectors,
//       agreeTerms: agreeTerms,
//     });
//     try {
//       const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
//         method: "PATCH",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name,
//           sectors: selectedSectors,
//           agreeTerms,
//         }),
//       });

//       if (response.ok) {
//         console.log("User data updated successfully");

//         setName("");
//         setselectedSectors([]);
//         setAgreeTerms(false);
//         navigate("/users");
//       } else {
//         console.error("Failed to update user data");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   const handleArrowClick = () => {
//     setIsOpen(!isOpen);
//   };

//   const toggleItemAndClose = (item) => {
//     toggleItem(item);
//     setIsOpen(false);
//   };

//   return (
//     <div>
//       <Link to="/users">Show User List</Link>
//       <form
//         className="relative w-1/3 rounded-lg m-auto pt-5"
//         onSubmit={handleUpdate}
//       >
//         <div className="mb-4">
//           <label
//             htmlFor="name"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Name
//           </label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="mt-1 p-2 w-full border rounded-md"
//             required
//           />
//         </div>
//         <div className="flex flex-wrap items-center py-5 max-h-[80px] overflow-auto p-2 space-y-2 border rounded-t-lg cursor-text relative">
//           {selectedSectors.length > 0
//             ? selectedSectors.map((item) => (
//                 <div key={item} className="mr-2">
//                   <span className="px-2 py-1 bg-blue-200 rounded-full">
//                     {item}
//                   </span>
//                   <button
//                     className="ml-1 text-red-500"
//                     onClick={() => deleteItem(item)}
//                   >
//                     X
//                   </button>
//                 </div>
//               ))
//             : null}
//           <div className="text-gray-500 flex">
//             <p
//               className={!selectedSectors.length && !isOpen ? "" : "invisible"}
//             >
//               Select sectors in which you are currently involved...
//             </p>
//             <SlArrowDown
//               className="font-extrabold  self-center ml-10 cursor-pointer bg-red-800 p-2  text-white absolute right-0 top-0"
//               onClick={handleArrowClick}
//               size="40"
//             />
//           </div>
//         </div>
//         {isOpen && (
//           <div className="absolute left-0 w-full border bg-white overflow-auto h-80">
//             {data.map((menu) => (
//               <div key={menu.menu} className="p-5">
//                 <div className="font-bold text-blue-700">{menu.menu}</div>
//                 {menu.submenus.map((submenu) => (
//                   <div key={submenu.name} className="ml-4">
//                     <div className="font-bold text-blue-400">
//                       {submenu.name}
//                     </div>
//                     {submenu.items.map((item) => (
//                       <div
//                         key={item}
//                         className={`py-2 pl-5 cursor-pointer hover:bg-gray-100 ${
//                           selectedSectors.includes(item) ? "bg-blue-200" : ""
//                         }`}
//                         onClick={() => toggleItemAndClose(item)}
//                       >
//                         {item}
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//             ))}
//           </div>
//         )}
//         <div className="mb-4 mt-4">
//           <label className="flex items-center">
//             <input
//               type="checkbox"
//               className=""
//               checked={agreeTerms}
//               onChange={() => setAgreeTerms(!agreeTerms)}
//               required
//             />
//             <span className="ml-2 text-sm">
//               I agree to the terms and conditions
//             </span>
//           </label>
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//           disabled={!name || !agreeTerms || selectedSectors.length <= 0}
//         >
//           Save
//         </button>
//       </form>
//     </div>
//   );
// };

// export default UpdateUser;




// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";

// const ShowUser = () => {
//   const [users, setUsers] = useState([]);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch("http://localhost:4000/api/users");
//         if (response.ok) {
//           const data = await response.json();
//           setUsers(data);
//         } else {
//           console.error("Failed to fetch users");
//         }
//       } catch (error) {
//         console.error("Error:", error);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const handleDelete = async (userId) => {
//     try {
//       const response = await fetch(`http://localhost:4000/api/user/${userId}`, {
//         method: "DELETE",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       });

//       if (response.ok) {
//         console.log(`User deleted successfully`);
//         setUsers((prevUsers) =>
//           prevUsers.filter((user) => user._id !== userId)
//         );
//       } else {
//         console.error("Failed to delete user");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   console.log(users);

//   return (
//     <div className="px-5">
//       <h1 className="text-2xl font-bold mb-4 text-center py-5">User List</h1>
//       <table className="w-full border">
//         <thead>
//           <tr>
//             <th className="border p-2">Name</th>
//             <th className="border p-2">Sectors</th>
//             <th className="border p-2">Agree Terms</th>
//             <th className="border p-2">Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {users.map((user) => (
//             <tr
//               key={user.id}
//               className="hover:bg-gray-100 transition duration-300"
//             >
//               <td className="border p-2">{user.name}</td>
//               <td className="border p-2">{user.sectors.join(", ")}</td>
//               <td className="border p-2">{user.agreeTerms ? "Yes" : "No"}</td>
//               <td className="border p-2">
//                 <Link
//                   to={`/update/${user._id}`}
//                   className="bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600"
//                 >
//                   Edit
//                 </Link>
//                 <button
//                   className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
//                   onClick={() => handleDelete(user._id)}
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ShowUser;
