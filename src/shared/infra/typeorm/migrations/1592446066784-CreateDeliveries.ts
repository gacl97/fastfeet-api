import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateDeliveries1592446066784
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'deliveries',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'recipient_id',
            type: 'uuid',
          },
          {
            name: 'deliveryman_id',
            type: 'uuid',
          },
          {
            name: 'product',
            type: 'varchar',
          },
          {
            name: 'canceled_at',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'start_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'end_date',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'RecipientId',
            referencedTableName: 'recipients',
            referencedColumnNames: ['id'],
            columnNames: ['recipient_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'DelivererManId',
            referencedTableName: 'deliverers',
            referencedColumnNames: ['id'],
            columnNames: ['deliveryman_id'],
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('deliveries');
  }
}
