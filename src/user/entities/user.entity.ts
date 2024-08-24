import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { UserStatus, UserTypes } from '../enum/user.enum';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'users',
})
export default class User extends Model<User> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    unique: true,
  })
  uuid: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  profileImage: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(UserTypes),
    defaultValue: UserTypes.USER,
  })
  userType: string;

  @Column({
    type: DataType.ENUM,
    allowNull: false,
    values: Object.values(UserStatus),
    defaultValue: UserStatus.PENDING,
  })
  status: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  deleted: boolean;

  @Column({
    type: DataType.VIRTUAL,
    allowNull: true,
    get() {
      return this.getDataValue('userType');
    },
    set(value) {
      this.setDataValue('role', value);
    },
  })
  role: string;
}
