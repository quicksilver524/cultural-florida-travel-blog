const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

// create our Post model
class Post extends Model {
  static upview(body, models) {
console.log(body);
      return this.increment(
          'view_count',
          {
              where: {id: body.post_id},
              by: 1
          }
      );
  };

  static upvote(body, models) {
      return models.Vote.create({
          user_id: body.user_id,
          post_id: body.post_id
      }).then(() => {
          return Post.findOne({
              where: {
                  id: body.post_id
              },
              attributes: [
                  'id',
                  'title',
                  'cover_url',
                  'post_body',
                  'view_count',
                  'created_at',
                  [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
              ],
              include: [
                  {
                      model: models.Comment,
                      attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                      include: {
                          model: models.User,
                          attributes: ['username']
                      }
                  }
              ]
          });
      });
  }
}

// create fields/columns for Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    cover_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isURL: true,
      },
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    post_body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        isURL: false,
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
    view_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 0,
    },
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "post",
  }
);

module.exports = Post;
