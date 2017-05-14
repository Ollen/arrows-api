const env = require('./config/env');
const Sequelize = require('sequelize');
const connection = new Sequelize(
  env.DATABASE_NAME,
  env.DATABASE_USERNAME,
  env.DATABASE_PASSWORD, {
    host: env.DATABASE_HOST,
    port: env.DATABASE_PORT,
    dialect: env.DATABASE_DIALECT,
    define: {
      timestamps: false
    }
  }
);

const db = {connection};

// Models
db.trip             = require('./models/trip')(connection, Sequelize);
db.trip_assignment  = require('./models/trip_vehicle_assignment')(connection, Sequelize);
db.passenger        = require('./models/passenger')(connection, Sequelize);
db.driver          = require('./models/driver')(connection, Sequelize);
db.vehicle          = require('./models/vehicle')(connection, Sequelize);
db.trip_sched       = require('./models/trip_sched')(connection, Sequelize);
db.route            = require('./models/route')(connection, Sequelize);
db.line             = require('./models/line')(connection, Sequelize);
db.route_stop       = require('./models/route_stop')(connection, Sequelize);
db.stop             = require('./models/stop')(connection, Sequelize);
db.user             = require('./models/user')(connection, Sequelize);
db.reservation      = require('./models/reservation')(connection, Sequelize);
db.status           = require('./models/status')(connection, Sequelize);

// Relations
db.trip.hasOne(db.trip_assignment, {foreignKey: 'tripID'});
db.driver.belongsTo(db.status, {foreignKey: 'statusCode'});
db.vehicle.belongsTo(db.status, {foreignKey: 'statusCode'});
db.reservation.belongsTo(db.status, {foreignKey: 'statusCode'});

module.exports = db;