import React, { useContext, useState } from "react";
import { ProductContext } from "../utils/Context";
import { Link, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";

function Create() {
  const navigate = useNavigate();
  const { products, setProducts } = useContext(ProductContext);
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  const AddProductHandler = (e) => {
    e.preventDefault();
    if (
      image.trim().length < 5 ||
      title.trim().length < 3 ||
      price.trim().length < 1 ||
      category.trim().length < 3 ||
      description.trim().length < 10
    ) {
      alert("All fields must be filled out correctly");
      return;
    }
    const product = {
      id: nanoid(),
      image,
      title,
      price,
      category,
      description,
    };
    setProducts([...products, product]);
    localStorage.setItem("products", JSON.stringify([...products, product]));
    toast.success("Product Added successfully!");
    navigate("/");
  };

  return (
    <>
       <Link
              className="fixed top-5 left-5 sm:left-10 border-blue-200 text-blue-400 border px-4 sm:px-6 rounded py-1 text-lg sm:text-2xl"
              to={`/`}
            >
              Home
            </Link>
      <form
        onSubmit={AddProductHandler}
        className="w-full min-h-screen flex flex-col items-center p-6 sm:p-8 md:p-[5%] mt-4 sm:mt-8"
      >
        <h1 className="mb-6 w-full text-center text-xl sm:text-2xl md:text-3xl">
          Add New Product
        </h1>
        <input
          type="url"
          placeholder="Image link"
          className="text-base sm:text-lg bg-zinc-100 rounded outline-blue-500/50 p-3 w-full sm:w-3/4 md:w-1/2 mb-4"
          onChange={(e) => setImage(e.target.value)}
          value={image}
        />
        <input
          type="text"
          placeholder="Title"
          className="text-base sm:text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-full sm:w-3/4 md:w-1/2 mb-4"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <div className="w-full sm:w-3/4 md:w-1/2 flex flex-col sm:flex-row sm:gap-4">
          <input
            type="text"
            placeholder="Category"
            className="text-base sm:text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-full sm:w-1/2 mb-4"
            onChange={(e) => setCategory(e.target.value)}
            value={category}
          />
          <input
            type="number"
            placeholder="Price"
            className="text-base sm:text-lg bg-zinc-100 outline-blue-500/50 rounded p-3 w-full sm:w-1/2 mb-4"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </div>
        <textarea
          className="text-base sm:text-lg bg-zinc-100 outline-blue-500/50 rounded resize-none p-3 w-full sm:w-3/4 md:w-1/2 mb-4"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          placeholder="Enter product description here"
          rows="6"
        />
        <div className="w-full sm:w-3/4 md:w-1/2">
          <button className="w-full py-3 px-5 border outline-blue-500/50 rounded border-blue-200 text-blue-300 text-base sm:text-lg">
            Add Product
          </button>
        </div>
      </form>
    </>
  );
}
export default Create;
