'use strict';

const csv = require('csv');
const fs = require('fs');
const moment = require('moment');
const Sighting = require('./sighting');
const statePops = require('./statePops');
const stats = require('stats-lite');

const parser = csv.parse({}, function(err, data){
  const sightings = data
    .slice(1)
    .map(vals => new Sighting(vals))
    .filter(s => !!s.dateOccurred);

  displayBiggestYear(sightings);
  displayMostPopularSeason(sightings);
  displayMostCommonShape(sightings);
  displayCraziestStatePerCapita(sightings);
  displayDurationInfo(sightings);
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

  console.log('Seasons');
  console.log(seasonCounts);
}

function displayMostCommonShape(sightings) {
  const shapeCounts = sightings.reduce((a, s) => {
    a[s.shape] = a[s.shape] || 0;
    a[s.shape]++;
    return a;
  }, {});

  const maxShape = findTopFromObject(shapeCounts);

  console.log('Most common shape');
  console.log(maxShape.key + ' - ' + maxShape.count);
}

function displayCraziestStatePerCapita(sightings) {
  const stateCounts = sightings
    .filter(s => s.state)
    .reduce((a, s) => {
      if (statePops[s.state]) {
        a[s.state] = a[s.state] || 0;
        a[s.state] += 1.0 / statePops[s.state];
      }
      return a;
    }, {});

  const craziestState = findTopFromObject(stateCounts);
  console.log('Craziest state: ' + craziestState.key);
}

function displayDurationInfo(sightings) {
  const durations = sightings.map(s => s.durationSeconds);

  const median = stats.median(durations);
  const dev = stats.stdev(durations);

  console.log('Median duration in seconds: ' + median);
  console.log('Standard deviation: ' + dev);
}

fs.createReadStream('scrubbed.csv').pipe(parser);
