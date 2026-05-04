'use strict';

import logger from "../utils/logger.js";
import account from "./account.js";
import { createRequire } from 'module';

// createRequire lets us import JSON files directly in ES module projects
const require = createRequire(import.meta.url);
const photoData = require('../models/photo-store.json');

const stats = {

  // Renders the statistics page
  // Computes photo counts, most used cameras, and aperture/ISO breakdowns
  // from the photo-store.json data
  createView(request, response) {
    logger.info("Stats page loading!");

    // Pull all categories that have photos (skip the empty PhotoCollection entry)
    const categories = photoData.categories.filter(c => c.photos && c.photos.length > 0);

    // Flatten all photos from every category into one array for easy analysis
    const allPhotos = categories.flatMap(c => c.photos);

    // ── Basic Counts ──────────────────────────────────────────────────────────

    const totalPhotos = allPhotos.length;
    const totalCategories = categories.length;

    // Count photos per category — e.g. { Landscape: 6, Animals: 6, ... }
    const photosPerCategory = {};
    categories.forEach(c => {
      photosPerCategory[c.name] = c.photos.length;
    });

    // ── Camera Stats ──────────────────────────────────────────────────────────

    // Count how many times each camera model appears across all photos
    const cameraCounts = {};
    allPhotos.forEach(photo => {
      const cam = photo.camera || 'Unknown';
      cameraCounts[cam] = (cameraCounts[cam] || 0) + 1;
    });

    // Find the most used camera
    const mostUsedCamera = Object.entries(cameraCounts)
      .sort((a, b) => b[1] - a[1])[0];

    // ── Location Stats ────────────────────────────────────────────────────────

    // Count unique locations
    const uniqueLocations = new Set(allPhotos.map(p => p.location)).size;

    // ── Build view data ───────────────────────────────────────────────────────

    const viewData = {
      title: "Photography Statistics",
      stats: {
        totalPhotos,
        totalCategories,
        photosPerCategory,
        uniqueLocations,
        mostUsedCamera: mostUsedCamera ? mostUsedCamera[0] : 'N/A',
        mostUsedCameraCount: mostUsedCamera ? mostUsedCamera[1] : 0,
        cameraCounts,
      }
    };

    response.render('stats', viewData);
  },

};

export default stats;