<template>
	<wt-page-wrapper
		:actions-panel="false"
		:hide-header="viewMode"
	>
		<template #header>
			<wt-page-header
				hide-primary
				:secondary-action="closeTab"
			>
				<wt-breadcrumb :path="path" />
			</wt-page-header>
		</template>

		<template #main>
			<wt-loader v-if="isLoading" />
			<div
				v-else
				class="history-tabs-wrapper"
			>
				<wt-tabs
					:current="currentTab"
					:tabs="tabs"
					@change="changeTab"
				/>
				<component
					:is="currentTab.value"
					v-if="mainCall"
					:call="mainCall"
					:namespace="namespace"
				/>
			</div>
		</template>
	</wt-page-wrapper>
</template>

<script>
import { EngineCallFileType } from '@webitel/api-services/gen/models';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { storeToRefs } from 'pinia';
import { mapActions, mapState } from 'vuex';

import CallTabsPathNames from '../../../../../../../app/router/_internals/CallTabsPathNames.enum.js';
import historyRegistryQueriesMixin from '../../../mixins/historyRegistryQueries.mixin.js';
import { useRegistryStore } from '../../../store/new/registry.store.js';
import CallInfo from './call-info/call-info.vue';
import CallLegs from './call-legs/call-legs.vue';
import CallVisualization from './call-visualization/call-visualization.vue';
import VideoCallRecording from './video-call-recording/video-call-recording.vue';

export default {
	name: 'TheCall',
	components: {
		CallInfo,
		CallLegs,
		CallVisualization,
		VideoCallRecording,
	},
	mixins: [
		historyRegistryQueriesMixin,
	],
	props: {
		viewMode: {
			type: Boolean,
			default: false,
		},
	},
	setup: () => {
		const tableStore = useRegistryStore();

		const { fields } = storeToRefs(tableStore);

		return {
			fields,
		};
	},
	data: () => ({
		namespace: 'registry/call',
	}),
	computed: {
		...mapState({
			mainCall(state) {
				return getNamespacedState(state, this.namespace).mainCall;
			},
			isLoading(state) {
				return getNamespacedState(state, this.namespace).isLoading;
			},
		}),
		showCallVisualizationTab() {
			const hasTranscripts = this.mainCall?.transcripts?.length;
			const hasPendingTranscriptJobs = this.mainCall?.filesJob?.length;
			const hasAudio = this.mainCall?.files?.[EngineCallFileType.FileTypeAudio];
			const hasScreenRecordings =
				this.mainCall?.files?.[EngineCallFileType.FileTypeScreensharing];

			return (
				hasTranscripts ||
				hasPendingTranscriptJobs ||
				hasAudio ||
				hasScreenRecordings
			);
		},
		showVideoRecordingTab() {
			const hasVideo = this.mainCall?.files?.[EngineCallFileType.FileTypeVideo];
			const hasScreenshots =
				this.mainCall?.files?.[EngineCallFileType.FileTypeScreenshot];
			const hasScreenshotPdfs =
				this.mainCall?.files?.[EngineCallFileType.FileTypePdf];

			return hasVideo || hasScreenshots || hasScreenshotPdfs;
		},
		tabs() {
			// Use different route names for view mode vs regular mode
			const prefix = this.viewMode ? 'call_view-' : '';

			const tabs = [
				{
					text: this.$t('registry.call.callInfo'),
					value: 'call-info',
					pathName: `${prefix}${CallTabsPathNames.CALL_INFO}`,
					show: true,
				},
				{
					text: this.$t('registry.call.callLegs'),
					value: 'call-legs',
					pathName: `${prefix}${CallTabsPathNames.LEGS_A_B}`,
					show: !!this.mainCall.hasChildren,
				},
				{
					text: this.$t('registry.call.callVisualization'),
					value: 'call-visualization',
					pathName: `${prefix}${CallTabsPathNames.CALL_VISUALIZATION}`,
					show: this.showCallVisualizationTab,
				},
				{
					text: this.$t('registry.call.videoCallRecording'),
					value: 'video-call-recording',
					pathName: `${prefix}${CallTabsPathNames.VIDEO_CALL_RECORDING}`,
					show: this.showVideoRecordingTab,
				},
			];

			return tabs.filter(({ show }) => show);
		},
		callId() {
			return this.$route.params?.pathMatch;
		},
		path() {
			return [
				{
					name: this.$t('registry.registry'),
				},
				{
					name: `${this.$t('registry.call.callInfo')} (${this.callId})`,
				},
			];
		},
		currentTab() {
			return (
				this.tabs.find(({ pathName }) => this.$route.name === pathName) ||
				this.tabs[0]
			);
		},
	},
	async created() {
		this.setMainCall({
			id: this.callId,
			fields: this.fields,
			skipParent: false,
		});
	},
	unmounted() {
		this.resetMainCall();
	},
	methods: {
		...mapActions({
			setMainCall(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_OPENED_CALL`, payload);
			},
			resetMainCall(dispatch, payload) {
				return dispatch(`${this.namespace}/RESET_OPENED_CALL`, payload);
			},
		}),
		changeTab(tab) {
			this.$router.push({
				...this.$route,
				name: tab.pathName,
			});
		},
		closeTab() {
			// Need to close the tab if you moved from another application
			// https://webitel.atlassian.net/browse/WTEL-4552

			if (window.history.length === 1) window.close();
			this.$router.push({
				name: 'history',
			});
		},
	},
};
</script>

<style
	lang="scss"
	scoped
>
.history-tabs-wrapper {
	display: flex;
	flex-direction: column;
	width: 100%;
	gap: var(--spacing-sm);
}
</style>
