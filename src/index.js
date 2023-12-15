import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
const port = 9000;

app.use(bodyParser.json());

const wordpressEndpoint =
  "http://www.metaphorlaboratory.com.dream.website/wp-json/wp/v2/posts";

// Fetch all WordPress posts
app.get("/api/posts", async (req, res) => {
  try {
    const response = await fetch(wordpressEndpoint);
    const posts = await response.json();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching WordPress posts:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Fetch a specific WordPress post by ID
app.get("/api/posts/:id", async (req, res) => {
  const postId = req.params.id;

  try {
    const response = await fetch(`${wordpressEndpoint}/${postId}`);
    const post = await response.json();

    if (response.ok) {
      res.json(post);
    } else {
      res.status(response.status).json(post);
    }
  } catch (error) {
    console.error(`Error fetching WordPress post with ID ${postId}:`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
