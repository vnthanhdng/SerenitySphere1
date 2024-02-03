import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

function FeedList() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    // Replace this with actual API call
    const fetchEntries = async () => {
      try {
        const response = await fetch('/api/getEntries'); // API endpoint to fetch entries
        const data = await response.json();
        setEntries(data.entries);
      } catch (error) {
        console.error("Error fetching entries:", error);
      }
    };

    fetchEntries();
  }, []);

  return (
    <div className="feedlist">
      <h1 className="feedlist__heading">Entries</h1>
      <AnimatePresence>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
            className="feedlist__item"
          >
            <h2>{entry.title}</h2>
            <p>{entry.content}</p>
            {entry.image && <img src={entry.image} alt={entry.title} />}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

export default FeedList;
