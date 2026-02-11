import { fillIconsRepository as fillIconsRepositoryUiSdk } from '@webitel/ui-sdk';
import { fillIconsRepository } from '@webitel/ui-sdk/icons';

import hsDashboardGrid1 from './hs-dashboard-grid-1.svg?raw';
import hsDashboardGrid2 from './hs-dashboard-grid-2.svg?raw';
import hsDashboardGrid3 from './hs-dashboard-grid-3.svg?raw';
import hsDownloadRecord from './hs-download-record.svg?raw';
import hsForks from './hs-forks.svg?raw';
import hsLegAMarker from './hs-leg-a-marker.svg?raw';
import hsNote from './hs-note.svg?raw';
import hsTransferFrom from './hs-transfer-from.svg?raw';
import hsTransferMerge from './hs-transfer-merge.svg?raw';
import hsTransferTo from './hs-transfer-to.svg?raw';

const icons = {
	'hs-dashboard-grid-1': hsDashboardGrid1,
	'hs-dashboard-grid-2': hsDashboardGrid2,
	'hs-dashboard-grid-3': hsDashboardGrid3,
	'hs-download-record': hsDownloadRecord,
	'hs-forks': hsForks,
	'hs-leg-a-marker': hsLegAMarker,
	'hs-note': hsNote,
	'hs-transfer-from': hsTransferFrom,
	'hs-transfer-merge': hsTransferMerge,
	'hs-transfer-to': hsTransferTo,
};

fillIconsRepository({
	icons: Object.entries(icons).map(([iconName, svg]) => ({
		iconName,
		svg,
	})),
});

fillIconsRepositoryUiSdk({
	icons: Object.entries(icons).map(([iconName, svg]) => ({
		iconName,
		svg,
	})),
});

export default icons;
