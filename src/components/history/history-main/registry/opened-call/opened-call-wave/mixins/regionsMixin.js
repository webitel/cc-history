import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { mapActions } from 'vuex';

const tooltipStyle = {
  minWidth: 0,
  position: 'absolute',
  padding: 'var(--tooltip-padding)',
  color: 'var(--tooltip-light-text-color)',
  background: 'var(--tooltip-light-bg-color)',
  borderRadius: 'var(--border-radius)',
  boxShadow: 'var(--box-shadow)',
  transition: 'var(--transition)',
  opacity: '0',
  pointerEvents: 'none',
  zIndex: 'var(--tooltip-z-index)',
};

const getHoldSecInterval = ({ hold, file }) => {
  const start = ((hold.start - file.startAt) / 1000).toFixed(2);
  const end = ((hold.stop - file.startAt) / 1000).toFixed(2);
  return {
    start,
    end,
  };
};

export default {
  data: () => ({
    showComments: false,
    showHolds: false,
  }),
  methods: {
    ...mapActions('registry/opened-call', { loadMainCall: 'LOAD_MAIN_CALL' }),

    async updateRegions() {
      this.closeCommentMode();
      await this.loadMainCall();
      this.redrawRegions();
    },

    redrawRegions() {
      this.player.clearRegions();
      if (this.showHolds && this.holdsSize) {
        this.displayHolds(this.call, this.player);
      }
      if (this.showComments && this.commentsSize) {
        this.displayComments(this.call, this.player);
      }
    },

    displayHoldIcons(region, hold) {
      const { wrapperEl, iconEl, tooltipEl } = this.createIcon(region, this.player);
      tooltipEl.innerText = hold.sec ? convertDuration(hold.sec) : '00:00:00';
      iconEl.innerHTML = '<svg width="24" height="24" fill="var(--hold-color)"><use xlink:href="#pause"</svg>';
      region.element.appendChild(wrapperEl);
    },

    displayHolds(call, player) {
      call.hold.forEach((hold) => {
        const hld = getHoldSecInterval({
          hold,
          file: call.files[0],
        });
        const region = player.addRegion({
          ...hld,
          color: 'hsla(var(--_hold-color), 0.2)',
          showTooltip: false,
        });
        this.displayHoldIcons(region, hold);
      });
      this.blockRegionResize(player);
    },

    displayCommentIcons(region, comment) {
      const { wrapperEl, iconEl, tooltipEl } = this.createIcon(region, this.player);
      tooltipEl.innerText = comment.note;
      iconEl.innerHTML = '<svg width="24" height="24" fill="var(--transfer-color)"><use xlink:href="#hs-note"</svg>';
      iconEl.onclick = () => {
        this.editAnnotation(comment);
      };
      region.element.appendChild(wrapperEl);
    },

    displayComments(call, player) {
      call.annotations.forEach((comment) => {
        const region = player.addRegion({
          start: +comment.startSec,
          end: +comment.endSec,
          showTooltip: false,
          color: 'hsla(var(--_transfer-color), 0.2)',
          resize: true,
        });
        this.displayCommentIcons(region, comment);
      });
      this.blockRegionResize(player);
    },

    toggleComments() {
      this.showComments = !this.showComments;
      this.redrawRegions();
    },
    toggleHolds() {
      this.showHolds = !this.showHolds;
      this.redrawRegions();
    },

    createIcon(region, player) {
      const wrapperEl = document.createElement('section');
      const tooltipEl = document.createElement('div');
      const iconEl = document.createElement('i');
      Object.assign(tooltipEl.style, tooltipStyle);
      wrapperEl.style.position = 'absolute';
      wrapperEl.style.cursor = 'pointer';
      wrapperEl.style.zIndex = '9';
      wrapperEl.style.left = region.element.offsetLeft < 30 ? 'var(--component-spacing)' : '-26px';
      wrapperEl.onmouseenter = () => {
        player.cursor.hideCursor();
        tooltipEl.style.pointerEvents = 'auto';
        tooltipEl.style.opacity = '1';
      };
      wrapperEl.onmouseleave = () => {
        player.cursor.showCursor();
        tooltipEl.style.pointerEvents = 'none';
        tooltipEl.style.opacity = '0';
      };
      wrapperEl.appendChild(iconEl);
      wrapperEl.appendChild(tooltipEl);
      return { wrapperEl, tooltipEl, iconEl };
    },
    blockRegionResize(player) {
      Object.keys(player.regions.list)
        .forEach((region) => {
          player.regions.list[region].update({
            resize: false,
            drag: false,
          });
        });
    },
  },
};
