/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  var model = sequelize.define('trip_vehicle_assignment', {
    tripID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'trip',
        key: 'tripID'
      }
    },
    vehicleID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      references: {
        model: 'vehicle',
        key: 'vehicleID'
      }
    },
    driverID: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      references: {
        model: 'driver',
        key: 'driverID'
      }
    }
  }, {
    tableName: 'trip_vehicle_assignment'
  });

  model.removeAttribute('id');
  return model;
};
