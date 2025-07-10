import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Răspunde',
    reject: 'Respinge',
    logout: 'Deconectare',
    description: 'Descriere',
    settings: 'Setări',
    history: 'Istoric',
    download: 'Descarcă',
    both: 'Ambele',
    logs: 'Jurnal | Jurnale',
    display: 'Afișare',
  },
  confirmDelete: {
    title: 'Confirmare ștergere',
    askConfirmation:
      'Sigur doriți să ștergeți {count} element? | Sigur doriți să ștergeți {count} elemente?',
  },
  headerSection: {
    filesLoaded: 'Fișiere încărcate: ',
    zippingProgress: 'Progres arhivare: ',
    exportPopup: {
      separator: 'Separator',
    },
  },
  registry: {
    registry: 'Istoric',
    call: {
      callInfo: 'Informații apel',
      agentDescription: "Comentariul agentului",
      callLegs: 'Segmente A-B',
      transferFrom: 'Transfer de la',
      transferMerge: 'Îmbinare apel',
      transferTo: 'Transfer către',
      noInfo: 'Nu există informații',
      callVisualization: 'Vizualizare apel',
      hold: 'Așteptare | Așteptări',
      comment: 'Notă | Note',
      wave: {
        wave: 'Undă apel',
      },
      stt: {
        noTranscript: 'Nu există transcriere pentru acest fișier',
        transcribingInProgress:
          'Transcrierea este în curs. Vă rugăm să reîmprospătați pagina într-un minut.',
      },
      evaluation: {
        rateTheCall: 'Evaluează apelul',
        evaluation: 'Evaluare',
        scorecard: 'Fișă de evaluare',
        comment: 'Comentariu',
        selectTheScorecard: 'Selectează fișa de evaluare',
        noEvaluation: 'Apelul nu a fost evaluat încă',
        optional: 'Opțional',
        mandatory: 'Obligatoriu',
      },
    },
    stt: {
      transcription: 'Transcriere | Transcrieri',
      downloadTxt: 'Descarcă TXT',
      transcribe: 'Transcrie',
      jobState: {
        idle: 'Inactiv',
      },
      error: 'A apărut o eroare în timpul transcrierii apelului',
    },
    recordings: {
      recording: 'Înregistrare | Înregistrări',
    },
  },
  dashboards: {
    dashboards: 'Tablouri de bord',
    newBtn: 'Tablou de bord nou',
    dashboardSelect: 'Selectează tabloul de bord:',
    dashboardConfig: 'Configurare tablou de bord:',
    interval: {
      interval: 'Interval',
      options: {
        auto: 'Auto',
        min: '{value} min | {value} min',
        hour: '{value} oră | {value} ore',
        day: '{value} zi | {value} zile',
        week: '{value} săptămână | {value} săptămâni',
        month: '{value} lună | {value} luni',
        year: '{value} an | {value} ani',
      },
    },
    dashboardConfigForm: {
      name: 'Nume',
      visualization: 'Vizualizare',
      aggregation: 'Agregare',
      param: 'Parametru vizualizare',
      relative: 'Afișează valori relative (%)',
      limit: {
        limit: 'Înregistrări de top',
        5: 'Top-5 înregistrări',
        10: 'Top-10 înregistrări',
        15: 'Top-15 înregistrări',
        20: 'Top-20 înregistrări',
      },
      variable: 'Variabilă',
    },
    visualizations: {
      doughnut: 'Diagramă inelară',
      bar: 'Bară',
      line: 'Linie',
      metric: 'Metrică',
    },
    aggregations: {
      count: 'COUNT: Numărare',
      min: 'MIN: Valoare minimă',
      max: 'MAX: Valoare maximă',
      sum: 'SUM: Valoare sumată',
      avg: 'AVG: Valoare medie',
    },
    bridged: {
      true: 'Conectat',
      false: 'Abandonat',
    },
    empty: {
      resultSearch: 'Vă rugăm să verificați interogarea filtrelor',
      workspace: 'Nu există apeluri astăzi',
    },
    callsByPeriod: {
      title: 'Apeluri după perioadă',
      description:
        'Reprezintă numărul de apeluri bazat pe filtrele și perioada selectate',
    },
    callsCount: {
      title: 'Număr de apeluri',
      description:
        'Grupează numărul de apeluri pe diagramă inelară bazat pe filtrele selectate',
    },
    callsCountMetric: {
      title: 'Număr de apeluri (metrici)',
      description:
        'Reprezintă numărul de apeluri bazat pe filtrele și perioada selectate',
    },
    callsCountVariable: {
      title: 'Număr de apeluri (variabile)',
      description:
        'Reprezintă numărul de apeluri unde a fost selectată opțiunea variabilă, bazat pe filtrele și perioada selectate',
    },
    callsDuration: {
      title: 'Durata apelurilor',
      description:
        'Grupează durata totală a apelurilor bazat pe filtrele selectate',
    },
    callsDurationMetric: {
      title: 'Durata apelurilor (metrici)',
      description:
        'Reprezintă durata numerică a apelurilor bazat pe filtrele și perioada selectate',
    },
  },
  fields: {
    agent: 'Agent',
    cause: 'Cauză închidere',
    direction: 'Direcție',
    duration: 'Durată totală',
    from: 'De la',
    to: 'Către',
    dateTime: 'Dată & Oră:',
    gateway: 'Gateway',
    queue: 'Coadă',
    team: 'Echipă',
    type: 'Tip',
    user: 'Utilizator',
    date: 'Dată',
    time: 'Oră',
    answeredAt: 'Răspuns la',
    bridgedAt: 'Conectat la',
    queueBridgedAt: 'Coadă conectată la',
    joinedAt: 'Alăturat la',
    leavingAt: 'Părăsire la',
    hangupAt: 'Închidere la',
    hangupPhrase: 'Descriere închidere',
    reportingAt: 'Raportare la',
    extension: 'Extensie',
    destination: 'Destinație',
    member: 'Membru',
    hangupBy: 'Închis de',
    tags: 'Etichete',
    display: 'Afișare',
    holdSec: 'Așteptare',
    waitSec: 'Așteptare',
    billSec: 'Facturare',
    talkSec: 'Durată conversație',
    reportingSec: 'Raportare',
    queueWaitSec: 'Așteptare în coadă',
    queueDurationSec: 'Durată în coadă',
    result: 'Rezultat',
    sipCode: 'Cod SIP',
    agentDescription: 'Comentariul agentului',
    amd: 'AMD',
    amdResult: 'Rezultat AMD',
    hangupDisposition: 'Dispoziție închidere',
    blindTransfer: 'Transfer orb',
    grantee: 'Beneficiar',
    ratedBy: 'Evaluat de',
    score: 'Scor',
    memberId: 'ID membru',
    attemptId: 'ID încercare',
    postProcessing: 'Postprocesare',
    contact: 'Contact',
  },
  variableColumnSelect: {
    title: 'Selectează coloanele variabile',
  },
  hangupDisposition: {
    notAnswered: 'Fără răspuns',
    cancelled: 'Anulat',
    agentDropped: 'Agent a închis',
    clientDropped: 'Client a închis',
    error: 'Eroare',
    ended: 'Încheiat de sistem',
  },
  filters: {
    tag: {
      options: {
        vm: 'Mesagerie vocală',
      },
    },
    search: {
      [SearchMode.Search]: 'Căutare regulată',
      [SearchMode.Fts]: 'Căutare text complet',
      [SearchMode.Description]: "Comentariul agentului",
    },
    hasFile: 'Are înregistrare',
    hasTranscription: 'Are transcriere',
    rated: 'Evaluat',
    duration: 'Durată totală (Sec)',
    talkSec: 'Durată conversație (Sec)',
    score: 'Scor (%)',
    variableSearchHint: 'Format interogare: "cheie=valoare"',
  },
  components: {
    dtPicker: {
      from: 'De la:',
      to: 'Până la:',
    },
    columnSelect: {
      header: 'Selectează coloanele de afișat:',
    },
  },
};
