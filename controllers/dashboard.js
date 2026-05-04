// dashboard.js
import { createRequire } from 'module';
import account from "./account.js";

const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const dashboard = {
  createView(request, response) {
    const viewData = {
      title: 'Dashboard',
      categories: photoStore.categories
    };
    response.render('dashboard', viewData);
  }
};
export default dashboard;