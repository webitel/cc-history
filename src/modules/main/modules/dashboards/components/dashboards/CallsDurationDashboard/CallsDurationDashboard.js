import {
	AggregationParams,
	VisualizationParams,
} from '../../../api/params/DashboardParams.enum';
import AbstractDashboard from '../AbstractDashboard/AbstractDashboard';
import Visualizations from '../enums/Visualizations.enum';

export default class CallsDurationDashboard extends AbstractDashboard {
	static type = 'callsDuration';
	id = 0;
	aggParam = 'duration';
	options = {
		name: 'Calls Duration',
		visualization: Visualizations.DOUGHNUT_CHART,
		aggregation: AggregationParams.AVG,
		param: VisualizationParams.DIRECTION,
		relative: false,
		limit: 10,
	};

	visualizationOptions = [
		Visualizations.DOUGHNUT_CHART,
		Visualizations.BAR_CHART,
	];
	aggregationOptions = Object.values(AggregationParams).filter(
		(agg) => agg !== AggregationParams.COUNT && agg !== AggregationParams.MIN,
	);

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

	getDisplayName = () => `${CallsDurationDashboard.type}Dashboard`;

	getSnapshot() {
		const snapshot = {
			type: CallsDurationDashboard.type,
			id: this.id,
			options: this.options,
		};
		return snapshot;
	}
}
