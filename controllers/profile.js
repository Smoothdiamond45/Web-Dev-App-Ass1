'use strict';
import logger from "../utils/logger.js";
import appStore from "../models/app-store.js";
import account from "./account.js";

const profile = {
  createView(request, response) {
    logger.info("Profile page loading!");
    
    const viewData = {
      title: "CA1 Starter App",
      info: appStore.getAppInfo()
    };
    
    response.render('profile', viewData);   
  },
};

export default profile;
