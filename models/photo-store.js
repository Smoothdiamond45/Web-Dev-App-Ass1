'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const photoStore = {

  store: new JsonStore('./models/photo-store.json', { categories: [] }),
  collection: 'categories',

  findAll(collection) {
    return this.store.findAll(collection);
  },

};

export default photoStore;