import { PdfServicesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { headers } from './_internals/headers';

export const usePdfsDataListStore = createTableStore('call/pdfs/datalist', {
	apiModule: {
		getList: PdfServicesAPI.listCallExports,
	},
	headers,
});
