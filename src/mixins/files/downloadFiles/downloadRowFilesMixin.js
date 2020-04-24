import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import { fetchFileBinary } from '../filesScripts';
import eventBus from '../../../utils/eventBus';


export default {
  methods: {
    async downloadFiles(files) {
      const zip = new JSZip();

      // eslint-disable-next-line no-restricted-syntax
      for (const file of files) {
        // eslint-disable-next-line no-await-in-loop
        const binary = await fetchFileBinary(file.id);
        const ext = file.mimeType.split('/').pop();
        zip.file(`${file.name}.${ext}`, binary);
      }
      try {
        const file = await zip.generateAsync({ type: 'blob' });
        saveAs(file, 'files.zip');
      } catch (err) {
        eventBus.$emit('notificationError', 'Failed to load the file');
      }
    },
  },
};
