import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IDiskStorageProvider from './StorageProvider/models/IDiskStorageProvider';

import IHashProvider from './HashProvider/models/IHashProvider';
import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IDiskStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);

container.registerSingleton<IHashProvider>('HashProvider', BCryptHashProvider);
