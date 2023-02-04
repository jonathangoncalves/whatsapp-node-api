import {
    BaseEntity,
    Entity,
    Column,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    CreateDateColumn
} from 'typeorm';

@Entity('question')
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    questionType: string;

    @Column()
    reviewGate: string;

    @Column()
    sortId: number;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    lastUpdatedDate: Date;
}
