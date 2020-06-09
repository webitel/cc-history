import JSZip from 'jszip';
import { addFilesToZip, generateAndSaveZip } from './downloadFilesScripts';


export default {
  methods: {
    async downloadRowFiles(files) {
      const zip = new JSZip();
      await addFilesToZip(files, zip);
      await generateAndSaveZip(zip);
    },
  },
};
