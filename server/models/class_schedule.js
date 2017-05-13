/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('class_schedule', {
    classSchedID: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    AY: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    courseCode: {
      type: DataTypes.STRING(7),
      allowNull: true
    },
    startTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    endTime: {
      type: DataTypes.TIME,
      allowNull: true
    },
    term: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    day: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    section: {
      type: DataTypes.STRING(5),
      allowNull: true
    },
    room: {
      type: DataTypes.STRING(5),
      allowNull: true
    }
  }, {
    tableName: 'class_schedule'
  });
};
