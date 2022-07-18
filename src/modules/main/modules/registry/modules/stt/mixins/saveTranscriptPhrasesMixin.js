import saveAs from 'file-saver';

export default {
  methods: {
    downloadTxt(phrases) {
      const text = phrases.map(({ phrase }) => `- ${phrase}`).join('\n');
      const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      return saveAs(blob, `Transcript ${this.transcript.id}`);
    },
  },
};
