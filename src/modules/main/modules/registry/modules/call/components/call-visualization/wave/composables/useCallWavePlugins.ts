// Instantiates WaveSurfer plugins (regions, hover, timeline, zoom) and shared `waveOptions` for the player.
import { convertDuration } from '@webitel/ui-sdk/scripts';
import Hover from 'wavesurfer.js/plugins/hover';
import RegionsPlugin from 'wavesurfer.js/plugins/regions';
import Timeline from 'wavesurfer.js/plugins/timeline';
import ZoomPlugin from 'wavesurfer.js/plugins/zoom';

const WAVE_HEIGHT = 96;
const TIMELINE_HEIGHT = 20;
const ZOOM_MAX_PX_PER_SEC = 20000;

// wavesurfer renders to <canvas>, whose fillStyle can't resolve CSS `var(...)`,
// so we inline the palette values (styleguide colors.css + palette.css):
// --success-color -> --green-darken-4 (hue-green 121, saturation-darken-4 75%, lightness-darken-4 35%)
// --primary-color -> --amber-accent-3 (hue-amber 43, saturation-accent-3 97%, lightness-accent-3 50%)
const SUCCESS_COLOR = 'hsla(121, 75%, 35%, 1)';
const PRIMARY_COLOR = 'hsla(43, 97%, 50%, 1)';

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
				progressColor: SUCCESS_COLOR,
			},
			{
				height: WAVE_HEIGHT,
				overlay: false,
				progressColor: PRIMARY_COLOR,
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
		timelinePlugin,
		waveOptions,
	};
}
