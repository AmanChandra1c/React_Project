import React, { useContext, useEffect, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

function Edit() {
  const { products, setProducts } = useContext(ProductContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    image: "",
    title: "",
    price: "",
    category: "",
    description: "",
  });

  const changeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setProduct(products.filter((p) => p.id == id)[0]);
  }, [id]);

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      product.image.trim().length < 5 ||
      product.title.trim().length < 3 ||
      product.price.trim().length < 1 ||
      product.category.trim().length < 3 ||
      product.description.trim().length < 10
    ) {
      alert("All fields must be filled out correctly");
      return;
    }

    const pi = products.findIndex((p) => p.id == id);
    const copydata = [...products];
    copydata[pi] = { ...products[pi], ...product };

    setProducts(copydata);
    localStorage.setItem("products", JSON.stringify(copydata));
    toast.success("Product edited successfully!");
    navigate(-1);
  };

  return (
    <>
    
      <Link
        className="fixed top-5 left-5 sm:left-10 border-blue-200 text-blue-400 border px-4 sm:px-6 rounded py-1 text-lg sm:text-2xl"
        to={`/details/${product.id}`}
      >
        Back
      </Link>
      <form
        onSubmit={AddProductHandler}
        className="w-full h-screen flex flex-col items-center p-5 sm:p-[5%]"
      >
        <h1 className="mb-5 w-3/4 sm:w-1/2 text-2xl sm:text-3xl text-center">
          Edit Product
        </h1>
        <input
          type="url"
          placeholder="image link"
          className="text-lg bg-zinc-100 rounded outline-blue-500/50 p-3 w-3/4 sm:w-1/2 mb-3"
          onChange={changeHandler}
          value={product?.image}
          name="image"
        />
        <input
          type="text"
          placeholder="title"
          className="text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-3/4 sm:w-1/2 mb-3"
          onChange={changeHandler}
          value={product?.title}
          name="title"
        />
        <div className="w-3/4 sm:w-1/2 flex flex-col sm:flex-row sm:justify-between">
          <input
            type="text"
            placeholder="category"
            className="text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-full sm:w-[48%] mb-3"
            onChange={changeHandler}
            name="category"
            value={product?.category}
          />
          <input
            type="number"
            placeholder="price"
            className="text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-full sm:w-[48%] mb-3"
            onChange={changeHandler}
            name="price"
            value={product?.price}
          />
        </div>
        <textarea
          className="text-lg bg-zinc-100 outline-blue-500/50 rounded resize-none p-3 w-3/4 sm:w-1/2 mb-3"
          onChange={changeHandler}
          name="description"
          value={product?.description}
          placeholder="Enter product description here"
          rows="6"
        ></textarea>
        <div className="w-3/4 sm:w-1/2">
          <button className="py-2 px-4 cursor-pointer sm:px-5 border outline-blue-500/50 rounded border-blue-200 text-blue-300 w-full">
            Edit Product
          </button>
        </div>
      </form>
    </>
  );
}

export default Edit;
