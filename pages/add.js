import { useState } from "react";
import router from "next/router";

import toast, { Toaster } from "react-hot-toast";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const toastStyles = {
  fontSize: "1.6rem",
  fontWeight: "600",
  backgroundColor: "#181818",
  color: "#fff",
};

function Add() {
  const [entry, setEntry] = useState({
    title: "",
    content: "",
    category: "self",
    image: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    toast.loading("Adding entry...", {
      id: "add-entry",
      style: toastStyles
    });

    try {
      // Replace with your API endpoint to add an entry
      const res = await fetch("/api/addEntry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
      });

      if (!res.ok) throw new Error("Failed to add entry");

      toast.success("Entry added successfully", {
        style: toastStyles
      });
      router.push(`/feed/${entry.category}`);
    } catch (err) {
      toast.error(err.message, {
        style: toastStyles
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="add">
      <h2 className="add__heading">Add an Entry</h2>
      <form className="add__form" onSubmit={handleSubmit}>
        <label htmlFor="title" className="add__label">Title</label>
        <input
          type="text"
          placeholder="Entry Title"
          className="add__input"
          id="title"
          name="title"
          required
          onChange={handleChange}
        />

        <label htmlFor="content" className="add__label">Content</label>
        <br></br>
        <textarea
          placeholder="Write your content here"
          className="add__textarea"
          id="content"
          name="content"
          required
          onChange={handleChange}
        />
        <br></br>

        <label htmlFor="categories" className="add__label">Select a Category</label>
        <select
          name="category"
          id="categories"
          className="add__select"
          value={entry.category}
          onChange={handleChange}
        >
          <option value="self">Me</option>
          <option value="people">People</option>
          <option value="spaces">Spaces</option>
          <option value="media">Media</option>
          <option value="hobbies">Hobbies</option>
        </select>

        <label htmlFor="image" className="add__label">Image URL (optional)</label>
        <input
          type="text"
          placeholder="https://example.com/image.jpg"
          className="add__input"
          id="image"
          name="image"
          onChange={handleChange}
        />

        <button className="add__btn" type="submit">
          {isLoading ? <div className="spinner"></div> : "Add Entry"}
        </button>
      </form>
      <Toaster position="bottom-center" />
    </div>
  );
}

export default Add;

export const getServerSideProps = withPageAuthRequired();
