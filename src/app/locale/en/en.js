import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Answer',
    reject: 'Reject',
    logout: 'Logout',
    description: 'Description',
    settings: 'Settings',
    history: 'History',
    download: 'Download',
    both: 'Both',
    logs: 'Log | Logs',
    display: 'Display',
  },
  confirmDelete: {
    title: 'Delete confirmation',
    askConfirmation:
      'Are you sure you want to delete {count} item? | Are you sure you want to delete {count} items?',
  },
  headerSection: {
    filesLoaded: 'Files loaded: ',
    zippingProgress: 'Zipping progress: ',
    exportPopup: {
      separator: 'Separator',
    },
  },
  registry: {
    registry: 'History',
    call: {
      callInfo: 'Call info',
      agentDescription: "Agent's comment",
      callLegs: 'Legs A-B',
      transferFrom: 'Transfer From',
      transferMerge: 'Call Merge',
      transferTo: 'Transfer To',
      noInfo: 'There is no info',
      callVisualization: 'Call visualization',
      hold: 'Hold | Holds',
      comment: 'Note | Notes',
      wave: {
        wave: 'Call Wave',
      },
      stt: {
        noTranscript: 'There is no transcription for this file',
        transcribingInProgress:
          'Transcription is in progress now. Please, refresh page in a minute.',
      },
      evaluation: {
        rateTheCall: 'Rate the call',
        evaluation: 'Evaluation',
        scorecard: 'Scorecard',
        comment: 'Comment',
        selectTheScorecard: 'Select the scorecard',
        noEvaluation: 'The call is not rated yet',
        optional: 'Optional',
        mandatory: 'Mandatory',
      },
    },
    stt: {
      transcription: 'Transcription | Transcriptions',
      downloadTxt: 'Download TXT',
      transcribe: 'Transcribe',
      jobState: {
        idle: 'Idle',
      },
      error: 'There was an error during call transcription',
    },
    recordings: {
      recording: 'Recording | Recordings',
    },
  },
  dashboards: {
    dashboards: 'Dashboards',
    newBtn: 'New Dashboard',
    dashboardSelect: 'Select dashboard:',
    dashboardConfig: 'Dashboard configuration:',
    interval: {
      interval: 'Interval',
      options: {
        auto: 'Auto',
        min: '{value} min | {value} mins',
        hour: '{value} hour | {value} hours',
        day: '{value} day | {value} days',
        week: '{value} week | {value} weeks',
        month: '{value} month | {value} months',
        year: '{value} year | {value} years',
      },
    },
    dashboardConfigForm: {
      name: 'Name',
      visualization: 'Visualization',
      aggregation: 'Aggregation',
      param: 'Visualization param',
      relative: 'Show relative values (%)',
      limit: {
        limit: 'Top records',
        5: 'Top-5 records',
        10: 'Top-10 records',
        15: 'Top-15 records',
        20: 'Top-20 records',
      },
      variable: 'Variable',
    },
    visualizations: {
      doughnut: 'Doughnut',
      bar: 'Bar',
      line: 'Line',
      metric: 'Metric',
    },
    aggregations: {
      count: 'COUNT: Count',
      min: 'MIN: Minimum value',
      max: 'MAX: maximum value',
      sum: 'SUM: summarized value',
      avg: 'AVG: average value',
    },
    bridged: {
      true: 'Connected',
      false: 'Abandoned',
    },
    empty: {
      resultSearch: 'Please check filters query',
      workspace: 'There aren’t calls today',
    },
    callsByPeriod: {
      title: 'Calls by period',
      description:
        'Represents the number of calls based on the selected filters and period',
    },
    callsCount: {
      title: 'Calls count',
      description:
        'Groups calls count on doughnut diagram based on the selected filters',
    },
    callsCountMetric: {
      title: 'Calls count (metrics)',
      description:
        'Represents number of calls based on the selected filters and period',
    },
    callsCountVariable: {
      title: 'Calls count (variables)',
      description:
        'Represents number of calls based where variable option was selected, on the selected filters and period',
    },
    callsDuration: {
      title: 'Calls duration',
      description:
        'Groups overall calls duration based on the selected filters',
    },
    callsDurationMetric: {
      title: 'Calls duration (metrics)',
      description:
        'Represents numeric duration of calls based on the selected filters and period',
    },
  },
  fields: {
    agent: 'Agent',
    cause: 'Hangup cause',
    direction: 'Direction',
    duration: 'Total duration',
    from: 'From',
    to: 'To',
    dateTime: 'Date & Time:',
    gateway: 'Gateway',
    queue: 'Queue',
    team: 'Team',
    type: 'Type',
    user: 'User',
    date: 'Date',
    time: 'Time',
    answeredAt: 'Answered at',
    bridgedAt: 'Bridged at',
    queueBridgedAt: 'Queue bridged at',
    joinedAt: 'Joined at',
    leavingAt: 'Leaving at',
    hangupAt: 'Hangup at',
    hangupPhrase: 'Hangup description',
    reportingAt: 'Reporting at',
    extension: 'Extension',
    destination: 'Destination',
    member: 'Member',
    hangupBy: 'Hangup by',
    tags: 'Tags',
    display: 'Display',
    holdSec: 'Hold',
    waitSec: 'Wait',
    billSec: 'Billing',
    talkSec: 'Talk duration',
    reportingSec: 'Reporting',
    queueWaitSec: 'Queue wait',
    queueDurationSec: 'Queue duration',
    result: 'Result',
    sipCode: 'SIP code',
    agentDescription: 'Agent`s comment',
    amd: 'AMD',
    amdResult: 'AMD result',
    hangupDisposition: 'Hangup disposition',
    blindTransfer: 'Blind transfer',
    grantee: 'Grantee',
    ratedBy: 'Rated by',
    score: 'Score',
    memberId: 'Member Id',
    attemptId: 'Attempt Id',
    postProcessing: 'Postprocessing',
    contact: 'Contact',
  },
  variableColumnSelect: {
    title: 'Select variables columns',
  },
  hangupDisposition: {
    notAnswered: 'Not answered',
    cancelled: 'Cancelled',
    agentDropped: 'Agent dropped',
    clientDropped: 'Client dropped',
    error: 'Error',
    ended: 'Ended by system',
  },
  filters: {
    tag: {
      options: {
        vm: 'Voice mail',
      },
    },
    search: {
      [SearchMode.Search]: 'Regular search',
      [SearchMode.Fts]: 'Full text search',
      [SearchMode.Description]: "Agent's comment",
    },
    hasFile: 'Has recording',
    hasTranscription: 'Has transcription',
    rated: 'Rated',
    duration: 'Total duration (Sec)',
    talkSec: 'Talk duration (Sec)',
    score: 'Score (%)',
    variableSearchHint: 'Query format: "key=value"',
  },
  components: {
    dtPicker: {
      from: 'From:',
      to: 'To:',
    },
    columnSelect: {
      header: 'Select columns to show:',
    },
  },
};
