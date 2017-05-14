/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trip', {
    tripID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    remarks: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    tripDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    depTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    arrivalTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    duration: {
      type: 'DOUBLE',
      allowNull: true
    },
    manageTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    tripSchedID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'trip_sched',
        key: 'tripSchedID'
      }
    },
    statusCode: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'status',
        key: 'statusCode'
      }
    }
  }, {
    tableName: 'trip'
  });
};
