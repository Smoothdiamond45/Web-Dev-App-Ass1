'use strict';
/**
 * @file start.js
 * @description Controller for the Start page.
 * Handles rendering the initial landing view with app information.
 * @module controllers/start
 */

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
    /**
   * Renders the Start page view.
   * Retrieves app info from the store and passes it to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info("About page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo()
    };
    
    response.render('about', viewData);   
  },
};

export default about;
