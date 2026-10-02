const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const { createClient } = require("@supabase/supabase-js");

dotenv.config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function seedDatabase() {
  try {
    // Read seed JSON file
    const filePath = path.join(
      __dirname,
      "team_availability_seed.json"
    );

    const fileData = fs.readFileSync(filePath, "utf8");
    const members = JSON.parse(fileData);

    console.log(`Found ${members.length} team members.`);

    // Remove existing test data
    const { error: deleteError } = await supabase
      .from("team_members")
      .delete()
      .neq("id", 0);

    if (deleteError) {
      throw deleteError;
    }

    console.log("Old test data removed.");

    // Insert seed data
    const { data, error: insertError } = await supabase
      .from("team_members")
      .insert(members)
      .select();

    if (insertError) {
      throw insertError;
    }

    console.log(
      `Successfully inserted ${data.length} team members!`
    );

  } catch (error) {
    console.error("Seeding failed:", error.message);
  }
}

seedDatabase();