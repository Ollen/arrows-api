/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('special_trip', {
    specialID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tripDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    purpose: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    targetDepTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    actualDepTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    arrivalTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    numPassengers: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      defaultValue: '0'
    },
    duration: {
      type: "DOUBLE",
      allowNull: true
    },
    statusCode: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'status',
        key: 'statusCode'
      }
    },
    routeID: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'route',
        key: 'routeID'
      }
    }
  }, {
    tableName: 'special_trip'
  });
};
