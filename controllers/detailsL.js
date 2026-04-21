import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const photoStore = require('../models/photo-store.json');

const detailsL = {
  createView(request, response) {
    logger.info("Landscape details page loading!");
    
    // Find the landscape category from the JSON store
    const category = photoStore.categories.find(c => c.id === 'landscape');
    
    const viewData = {
      title: "Landscape",
      category: category
    };
    
    response.render('detailsL', viewData);
  },
};