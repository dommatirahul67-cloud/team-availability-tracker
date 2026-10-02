const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Test route
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Team Availability Tracker backend is running!"
  });
});

// Get all team members
app.get("/api/team-members", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Update team member status
app.put("/api/team-members/:id/status", async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Allowed statuses
    const validStatuses = [
      "Available",
      "Busy",
      "Away"
    ];

    // Check if status is valid
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Invalid status"
      });
    }

    // Update status in Supabase
    const { data, error } = await supabase
      .from("team_members")
      .update({
  status: status,
  updated_at: new Date().toISOString()
})
      .eq("id", id)
      .select()
      .single();

    if (error) {
      return res.status(500).json({
        success: false,
        error: error.message
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      data: data
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running at http://localhost:${PORT}`
  );
});