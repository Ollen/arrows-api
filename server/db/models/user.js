/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    idNum: {
      type: DataTypes.INTEGER(8),
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    emergencyContact: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    emergencyContactNum: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isAdmin: {
      type: DataTypes.INTEGER(4),
      allowNull: true,
      defaultValue: '0'
    },
    adminPassword: {
      type: DataTypes.STRING(255),
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
    tableName: 'user'
  });
};
