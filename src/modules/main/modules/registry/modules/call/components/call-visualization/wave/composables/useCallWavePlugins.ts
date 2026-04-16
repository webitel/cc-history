// Instantiates WaveSurfer plugins (regions, hover, timeline, zoom) and shared `waveOptions` for the player.
import { convertDuration } from '@webitel/ui-sdk/scripts';
import Hover from 'wavesurfer.js/plugins/hover';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';
import Timeline from 'wavesurfer.js/plugins/timeline';
import ZoomPlugin from 'wavesurfer.js/plugins/zoom';

const WAVE_HEIGHT = 96;
const TIMELINE_HEIGHT = 20;
const ZOOM_MAX_PX_PER_SEC = 20000;

export function useCallWavePlugins() {
	const regionsPlugin = RegionsPlugin.create();
	const hoverPlugin = Hover.create({
		labelBackground: 'var(--contrast-color)',
		labelColor: 'var(--main-color)',
		formatTimeCallback: convertDuration,
	});
	// Timeline must live inside getWrapper() so its width matches the waveform; a light-DOM container is viewport-wide and clips ticks when zoomed/scrolled.
	const timelinePlugin = Timeline.create({
		height: TIMELINE_HEIGHT,
		primaryLabelInterval: 5,
		secondaryLabelInterval: 0,
		formatTimeCallback: convertDuration,
		style: {
			fontFamily: 'Montserrat, monospace',
			color: 'hsla(225, 20%, 50%, 1)',
			fontSize: '12px',
		},
	});
	const zoomPlugin = ZoomPlugin.create({
		scale: 0.5,
		deltaThreshold: 5,
		maxZoom: ZOOM_MAX_PX_PER_SEC,
		exponentialZooming: false,
	});

	const waveOptions = {
		cursorWidth: 2,
		height: WAVE_HEIGHT,
		splitChannels: [
			{
				height: WAVE_HEIGHT,
				overlay: false,
				progressColor: 'hsla(119, 60%, 40%, 0.8)',
			},
			{
				height: WAVE_HEIGHT,
				overlay: false,
				progressColor: 'hsl(42, 100%, 50%)',
			},
		],
		plugins: [
			hoverPlugin,
			timelinePlugin,
			regionsPlugin,
			zoomPlugin,
		],
	};

	return {
		regionsPlugin,
		waveOptions,
	};
}
