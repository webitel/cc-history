/* eslint-disable no-restricted-syntax, no-await-in-loop  */
import jszipUtils from 'jszip-utils';
import { saveAs } from 'file-saver';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import generateMediaURL from '../../media/scripts/generateMediaURL';

const fetchFileBinary = (id) => {
  const url = generateMediaURL(id);
  return new Promise((resolve, reject) => (
    jszipUtils.getBinaryContent(url, (err, data) => {
      if (err) {
        reject();
      } else {
        resolve(data);
      }
    })));
};

export const addFilesToZip = async (files, zip, counter) => {
  for (const file of files) {
    const binary = await fetchFileBinary(file.id);
    const ext = file.mimeType.split('/').pop();
    zip.file(`${file.name}.${ext}`, binary);
    if (counter) counter();
  }
};

export const addItemsFilesToZip = async (items, zip, counter) => {
  for (const item of items) {
    await addFilesToZip(item.files, zip, counter);
  }
};

export const generateAndSaveZip = async (zip, fileName = 'files.zip') => {
  try {
    const file = await zip.generateAsync({ type: 'blob' });
    saveAs(file, fileName);
  } catch (err) {
    eventBus.$emit('notificationError', 'Failed to load the file');
  }
};
