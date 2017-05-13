/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('can_drive', {
    vehicleType: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    driverID: {
      type: DataTypes.INTEGER(7),
      allowNull: false,
      references: {
        model: 'driver',
        key: 'driverID'
      }
    }
  }, {
    tableName: 'can_drive'
  });
};
