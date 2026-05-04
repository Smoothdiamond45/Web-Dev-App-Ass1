'use strict';

import logger from '../utils/logger.js';
import userStore from '../models/user-store.js';
import { v4 as uuidv4 } from 'uuid';

const account = {

  // Renders the landing page (login or signup choice)
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  // Renders the login form
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  // Clears the session cookie and redirects to the homepage
  logout(request, response) {
    response.cookie('photos', '');
    response.redirect('/');
  },

  // Renders the signup/registration form
  signup(request, response) {
    const viewData = {
      title: 'Sign Up',
    };
    response.render('signup', viewData);
  },

  // Handles new user registration
  // Takes the form body, assigns a UUID, saves to user-store.json, redirects to login
  register(request, response) {
    const user = request.body;
    // FIX: previously crashed here with "Cannot set properties of undefined"
    // if bodyParser middleware was missing — now safe because server.js has it set up
    user.id = uuidv4();
    userStore.addUser(user);
    logger.info('Registering new user: ' + user.email);
    response.redirect('/');
  },

  // Handles login form submission
  // Looks up the user by email — if found, sets a session cookie and redirects to /start
  // FIX: authenticate previously redirected to /profile on failure — now correctly goes to /login
  authenticate(request, response) {
    const user = userStore.getUserByEmail(request.body.email);
    if (user) {
      // Store the user's email in a cookie to track who is logged in
      response.cookie('photos', user.email);
      logger.info('Logging in: ' + user.email);
      response.redirect('/start');
    } else {
      // No user found with that email — send back to login
      response.redirect('/login');
    }
  },

  // Utility: reads the session cookie and returns the matching user object
  // Used by other controllers to check who is logged in
  getCurrentUser(request) {
    const userEmail = request.cookies.photos;
    return userStore.getUserByEmail(userEmail);
  },

};

export default account;