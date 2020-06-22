import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Delivery from '@modules/deliveries/infra/typeorm/entities/Delivery';

@Entity('delivery_problems')
class DeliveryProblem {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  delivery_id: string;

  @ManyToOne(() => Delivery)
  @JoinColumn({ name: 'delivery_id' })
  delivery: Delivery;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default DeliveryProblem;
