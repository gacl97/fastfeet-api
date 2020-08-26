import fs from 'fs';
import path from 'path';
import uploadConfig from '@config/upload';

import IDiskStorageProvider from '../models/IDiskStorageProvider';

class DiskStorageProvider implements IDiskStorageProvider {
  public async saveFile(file: string): Promise<string> {
    // Verificar existencia de diretorio
    if (!fs.existsSync(uploadConfig.uploadsFolder)) {
      fs.mkdirSync(uploadConfig.uploadsFolder);
    }
    // Funcao para mover arquivo
    await fs.promises.rename(
      path.resolve(uploadConfig.tmpFolder, file),
      path.resolve(uploadConfig.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath); // Verificar existencia de arquivo
    } catch {
      return;
    }

    await fs.promises.unlink(filePath); // Deletar arquivo
  }
}

export default DiskStorageProvider;
