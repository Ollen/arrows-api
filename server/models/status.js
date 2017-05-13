/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('status', {
    statusCode: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    statusName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    statusType: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    tableName: 'status'
  });
};
