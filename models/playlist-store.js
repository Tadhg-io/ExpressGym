'use strict';

const logger = require('../utils/logger');

const sonatas = {
  title: 'Beethoven Sonatas',
  songs: [
    {
      title: 'Piano Sonata No. 3',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 7',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Sonata No. 10',
      artist: 'Beethoven',
    },
  ],
};

const concertos = {
  title: 'Beethoven Concertos',
  songs: [
    {
      title: 'Piano Concerto No. 0',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Concerto  No. 4',
      artist: 'Beethoven',
    },
    {
      title: 'Piano Concerto  No. 6',
      artist: 'Beethoven',
    },
  ],
};

const playlistCollection = [sonatas, concertos];

module.exports = playlistCollection;