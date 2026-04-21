'use strict';
/**
 * @file detailsL.js
 * @description Controller for the Landscape collection details page.
 * Loads the Landscape category from the photo store JSON and passes it to the view.
 * @module controllers/detailsL
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsL = {
  /**
   * Renders the Landscape details page.
   * Finds the 'landscape' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Landscape details page loading!');

    // Find the landscape category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'landscape');

    const viewData = {
      title: 'Landscape',
      category: category,
    };

    response.render('detailsL', viewData);
  },
};

export default detailsL;