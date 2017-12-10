module.exports = function (sequelize, DataTypes) {
    
      var Budget = sequelize.define('Budget', {
        amount: DataTypes.FLOAT,
        year: DataTypes.INTEGER,
        month: DataTypes.INTEGER,
        userId: DataTypes.INTEGER
      }, {
        timestamps: false,
        classMethods: {
          associate: function (models) {
            Budget.belongsTo(models.User, {as: 'user'});
          }
        },
      });
    
      return Budget;
};
