import { container } from 'tsyringe';

import DiskStorageProvider from './StorageProvider/implementations/DiskStorageProvider';
import IDiskStorageProvider from './StorageProvider/models/IDiskStorageProvider';

container.registerSingleton<IDiskStorageProvider>(
  'StorageProvider',
  DiskStorageProvider,
);