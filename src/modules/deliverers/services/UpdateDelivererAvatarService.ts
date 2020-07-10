import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import IDiskStorageProvider from '@shared/container/providers/StorageProvider/models/IDiskStorageProvider';
import IDeliverersRepository from '@modules/deliverers/repositories/IDeliverersRepository';

import Deliverer from '@modules/deliverers/infra/typeorm/entities/Deliverer';

interface IRequestDTO {
  deliverer_id: string;
  avatarFileName: string;
}

@injectable()
class UpdateDelivererAvatarService {
  constructor(
    @inject('DeliverersRepository')
    private deliverersRepository: IDeliverersRepository,

    @inject('StorageProvider')
    private storageProvider: IDiskStorageProvider,
  ) {}

  public async execute({
    avatarFileName,
    deliverer_id,
  }: IRequestDTO): Promise<Deliverer> {
    const deliverer = await this.deliverersRepository.findById(deliverer_id);

    if (!deliverer) {
      throw new AppError('Deliverer must exists', 401);
    }

    if (deliverer.avatar) {
      await this.storageProvider.deleteFile(deliverer.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFileName);

    deliverer.avatar = fileName;

    await this.deliverersRepository.save(deliverer);

    return deliverer;
  }
}

export default UpdateDelivererAvatarService;
