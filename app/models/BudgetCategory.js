module.exports = function (sequelize, DataTypes) {
    
      var BudgetCategory = sequelize.define('BudgetCategory', {
        amount: DataTypes.FLOAT,
        year: DataTypes.INTEGER,
        month: DataTypes.INTEGER,
        userId: DataTypes.INTEGER,
        categoryId: {
            type: DataTypes.INTEGER
          }
      }, {
        timestamps: false,
        classMethods: {
          associate: function (models) {
            BudgetCategory.belongsTo(models.User, {as: 'user'});
            BudgetCategory.belongsTo(models.User, {as: 'category'});
          }
        },
      });
    
      return BudgetCategory;
};
