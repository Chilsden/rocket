// Import the package
import { rllc } from "rocket-launch-live-client";

// Get your API Key from environment variables or directly as a string
const RLL_API_KEY = process.env.RLL_API_KEY || "https://fdo.rocketlaunch.live/json/launches/next/5";

// Create a client with the API key
const client = rllc(RLL_API_KEY);

// Call the launches endpoint
async function getLaunches() {
  try {
    const launches = await client.launches();
    console.log("Upcoming Launches:", launches);
  } catch (error) {
    console.error("Error fetching launches:", error);
  }
}

getLaunches();
