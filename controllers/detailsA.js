'use strict';
/**
 * @file detailsA.js
 * @description Controller for the Animals collection details page.
 * Loads the Animals category from the photo store JSON and passes it to the view.
 * @module controllers/detailsA
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsA = {
  /**
   * Renders the Animals details page.
   * Finds the 'animals' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Animals details page loading!');

    // Find the animals category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'animals');

    const viewData = {
      title: 'Animals',
      category: category,
    };

    response.render('detailsA', viewData);
  },
};

export default detailsA;