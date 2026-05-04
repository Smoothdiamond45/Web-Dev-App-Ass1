import appStore from '../models/app-store.js';
import photoStore from '../models/photo-store.js';

const start = {
  createView(request, response) {
    const categories = photoStore.findAll('categories');
    const totalPhotos = categories.reduce((sum, cat) => sum + cat.photos.length, 0);
    const viewData = {
      title: 'Start',
      info: appStore.getAppInfo(),
      totalPhotos: totalPhotos,
      totalCollections: categories.length
    };
    response.render('start', viewData);
  }
};
export default start;