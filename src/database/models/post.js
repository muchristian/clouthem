
module.exports = (sequelize, DataTypes) => {
  const post = sequelize.define('post', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    sector: {
      type: DataTypes.STRING,
      allowNull: false
    },
    writtenBy: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    likes: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING,
      defaultValue: 'not-allowed',
    },
  }, {});
  post.associate = (models) => {
    post.belongsTo(models.user, {
      foreignKey: 'writtenBy',
      as: 'post',
      timestamps: true,
    });
  };
  return post;
};