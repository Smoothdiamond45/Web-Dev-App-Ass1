
'use strict';
import { createRequire } from 'module';
import logger from '../utils/logger.js';
import account from "./account.js";

// createRequire lets us import JSON files in ES module projects
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const personal = {
  createView(request, response) {
    logger.info('Personal details page loading!');

    // Find the street category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'personal');

    const viewData = {
      title: 'Personal',
      category: category,
    };

    response.render('personal', viewData);
  },
};

export default personal;