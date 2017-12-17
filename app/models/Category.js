module.exports = function (sequelize, DataTypes) {
    
      const Category = sequelize.define('Category', {
        name: DataTypes.STRING,
      }, {
        timestamps: false,
        classMethods: {
          associate: function (models) {
            Category.hasMany(models.Transaction, {foreignKey: 'categoryId', as: 'transactions'})
            Category.hasMany(models.BudgetCategory, {foreignKey: 'categoryId', as: 'budgetCategories'})
          }
        },
      });
    
      return Category;
};
