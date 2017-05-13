/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('line', {
    lineNum: {
      type: DataTypes.INTEGER(5),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    lineName: {
      type: DataTypes.STRING(45),
      allowNull: true
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
    tableName: 'line'
  });
};
