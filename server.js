"use strict";

import express from "express";
import logger from "./utils/logger.js";
import routes from "./routes.js";
import { create } from "express-handlebars";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
const port = 3000;

// ─── Middleware ───────────────────────────────────────────────────────────────

// Serve static files (CSS, JS, images) from the public folder
app.use(express.static("public"));

// Parse URL-encoded form data (what HTML forms send)
app.use(bodyParser.urlencoded({ extended: false }));

// Allow reading and setting cookies (used for login sessions)
app.use(cookieParser());

// Handle file uploads — useTempFiles saves uploads to a temp folder
// so Cloudinary can read them before we delete them
app.use(fileUpload({ useTempFiles: true }));

// ─── Handlebars Setup ─────────────────────────────────────────────────────────

const handlebars = create({
  extname: ".hbs",
  helpers: {

    // Converts any string to UPPERCASE — e.g. {{uppercase category.name}}
    uppercase: (inputString) => {
      return inputString.toUpperCase();
    },

    // Formats a JS date object into a readable string — e.g. "Monday, 01 January 2025"
    formatDate: (date) => {
      let dateCreated = new Date(date);
      let options = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "2-digit",
      };
      return `${dateCreated.toLocaleDateString("en-IE", options)}`;
    },

    // Formats aperture values for display — e.g. "f/2.8" stays as "f/2.8"
    // Could be extended to add styling or convert decimal values
    formatAperture: (aperture) => {
      return aperture || "N/A";
    },

  },
});

app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// ─── Routes ───────────────────────────────────────────────────────────────────

app.use("/", routes);

// ─── Start Server ─────────────────────────────────────────────────────────────

app.listen(port, () => logger.info(`Your app is listening on port ${port}`));