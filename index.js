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

  displayBiggestYear(sightings);
  displayMostPopularSeason(sightings);
});

function findTopFromObject(obj) {
  return Object.keys(obj).reduce((a, key) => {
    if (!a || a.count < obj[key]) {
      a = {
        key: key,
        count: obj[key],
      };
    }

    return a;
  }, null);
}

function displayBiggestYear(sightings) {
  // What year had the most sightings?
  const yearCounts = sightings.reduce((a, s) => {
    const year = s.dateOccurred.year();
    a[year] = a[year] || 0;
    a[year]++;
    return a;
  }, {});

  const max = findTopFromObject(yearCounts);
  console.log('Most sightings in year ' + max.key + ' - ' + max.count);
}

function displayMostPopularSeason(sightings) {
  function findSeason(s) {
    const month = s.dateOccurred.month();

    if (month < 3 || month > 11) {
      return 'winter';
    } else if (month >= 3 && month <= 5) {
      return 'spring';
    } else if (month >= 6 && month <= 8) {
      return 'summer';
    }

    return 'fall';
  }

  const seasonCounts = sightings.reduce((a, s) => {
    const season = findSeason(s);

    a[season]++;

    return a;
  }, {spring: 0, summer: 0, fall: 0, winter: 0});

  console.log(seasonCounts);
}

fs.createReadStream('scrubbed.csv').pipe(parser);
