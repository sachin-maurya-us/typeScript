'use strict';
import {
  Model
} from 'sequelize';
module.exports = (sequelize: any, DataTypes: any) => {
  class AccessToken extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
    }
  }
  AccessToken.init(
    {
      id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      underscored: true,
      timestamps: true,
      modelName: 'AccessToken',
      paranoid: true,
    },
  );

  AccessToken.associate = models => {
    AccessToken.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
      targetKey: 'id',
    });
  };
  return AccessToken;
};