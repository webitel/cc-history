/* eslint-disable no-restricted-syntax, no-await-in-loop  */

import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { getHistory } from '../../../api/history/history';
import convertQuery from '../../loadHistory/loadHistoryScripts';
import { fetchFileBinary } from '../filesScripts';
import eventBus from '../../../utils/eventBus';

const addFilesFromListToZip = async (items, zip) => {
  for (const item of items) {
    for (const file of item.files) {
      const binary = await fetchFileBinary(file.id);
      const ext = file.mimeType.split('/').pop();
      console.log(ext, new Date().toLocaleTimeString());
      zip.file(`${file.name}.${ext}`, binary);
    }
  }
};

export default {
  data: () => ({
    isFilesLoading: false,
  }),

  methods: {
    async downloadFiles() {
      this.isFilesLoading = true;

      const zip = new JSZip();
      const size = 100;
      const params = {
        ...this.getQueryParams(),
        size,
        existsFile: true,
      };

      let page = 1;
      let isNext = false;

      console.log('start', new Date().toLocaleTimeString());
      do {
        const { items, next } = await this.loadList({ ...params, page });
        // console.log(items.length);
        await addFilesFromListToZip(items, zip);

        isNext = next;
        page += 1;
      } while (isNext);
      console.log('fetch finish', new Date().toLocaleTimeString());

      try {
        const file = await zip.generateAsync({ type: 'blob' });
        saveAs(file, 'allFiles.zip');
        console.log('generate finish', new Date().toLocaleTimeString());
      } catch (err) {
        eventBus.$emit('notificationError', 'Failed to load the file');
      } finally {
        this.isFilesLoading = true;
      }
    },

    loadList(params) {
      return getHistory(params);
    },

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },
  },
};
