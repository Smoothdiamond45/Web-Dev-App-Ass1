'use strict';

import account from './account.js';
import { v4 as uuidv4 } from 'uuid';
import logger from "../utils/logger.js";
import photoStore from '../models/photo-store.js';

const dashboard = {

  // Renders the dashboard page showing all photo categories
  // Redirects to login if no user is logged in
  createView(request, response) {
    logger.info("Dashboard page loading!");

    // FIX: was referencing 'accounts' (wrong name) and 'playlistStore' (wrong app)
    const loggedInUser = account.getCurrentUser(request);

    if (loggedInUser) {
      const viewData = {
        title: "Photo Dashboard",
        fullname: loggedInUser.firstName + ' ' + loggedInUser.lastName,
      };

      logger.info('Rendering dashboard for: ' + loggedInUser.email);
      response.render('dashboard', viewData);
    } else {
      // Not logged in — send to homepage
      response.redirect('/');
    }
  },

  // Handles adding a new photo to a category
  // Takes the category id from the URL, photo details from the form body,
  // and optionally an image file which gets uploaded to Cloudinary
  addPhoto(request, response) {
    const categoryId = request.params.id;
    const loggedInUser = account.getCurrentUser(request);

    // Build the new photo object from the submitted form fields
    const newPhoto = {
      id: uuidv4(),
      userid: loggedInUser.id,
      title: request.body.title,
      location: request.body.location,
      aperture: request.body.aperture,
      shutter: request.body.shutter,
      iso: request.body.iso,
      lens: request.body.lens,
      camera: request.body.camera,
      date: new Date(),
    };

    // If a file was uploaded, send it to Cloudinary
    // Otherwise save the photo without an image
    if (request.files && request.files.picture) {
      photoStore.addPhotoWithImage(categoryId, newPhoto, request.files.picture, function(err) {
        if (err) {
          logger.error("Failed to upload photo image: " + err);
          response.redirect("/error");
        } else {
          response.redirect('/category/' + categoryId);
        }
      });
    } else {
      photoStore.addPhoto(categoryId, newPhoto);
      response.redirect('/category/' + categoryId);
    }
  },

  // Handles deleting a photo from a category
  // Takes both the category id and photo id from the URL
  deletePhoto(request, response) {
    const categoryId = request.params.id;
    const photoId = request.params.photoid;
    logger.debug(`Deleting photo ${photoId} from category ${categoryId}`);

    // FIX: original used wrong variable names (albumid, playlistStore) and no callback
    photoStore.removePhoto(categoryId, photoId);
    response.redirect('/category/' + categoryId);
  },

  // Handles editing/updating an existing photo's details
  // Takes category id and photo id from the URL, new values from the form body
  updatePhoto(request, response) {
    const categoryId = request.params.id;
    const photoId = request.params.photoid;
    logger.debug(`Updating photo ${photoId} in category ${categoryId}`);

    const updatedPhoto = {
      id: photoId,
      title: request.body.title,
      location: request.body.location,
      aperture: request.body.aperture,
      shutter: request.body.shutter,
      iso: request.body.iso,
      lens: request.body.lens,
      camera: request.body.camera,
    };

    photoStore.editPhoto(categoryId, photoId, updatedPhoto);
    response.redirect('/category/' + categoryId);
  },

};

export default dashboard;