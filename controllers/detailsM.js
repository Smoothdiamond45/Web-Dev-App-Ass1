'use strict';
/**
 * @file detailsM.js
 * @description Controller for the Macro collection details page.
 * Loads the Macro category from the photo store JSON and passes it to the view.
 * @module controllers/detailsM
 */

import { createRequire } from 'module';
import logger from '../utils/logger.js';

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsM = {
  /**
   * Renders the Macro details page.
   * Finds the 'macro' category in the photo store and passes its photos to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info('Macro details page loading!');

    // Find the macro category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'macro');

    const viewData = {
      title: 'Macro',
      category: category,
    };

    response.render('detailsM', viewData);
  },
};

export default detailsM;