import { snakeToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';

import {
	AggregationParams,
	VisualizationParams,
} from '../../../api/params/DashboardParams.enum';
import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';

export default class CallsCountVariableDashboard extends AbstractDashboard {
	static type = 'callsCountVariable';
	id = 0;
	aggParam = 'id';
	options = {
		name: 'Calls Count (Variable)',
		visualization: Visualizations.DOUGHNUT_CHART,
		aggregation: AggregationParams.COUNT,
		param: VisualizationParams.VARIABLES,
		relative: false,
		limit: 10,
		variable: '',
	};

	visualizationOptions = [
		Visualizations.DOUGHNUT_CHART,
		Visualizations.BAR_CHART,
	];

	constructor(snapshot) {
		super();
		if (snapshot) {
			this.id = snapshot.id;
			this.options = {
				...this.options,
				...snapshot.options,
			};
		}
	}

	getDisplayName = () => `${CallsCountVariableDashboard.type}Dashboard`;

	getResponseParam() {
		return `${this.options.param}.${snakeToCamel(this.options.variable)}`;
	}

	getSnapshot() {
		const snapshot = {
			type: CallsCountVariableDashboard.type,
			id: this.id,
			options: this.options,
		};
		return snapshot;
	}
}
