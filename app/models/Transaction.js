module.exports = function (sequelize, DataTypes) {
    
      var Transaction = sequelize.define('Transaction', {
        created: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: sequelize.NOW
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT
      }, {
        classMethods: {
          associate: function (models) {
            // example on how to add relations
            // Article.hasMany(models.Comments);
          }
        }
      });
    
      return Transaction;
};
