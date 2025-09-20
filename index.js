

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const axios = require("axios");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const app = express();

// CORS - allow your frontend dev ports
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5173",
    "http://127.0.0.1:5173"
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

app.use(bodyParser.json());

// Request logger
app.use((req, res, next) => {
  console.log(`📡 ${req.method} ${req.path} - ${new Date().toISOString()}`);
  next();
});

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "AIzaSyAH10DN27FyfUW1FOMpMY4BVfhihj7F4DU";

// Prompt builder
function buildPrompt({ currentLocation, destination, date, days, budget, type, passengers }) {
  return `
You are a professional travel planner AI.

TASK 1 — MAIN TRIP:
Plan a personalized ${days}-day trip for ${passengers} passenger(s).

Trip Details:
- Current Location: ${currentLocation}
- Destination: ${destination}
- Start Date: ${date}
- Number of Days: ${days}
- Budget: ${budget}
- Trip Type: ${type}
- Number of Passengers: ${passengers}

TASK 2 — SIMILAR TRIPS:
After the main plan, suggest 3 alternative trips that match the same trip type (${type}) and fit within the same budget. For each similar trip give:
- Destination
- One-sentence reason why it’s a good match
- Approx budget per person (NUMBER ONLY, no currency symbol)

OUTPUT RULES:
- **Return ONLY human-readable plain text** — no JSON, no braces, no code fences.
- Start with a short "Trip Summary:" paragraph.
- Provide an "Itinerary:" section with each day labeled and bullet points for Morning / Afternoon / Evening.
- Provide a "Travel Tips:" bullet list.
- End with "Similar Trips You Might Like:" (bullet points).
- Keep text concise and user-facing.

End of response.
`.trim();
}

// --------------------- /generate-trip ---------------------
app.post("/generate-trip", async (req, res) => {
  try {
    const { currentLocation, destination, date, days, budget, type, passengers } = req.body;

    if (!destination || !days || !passengers) {
      return res.status(400).json({ error: "destination, days, and passengers are required" });
    }

    const prompt = buildPrompt({ currentLocation, destination, date, days, budget, type, passengers });
    console.log("🧠 Sending prompt to Gemini...");

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
      { contents: [{ role: "user", parts: [{ text: prompt }] }] },
      { headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY }, timeout: 120000 }
    );

    const textResponse =
      response?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No trip plan generated.";

    // Save to Firestore
    const tripData = {
      tripPlanText: textResponse,
      requestParams: { currentLocation, destination, date, days: parseInt(days, 10), budget, type, passengers: parseInt(passengers, 10) },
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const tripRef = await db.collection("trips").add(tripData);
    console.log(`✅ Trip saved with ID: ${tripRef.id}`);

    return res.json({ success: true, id: tripRef.id, tripPlanText: textResponse });
  } catch (err) {
    console.error("❌ /generate-trip error:", err.response?.data || err.message);
    return res.status(500).json({ error: "Failed to generate trip plan", details: err.message });
  }
});

// --------------------- Save Plan ---------------------
app.post("/savePlan", async (req, res) => {
  try {
    const { userId, plan } = req.body;
    if (!userId || !plan) return res.status(400).json({ error: "Missing fields" });

    await db.collection("plans").add({ userId, ...plan, createdAt: admin.firestore.FieldValue.serverTimestamp() });
    res.status(200).json({ success: true, message: "Plan saved successfully" });
  } catch (error) {
    console.error("❌ Error saving plan:", error);
    res.status(500).json({ error: "Failed to save plan" });
  }
});

// --------------------- Get Plans for user ---------------------
app.get("/getPlans/:userId", async (req, res) => {
  try {
    const snapshot = await db.collection("plans").where("userId", "==", req.params.userId).orderBy("createdAt", "desc").get();
    const plans = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.status(200).json(plans);
  } catch (error) {
    console.error("❌ Error fetching plans:", error);
    res.status(500).json({ error: "Failed to fetch plans" });
  }
});

// --------------------- Fetch All Trips ---------------------
app.get("/trips", async (req, res) => {
  try {
    const snapshot = await db.collection("trips").orderBy("createdAt", "desc").get();
    const trips = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json({ success: true, count: trips.length, trips });
  } catch (error) {
    console.error("❌ Error fetching trips:", error);
    res.status(500).json({ error: "Failed to fetch trips" });
  }
});

// --------------------- Root ---------------------
app.get("/", (req, res) => {
  res.json({ message: "🌍 Trip Planner Backend API", version: "1.0.0" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
