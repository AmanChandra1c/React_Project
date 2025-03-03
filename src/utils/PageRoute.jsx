import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Details from "../components/Details";
import Create from "../components/Create";
import Edit from "../components/Edit";
function PageRoute() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}
export default PageRoute;
