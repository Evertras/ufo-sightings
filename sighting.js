const moment = require('moment');

module.exports = function Sighting(vals) {
  this.dateOccurred = moment(vals[0], "MM/DD/YYYY HH:mm");
  this.city = vals[1];
  this.state = vals[2];
  this.country = vals[3];
  this.shape = vals[4];
  this.durationSeconds = vals[5];
  this.comments = vals[7];
  this.datePosted = moment(vals[8], "MM/DD/YYYY");
  this.latitude = parseFloat(vals[9]);
  this.longitude = parseFloat(vals[10]);
}
