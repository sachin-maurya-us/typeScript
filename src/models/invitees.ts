'use strict';
import {
  Model
} from 'sequelize';

interface InviteesAttributes {
  id: string;
  eventId: string;
  userId:string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Invitees extends Model<InviteesAttributes> implements InviteesAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    id!: string;
    eventId!: string;
    userId!:string;
    static associate(models: any) {
      // define association here
    }
  }
  Invitees.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    eventId: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.STRING,
    }
  }, {
    sequelize,
    modelName: 'Invitees',
  });

  Invitees.associate = models => {
    Invitees.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'invited'
    })
    Invitees.belongsTo(models.Event, {  
      as: 'event',
      foreignKey: "eventId"});
  }
  return Invitees;
};