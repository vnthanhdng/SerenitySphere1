import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export default withApiAuthRequired(async (req, res) => {
  const { title, content, category, image } = req.body;

  // Simulate adding an entry - Replace this with actual logic to add an entry to your database or backend service
  try {
    // Mock response for demonstration
    const response = {
      title,
      content,
      category,
      image, // optional image URL
    };

    console.log("Entry added:", response);
    res.status(200).json({ msg: "Entry added successfully", entry: response });
  } catch (err) {
    console.log("ERROR", err);
    res.status(500).json({ msg: "Something went wrong" });
  }
});
