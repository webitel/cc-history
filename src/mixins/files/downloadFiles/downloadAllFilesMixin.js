/* eslint-disable no-await-in-loop  */

import JSZip from 'jszip';
import { mapGetters } from 'vuex';
import getHistory from '../../../api/history/HistoryAPIRepository';
import { convertQuery } from '../../../store/modules/history/utils/loadHistoryScripts';
import { addItemsFilesToZip, generateAndSaveZip } from './downloadFilesScripts';

// function to bind component "this" for filterCounter
function counter() {
  this.filesCounter += 1;
}

export default {
  data: () => ({
    isFilesLoading: false,
    filesCounter: 0,
  }),

  computed: {
    ...mapGetters('history', {
      selectedData: 'SELECTED_DATA',
    }),
  },

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
        this.isFilesLoading = false;
        this.filesCounter = 0;
      }
    },

    async downloadSelectedFiles(zip) {
      const items = this.selectedData.filter((item) => item.files);
      await addItemsFilesToZip(items, zip, counter.bind(this));
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
        await addItemsFilesToZip(items, zip, counter.bind(this));

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
