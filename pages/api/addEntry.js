// pages/api/addEntry.js

import { withApiAuthRequired } from "@auth0/nextjs-auth0";

// Mock database
let entries = [];

export default withApiAuthRequired(async (req, res) => {
  if (req.method === 'POST') {
    const { title, content, category, image } = req.body;

    // Validate the input
    if (!title || !content || !category) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

    // Create a new entry
    const newEntry = {
      id: entries.length + 1,  // Simple ID generation for demo purposes
      title,
      content,
      category,
      image, // Optional
      createdAt: new Date().toISOString()
    };

    // Add entry to the mock database
    entries.push(newEntry);

    // Respond with the created entry
    return res.status(201).json(newEntry);
  } else {
    // Handle any non-POST requests
    return res.status(405).json({ msg: "Method Not Allowed" });
  }
});
