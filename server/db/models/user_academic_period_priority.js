/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_academic_period_priority', {
    appID: {
      type: DataTypes.INTEGER(100),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idNum: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      references: {
        model: 'user',
        key: 'idNum'
      }
    },
    priorityID: {
      type: DataTypes.INTEGER(5),
      allowNull: false
    },
    periodID: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    }
  }, {
    tableName: 'user_academic_period_priority'
  });
};
