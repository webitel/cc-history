import { saveAs } from 'file-saver-es';

export default {
  methods: {
    downloadTxt(phrases) {
      const text = phrases
        .map(
          ({ phrase, channel, time }) =>
            `${time} [${channel != null ? channel : 'author'}] ${phrase || ''}`,
        )
        .join('\n');
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      return saveAs(
        blob,
        `Transcript ${this.transcript.id} ${this.call.createdAt}`,
      );
    },
  },
};
