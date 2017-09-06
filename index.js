'use strict';

const csv = require('csv');
const fs = require('fs');
const moment = require('moment');
const Sighting = require('./sighting');

let sightings = [];

const parser = csv.parse({}, function(err, data){
  sightings = data
    .slice(1)
    .map(vals => new Sighting(vals))
    .filter(s => !isNaN(s.latitude));

  console.log(sightings[0].dateOccurred.year());
});

fs.createReadStream('scrubbed.csv').pipe(parser);
