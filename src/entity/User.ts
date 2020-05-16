import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('increment')
    id: string | undefined;

    @Column({type: 'varchar', length: 100, unique: true})
    username: string | undefined;

    @Column({type: 'varchar', length: 100, unique: true})
    email: string | undefined;

    @Column({type: 'varchar', nullable: false})
    password: string | undefined;

    @Column({type: 'boolean', default: true})
    active: string | undefined;

    // @CreateDateColumn()
    // created_at: 'string' | undefined;
    //
    // @UpdateDateColumn()
    // updated_at: 'string' | undefined;
}
