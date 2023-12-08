'use strict';
import {
  Model
} from 'sequelize';

interface UserAttributes {
  id: string;
  name: string;
  email:string;
  password:string;
}
module.exports = (sequelize: any, DataTypes:any) => {

  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    name!: string;
    email!:string;
    password!:string;
    static associate(models: any) {
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: 'User',
    tableName: 'users',
    paranoid: true,
  });
  User.associate = models => {
    User.hasMany(models.AccessToken, {
      foreignKey: 'userId',
      sourceKey: 'id',
      as: 'accessTokens',
    });

    User.hasMany(models.Event, {
      foreignKey: 'creatorId',
      as: 'eventCreator'
    })

    User.hasMany(models.Invitees, {
      foreignKey: 'userId',
      as: 'invitedToEvent'
    })
  }
  return User;
};