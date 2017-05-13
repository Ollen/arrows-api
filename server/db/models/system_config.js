/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('system_config', {
    configID: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    configName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    configVal: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'system_config'
  });
};
