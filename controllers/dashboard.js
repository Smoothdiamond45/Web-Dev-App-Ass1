'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const dashboard = {
  createView(request, response) {
    logger.info("Dashboard page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo()
    };
    
    response.render('dashboard', viewData);   
  },
};

export default dashboard;
