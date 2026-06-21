import fs from "fs";
import path from "path";

const DIST_DIR = "./dist";

function fixPaths(dir) {
  if (!fs.existsSync(dir)) return;

  const files = fs.readdirSync(dir);

  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      // Recursively search nested page folders
      fixPaths(fullPath);
    } else if (file.endsWith(".html")) {
      let content = fs.readFileSync(fullPath, "utf8");

      // Replaces absolute asset paths with relative paths
      // Handles href="/_astro/..." -> href="./_astro/..."
      // Handles src="/_astro/..." -> src="./_astro/..."
      const updatedContent = content
        .replace(/(href|src)="\/\_astro\//g, '$1="./_astro/')
        .replace(/(href|src)='\/_astro\//g, "$1='./_astro/");

      fs.writeFileSync(fullPath, updatedContent, "utf8");
      console.log(`✅ Fixed paths in: ${fullPath}`);
    }
  }
}

console.log("Running post-build relative path adjustment...");
fixPaths(DIST_DIR);
console.log("Post-build adjustments complete!");
