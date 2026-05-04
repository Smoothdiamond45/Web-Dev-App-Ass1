// dashboard.js
import photoStore from '../models/photo-store.json';

const dashboard = {
  createView(request, response) {
    const viewData = {
      title: 'Dashboard',
      categories: photoStore.findAll('categories')
    };
    response.render('dashboard', viewData);
  }
};