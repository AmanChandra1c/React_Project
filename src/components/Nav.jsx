import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { ProductContext } from "../utils/Context";

function Nav({ setFilteredProducts }) {
  const { products } = useContext(ProductContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  let distinct_category =
    products && products.reduce((acc, cv) => [...acc, cv.category], []);
  distinct_category = [...new Set(distinct_category)];

  const color = () => {
    return `rgba(${(Math.random() * 255).toFixed()},
        ${(Math.random() * 255).toFixed()},
        ${(Math.random() * 255).toFixed()})`;
  };
  const handleClick = (category) => {
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
    if (isMobile) setIsOpen(false);
  };

  return (
    <>
      {isMobile && (
        <div className="fixed top-4 left-4 z-50">
          <button
            className="p-2 bg-blue-500 text-white rounded-full w-10 h-10 flex items-center justify-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
      )}
      <nav
        className={`
          ${
            isMobile
              ? isOpen
                ? "fixed left-0"
                : "fixed -translate-x-full"
              : "relative"
          }
          top-0 h-full bg-zinc-100 flex flex-col items-center pt-5 px-4 sm:px-6 overflow-y-auto
          transition-transform duration-300 ease-in-out sm:translate-x-0
        `}
        style={{ width: isMobile ? "70%" : "250px" }} // Fixed width only on large screens
      >
        <NavLink
          className="py-2 px-5 border border-blue-200 text-blue-400 w-full text-center"
          to="/create"
          onClick={handleClick}
        >
          Add New Product
        </NavLink>
        <hr className="w-[80%] my-3" />
        <h1 className="text-2xl mb-3 w-full text-center sm:text-left">
          Category
        </h1>
        <div className="w-full">
          <Link
            to={`/`}
            onClick={() => handleClick("All")}
            className="flex items-center p-2 gap-2 mb-2 w-full"
          >
            <span
              style={{ backgroundColor: color() }}
              className="block w-[15px] h-[15px] rounded-full"
            ></span>
            <h1 className="text-base sm:text-lg">All</h1>
          </Link>
          {distinct_category.map((c, i) => (
            <Link
              key={i}
              to={`/?category=${c}`}
              className="flex items-center p-2 gap-2 mb-2 w-full"
              onClick={() => handleClick(c)}
            >
              <span
                style={{ backgroundColor: color() }}
                className="block w-[15px] h-[15px] rounded-full"
              ></span>
              <h1 className="text-base sm:text-lg flex-shrink-0">{c}</h1>
            </Link>
          ))}
        </div>
      </nav>
    </>
  );
}
export default Nav;
