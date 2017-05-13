/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_assignment', {
    classSchedID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      references: {
        model: 'class_schedule',
        key: 'classSchedID'
      }
    },
    idNum: {
      type: DataTypes.INTEGER(8),
      allowNull: true,
      references: {
        model: 'user',
        key: 'idNum'
      }
    }
  }, {
    tableName: 'class_assignment'
  });
};
