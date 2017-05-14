const db = require('./../db/database');

const getCurrentExpressData = () => {
  return new Promise((resolve, reject) => {
    Promise.all([
      db.trip.findAll({
        include: [{
          model: db.trip_assignment,
          attributes: ['vehicleID', 'driverID']
        }],
        attributes: {
          include: [
            [db.connection.fn('date_format', db.connection.col('tripDate'), '%M %d, %Y'), 'tripDate']
          ],
          exclude: ['manageTime']
        },
        where: {
          tripDate: new Date('2017-05-10').setUTCHours(0,0,0,0)
        }
      }),
      db.passenger.findAll({
        attributes: {
          exclude: ['rating']
        }
      }),
      db.driver.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }]
      }),
      db.vehicle.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }]
      }),
      db.trip_sched.findAll(),
      db.route.findAll(),
      db.line.findAll(),
      db.route_stop.findAll(),
      db.stop.findAll(),
      db.user.findAll(),
      db.reservation.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }],
        attributes: {
          include: [
            [db.connection.fn('date_format', db.connection.col('timestamp'), '%M %d, %Y'), 'timestamp']
          ]
        }
      })
    ])
    .then(data => {
      var arrowsJSON = {} ;
      arrowsJSON.trips = data[0];
      arrowsJSON.passenger = data[1];
      arrowsJSON.drivers = data[2];
      arrowsJSON.vehicles = data[3];
      arrowsJSON.tripScheds = data[4];
      arrowsJSON.routes = data[5];
      arrowsJSON.lines = data[6];
      arrowsJSON.routeStops = data[7];
      arrowsJSON.stops = data[8];
      arrowsJSON.users = data[9];
      arrowsJSON.reservations = data[10];
      resolve(arrowsJSON);
    }).catch(err => {
      console.log(err);
      reject('Error fetching data');
    });
  });
};

// Test purposes
var findAllUsers = () => {
  return db.user.findAll();
};

var findAllDrivers = () => {
  return db.driver.findAll({
    include: [{
      model: db.status
    }]
  });
};

module.exports = {
  getCurrentExpressData,
  findAllUsers,
  findAllDrivers
};