'use strict';
import {
  Model
} from 'sequelize';

interface EventAttributes {
    id: string;
    eventName: string;
    startDate: Date;
    endDate: Date;
    place: string;
    creatorId: string;
}
module.exports = (sequelize: any, DataTypes: any) => {
  class Event extends Model<EventAttributes> implements EventAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: string;
    eventName!: string;
    startDate!: Date;
    endDate!: Date;
    place!: string;
    creatorId!: string;
    static associate(models: any) {
      // define association here
    }
  }
  Event.init({
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },
    eventName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    place: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    creatorId: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'Event',
    underscored: true,
    timestamps: true,
    paranoid: true,
  });

  Event.associate = models => {
    Event.belongsTo(models.User, {
      foreignKey: 'creatorId',
      as: 'creator'
    })
    Event.hasMany(models.Invitees, { 
      foreignKey: "eventId" , 
      as:'invitees'
    });

  }
  return Event;
};