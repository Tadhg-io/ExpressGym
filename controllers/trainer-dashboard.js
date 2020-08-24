"use strict";

const logger = require("../utils/logger");
const analytics = require("../utils/analytics");
const assessmentStore = require('../models/assessment-store');
const userStore = require('../models/user-store');
const accounts = require ('./accounts.js');
const uuid = require('uuid');
const _ = require('lodash');

const dashboard = {

  index(request, response) {

    logger.info('dashboard rendering');

    // get the user
    const loggedInUser = accounts.getCurrentUser(request);

    // if there user isn't logged in
    if(loggedInUser == null){
      // send the user to the login page
      response.redirect('/login');
      return;
    }
    // if this is a trainer
    else if(loggedInUser.type === "member"){
      // send the user to the trainer dashboard
      response.redirect('/dashboard');
      return;
    }

    // compile the data to send to the view
    let viewData = {
      title: 'Trainer Dashboard - ExpressGym',
      members: userStore.getMemberUsers(),
      user: loggedInUser,
    };
    // render the view
    response.render('trainer-dashboard', viewData);
  },

  deleteMember(request, response){
    // extract the id from the request
    const userId = request.params.id;
    logger.debug(`Deleting user ${userId}`);
    // remove the assessment from the db
    userStore.removeUser(userId);
    // reload the dashboard
    response.redirect('/trainer-dashboard');
  }

};

module.exports = dashboard;