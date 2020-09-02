import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDiskStorageProvider from '@shared/container/providers/StorageProvider/models/IDiskStorageProvider';
import IDeliveryRepository from '@modules/deliveries/repositories/IDeliveriesRepository';
import Delivery from '../infra/typeorm/entities/Delivery';

interface IRequestDTO {
  delivery_id: string;
  signatureFileName: string;
}

@injectable()
class UpdateDeliverySignatureService {
  constructor(
    @inject('DeliveriesRepository')
    private deliveryProvider: IDeliveryRepository,

    @inject('StorageProvider')
    private storageProvider: IDiskStorageProvider,
  ) {}

  public async execute({
    delivery_id,
    signatureFileName,
  }: IRequestDTO): Promise<Delivery> {
    const delivery = await this.deliveryProvider.findById(delivery_id);

    if (!delivery) {
      throw new AppError('Delivery not found', 404);
    }

    if (!delivery.start_date) {
      throw new AppError(
        'Signature can only be updated when finalizing delivery',
      );
    }

    if (delivery.end_date) {
      throw new AppError('This delivery is already delivered');
    }

    if (delivery.canceled_at) {
      throw new AppError('Canceled deliveries cannot update signature');
    }

    if (delivery.signature) {
      await this.storageProvider.deleteFile(delivery.signature);
    }

    const fileName = await this.storageProvider.saveFile(signatureFileName);

    delivery.signature = fileName;

    await this.deliveryProvider.save(delivery);

    return delivery;
  }
}

export default UpdateDeliverySignatureService;
