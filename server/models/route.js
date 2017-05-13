/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('route', {
    routeID: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    origin: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    destination: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    routeDescription: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    lineNum: {
      type: DataTypes.INTEGER(5),
      allowNull: true,
      references: {
        model: 'line',
        key: 'lineNum'
      }
    }
  }, {
    tableName: 'route'
  });
};
