// ===========================
// models/user.model.ts
// ===========================
import { DataTypes, Model, Optional } from 'sequelize';
const sequelize= require('../../../../config/database')

interface UserAttributes {
  id: string;
  user_address: string[];
  user_city: string;
  user_email: string;
  user_phone_number: string;
  number_of_logins: number;
  last_login: Date;
  login_count_per_day: number;
  failed_login_attempts: number;
  login_devices: string[];
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: string;
  public user_address!: string[];
  public user_city!: string;
  public user_email!: string;
  public user_phone_number!: string;
  public number_of_logins!: number;
  public last_login!: Date;
  public login_count_per_day!: number;
  public failed_login_attempts!: number;
  public login_devices!: string[];
}

User.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    user_address: { type: DataTypes.ARRAY(DataTypes.STRING), allowNull: false },
    user_city: { type: DataTypes.STRING, allowNull: false },
    user_email: { type: DataTypes.STRING, allowNull: false, unique: true },
    user_phone_number: { type: DataTypes.STRING, allowNull: false },
    number_of_logins: { type: DataTypes.INTEGER, defaultValue: 0 },
    last_login: { type: DataTypes.DATE, allowNull: true },
    login_count_per_day: { type: DataTypes.INTEGER, defaultValue: 0 },
    failed_login_attempts: { type: DataTypes.INTEGER, defaultValue: 0 },
    login_devices: { type: DataTypes.ARRAY(DataTypes.STRING), defaultValue: [] },
  },
  {
    sequelize,
    tableName: 'users',
    schema: 'user',
    timestamps: true,
  }
);

export default User;
