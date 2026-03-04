'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const about = {
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
