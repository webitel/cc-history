export default {
  reusable: {
    answer: 'Answer',
    reject: 'Reject',
    send: 'Send',
    add: 'Add',
    ok: 'OK',
    save: 'Save',
    cancel: 'Cancel',
    close: 'Close',
    logout: 'Logout',
    search: 'Search',
    description: 'Description',
    settings: 'Settings',
    history: 'History',
    download: 'Download',
    from: 'From',
    to: 'To',
  },
  headerSection: {
    filesLoaded: 'Files loaded: ',
    zippingProgress: 'Zipping progress: ',
    exportCSV: 'Export CSV',
  },
  registry: {
    registry: 'History',
    openedCall: {
      callInfo: 'Call info',
      agentDescription: 'Agent description',
      callLegs: 'Legs A-B',
      transferFrom: 'Transfer From',
      transferMerge: 'Call Merge',
      transferTo: 'Transfer To',
      noVariables: 'There are no variables',
    },
  },
  dashboards: {
    dashboards: 'Dashboards',
    newBtn: 'New Dashboard',
    dashboardSelect: 'Select dashboard:',
    dashboardConfig: 'Dashboard configuration:',
    interval: 'Interval',
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
      title: 'No data',
      description: 'Please check filters query',
    },
    callsByPeriod: {
      title: 'Calls by period',
      description: 'Represents the number of calls based on the selected filters and period',
    },
    callsCount: {
      title: 'Calls count',
      description: 'Groups calls count on doughnut diagram based on the selected filters',
    },
    callsCountMetric: {
      title: 'Calls count (metrics)',
      description: 'Represents number of calls based on the selected filters and period',
    },
    callsCountVariable: {
      title: 'Calls count (variables)',
      description: 'Represents number of calls based where variable option was selected, on the selected filters and period',
    },
    callsDuration: {
      title: 'Calls duration',
      description: 'Groups overall calls duration based on the selected filters',
    },
    callsDurationMetric: {
      title: 'Calls duration (metrics)',
      description: 'Represents numeric duration of calls based on the selected filters and period',
    },
  },
  fields: {
    agent: 'Agent',
    cause: 'Hangup cause',
    direction: 'Direction',
    duration: 'Duration',
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
    reportingSec: 'Reporting',
    queueWaitSec: 'Queue wait',
    queueDurationSec: 'Queue duration',
    result: 'Result',
    sipCode: 'SIP code',
  },
  components: {
    dtPicker: {
      from: 'From:',
      to: 'To:',
    },
    duration: {
      from: 'From (sec):',
      to: 'To (sec):',
    },
    columnSelect: {
      header: 'Select columns to show:',
    },
  },
};
