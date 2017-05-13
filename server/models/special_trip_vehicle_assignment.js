/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('special_trip_vehicle_assignment', {
    specialID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'special_trip',
        key: 'specialID'
      }
    },
    vehicleID: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    driverID: {
      type: DataTypes.INTEGER(8),
      allowNull: false
    }
  }, {
    tableName: 'special_trip_vehicle_assignment'
  });
};
