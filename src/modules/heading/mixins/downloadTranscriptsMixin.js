/* eslint-disable no-await-in-loop */

import saveAs from 'file-saver';
import JSZip from 'jszip';
import APIRepository from '../../../app/api/APIRepository';
import CallTranscriptAPI
  from '../../main/modules/registry/modules/stt/api/CallTranscriptAPI';

const collectTranscriptIds = (historyItems) => historyItems.reduce((
  ids,
  { transcripts },
) => ids.concat(transcripts.map(({ id }) => id)), []);

const generateTxt = (phrases) => {
  const text = phrases.reduce((txt, { phrase }) => (phrase
    ? txt.concat((`- ${phrase}`)).concat('\n')
    : txt), '');
  const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
  return blob;
};

const fetchPhrases = (id) => CallTranscriptAPI.get({ id });

const fetchHistory = (_params) => {
  const params = {
    ..._params,
    size: 5000,
    hasTranscription: true,
    fields: ['created_at', 'transcripts'],
  };
  return APIRepository.history.getHistory(params);
};

export default {
  data: () => ({
    isTranscriptsLoading: false,
    transcriptDownloadProgress: 0,
    transcriptZippingProgress: 0,
  }),
  methods: {
    async _downloadSelectedTranscripts(items, zip) {
      const findTranscriptDate = (transcriptId) => {
        const item = items.find(({ transcripts }) => transcripts
        .some(({ id }) => id === transcriptId));
        return item.createdAt.replaceAll('/', '.');
      };

      const ids = collectTranscriptIds(items);
      // eslint-disable-next-line no-restricted-syntax
      for (const id of ids) {
        const phrases = await fetchPhrases(id);
        const txt = generateTxt(phrases);
        const fileName = `${id} at ${findTranscriptDate(id)}`;
        zip.file(`${fileName}.txt`, txt);
        this.transcriptDownloadProgress += 1;
      }
    },
    async _downloadAllTranscripts(zip, { filters }) {
      let page = 1;
      let next = false;
      do {
        const resp = await fetchHistory({ ...filters, page });
        next = resp.next;
        await this._downloadSelectedTranscripts(resp.items, zip);
        page += 1;
      } while (next);
    },
    async exportTranscripts() {
      if (this.isLoading) return;
      try {
        this.isTranscriptsLoading = true;
        const zip = new JSZip();

        if (this.selected.length) {
          const selectedWithTranscript = this.selected
          .filter(({ transcripts }) => transcripts?.length);
          await this._downloadSelectedTranscripts(selectedWithTranscript, zip);
        } else {
          await this._downloadAllTranscripts(zip, { filters: this.filters });
        }

        const file = await zip.generateAsync({ type: 'blob' }, ({ percent }) => {
          this.transcriptZippingProgress = percent;
        });
        saveAs(file, 'transcripts.zip');
      } catch (err) {
        throw err;
      } finally {
        this.isTranscriptsLoading = false;
        this.transcriptDownloadProgress = 0;
        this.transcriptZippingProgress = 0;
      }
    },
  },
};
