import JSZip from 'jszip';
import { addFilesToZip, generateAndSaveZip } from './scripts/downloadFilesScripts';


export default {
  methods: {
    async downloadRowFiles(files) {
      const zip = new JSZip();
      await addFilesToZip(files, zip);
      await generateAndSaveZip(zip);
    },
  },
};
