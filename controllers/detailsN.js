'use strict';

import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";

const detailsN = {
  createView(request, response) {
    logger.info("Details page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo()
    };
    
    response.render('detailsN', viewData);   
  },
};

export default detailsN;
