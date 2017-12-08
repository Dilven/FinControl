module.exports = function (sequelize, DataTypes) {
    
      var Transaction = sequelize.define('Transaction', {
        transaction_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        name: DataTypes.STRING,
        description: DataTypes.TEXT,
        amount: DataTypes.FLOAT,
        insert_date: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW
        },
        categoryId: {
          type: DataTypes.INTEGER
        }
      }, {
        timestamps: false,
        classMethods: {
          associate: function (models) {
            Transaction.belongsTo(models.TransactionType, {as: 'type'});
            Transaction.belongsTo(models.User, {as: 'user'});
          }
        },
      });
    
      return Transaction;
};
