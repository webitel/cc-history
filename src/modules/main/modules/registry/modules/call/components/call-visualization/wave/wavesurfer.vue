<template>
  <div id="wavesurfer"></div>
</template>

<script>
import WaveSurfer from 'wavesurfer.js';

export default {
  props: ['src', 'options'],
  data() {
    return {
      waveSurfer: {},
    };
  },
  mounted() {
    const { options } = this;
    const wsOptions = { container: document.getElementById('wavesurfer'), ...options };
    this.waveSurfer = new WaveSurfer.create(wsOptions);
    this.waveSurfer.load(this.src);
  },
  beforeDestroy() {
    this.waveSurfer.destroy();
  },
};
</script>

<style lang="css" scoped>
#wavesurfer {
  position: relative;
}
</style>
