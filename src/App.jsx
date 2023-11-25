import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import CreateUser from "./pages/CreateUser/CreateUser";
import ShowUser from "./pages/ShowUser/ShowUser";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/users" element={<ShowUser />} />
        <Route path="/update/:userId" element={<CreateUser />} />
        <Route exact path="/" element={<CreateUser />} />
      </Routes>
    </Router>
  );
}

export default App;
