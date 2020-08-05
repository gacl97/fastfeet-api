import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddSignatureFieldToDeliveries1596652414698
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'deliveries',
      new TableColumn({
        name: 'signature',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('deliveries', 'signature');
  }
}
