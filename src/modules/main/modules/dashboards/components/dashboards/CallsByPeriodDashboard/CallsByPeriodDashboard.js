import {
	AggregationParams,
	VisualizationParams,
} from '../../../api/params/DashboardParams.enum';
import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';

export default class CallsByPeriodDashboard extends AbstractDashboard {
	static type = 'callsByPeriod';
	id = 0;
	aggParam = 'id';
	options = {
		name: 'Calls By Period',
		visualization: Visualizations.LINE_CHART,
		aggregation: AggregationParams.COUNT,
		param: VisualizationParams.DIRECTION,
		relative: null,
		limit: 10,
	};

	paramOptions = Object.values(VisualizationParams).filter(
		(param) => param !== VisualizationParams.VARIABLES,
	);

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

	getDisplayName = () => `${CallsByPeriodDashboard.type}Dashboard`;

	getSnapshot() {
		const snapshot = {
			type: CallsByPeriodDashboard.type,
			id: this.id,
			options: this.options,
		};
		return snapshot;
	}
}
