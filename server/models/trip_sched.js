/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('trip_sched', {
    tripSchedID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    tripNum: {
      type: DataTypes.STRING(10),
      allowNull: true
    },
    depTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    periodID: {
      type: DataTypes.INTEGER(10),
      allowNull: true,
      references: {
        model: 'academic_period',
        key: 'periodID'
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
    tableName: 'trip_sched'
  });
};
