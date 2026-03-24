require("dotenv").config();
const fs = require("fs");
const path = require("path");
const pool = require("./config/db");

const sourceDir = path.join(__dirname, "../frontend/src/assets/images");
const destDir = path.join(__dirname, "../frontend/public/images/home-sliders");

// Hero images mapping
const heroImages = [
  { file: "ship-home01.jpg" },
  { file: "spices03.jpg" },
  { file: "exporting01.jpg" },
  { file: "ship-home02.jpg" }
];

// Seed Announcements
const seedAnnouncements = [
  { title: "Global Shipping Experts", description: "Seamless sea and air freight operations across all major intercontinental routes." },
  { title: "Agro Commodities Export", description: "Ethically sourced, high-grade spices and grains distributed securely to your port of choice." },
  { title: "Heavy Machinery Transport", description: "Specialized crating and international shipping for industrial-grade vehicles." },
  { title: "100% Quality Assured", description: "Rigorous milestone checking protocol ensuring zero quality decay during transit." }
];

async function seedData() {
  try {
    // 1. Ensure destination directory exists
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }

    // 2. Copy images and insert into DB
    let orderIndex = 0;
    for (const item of heroImages) {
      const sourcePath = path.join(sourceDir, item.file);
      const destPath = path.join(destDir, item.file);
      const publicUrl = `/images/home-sliders/${item.file}`;

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, destPath);
        console.log(`Copied ${item.file} to public/images/home-sliders`);

        // Check if exists
        const check = await pool.query("SELECT * FROM home_sliders WHERE image_url = $1", [publicUrl]);
        if (check.rows.length === 0) {
          await pool.query("INSERT INTO home_sliders (image_url, order_index) VALUES ($1, $2)", [publicUrl, orderIndex]);
          console.log(`Inserted home slider: ${publicUrl}`);
        }
        orderIndex++;
      } else {
        console.warn(`Missing source image: ${sourcePath}`);
      }
    }

    // 3. Insert specific export announcements
    for (let i = 0; i < seedAnnouncements.length; i++) {
      const ann = seedAnnouncements[i];
      const check = await pool.query("SELECT * FROM announcements WHERE title = $1", [ann.title]);
      if (check.rows.length === 0) {
        await pool.query(
          "INSERT INTO announcements (title, description, is_active, order_index) VALUES ($1, $2, $3, $4)",
          [ann.title, ann.description, true, i]
        );
        console.log(`Inserted announcement: ${ann.title}`);
      }
    }

    console.log("Seeding complete!");
    process.exit(0);

  } catch (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
  }
}

seedData();
