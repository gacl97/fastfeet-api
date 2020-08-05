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

import { Expose } from 'class-transformer';

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
  deliveryman_id: string;

  @ManyToOne(() => Deliverer)
  @JoinColumn({ name: 'deliveryman_id' })
  deliveryman: Deliverer;

  @Column()
  signature: string;

  @Expose({ name: 'signature_url' })
  getSignature_url(): string | null {
    return this.signature
      ? `http://localhost:3333/files/${this.signature}`
      : null;
  }

  @Column()
  status: string;

  @Column()
  canceled_at: Date;

  @Column()
  start_date: Date;

  @Column()
  end_date: Date;

  @Column()
  product: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Delivery;
