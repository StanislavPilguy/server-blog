import {Column, DataType, Model, Table} from 'sequelize-typescript';
import {ApiProperty} from "@nestjs/swagger";

export interface CreateAdminCategoriesDtoAttr {
    id?: number;
    name: string
}

@Table({ tableName: 'admin_categories' })
export class AdminCategories extends Model<AdminCategories, CreateAdminCategoriesDtoAttr> {
    @ApiProperty({example: '1', description: 'Unique Idintificator'})
    @Column({
        type: DataType.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true,
    })
    id: number;

    @ApiProperty({example: 'categories', description: 'Admin Category name'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    name: string;

}