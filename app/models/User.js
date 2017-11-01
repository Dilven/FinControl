module.exports = function (sequelize, DataTypes) {
    
      var User = sequelize.define('User', {
        email: DataTypes.STRING,
        password: DataTypes.STRING
      }, {
        classMethods: {
          associate: function (models) {
            // example on how to add relations
            // Article.hasMany(models.Comments);
          }
        }
      });
    
      return User;
};
    
    