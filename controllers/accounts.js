'use strict';

const userstore = require('../models/user-store');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },

  logout(request, response) {
    response.cookie('expressGymUser', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const user = request.body;
    user.id = uuid.v1();
    user.type = "member";
    userstore.addUser(user);
    logger.info(`registering ${user.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const user = userstore.getUserByEmail(request.body.email);
    if (user.password == request.body.password) {
      response.cookie('expressGymUser', user.id);
      logger.info(`logging in ${user.email}`);
      if (user.type === "trainer") {
        response.redirect('/trainer-dashboard');
      }
      else{
        response.redirect('/dashboard');
      }
    }
    else {
      response.redirect('/login');
    }
  },

  getCurrentUser(request) {
    const userID = request.cookies.expressGymUser;
    return userstore.getUserById(userID);
  },
};

module.exports = accounts;