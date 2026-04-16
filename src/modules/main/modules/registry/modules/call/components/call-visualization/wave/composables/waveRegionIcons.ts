// Region icon + tooltip DOM injected with Vue render(); keeps positions aligned on zoom and region updates.
import type { Region } from 'wavesurfer.js/plugins/regions';
import type WaveSurfer from 'wavesurfer.js';
import { h, nextTick, render, type VNode, type VNodeArrayChildren } from 'vue';

const tooltipStyle: Record<string, string> = {
	minWidth: '0',
	boxSizing: 'border-box',
	position: 'absolute',
	padding: 'var(--tooltip-padding)',
	color: 'var(--wt-tooltip-text-color)',
	background: 'var(--wt-tooltip-background-color)',
	borderRadius: 'var(--border-radius)',
	boxShadow: 'var(--box-shadow)',
	transition: 'var(--transition)',
	opacity: '0',
	pointerEvents: 'none',
	height: '140px',
	overflow: 'auto',
	zIndex: 'var(--tooltip-z-index)',
};

const NEAR_WAVE_START_PX = 30;

function getWaveformScrollWidth(player: WaveSurfer): number {
	const wrapper = player.getWrapper();
	const scrollElement = wrapper.parentElement;
	return scrollElement?.scrollWidth ?? 0;
}

function getRegionIconLeftCss(region: Region, player: WaveSurfer): string {
	const duration = player.getDuration();
	if (!duration || duration <= 0) {
		return '-28px';
	}
	const scrollWidth = getWaveformScrollWidth(player);
	if (!scrollWidth) {
		return '-28px';
	}
	const leftEdgePx = (region.start / duration) * scrollWidth;
	return leftEdgePx < NEAR_WAVE_START_PX ? 'var(--spacing-sm)' : '-28px';
}

function applyIconWrapLeft(
	mountElement: HTMLElement,
	region: Region,
	player: WaveSurfer,
): void {
	const iconWrap = mountElement.querySelector(
		'.wave-region-icon-wrap',
	) as HTMLElement | null;
	if (iconWrap) {
		iconWrap.style.left = getRegionIconLeftCss(region, player);
	}
}

function setTooltipVisibility(tooltipElement: HTMLElement, isVisible: boolean) {
	tooltipElement.style.pointerEvents = isVisible ? 'auto' : 'none';
	tooltipElement.style.opacity = isVisible ? '1' : '0';
}

function findWaveHoverElement(player: WaveSurfer): HTMLElement | null {
	const wrapper = player.getWrapper();
	const shadowRoot = wrapper.getRootNode();
	if (!(shadowRoot instanceof ShadowRoot)) {
		return null;
	}
	return shadowRoot.querySelector('[part~="hover"]') as HTMLElement | null;
}

function setWaveHoverVisibility(player: WaveSurfer, isVisible: boolean) {
	const hoverElement = findWaveHoverElement(player);
	if (!hoverElement) {
		return;
	}
	hoverElement.style.display = isVisible ? '' : 'none';
}

export interface MountRegionIconOverlayOptions {
	region: Region;
	player: WaveSurfer;
	iconFill: string;
	iconInnerHtml: string;
	tooltipWidth: string;
	tooltipContent: string | number | boolean | VNode | VNodeArrayChildren;
	onIconClick?: () => void;
}

export function mountRegionIconOverlay({
	region,
	player,
	iconFill,
	iconInnerHtml,
	tooltipWidth,
	tooltipContent,
	onIconClick,
}: MountRegionIconOverlayOptions): HTMLElement | null {
	if (!region.element) {
		return null;
	}
	const mountElement = document.createElement('div');
	mountElement.className = 'wave-region-icon-mount';
	region.element.appendChild(mountElement);

	const iconOverlayVNode = h(
		'div',
		{
			class: 'wave-region-icon-wrap',
			style: {
				position: 'absolute',
				cursor: 'pointer',
				zIndex: '9',
				left: getRegionIconLeftCss(region, player),
			},
		},
		[
			h('i', {
				class: 'wave-region-icon',
				innerHTML: `<svg width="24" height="24" fill="${iconFill}">${iconInnerHtml}</svg>`,
				onClick: onIconClick,
			}),
			h(
				'div',
				{
					class: 'wave-region-tooltip',
					style: {
						...tooltipStyle,
						width: tooltipWidth,
					},
				},
				tooltipContent,
			),
		],
	);

	render(iconOverlayVNode, mountElement);

	// After render(), the mount has layout so icon `left` can be adjusted.
	void nextTick(() => {
		applyIconWrapLeft(mountElement, region, player);
	});

	const unsubscribeRegionRender = region.on('render', () => {
		applyIconWrapLeft(mountElement, region, player);
	});
	const unsubscribeWaveSurferZoom = player.on('zoom', () => {
		requestAnimationFrame(() => {
			applyIconWrapLeft(mountElement, region, player);
			const tooltipWidthPx = parseFloat(tooltipWidth);
			if (!isNaN(tooltipWidthPx)) {
				adjustCommentTooltipPosition(
					mountElement,
					region,
					player,
					tooltipWidthPx,
				);
			}
		});
	});

	const iconWrapElement = mountElement.querySelector('.wave-region-icon-wrap');
	const tooltipElement = mountElement.querySelector(
		'.wave-region-tooltip',
	) as HTMLElement | null;
	if (iconWrapElement && tooltipElement) {
		iconWrapElement.addEventListener('mouseenter', () => {
			setTooltipVisibility(tooltipElement, true);
			setWaveHoverVisibility(player, false);
		});
		iconWrapElement.addEventListener('mouseleave', () => {
			setTooltipVisibility(tooltipElement, false);
			setWaveHoverVisibility(player, true);
		});
	}

	region.once('remove', () => {
		unsubscribeRegionRender();
		unsubscribeWaveSurferZoom();
		render(null, mountElement);
		mountElement.remove();
	});

	return mountElement;
}

export function adjustCommentTooltipPosition(
	mountElement: HTMLElement,
	region: Region,
	player: WaveSurfer,
	tooltipWidthPx: number,
) {
	applyIconWrapLeft(mountElement, region, player);
	const tooltipElement = mountElement.querySelector(
		'.wave-region-tooltip',
	) as HTMLElement | null;
	if (!tooltipElement || !region.element) {
		return;
	}
	const duration = player.getDuration();
	const scrollWidth = getWaveformScrollWidth(player);
	if (!duration || !scrollWidth) {
		return;
	}
	const leftEdgePx = (region.start / duration) * scrollWidth;
	// If the tooltip overflows the right edge of the waveform, shift it left.
	const overflowPx = leftEdgePx + tooltipWidthPx - player.getWidth();
	if (overflowPx > 0) {
		tooltipElement.style.left = `-${overflowPx}px`;
	}
}
