module.exports = function (sequelize, DataTypes) {
    
      var TransactionType = sequelize.define('TransactionType', {
        name: DataTypes.STRING
      }, 
       {
        timestamps: false,
      });
    
      return TransactionType;
};
