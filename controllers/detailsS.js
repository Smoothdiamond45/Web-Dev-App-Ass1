'use strict';
/**
 * @file detailsS.js
 * @description Controller for the Street collection details page.
 * Loads the Street category from the photo store JSON and passes it to the view.
 * @module controllers/detailsS
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsS = {
  /**
   * Renders the Street details page.
   * Finds the 'street' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Street details page loading!');

    // Find the street category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'street');

    const viewData = {
      title: 'Street',
      category: category,
    };

    response.render('detailsS', viewData);
  },
};

export default detailsS;