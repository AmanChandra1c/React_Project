import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useLocation } from "react-router-dom";
import { ProductContext } from "../utils/Context";
import Loading from "./Loading";
import axios from "../utils/axios";

function Home() {
  const { products } = useContext(ProductContext);
  const { search } = useLocation();
  const category = decodeURIComponent(search.split("=")[1]);

  const [filteredProducts, setFilteredProducts] = useState(null);

  const getProductsCategory = async () => {
    try {
      const { data } = await axios.get(`/products/category/${category}`);
      setFilteredProducts(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // getProductsCategory();
    if (!filteredProducts) setFilteredProducts(products);
    if (category !== "undefined") {
      setFilteredProducts(products.filter((p) => p.category === category));
    }
  }, [category, products]);

  return products ? (
    <>
      <Nav setFilteredProducts={setFilteredProducts} />

      {/* Scrollable & Responsive Container */}
      <div className="w-full min-h-screen p-5 overflow-y-auto">
        {/* Responsive Grid Layout */}
        <div className="w-[85%] mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredProducts &&
            filteredProducts.map((p, i) => (
              <Link
                key={i}
                to={`/details/${p.id}`}
                className="card p-3 border shadow rounded flex flex-col items-center justify-between transition-transform hover:scale-105"
              >
                {/* Product Image */}
                <div
                  className="w-full h-48 bg-contain bg-no-repeat bg-center hover:scale-110 duration-300"
                  style={{ backgroundImage: `url(${p.image})` }}
                ></div>

                {/* Product Title */}
                <h1 className="text-center mt-3 text-lg font-semibold hover:text-blue-400">
                  {p.title}
                </h1>
              </Link>
            ))}
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Home;
