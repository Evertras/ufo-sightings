'use strict';

const csv = require('csv');
const fs = require('fs');
const moment = require('moment');

let sightings = [];

const parser = csv.parse({}, function(err, data){
  sightings = data
    .map(vals => new Sighting(vals))
    .filter(s => !isNaN(s.latitude));

  console.log(sightings[0]);
});

fs.createReadStream('scrubbed.csv').pipe(parser);

function Sighting(vals) {
  this.datetime = moment(vals[0]);
  this.city = vals[1];
  this.state = vals[2];
  this.country = vals[3];
  this.shape = vals[4];
  this.durationSeconds = vals[5];
  this.comments = vals[7];
  this.datePosted = moment(vals[8]);
  this.latitude = parseFloat(vals[9]);
  this.longitude = parseFloat(vals[10]);
}
