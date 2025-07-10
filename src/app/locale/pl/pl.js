import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Odpowiedz',
    reject: 'Odrzuć',
    logout: 'Wyloguj',
    description: 'Opis',
    settings: 'Ustawienia',
    history: 'Historia',
    download: 'Pobierz',
    both: 'Oba',
    logs: 'Dziennik | Dzienniki',
    display: 'Wyświetlenie',
  },
  confirmDelete: {
    title: 'Potwierdzenie usunięcia',
    askConfirmation:
      'Czy na pewno chcesz usunąć {count} element? | Czy na pewno chcesz usunąć {count} elementy?',
  },
  headerSection: {
    filesLoaded: 'Pliki załadowane: ',
    zippingProgress: 'Postęp archiwizacji: ',
    exportPopup: {
      separator: 'Separator',
    },
  },
  registry: {
    registry: 'Historia',
    call: {
      callInfo: 'Informacje o połączeniu',
      agentDescription: "Komentarz agenta",
      callLegs: 'Segmenty A-B',
      transferFrom: 'Transfer od',
      transferMerge: 'Połączenie połączeń',
      transferTo: 'Transfer do',
      noInfo: 'Brak informacji',
      callVisualization: 'Wizualizacja połączenia',
      hold: 'Wstrzymanie | Wstrzymania',
      comment: 'Notatka | Notatki',
      wave: {
        wave: 'Fala połączenia',
      },
      stt: {
        noTranscript: 'Brak transkrypcji dla tego pliku',
        transcribingInProgress:
          'Transkrypcja jest w toku. Proszę odświeżyć stronę za minutę.',
      },
      evaluation: {
        rateTheCall: 'Oceń połączenie',
        evaluation: 'Ocena',
        scorecard: 'Karta oceny',
        comment: 'Komentarz',
        selectTheScorecard: 'Wybierz kartę oceny',
        noEvaluation: 'Połączenie nie zostało jeszcze ocenione',
        optional: 'Opcjonalne',
        mandatory: 'Obowiązkowe',
      },
    },
    stt: {
      transcription: 'Transkrypcja | Transkrypcje',
      downloadTxt: 'Pobierz TXT',
      transcribe: 'Transkrybuj',
      jobState: {
        idle: 'Bezczynny',
      },
      error: 'Wystąpił błąd podczas transkrypcji połączenia',
    },
    recordings: {
      recording: 'Nagranie | Nagrania',
    },
  },
  dashboards: {
    dashboards: 'Dashboardy',
    newBtn: 'Nowy dashboard',
    dashboardSelect: 'Wybierz dashboard:',
    dashboardConfig: 'Konfiguracja dashboardu:',
    interval: {
      interval: 'Interwał',
      options: {
        auto: 'Auto',
        min: '{value} min | {value} min',
        hour: '{value} godzina | {value} godziny',
        day: '{value} dzień | {value} dni',
        week: '{value} tydzień | {value} tygodnie',
        month: '{value} miesiąc | {value} miesiące',
        year: '{value} rok | {value} lata',
      },
    },
    dashboardConfigForm: {
      name: 'Nazwa',
      visualization: 'Wizualizacja',
      aggregation: 'Agregacja',
      param: 'Parametr wizualizacji',
      relative: 'Pokaż wartości względne (%)',
      limit: {
        limit: 'Najlepsze rekordy',
        5: 'Top-5 rekordów',
        10: 'Top-10 rekordów',
        15: 'Top-15 rekordów',
        20: 'Top-20 rekordów',
      },
      variable: 'Zmienna',
    },
    visualizations: {
      doughnut: 'Wykres pierścieniowy',
      bar: 'Słupek',
      line: 'Linia',
      metric: 'Metryka',
    },
    aggregations: {
      count: 'COUNT: Liczenie',
      min: 'MIN: Wartość minimalna',
      max: 'MAX: Wartość maksymalna',
      sum: 'SUM: Wartość zsumowana',
      avg: 'AVG: Wartość średnia',
    },
    bridged: {
      true: 'Połączony',
      false: 'Porzucony',
    },
    empty: {
      resultSearch: 'Proszę sprawdzić zapytanie filtrów',
      workspace: 'Brak połączeń dzisiaj',
    },
    callsByPeriod: {
      title: 'Połączenia według okresu',
      description:
        'Przedstawia liczbę połączeń na podstawie wybranych filtrów i okresu',
    },
    callsCount: {
      title: 'Liczba połączeń',
      description:
        'Grupuje liczbę połączeń na wykresie pierścieniowym na podstawie wybranych filtrów',
    },
    callsCountMetric: {
      title: 'Liczba połączeń (metryki)',
      description:
        'Przedstawia liczbę połączeń na podstawie wybranych filtrów i okresu',
    },
    callsCountVariable: {
      title: 'Liczba połączeń (zmienne)',
      description:
        'Przedstawia liczbę połączeń gdzie została wybrana opcja zmienna, na podstawie wybranych filtrów i okresu',
    },
    callsDuration: {
      title: 'Czas trwania połączeń',
      description:
        'Grupuje całkowity czas trwania połączeń na podstawie wybranych filtrów',
    },
    callsDurationMetric: {
      title: 'Czas trwania połączeń (metryki)',
      description:
        'Przedstawia numeryczny czas trwania połączeń na podstawie wybranych filtrów i okresu',
    },
  },
  fields: {
    agent: 'Agent',
    cause: 'Przyczyna zamknięcia',
    direction: 'Kierunek',
    duration: 'Całkowity czas trwania',
    from: 'Od',
    to: 'Do',
    dateTime: 'Data i Czas:',
    gateway: 'Brama',
    queue: 'Kolejka',
    team: 'Zespół',
    type: 'Typ',
    user: 'Użytkownik',
    date: 'Data',
    time: 'Czas',
    answeredAt: 'Odpowiedziano o',
    bridgedAt: 'Połączono o',
    queueBridgedAt: 'Kolejka połączona o',
    joinedAt: 'Dołączono o',
    leavingAt: 'Opuszczono o',
    hangupAt: 'Rozłączono o',
    hangupPhrase: 'Opis rozłączenia',
    reportingAt: 'Raportowanie o',
    extension: 'Rozszerzenie',
    destination: 'Miejsce przeznaczenia',
    member: 'Członek',
    hangupBy: 'Rozłączono przez',
    tags: 'Etykiety',
    display: 'Wyświetlenie',
    holdSec: 'Wstrzymanie',
    waitSec: 'Oczekiwanie',
    billSec: 'Rozliczenie',
    talkSec: 'Czas rozmowy',
    reportingSec: 'Raportowanie',
    queueWaitSec: 'Oczekiwanie w kolejce',
    queueDurationSec: 'Czas trwania w kolejce',
    result: 'Wynik',
    sipCode: 'Kod SIP',
    agentDescription: 'Komentarz agenta',
    amd: 'AMD',
    amdResult: 'Wynik AMD',
    hangupDisposition: 'Dyspozycja rozłączenia',
    blindTransfer: 'Transfer ślepy',
    grantee: 'Beneficjent',
    ratedBy: 'Oceniony przez',
    score: 'Wynik',
    memberId: 'ID członka',
    attemptId: 'ID próby',
    postProcessing: 'Przetwarzanie końcowe',
    contact: 'Kontakt',
  },
  variableColumnSelect: {
    title: 'Wybierz kolumny zmiennych',
  },
  hangupDisposition: {
    notAnswered: 'Bez odpowiedzi',
    cancelled: 'Anulowane',
    agentDropped: 'Agent rozłączył',
    clientDropped: 'Klient rozłączył',
    error: 'Błąd',
    ended: 'Zakończone przez system',
  },
  filters: {
    tag: {
      options: {
        vm: 'Poczta głosowa',
      },
    },
    search: {
      [SearchMode.Search]: 'Wyszukiwanie regularne',
      [SearchMode.Fts]: 'Wyszukiwanie pełnotekstowe',
      [SearchMode.Description]: "Komentarz agenta",
    },
    hasFile: 'Ma nagranie',
    hasTranscription: 'Ma transkrypcję',
    rated: 'Ocenione',
    duration: 'Całkowity czas trwania (Sek)',
    talkSec: 'Czas rozmowy (Sek)',
    score: 'Wynik (%)',
    variableSearchHint: 'Format zapytania: "klucz=wartość"',
  },
  components: {
    dtPicker: {
      from: 'Od:',
      to: 'Do:',
    },
    columnSelect: {
      header: 'Wybierz kolumny do wyświetlenia:',
    },
  },
};