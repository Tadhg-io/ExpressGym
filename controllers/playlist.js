'use strict';

const logger = require('../utils/logger');
const playlistStore = require('../models/assessment-store');
const uuid = require('uuid');

const playlist = {

  index(request, response) {
    const playlistId = request.params.id;
    logger.debug('Playlist id = ', playlistId);
    const viewData = {
      title: 'Playlist',
      playlist: playlistStore.getAssessment(playlistId),
    };
    response.render('playlist', viewData);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getAssessment(playlistId);
    const newSong = {
      id: uuid.v1(),
      title: request.body.title,
      artist: request.body.artist,
      duration: request.body.duration,
    };
    playlistStore.addSong(playlistId, newSong);
    response.redirect('/playlist/' + playlistId);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect('/playlist/' + playlistId);
  },
};

module.exports = playlist;