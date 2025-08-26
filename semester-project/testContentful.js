require("dotenv").config({ path: ".env.local" });
const { createClient } = require("contentful");

console.log("SPACE_ID:", process.env.CONTENTFUL_SPACE_ID);
console.log("ACCESS_TOKEN:", process.env.CONTENTFUL_ACCESS_TOKEN);

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
});

(async () => {
  try {
    const entries = await client.getEntries();
    console.log("Fetched entries:", entries.items.length);
  } catch (err) {
    console.error("Error:", err.message);
  }
})();
