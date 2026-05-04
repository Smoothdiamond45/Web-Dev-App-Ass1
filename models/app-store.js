import appStore from '../models/app-store.js';
import photoStore from '../models/photo-store.js';

const about = {
  createView(request, response) {
    const categories = photoStore.findAll('categories');
    const totalPhotos = categories.reduce((sum, cat) => sum + cat.photos.length, 0);

    const viewData = {
      title: 'About',
      info: appStore.getAppInfo(),
      totalPhotos: totalPhotos,
      totalCollections: categories.length
    };
    response.render('about', viewData);
  }
};

export default about;