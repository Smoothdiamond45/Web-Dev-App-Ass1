
'use strict';
import { createRequire } from 'module';
import logger from '../utils/logger.js';
import account from "./account.js";

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