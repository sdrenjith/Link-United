require("dotenv").config({ path: __dirname + "/../.env" });
const fs = require("fs");
const path = require("path");
const pool = require("../config/db");

const FRONTEND_SRC = path.resolve(__dirname, "../../frontend/src/assets/images/products");
const FRONTEND_PUBLIC_SLIDERS = path.resolve(__dirname, "../../frontend/public/images/sliders");

const MAPPINGS = [
  {
    category: "01",
    files: [
      "agroProducts/cashew.jpg",
      "agroProducts/cocoa.jpg",
      "agroProducts/peanuts.jpg",
      "agroProducts/turmeric.jpg",
      "agroProducts/cardamom-image.jpg"
    ]
  },
  {
    category: "02",
    files: [
      "vehiclesMachinery/Agricultural.jpg",
      "vehiclesMachinery/Commercial.jpg",
      "vehiclesMachinery/construction.jpg",
      "vehiclesMachinery/material.jpg",
      "vehiclesMachinery/sparepartts.jpg"
    ]
  },
  {
    category: "03",
    files: [
      "woodProducts/wood01.jpg",
      "woodProducts/wood02.jpg",
      "woodProducts/wood03.jpg",
      "woodProducts/wood04.jpg",
      "woodProducts/wood05.jpg"
    ]
  },
  {
    category: "04",
    files: [
      "kidsCloathing/kids01.jpg",
      "kidsCloathing/kids02.jpg",
      "kidsCloathing/kids03.jpg",
      "kidsCloathing/kids04.jpg",
      "kidsCloathing/kids05.jpg"
    ]
  },
  {
    category: "05",
    files: [
      "generalProducts/circuit.jpg",
      "generalProducts/garment.jpg",
      "generalProducts/gym.jpg",
      "generalProducts/mechanical.jpg",
      "generalProducts/temperature.jpg"
    ]
  }
];

async function seed() {
  if (!fs.existsSync(FRONTEND_PUBLIC_SLIDERS)) {
    fs.mkdirSync(FRONTEND_PUBLIC_SLIDERS, { recursive: true });
  }

  // Clear existing sliders just in case
  await pool.query("DELETE FROM product_sliders");

  let totalCopied = 0;

  for (const block of MAPPINGS) {
    let orderIndex = 0;
    for (const file of block.files) {
      const srcPath = path.join(FRONTEND_SRC, file);
      
      if (!fs.existsSync(srcPath)) {
        console.warn(`File not found, skipping: ${srcPath}`);
        continue;
      }

      const originalName = path.basename(srcPath);
      // Clean name
      const cleanName = originalName.replace(/[^a-zA-Z0-9.]/g, "-").toLowerCase();
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${cleanName}`;
      
      const destPath = path.join(FRONTEND_PUBLIC_SLIDERS, newFileName);
      
      fs.copyFileSync(srcPath, destPath);
      
      const dbUrl = `/images/sliders/${newFileName}`;
      
      await pool.query(
        "INSERT INTO product_sliders (category_number, image_url, order_index) VALUES ($1, $2, $3)",
        [block.category, dbUrl, orderIndex]
      );
      
      console.log(`Migrated ${block.category} -> ${newFileName}`);
      orderIndex++;
      totalCopied++;
    }
  }

  console.log(`Successfully migrated ${totalCopied} slider images.`);
  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
