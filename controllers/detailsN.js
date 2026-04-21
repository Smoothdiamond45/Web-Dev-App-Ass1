'use strict';
/**
 * @file detailsN.js
 * @description Controller for the Night collection details page.
 * Loads the Night category from the photo store JSON and passes it to the view.
 * @module controllers/detailsN
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsN = {
  /**
   * Renders the Night details page.
   * Finds the 'night' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Night details page loading!');

    // Find the night category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'night');

    const viewData = {
      title: 'Night',
      category: category,
    };

    response.render('detailsN', viewData);
  },
};

export default detailsN;