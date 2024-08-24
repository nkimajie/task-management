import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from 'src/user/entities/user.entity';

@Table({
  timestamps: true,
  underscored: false,
  tableName: 'comments',
})
export default class TasksComment extends Model<TasksComment> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  taskId: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  comment: string;

  @BelongsTo(() => User, { foreignKey: 'userId' })
  commentedBy: User;
}
