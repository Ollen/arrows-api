/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('vehicle', {
    vehicleID: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    vehicleType: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    capacity: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    image: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    plateNum: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    model: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    brand: {
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
    tableName: 'vehicle'
  });
};
