import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  { files: ["**/*.{js,mjs,cjs}"], plugins: { js }, extends: ["js/recommended"], languageOptions: { globals: globals.browser } },
  {
    files: ["Month/*.js", "container/script.js"],
    rules: {
      "no-unused-vars": [
        "error",
        {
          varsIgnorePattern: "^(toggleCurio|scrollCarousel|addToCalendar|jdeNewMoon|normalize|positionWorld|cameraPosition|dot|reflect|materialReference|VARIATION_COUNT|VARIATION_NAMES|islandRadius|dummy|mat4|mouseActive|_pos|voxelMat|aoSavedThickness|ssrSavedStrength|bloomSavedStrength)$",
          caughtErrorsIgnorePattern: "^de$",
        },
      ],
    },
  },
]);
