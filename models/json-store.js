'use strict';

import logger from '../utils/logger.js';
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config({ quiet: true });

// FIX: original used wrong key names (CLOUDINARY_CLOUD_NAME etc.)
// Cloudinary requires lowercase snake_case keys: cloud_name, api_key, api_secret
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

class JsonStore {

  // Sets up the lowdb database with a given file path and default data structure
  constructor(file, defaults) {
    this.db = new Low(new JSONFile(file), defaults);
    this.db.read();
  }

  // Returns the entire contents of a collection (e.g. all users, all photos)
  findAll(collection) {
    return this.db.data[collection];
  }

  // Returns all items in a collection that match a filter function
  findBy(collection, filter) {
    return this.db.data[collection].filter(filter);
  }

  // Returns the first item in a collection that matches a filter function
  findOneBy(collection, filter) {
    const results = this.db.data[collection].filter(filter);
    return results[0];
  }

  // Adds a new top-level item (e.g. a new user or album) to a collection and saves
  async addCollection(collection, obj) {
    this.db.data[collection].push(obj);
    await this.db.write();
  }

  // Adds a nested item (e.g. a photo inside an album) to a sub-array and saves
  async addItem(collection, id, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    data[0][arr].push(obj);
    await this.db.write();
  }

  // Removes a top-level item from a collection by reference and saves
  async removeCollection(collection, obj) {
    const index = this.db.data[collection].indexOf(obj);
    if (index > -1) {
      this.db.data[collection].splice(index, 1);
    }
    await this.db.write();
  }

  // Removes a nested item (e.g. a photo) from a sub-array by id and saves
  async removeItem(collection, id, arr, itemId) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    const item = data[0][arr].filter((i) => i.id === itemId);
    const index = data[0][arr].indexOf(item[0]);
    if (index > -1) {
      data[0][arr].splice(index, 1);
    }
    await this.db.write();
  }

  // Replaces a top-level item in a collection by id and saves
  async editCollection(collection, id, obj) {
    let index = this.db.data[collection].findIndex((c) => c.id === id);
    if (index > -1) {
      this.db.data[collection].splice(index, 1, obj);
    }
    await this.db.write();
  }

  // Replaces a nested item in a sub-array by id and saves
  async editItem(collection, id, itemId, arr, obj) {
    const data = this.db.data[collection].filter((c) => c.id === id);
    let index = data[0][arr].findIndex((i) => i.id === itemId);
    data[0][arr].splice(index, 1, obj);
    await this.db.write();
  }

  // Uploads a file to Cloudinary and returns its URL and public_id
  // The temp file is deleted after upload to keep the server clean
  async addToCloudinary(file) {
    const result = await cloudinary.uploader.upload(file.tempFilePath);
    logger.info("Cloudinary upload successful:", result.public_id);

    // Clean up the temp file — if this fails it's not critical, just log a warning
    try {
      await fs.unlink(file.tempFilePath);
      logger.info("Temporary file deleted");
    } catch (err) {
      logger.warn("Temp file deletion failed:", err);
    }

    // Return just what we need to store in the JSON
    return {
      url: result.url,
      public_id: result.public_id,
    };
  }

  // Deletes an image from Cloudinary using its public_id
  // Used when deleting an album that has a cover photo
  async deleteFromCloudinary(publicId) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.destroy(publicId, (result, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }

}

export default JsonStore;