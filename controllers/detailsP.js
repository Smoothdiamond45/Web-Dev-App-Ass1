'use strict';
/**
 * @file detailsP.js
 * @description Controller for the Portrait collection details page.
 * Loads the Portrait category from the photo store JSON and passes it to the view.
 * @module controllers/detailsP
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsP = {
  /**
   * Renders the Portrait details page.
   * Finds the 'portrait' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Portrait details page loading!');

    // Find the portrait category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'portrait');

    const viewData = {
      title: 'Portrait',
      category: category,
    };

    response.render('detailsP', viewData);
  },
};

export default detailsP;