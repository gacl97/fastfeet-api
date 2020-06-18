import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import Recipient from '@modules/recipients/infra/typeorm/entities/Recipient';
import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

@Entity('deliveries')
class Delivery {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  recipient_id: string;

  @ManyToOne(() => Recipient)
  @JoinColumn({ name: 'recipient_id' })
  recipient: Recipient;

  @Column()
  delivererman_id: string;

  @ManyToOne(() => Deliverer)
  @JoinColumn({ name: 'delivererman_id' })
  deliverer: Deliverer;

  @Column()
  product: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Delivery;
