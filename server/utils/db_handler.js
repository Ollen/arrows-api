const db = require('./../db/database');
const _ = require('lodash');
const diff = require('deep-diff');

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
        }, 
        logging: false
      }),
      db.passenger.findAll({
        attributes: {
          exclude: ['rating']
        },
        logging: false
      }),
      db.driver.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }],
        logging: false
      }),
      db.vehicle.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }],
        logging: false
      }),
      db.trip_sched.findAll({logging: false}),
      db.route.findAll({logging: false}),
      db.line.findAll({logging: false}),
      db.route_stop.findAll({logging: false}),
      db.stop.findAll({logging: false}),
      db.user.findAll({logging: false}),
      db.reservation.findAll({
        include: [{
          model: db.status,
          attributes: ['statusName', 'statusType']
        }],
        attributes: {
          include: [
            [db.connection.fn('date_format', db.connection.col('timestamp'), '%M %d, %Y'), 'timestamp']
          ]
        },
        logging: false
      })
    ])
    .then(data => {
      var arrowsJSON = {} ;
      arrowsJSON.trips = data[0];
      arrowsJSON.passengers = data[1];
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

const updateExpressData = (updateJSON) => {
  // Pick update data
  let update = _.pick(updateJSON.arrowsJSON, ['trips', 'reservations', 'passengers']);
  let tripUpdate    = update.trips;
  let reserveUpdate = update.reservations;
  let passUpdate    = update.passengers;
  
  return new Promise((resolve, reject) => {
    // Fetch DB data via Promise
    Promise.all([
      db.trip.findAll({
        attributes: {
          include: [
                [db.connection.fn('date_format', db.connection.col('tripDate'), '%M %d, %Y'), 'tripDate']
          ],
          exclude: ['manageTime']
        },
        where: {
          tripDate: new Date('2017-05-10').setUTCHours(0,0,0,0)
        },
        raw: true
      }),
      db.reservation.findAll({
        attributes: {
          include: [
              [db.connection.fn('date_format', db.connection.col('timestamp'), '%M %d, %Y'), 'timestamp']
          ]
        },
        raw: true
      }),
      db.passenger.findAll({
        attributes: {
          exclude: ['rating']
        },
        raw: true
      })
    ]).then(data => {
      // Compare data
      let tripDiff = _.filter(diff(data[0], tripUpdate), {'kind': 'E'});
      let reserveDiff = _.filter(diff(data[1], reserveUpdate), {'kind': 'E'});
      let passDiff = _.filter(diff(data[2], passUpdate), {'kind': 'E'});

      // Update Reservation
      /** Uncomment for Debugging Purposes
       * 
       * console.log(tripDiff);
       * console.log(passDiff);
       * console.log(reserveDiff);
       * 
       */

      // Filter unique IDs 
      tripDiff = _.uniqBy(tripDiff, x => {return x.path[0];});
      reserveDiff = _.uniqBy(reserveDiff, x => {return x.path[0];});
      passDiff = _.uniqBy(passDiff, x => {return x.path[0];});


      let updateArr = new Array();

      // Update Passenger
      for (let i = 0; i < passDiff.length; i++) {
        updateArr.push(db.passenger.update({
          feedbackOn: passUpdate[passDiff[i].path[0]].feedbackOn,
          tapIn: passUpdate[passDiff[i].path[0]].tapIn,
          tapOut: passUpdate[passDiff[i].path[0]].tapOut,
          disembarkationPt: passUpdate[passDiff[i].path[0]].disembarkationPt,
          destination: passUpdate[passDiff[i].path[0]].destination,
          isChance: passUpdate[passDiff[i].path[0]].isChance,
          reservationNum: passUpdate[passDiff[i].path[0]].reservationNum
        }, {
          where: {
            passengerID: passUpdate[passDiff[i].path[0]].passengerID
          }
        }));
      }
      // Update Trip
      for (let i = 0; i < tripDiff.length; i++) {
        updateArr.push(db.trip.update({
          remarks: tripUpdate[tripDiff[i].path[0]].remarks,
          depTime: tripUpdate[tripDiff[i].path[0]].depTime,
          arrivalTime: tripUpdate[tripDiff[i].path[0]].arrivalTime,
          duration: tripUpdate[tripDiff[i].path[0]].duration,
          tripSchedID: tripUpdate[tripDiff[i].path[0]].tripSchedID,
          statusCode: tripUpdate[tripDiff[i].path[0]].statusCode
        }, {
          where: {
            tripID: tripUpdate[tripDiff[i].path[0]].tripID
          }
        }));
      }

      for (let i = 0; i < reserveDiff.length; i++) {
        updateArr.push(db.passenger.update({
          destination: reserveUpdate[reserveDiff[i].path[0]].destination,
          remark: reserveUpdate[reserveDiff[i].path[0]].remark,
          tripID: reserveUpdate[reserveDiff[i].path[0]].tripID,
          statusCode: reserveUpdate[reserveDiff[i].path[0]].statusCode,
          stopNum: reserveUpdate[reserveDiff[i].path[0]].stopNum,
          idNum: reserveUpdate[reserveDiff[i].path[0]].idNum,
          isTermReservation: reserveUpdate[reserveDiff[i].path[0]].isTermReservation
        }, {
          where: {
            reservationNum: reserveUpdate[reserveDiff[i].path[0]].reservationNum
          }
        }));
      }

      console.log('NUMBER OF UPDATE(s):', updateArr.length);
      return Promise.all(updateArr);

    }).then(() => {
      resolve();
    }).catch(e => {
      console.log('ERROR: POST Fetching DB Data');
      reject(e);
    });
  });



  //return update;
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

var findAllTrips = () => {
  return db.trip.findAll({
    attributes: {
      include: [
            [db.connection.fn('date_format', db.connection.col('tripDate'), '%M %d, %Y'), 'tripDate']
      ],
      exclude: ['manageTime']
    },
    where: {
      tripDate: new Date('2017-05-10').setUTCHours(0,0,0,0)
    }
  });
};

const updateTest = () => {
  return db.passenger.update({
    destination: 'hehe'
  }, {
    where: {
      passengerID: 23
    }
  });
};

module.exports = {
  getCurrentExpressData,
  updateExpressData,
  findAllUsers,
  findAllDrivers,
  findAllTrips,
  updateTest
};