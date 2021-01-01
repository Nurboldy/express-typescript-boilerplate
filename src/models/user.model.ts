import { Status } from '../constants/status';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { User } from '../interfaces/user.interface';

export type UserCreationAttributes = Optional<
  User,
  'userid' | 'accountname' | 'email' | 'active' | 'createddate'
>;

export class UserModel extends Model<User, UserCreationAttributes> implements User {
  public userid: string;
  public accountname: string;
  public email: string;
  public active: Status;
  public createddate: Date;
}

export default function (sequelize: Sequelize): typeof UserModel {
  UserModel.init(
    {
      userid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v1()'),
        primaryKey: true,
      },
      accountname: {
        type: DataTypes.STRING(50),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
      active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
      createddate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
    },
    {
      tableName: 'user',
      sequelize,
      timestamps: false,
    },
  );

  return UserModel;
}
