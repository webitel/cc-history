import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Ответить',
    reject: 'Сбросить',
    logout: 'Выйти',
    description: 'Описание',
    settings: 'Настройки',
    history: 'История',
    download: 'Скачать',
    both: 'Все',
    logs: 'Лог | Логи',
    display: 'Выбрать',
  },
  confirmDelete: {
    title: 'Подтверждение удаления',
    askConfirmation:
      'Вы уверенны что хотите удалить {count} запись? | Вы уверенны что хотите удалить {count} записей?',
  },
  headerSection: {
    filesLoaded: 'Файлов скачано: ',
    zippingProgress: 'Прогресс архивации: ',
    exportPopup: {
      separator: 'Разделитель',
    },
  },
  registry: {
    registry: 'История',
    call: {
      callInfo: 'Информация',
      agentDescription: 'Комментарий оператора',
      callLegs: 'Legs A-B',
      transferFrom: 'Перевод От',
      transferMerge: 'Объединение Звонков',
      transferTo: 'Перевод На',
      noInfo: 'Этот звонок не имеет информации',
      callVisualization: 'Визуализация звонка',
      hold: 'Удержание | Удержания',
      comment: 'Комментарий | Комментарии',
      wave: { wave: 'Разметка звонка' },
      stt: {
        noTranscript: 'Транскрипция файла отсутствует',
        transcribingInProgress:
          'Выполняется транскрипция файла. Пожалуйста, обновите страницу через минуту.',
      },
      evaluation: {
        rateTheCall: ' Оценить звонок',
        evaluation: 'Оценивание',
        scorecard: 'Анкета',
        comment: 'Коментарий',
        selectTheScorecard: 'Выбрать анкету',
        noEvaluation: 'Звонок еще не оценен',
        optional: 'Опциональные',
        mandatory: 'Обязательные',
      },
    },
    stt: {
      transcription: 'Транскрипция | Транскрипции',
      downloadTxt: 'Скачать TXT',
      transcribe: 'Транскрибировать',
      jobState: {
        idle: 'Ожидает',
      },
      error: 'Произошла ошибка транскрибирования',
    },
    recordings: {
      recording: 'Запись разговора | Записи разговоров',
    },
  },
  dashboards: {
    dashboards: 'Дашборды',
    newBtn: 'Новый дашборд',
    dashboardSelect: 'Выбрать дашборд:',
    dashboardConfig: 'Конфигурация дашборда:',
    interval: {
      interval: 'Интервал',
      options: {
        auto: 'Автоматически',
        min: '{value} мин | {value} мин',
        hour: '{value} час | {value} часов',
        day: '{value} день | {value} дней',
        week: '{value} неделя | {value} недель',
        month: '{value} месяц | {value} месяцев',
        year: '{value} год | {value} лет',
      },
    },
    dashboardConfigForm: {
      name: 'Название',
      visualization: 'Визуализация',
      aggregation: 'Аггрегация',
      param: 'Параметр визуализации',
      relative: 'Показать относительные значния (%)',
      limit: {
        limit: 'Топ записей',
        5: 'Топ-5 записей',
        10: 'Топ-10 записей',
        15: 'Топ-15 записей',
        20: 'Топ-20 записей',
      },
      variable: 'Переменная',
    },
    visualizations: {
      doughnut: 'Круговая диаграмма',
      bar: 'Гистограмма',
      line: 'График',
      metric: 'Метрика',
    },
    aggregations: {
      count: 'COUNT: Количество',
      min: 'MIN: Минимальное значение',
      max: 'MAX: Максимальное значение',
      sum: 'SUM: Сумма значений',
      avg: 'AVG: Среднее значение',
    },
    bridged: {
      true: 'Соединены',
      false: 'Не соединены',
    },
    empty: {
      resultSearch: 'Пожалуйста, проверьте настройки фильтров',
      workspace: 'Сегодня звонков не было',
    },
    callsByPeriod: {
      title: 'Звонки за период',
      description:
        'Отображает количество звонков с учётом выбранной фильтрации за выбранный период',
    },
    callsCount: {
      title: 'Количество звонков',
      description:
        'Группирует количество звонков с учётом выбранной фильтрации',
    },
    callsCountMetric: {
      title: 'Количество звонков (метрика)',
      description:
        'Отображает числовые значения количества звонков, в которых прошло и не прошло соединение с учётом выбранной фильтрации за выбранный период ',
    },
    callsCountVariable: {
      title: 'Количество звонков (variables)',
      description:
        'Отображает количество звонков по вариантам введённой переменной с учётом выбранной фильтрации за выбранный период',
    },
    callsDuration: {
      title: 'Длительность звонков',
      description:
        'Группирует общую длительность звонков (по полю duration) с учётом выбранной фильтрации за выбранный период',
    },
    callsDurationMetric: {
      title: 'Длительность звонков (метрика)',
      description:
        'Отображает длительность звонков, в которых прошло и не прошло соединение с учётом выбранной фильтрации за выбранный период ',
    },
  },
  fields: {
    agent: 'Оператор',
    cause: 'Причина окончания',
    direction: 'Направление',
    duration: 'Общая длительность',
    from: 'Номер от',
    to: 'Номер кому',
    dateTime: 'Дата и Время:',
    gateway: 'Шлюз',
    queue: 'Очередь',
    team: 'Команда',
    type: 'Тип',
    user: 'Пользователь',
    date: 'Дата',
    time: 'Время',
    answeredAt: 'Время соединения',
    bridgedAt: 'Время ответа',
    queueBridgedAt: 'Время ответа в очереди',
    joinedAt: 'Время соединения в очереди',
    leavingAt: 'Время выхода из очереди',
    hangupAt: 'Время завершения',
    hangupPhrase: 'Описание завершения',
    reportingAt: 'Время постобработки',
    extension: 'Номер сотрудника',
    destination: 'Назначение',
    member: 'Клиент',
    hangupBy: 'Инициатор завершения',
    tags: 'Теги',
    display: 'Номер отображения',
    holdSec: 'Время удержания',
    waitSec: 'Время ожидания',
    billSec: 'Время тарификации',
    talkSec: 'Длительность разговора',
    reportingSec: 'Длительность постобработки',
    queueWaitSec: 'Длительность ожидания в очереди',
    queueDurationSec: 'Длительность в очереди',
    result: 'Результат',
    sipCode: 'SIP код',
    agentDescription: 'Комментарий оператора',
    amd: 'AMD',
    amdResult: 'AMD результат',
    hangupDisposition: 'Результат завершения',
    blindTransfer: 'Слепой перевод',
    grantee: 'Получатель',
    ratedBy: 'Оценено кем',
    score: 'Оценка',
    memberId: 'Id абонента',
    attemptId: 'Id попытки',
    postProcessing: 'Постобработка',
    contact: 'Контакт',
  },
  variableColumnSelect: {
    title: 'Выбрать колонки с переменными',
  },
  hangupDisposition: {
    notAnswered: 'Не ответил',
    cancelled: 'Отмена',
    agentDropped: 'Оператор сбросил',
    clientDropped: 'Клиент сбросил',
    error: 'Ошибка',
    ended: 'Завершено системой',
  },
  filters: {
    tag: {
      options: {
        vm: 'Голосовая почта',
      },
    },
    search: {
      [SearchMode.Search]: 'Обычный поиск',
      [SearchMode.Fts]: 'Полнотекстовый поиск',
      [SearchMode.Description]: 'Комментарий оператора',
    },
    hasFile: 'Запись разговора',
    hasTranscription: 'Транскрипция',
    rated: 'Оценены',
    duration: 'Общая длительность (Sec)',
    talkSec: 'Длительность разговора (Sec)',
    score: 'Оценка (%)',
    variableSearchHint: 'Формат запроса: "ключ=значение"',
  },
  components: {
    dtPicker: {
      from: 'От:',
      to: 'До:',
    },
    columnSelect: {
      header: 'Добавить колонки:',
    },
  },
};
