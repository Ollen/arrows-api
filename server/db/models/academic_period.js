/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('academic_period', {
    periodID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    AYStart: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    AYEnd: {
      type: DataTypes.INTEGER(5),
      allowNull: true
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: true
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'academic_period'
  });
};
