/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_priority', {
    priorityID: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    priorityType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    priorityCode: {
      type: DataTypes.INTEGER(2),
      allowNull: true
    },
    priorityColor: {
      type: DataTypes.STRING(45),
      allowNull: true,
      defaultValue: 'white'
    }
  }, {
    tableName: 'user_priority'
  });
};
