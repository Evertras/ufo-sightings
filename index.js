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
    .filter(s => !!s.dateOccurred);

  // What year had the most sightings?
  const yearCounts = sightings.reduce((a, s) => {
    const year = s.dateOccurred.year();
    a[year] = a[year] || 0;
    a[year]++;
    return a;
  }, {});

  const max = Object.keys(yearCounts).reduce((a, key) => {
    if (!a || a.count < yearCounts[key]) {
      a = {
        year: key,
        count: yearCounts[key],
      };
    }

    return a;
  }, null);

  console.log('Most sightings in year ' + max.year + ' - ' + max.count);
});

fs.createReadStream('scrubbed.csv').pipe(parser);
