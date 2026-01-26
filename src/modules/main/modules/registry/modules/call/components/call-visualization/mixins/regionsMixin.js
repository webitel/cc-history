import { FormatDateMode } from '@webitel/ui-sdk/enums';
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import { formatDate } from '@webitel/ui-sdk/utils';

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
  height: '140px',
  overflow: 'auto',
  zIndex: 'var(--tooltip-z-index)',
};

const holdStyle = {
  backgroundColor: 'var(--hold-color)',
  width: '4px',
};

const formatCommentDate = (dateString) => formatDate(+dateString, FormatDateMode.DATETIME);

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
    const { creationDateEl, commentAuthorEl, hr } =
      createHeaderBlock(updatedBy);
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
    async updateRegions() {
      this.closeCommentMode();
      this.redrawRegions();
    },

    redrawRegions() {
      this.player.clearRegions();
      if (this.showHolds && this.holdsSize) {
        this.displayHolds(this.call.hold, this.player);
      }
      if (this.showComments && this.commentsSize) {
        this.displayComments(this.annotations, this.player);
      }
    },

    displayHoldIcons(region, hold) {
      const { wrapperEl, iconEl, tooltipEl} = this.createIcon(
        region,
        this.player,
      );
      tooltipEl.innerText = hold.sec ? convertDuration(hold.sec) : '00:00:00';
      iconEl.innerHTML =
        '<svg width="24" height="24" fill="var(--hold-color)"><use xlink:href="#pause"</svg>';
      region.element.appendChild(wrapperEl);
    },

    // Displays hold markers on audio timeline, accounting for recording delay and that holds aren't in the audio file
    displayHolds(hold, player) {
      const audioFile = this.call.files.file_type_audio[0];
      const callStart = this.convertCreatedAtToTimestamp(this.call.createdAt);
      const actualAudioDuration = player.getDuration();

      let accumulatedHoldTime = 0;

      hold.forEach((holdItem) => {
        const holdDuration = holdItem.stop - holdItem.start;
        let position;

        // Hold before recording started
        if (holdItem.start < audioFile.startAt) {
          position = 0;
        }
        // Hold after recording ended
        else if (holdItem.start >= audioFile.stopAt) {
          position = actualAudioDuration
        }
        // Hold during recording - adjust for delay and previous holds
        else {
          const offset = holdItem.start - audioFile.startAt;
          const delay = audioFile.startAt - callStart;
          position = (offset - delay - accumulatedHoldTime) / 1000;
          accumulatedHoldTime += holdDuration;
        }

        const region = player.addRegion({
          start: position.toFixed(2),
          showTooltip: false,
          handleStyle: {
            right: holdStyle,
            left: holdStyle,
          },
        });

        this.displayHoldIcons(region, holdItem);
      });

      this.blockRegionResize(player);
    },

    // Converts formatted date string "dd.MM.yyyy, HH:mm:ss" to Unix timestamp in milliseconds
    convertCreatedAtToTimestamp(createdAt) {
      const [datePart, timePart] = createdAt.split(', ');
      const [day, month, year] = datePart.split('.');
      const [hours, minutes, seconds] = timePart.split(':');

      return new Date(year, month - 1, day, hours, minutes, seconds).getTime();
    },

    displayCommentIcons(region, comment) {
      const { wrapperEl, iconEl, tooltipEl } = this.createIcon(
        region,
        this.player,
      );
      const noteEl = document.createElement('p');
      noteEl.innerText = `"${comment.note}"`;
      iconEl.innerHTML =
        '<svg width="24" height="24" fill="var(--transfer-color)"><use xlink:href="#hs-note"</svg>';
      const commentHeader = createCommentHeader(comment);
      tooltipEl.style.width = '300px';
      const difference =
        region.element.offsetLeft + 300 - this.player.drawer.getWidth();
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

    displayComments(annotations, player) {
      annotations.forEach((comment) => {
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
      wrapperEl.style.left =
        region.element.offsetLeft < 30 ? 'var(--spacing-sm)' : '-26px';
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
      Object.keys(player.regions.list).forEach((region) => {
        player.regions.list[region].update({
          resize: false,
          drag: false,
        });
      });
    },
  },
};
