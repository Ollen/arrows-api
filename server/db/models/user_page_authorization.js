/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_page_authorization', {
    authID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    idNum: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'user',
        key: 'idNum'
      }
    },
    pageID: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'system_page',
        key: 'pageID'
      }
    }
  }, {
    tableName: 'user_page_authorization'
  });
};
