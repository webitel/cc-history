import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { mapActions } from 'vuex';

const tooltipStyle = {
  minWidth: 0,
  boxSizing: 'border-box',
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

const holdStyle = {
  backgroundColor: 'var(--hold-color)',
  width: '4px',
};

const formatCommentDate = (dateString) => new Date(+dateString).toLocaleString('uk-UA', {
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
});

const createHeaderBlock = (changedBy) => {
  const commentAuthorEl = document.createElement('p');
  commentAuthorEl.innerText = changedBy;
  commentAuthorEl.style.fontSize = '14px';
  commentAuthorEl.style.fontWeight = '700';

  const creationDateEl = document.createElement('p');
  creationDateEl.style.fontSize = '12px';

  const hr = document.createElement('hr');
  hr.style.background = 'var(--secondary-color)';
  return { creationDateEl, commentAuthorEl, hr };
};

const createCommentHeader = (comment) => {
  const commentHeader = document.createElement('div');
  if (comment.updatedAt !== comment.createdAt) {
    const updatedAt = formatCommentDate(comment.updatedAt);
    const updatedBy = comment.updatedBy.name || comment.updatedBy.id;
    const { creationDateEl, commentAuthorEl, hr } = createHeaderBlock(updatedBy);
    creationDateEl.innerText = `Updated: ${updatedAt}`;
    commentHeader.appendChild(commentAuthorEl);
    commentHeader.appendChild(creationDateEl);
    commentHeader.appendChild(hr);
  }
  const createdAt = formatCommentDate(comment.createdAt);
  const createdBy = comment.createdBy.name || comment.createdBy.id;
  const { creationDateEl, commentAuthorEl, hr } = createHeaderBlock(createdBy);
  creationDateEl.innerText = `Created: ${createdAt}`;

  commentHeader.appendChild(commentAuthorEl);
  commentHeader.appendChild(creationDateEl);
  commentHeader.appendChild(hr);
  return commentHeader;
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
        const region = player.addRegion({
          start: ((hold.start - call.files[0].startAt) / 1000).toFixed(2),
          showTooltip: false,
          handleStyle: {
            right: holdStyle,
            left: holdStyle,
          },
        });
        this.displayHoldIcons(region, hold);
      });
      this.blockRegionResize(player);
    },

    displayCommentIcons(region, comment) {
      const { wrapperEl, iconEl, tooltipEl } = this.createIcon(region, this.player);
      const noteEl = document.createElement('p');
      noteEl.innerText = `"${comment.note}"`;
      iconEl.innerHTML = '<svg width="24" height="24" fill="var(--transfer-color)"><use xlink:href="#hs-note"</svg>';
      const commentHeader = createCommentHeader(comment);
      tooltipEl.style.width = '300px';
      const difference = region.element.offsetLeft + 300 - this.player.drawer.getWidth();
      if (difference > 0) {
        tooltipEl.style.left = `-${difference}px`;
      }
      tooltipEl.appendChild(commentHeader);
      tooltipEl.appendChild(noteEl);

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
      wrapperEl.style.left = region.element.offsetLeft < 30 ? 'var(--spacing-sm)' : '-26px';
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
