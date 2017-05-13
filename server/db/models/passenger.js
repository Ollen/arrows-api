/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('passenger', {
    passengerID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    feedbackOn: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    rating: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    tapIn: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tapOut: {
      type: DataTypes.TIME,
      allowNull: true
    },
    disembarkationPt: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isChance: {
      type: DataTypes.INTEGER(4),
      allowNull: true
    },
    reservationNum: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'reservation',
        key: 'reservationNum'
      }
    },
    vehicleID: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'vehicle',
        key: 'vehicleID'
      }
    },
    driverID: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
      references: {
        model: 'driver',
        key: 'driverID'
      }
    }
  }, {
    tableName: 'passenger'
  });
};
