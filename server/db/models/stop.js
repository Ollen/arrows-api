/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('stop', {
    stopID: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    stopName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    latitude: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    longitude: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'stop'
  });
};
