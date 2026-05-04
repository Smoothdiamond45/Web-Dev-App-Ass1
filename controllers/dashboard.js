import photoStore from '../models/photo-store.js';

const dashboard = {
  createView(request, response) {
    const categories = photoStore.findAll('categories');
    const viewData = {
      title: 'Dashboard',
      categories: categories
    };
    response.render('dashboard', viewData);
  }
};
export default dashboard;