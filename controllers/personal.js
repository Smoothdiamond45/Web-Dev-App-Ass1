'use strict';
import logger from '../utils/logger.js';
import account from './account.js';
import photoStore from '../models/photo-store.js';
import { v4 as uuidv4 } from 'uuid';

const personal = {

  // Renders the personal collection page
  // Shows only photos uploaded by the currently logged-in user
  createView(request, response) {
    logger.info('Personal details page loading!');

    const loggedInUser = account.getCurrentUser(request);

    // If not logged in, send to homepage
    if (!loggedInUser) {
      return response.redirect('/');
    }

    // Get only this user's photos from the PhotoCollection
    const myPhotos = photoStore.getUserPhotos(loggedInUser.id);

    const viewData = {
      title: 'Personal Collection',
      photos: myPhotos,
    };

    response.render('personal', viewData);
  },

  // Handles adding a new photo to the personal collection
  addPhoto(request, response) {
    const loggedInUser = account.getCurrentUser(request);

    if (!loggedInUser) {
      return response.redirect('/');
    }

    // Build the new photo object from the submitted form
    const newPhoto = {
      id: uuidv4(),
      userid: loggedInUser.id,         // ties this photo to the logged-in user
      title: request.body.title,
      location: request.body.location,
      aperture: request.body.aperture,
      shutter: request.body.shutter,
      iso: request.body.iso,
      lens: request.body.lens,
      camera: request.body.camera,
      date: new Date(),
    };

    // If an image file was uploaded, send it to Cloudinary
    if (request.files && request.files.picture) {
      photoStore.addPersonalPhotoWithImage(newPhoto, request.files.picture, function(err) {
        if (err) {
          logger.error("Failed to upload personal photo: " + err);
          response.redirect('/error');
        } else {
          response.redirect('/personal');
        }
      });
    } else {
      // No image uploaded — save without one
      photoStore.addPersonalPhoto(newPhoto);
      response.redirect('/personal');
    }
  },

  // Handles deleting a personal photo by its id
  deletePhoto(request, response) {
    const photoId = request.params.photoid;
    logger.debug('Deleting personal photo: ' + photoId);
    photoStore.removePersonalPhoto(photoId);
    response.redirect('/personal');
  },

  // Handles editing a personal photo's details
  updatePhoto(request, response) {
    const photoId = request.params.photoid;
    logger.debug('Updating personal photo: ' + photoId);

    const updatedPhoto = {
      id: photoId,
      userid: account.getCurrentUser(request).id,
      title: request.body.title,
      location: request.body.location,
      aperture: request.body.aperture,
      shutter: request.body.shutter,
      iso: request.body.iso,
      lens: request.body.lens,
      camera: request.body.camera,
    };

    photoStore.updatePersonalPhoto(photoId, updatedPhoto);
    response.redirect('/personal');
  },

};

export default personal;