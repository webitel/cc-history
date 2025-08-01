import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Жауап беру',
    reject: 'Бас тарту',
    logout: 'Шығу',
    description: 'Сипаттама',
    settings: 'Баптау',
    history: 'Тарих',
    download: 'Жүктеп алу',
    both: 'Барлығы',
    logs: 'Лог | Логтар',
    display: 'Көрсету',
  },
  confirmDelete: {
    title: 'Жоюды растау',
    askConfirmation:
      '{count} жазбасын  жойғыңыз келетініне сенімдісіз бе?  | {count} жазбасын  жойғыңыз келетініне сенімдісіз бе?',
  },
  headerSection: {
    filesLoaded: 'Жүктеп алынған файл:',
    zippingProgress: 'Мұрағаттау прогресі',
    exportPopup: {
      separator: 'Бөлгіш',
    },
  },
  registry: {
    registry: 'Тарих',
    call: {
      callInfo: 'Ақпарат',
      agentDescription: 'Оператордың түсініктемесі',
      callLegs: 'Аяқтар A-B',
      transferFrom: '.....ауыстыру',
      transferMerge: 'Қоңырауларды біріктіру',
      transferTo: '.... ауыстыру',
      noInfo: 'Бұл қоңырауда ақпарат жоқ',
      callVisualization: 'Қоңырау визуализациясы',
      hold: 'Ұстап тұру | Ұстап тұру',
      comment: 'Түсініктеме | Түсініктемелер',
      wave: {
        wave: 'Қоңырауды белгілеу',
      },
      stt: {
        noTranscript: 'Файлдың транскрипциясы жоқ',
        transcribingInProgress:
          'Файл транскрипциялануда. Бір минуттан кейін бетті жаңартыңыз.',
      },
      evaluation: {
        rateTheCall: 'Қоңырауға баға беріңіз',
        evaluation: 'Бағалау',
        scorecard: 'Сауалнама',
        comment: 'Түсініктеме',
        selectTheScorecard: 'Сауалнаманы таңдаңыз',
        noEvaluation: 'Қоңырау әлі бағаланған жоқ',
        optional: 'Қосымша',
        mandatory: 'Міндетті',
      },
    },
    stt: {
      transcription: 'Транскрипция | Транскрипциялар',
      downloadTxt: 'TXT жүктеп алу',
      transcribe: 'Транскриберлеу',
      jobState: {
        idle: 'Күтуде',
      },
      error: 'Транскрибирлеуде қате орын алды',
    },
    recordings: {
      recording: 'Әңгімені жазу | Әңгімелерді жазу',
    },
  },
  dashboards: {
    dashboards: 'Дашбордтар',
    newBtn: 'Жаңа дашборд',
    dashboardSelect: 'Дашбордты таңдау:',
    dashboardConfig: 'Дашбордтың конфигурациясы:',
    interval: {
      interval: 'Аралық',
      options: {
        auto: 'Автоматты түрде',
        min: '{value} мин | {value} мин',
        hour: '{value} сағат | {value} сағаттар',
        day: '{value} күн | {value} күндер',
        week: '{value} апта | {value} апталар',
        month: '{value} ай | {value} айлар',
        year: '{value} жыл | {value} жылдар',
      },
    },
    dashboardConfigForm: {
      name: 'Атауы',
      visualization: 'Визуалдау',
      aggregation: 'Агрегация',
      param: 'Визуалдау параметрі',
      relative: 'Салыстырмалы мәнін көрсетіңіз (%)',
      limit: {
        5: '5 ең үздік жазба',
        10: '10 ең үздік жазба',
        15: '15 ең үздік жазба',
        20: '20 ең үздік жазба',
        limit: 'Ең үздік жазбалар',
      },
      variable: 'Ауыспалы',
    },
    visualizations: {
      doughnut: 'Дөңгелек диаграмма',
      bar: 'Гистограмма',
      line: 'Кесте',
      metric: 'метрика ',
    },
    aggregations: {
      count: 'COUNT: Саны',
      min: 'MIN: Ең төменгі мән',
      max: 'MAX: Ең жоғарғы мән',
      sum: 'SUM: мәннің қосындысы',
      avg: 'AVG: Орташа мән',
    },
    bridged: {
      true: 'Қосылды',
      false: 'Қосылмады',
    },
    empty: {
      resultSearch: 'Іріктеменің баптауын тексеріңіз',
      workspace: 'Бүгін қоңырау түспеді',
    },
    callsByPeriod: {
      title: 'кезеңдегі қоңыраулар',
      description:
        'Таңдалған кезеңдегі белгіленген іріктеуді ескеріп, қоңыраулар санын көрсетеді',
    },
    callsCount: {
      title: 'Қоңыраулар саны',
      description:
        'Белгіленген іріктеуді ескеріп, қоңыраулар санын топтастырады',
    },
    callsCountMetric: {
      title: 'Қоңыраулар саны (метрика)',
      description:
        'Таңдалған кезеңдегі белгіленген іріктеуді  ескеріп, қосылған және қосылмаған қоңыраулар санының сандық мәнін көрсетеді',
    },
    callsCountVariable: {
      title: 'Қоңыраулар саны  (variables)',
      description:
        'Таңдалған кезеңдегі белгіленген іріктеуді ескеріп, енгізілген ауыспалының нұсқалары бойынша қоңыраулар санын көрсетеді',
    },
    callsDuration: {
      title: 'Қоңыраулардың ұзақтығы',
      description:
        'Таңдалған кезеңдегі белгіленген іріктеуді ескеріп,  қоңыраулардың жалпы ұзақтығын (duration өрісі бойынша) топтастырады',
    },
    callsDurationMetric: {
      title: 'Қоңырау ұзақтығы (метрика)',
      description:
        'Таңдалған кезеңдегі белгіленген іріктеуді ескеріп, қосылған және қосылмаған қоңыраулардың ұзақтығын көрсетеді.',
    },
  },
  fields: {
    agent: 'Оператор',
    cause: 'Аяқтау себебі',
    direction: 'Бағыт',
    duration: 'Жалпы ұзақтығы',
    from: 'Нөмір кімнен ',
    to: 'Нөмір кімге',
    dateTime: 'Күні мен уақыты:',
    gateway: 'Шлюз',
    queue: 'Кезек',
    team: 'Команда',
    type: 'Тип',
    user: 'Пайдаланушы',
    date: 'Күні',
    time: 'Уақыт',
    answeredAt: 'Қосылу уақыты',
    bridgedAt: 'Жауап беру уақыты',
    queueBridgedAt: 'Кезектегі жауап беру уақыты',
    joinedAt: 'Кезектегі қосылу уақыты',
    leavingAt: 'Кезектен шығу уақыты',
    hangupAt: 'Аяқталу уақыты',
    reportingAt: 'Өңдеуден кейінгі  уақыты',
    extension: 'Қызметкер нөмірі',
    destination: 'Тағайындау ',
    member: 'Клиент',
    hangupBy: 'Аяқтау бастамашысы',
    tags: 'Тегтер',
    display: 'Көрсетілген нөмір',
    holdSec: 'Ұстап тұру уақыты',
    waitSec: 'Күту уақыты',
    billSec: 'Тарификация уақыты',
    talkSec: 'Әңгімелесу ұзақтығы',
    reportingSec: 'Өңдеуден кейінгі ұзақтығы',
    queueWaitSec: 'Кезекте күту уақыты',
    queueDurationSec: 'Кезекте тұру ұзақтығы',
    result: 'Нәтиже',
    sipCode: 'SIP код',
    agentDescription: 'Оператордың түсініктемесі',
    amd: 'AMD',
    amdResult: 'AMD нәтижесі',
    hangupDisposition: 'Аяқтау нәтижесі',
    blindTransfer: 'Бірден ауыстыру',
    grantee: 'Алушы',
    ratedBy: 'кім бағалады',
    score: 'Баға',
    memberId: 'Абонент Id',
    attemptId: 'Әрекет Id',
    postProcessing: 'Өңдеуден кейін',
    contact: 'Байланыс',
    hangupPhrase: 'Аяқтау сипаттамасы',
  },
  variableColumnSelect: {
    title: 'Айнымалылар бағандарын таңдау',
  },
  hangupDisposition: {
    notAnswered: 'Жауап берілмеді',
    cancelled: 'Бас тартылды',
    agentDropped: 'Оператор тастады',
    clientDropped: 'Клиент тастады',
    error: 'Қате',
    ended: 'Жүйе аяқтады',
  },
  filters: {
    tag: {
      options: {
        vm: 'Дыбыстық пошта',
      },
    },
    search: {
      [SearchMode.Search]: 'Қарапайым іздеу',
      [SearchMode.Fts]: 'Толық мәтінді іздеу',
      [SearchMode.Description]: 'Оператордың түсініктемесі',
    },
    hasFile: 'Жазба бар',
    hasTranscription: 'Транскрипция бар',
    rated: 'Бағаланған',
    duration: 'Жалпы ұзақтығы (сек)',
    talkSec: 'Әңгіме ұзақтығы (сек)',
    score: 'Баға (%)',
    variableSearchHint: 'Сұрау форматы: "кілт=мән"',
  },
  components: {
    dtPicker: {
      from: 'Бастап:',
      to: 'Дейін:',
    },
    columnSelect: {
      header: 'Көрсетілетін бағандарды таңдаңыз:',
    },
  },
};
