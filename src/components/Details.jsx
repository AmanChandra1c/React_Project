import React, { useContext, useEffect, useState } from "react";
import Nav from "./Nav";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loading from "./Loading";
import { ProductContext } from "../utils/Context";
import { toast } from "react-toastify";

function Details() {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [product, setProduct] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (!product) {
      setProduct(products.find((p) => p.id == id) || null);
    }
  }, [id, product, products]);

  const productDeleteHandler = (id) => {
    const filteredProducts = products.filter((p) => p.id !== id);
    setProducts(filteredProducts);
    localStorage.setItem("products", JSON.stringify(filteredProducts));
    toast.success("Product deleted successfully!");
    navigate("/");
  };

  return product ? (
    <>
      <Nav />
      <div className="w-full min-h-screen overflow-y-auto flex flex-col items-center p-5">
        <div className="w-[95%] md:w-[85%] lg:w-[80%] flex flex-col md:flex-row items-center justify-between m-auto p-5 md:p-10 lg:p-16">
          {/* Product Image */}
          <img
            className="hover:scale-110 ease-in-out duration-300 object-contain h-[35vh] sm:h-[40vh] md:h-[50vh] w-full md:w-[45%]"
            src={product.image}
            alt={product.title}
          />
          {/* Product Details */}
          <div className="content w-full md:w-[50%] mt-5 md:mt-10 text-center md:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
              {product.title}
            </h1>
            <h3 className="text-zinc-400 my-2 md:my-3">{product.category}</h3>
            <h2 className="text-red-300 mb-2 md:mb-3 font-bold">
              ${product.price}
            </h2>
            <p className="mb-4 md:mb-6 font-semibold">{product.description}</p>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 w-full">
              <Link
                to={`/edit/${product.id}`}
                className="py-2 px-5 border rounded border-blue-200 text-blue-300 w-full sm:w-auto text-center"
              >
                Edit
              </Link>
              <button
                onClick={() => productDeleteHandler(product.id)}
                className="cursor-pointer py-2 px-5 border rounded border-red-200 text-red-300 w-full sm:w-auto"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <Loading />
  );
}

export default Details;
