import { produce } from 'immer';
import useSWR, { SWRResponse } from 'swr';
import { StateCreator } from 'zustand/vanilla';

import { fileService } from '@/services/file';
import { FilePreview } from '@/types/files';
import { setNamespace } from '@/utils/storeDebug';

import { FileStore } from '../../store';

const t = setNamespace('files/image');

/**
 * 代理行为接口
 */
export interface FileAction {
  setImageMapItem: (id: string, item: FilePreview) => void;
  uploadFile: (file: File) => Promise<void>;
  useFetchFile: (id: string) => SWRResponse<FilePreview>;
}

export const createFileSlice: StateCreator<
  FileStore,
  [['zustand/devtools', never]],
  [],
  FileAction
> = (set, get) => ({
  setImageMapItem: (id, item) => {
    set(
      produce((draft) => {
        if (draft.imagesMap[id]) return;

        draft.imagesMap[id] = item;
      }),
      false,
      t('setImageMapItem'),
    );
  },
  uploadFile: async (file) => {
    try {
      const data = await fileService.uploadFile({
        createdAt: file.lastModified,
        data: await file.arrayBuffer(),
        name: file.name,
        size: file.size,
        type: file.type,
      });
      set(
        ({ inputFilesList }) => ({ inputFilesList: [...inputFilesList, data.id] }),
        false,
        t('uploadFile'),
      );
    } catch (error) {
      // 提示用户上传失败
      console.error('upload error:', error);
    }
  },
  useFetchFile: (id) =>
    useSWR(id, async (id) => {
      const item = await fileService.getFile(id);

      get().setImageMapItem(id, item);

      return item;
    }),
});
