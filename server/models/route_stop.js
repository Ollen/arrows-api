/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('route_stop', {
    stopNum: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    order: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    routeID: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'route',
        key: 'routeID'
      }
    },
    stopID: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'stop',
        key: 'stopID'
      }
    }
  }, {
    tableName: 'route_stop'
  });
};
