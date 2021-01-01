import { Status } from '../constants/status';
import { Sequelize, DataTypes, Model, Optional } from 'sequelize';
import { Password } from '../interfaces/password.interface';

export type PasswordCreationAttributes = Optional<
  Password,
  'passwordid' | 'userid' | 'password' | 'active' | 'createddate' | 'modifieddate'
>;

export class PasswordModel extends Model<Password, PasswordCreationAttributes> implements Password {
  public passwordid: string;
  public userid: string;
  public password: string;
  public active: Status;
  public createddate: Date;
  public modifieddate: Date;
}

export default function (sequelize: Sequelize): typeof PasswordModel {
  PasswordModel.init(
    {
      passwordid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: Sequelize.literal('uuid_generate_v1()'),
        primaryKey: true,
      },
      userid: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
      password: {
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
      modifieddate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: null,
        primaryKey: false,
      },
    },
    {
      tableName: 'user_password',
      sequelize,
      timestamps: false,
    },
  );

  return PasswordModel;
}
