'use strict';

import logger from '../utils/logger.js';
import JsonStore from './json-store.js';

const photoStore = {
  store: new JsonStore('./models/photo-store.json', { PhotoCollection: [] }),
  collection: 'PhotoCollection',
  array: 'photos',

  // Returns every album/category in the collection
  getAllPhotos() {
    return this.store.findAll(this.collection);
  },

  // Finds a single album/category by its id
  getAlbum(id) {
    // FIX: was named getPhoto but it fetches an album — renamed for clarity
    return this.store.findOneBy(this.collection, (album => album.id === id));
  },

  // Adds a single photo object to a category's photos array
  addPhoto(categoryId, photo) {
    // FIX: original used undefined variable 'song' instead of 'photo'
    this.store.addItem(this.collection, categoryId, this.array, photo);
  },

  // Adds a photo with a Cloudinary image upload
  // Uploads the image file first, attaches the URL to the photo, then saves
  async addPhotoWithImage(categoryId, photo, file, callback) {
    try {
      photo.img = await this.store.addToCloudinary(file);
      this.store.addItem(this.collection, categoryId, this.array, photo);
      callback();
    } catch (error) {
      logger.error("Error uploading photo to Cloudinary:", error);
      callback(error);
    }
  },

  // Adds a whole new album/category to the collection
  async addAlbum(album, file, callback) {
    try {
      // Upload the cover image to Cloudinary and attach the result
      album.picture = await this.store.addToCloudinary(file);
      this.store.addCollection(this.collection, album);
      callback();
    } catch (error) {
      logger.error("Error processing album:", error);
      callback(error);
    }
  },

  // Removes a single photo from a category by its id
  removePhoto(categoryId, photoId) {
    this.store.removeItem(this.collection, categoryId, this.array, photoId);
  },

  // Updates an existing photo's data in a category
  editPhoto(categoryId, photoId, updatedPhoto) {
    this.store.editItem(this.collection, categoryId, photoId, this.array, updatedPhoto);
  },

  // Removes an entire album/category, deleting its Cloudinary image first if it has one
  async removeAlbum(id, callback) {
    // FIX: original called this.getAlbum(id) but the method was named getPhoto — now fixed
    const album = this.getAlbum(id);

    // If the album has a Cloudinary image, delete it from the cloud first
    if (album && album.picture && album.picture.public_id) {
      try {
        await this.store.deleteFromCloudinary(album.picture.public_id);
        logger.info("Cloudinary image deleted for album: " + id);
      } catch (err) {
        logger.error("Failed to delete Cloudinary image:", err);
      }
    }

    // FIX: original passed wrong args — this.album and photo don't exist here
    this.store.removeCollection(this.collection, album);
    callback();
  },
  // Returns all personal photos belonging to a specific user
getUserPhotos(userid) {
  return this.store.findBy(this.collection, (photo => photo.userid === userid));
},

// Adds a personal photo without an image
addPersonalPhoto(photo) {
  this.store.addCollection(this.collection, photo);
},

// Adds a personal photo with a Cloudinary image upload
async addPersonalPhotoWithImage(photo, file, callback) {
  try {
    const result = await this.store.addToCloudinary(file);
    photo.img = result.url;            // store the Cloudinary URL as the image path
    photo.imgPublicId = result.public_id; // store the id so we can delete it later
    this.store.addCollection(this.collection, photo);
    callback();
  } catch (error) {
    logger.error("Error uploading personal photo:", error);
    callback(error);
  }
},

// Removes a personal photo from the PhotoCollection by its id
removePersonalPhoto(photoId) {
  const photo = this.store.findOneBy(this.collection, (p => p.id === photoId));
  this.store.removeCollection(this.collection, photo);
},

// Updates a personal photo's details by its id
updatePersonalPhoto(photoId, updatedPhoto) {
  this.store.editCollection(this.collection, photoId, updatedPhoto);
},

};

export default photoStore;