'use strict';
/**
 * @file start.js
 * @description Controller for the Start page.
 * Handles rendering the initial landing view with app information.
 * @module controllers/start
 */

import logger from "../utils/logger.js";

const dashboard = {
    /**
   * Renders the Start page view.
   * Retrieves app info from the store and passes it to the template.
   * @param {object} request - Express HTTP request object
   * @param {object} response - Express HTTP response object
   */
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
    };
    
    response.render('dashboard', viewData);   
  },
};

export default dashboard;
