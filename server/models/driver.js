/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('driver', {
    driverID: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true
    },
    lastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    firstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    nickname: {
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
    tableName: 'driver'
  });
};
