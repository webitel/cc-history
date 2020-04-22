/* eslint-disable no-await-in-loop  */

import JSZip from 'jszip';
import { getHistory } from '../../../api/history/history';
import convertQuery from '../../loadHistory/loadHistoryScripts';
import { addItemsFilesToZip, generateAndSaveZip } from './downloadFilesScripts';

export default {
  data: () => ({
    isFilesLoading: false,
  }),

  methods: {
    async downloadFiles() {
      this.isFilesLoading = true;

      const zip = new JSZip();
      console.log('start', new Date().toLocaleTimeString());
      if (this.selectedData.length) {
        await this.downloadSelectedFiles(zip);
      } else {
        await this.downloadAllFiles(zip);
      }
      console.log('fetch finish', new Date().toLocaleTimeString());

      try {
        await generateAndSaveZip(zip, 'allFiles.zip');
        console.log('generate finish', new Date().toLocaleTimeString());
      } catch {
      } finally {
        this.isFilesLoading = true;
      }
    },

    async downloadSelectedFiles(zip) {
      const items = this.selectedData.filter((item) => item.files);
      await addItemsFilesToZip(items, zip);
    },

    async downloadAllFiles(zip) {
      const size = 100;
      const params = {
        ...this.getQueryParams(),
        size,
        existsFile: true,
      };

      let page = 1;
      let isNext = false;

      do {
        const { items, next } = await this.loadListForDownload({ ...params, page });
        console.log('chunk length: ', items.length);
        await addItemsFilesToZip(items, zip);

        isNext = next;
        page += 1;
      } while (isNext);
    },

    loadListForDownload(params) {
      return getHistory(params);
    },

    getQueryParams() {
      const { query } = this.$route;
      return convertQuery(query);
    },
  },
};
