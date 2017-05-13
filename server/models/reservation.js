/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('reservation', {
    reservationNum: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    timestamp: {
      type: DataTypes.TIME,
      allowNull: true
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    remark: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tripID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'trip',
        key: 'tripID'
      }
    },
    statusCode: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'status',
        key: 'statusCode'
      }
    },
    stopNum: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'route_stop',
        key: 'stopNum'
      }
    },
    idNum: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
      references: {
        model: 'user',
        key: 'idNum'
      }
    },
    isTermReservation: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    }
  }, {
    tableName: 'reservation'
  });
};
