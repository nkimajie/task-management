import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { TaskStatus, TaskTag } from '../enum/tasks.enum';
import User from 'src/user/entities/user.entity';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'tasks',
})
export default class Tasks extends Model<Tasks> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT(),
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  dueDate: Date;

  @Column({
    type: DataType.ENUM(...Object.values(TaskStatus)),
    allowNull: false,
    defaultValue: TaskStatus.TODO,
  })
  status: TaskStatus;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assignorId: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: true,
  })
  assigneeId: number;

  @Column({
    type: DataType.ENUM(...Object.values(TaskTag)),
    allowNull: false,
    defaultValue: TaskTag.FEATURE,
  })
  tag: TaskTag;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  createdBy: User;

  @BelongsTo(() => User, { foreignKey: 'assignorId' })
  assignBy: User;

  @BelongsTo(() => User, { foreignKey: 'assigneeId' })
  assignTo: User;
}
