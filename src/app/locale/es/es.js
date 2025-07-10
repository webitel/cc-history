import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Responder',
    reject: 'Rechazar',
    logout: 'Cerrar sesión',
    description: 'Descripción',
    settings: 'Configuración',
    history: 'Historial',
    download: 'Descargar',
    both: 'Ambos',
    logs: 'Registro | Registros',
    display: 'Mostrar',
  },
  confirmDelete: {
    title: 'Confirmar eliminación',
    askConfirmation:
      '¿Está seguro de que desea eliminar {count} elemento? | ¿Está seguro de que desea eliminar {count} elementos?',
  },
  headerSection: {
    filesLoaded: 'Archivos cargados: ',
    zippingProgress: 'Progreso de compresión: ',
    exportPopup: {
      separator: 'Separador',
    },
  },
  registry: {
    registry: 'Historial',
    call: {
      callInfo: 'Información de llamada',
      agentDescription: "Comentario del agente",
      callLegs: 'Tramos A-B',
      transferFrom: 'Transferir desde',
      transferMerge: 'Fusionar llamada',
      transferTo: 'Transferir a',
      noInfo: 'No hay información',
      callVisualization: 'Visualización de llamada',
      hold: 'Espera | Esperas',
      comment: 'Nota | Notas',
      wave: {
        wave: 'Onda de llamada',
      },
      stt: {
        noTranscript: 'No hay transcripción para este archivo',
        transcribingInProgress:
          'La transcripción está en progreso. Por favor, actualice la página en un minuto.',
      },
      evaluation: {
        rateTheCall: 'Calificar la llamada',
        evaluation: 'Evaluación',
        scorecard: 'Tarjeta de puntuación',
        comment: 'Comentario',
        selectTheScorecard: 'Seleccione la tarjeta de puntuación',
        noEvaluation: 'La llamada aún no ha sido calificada',
        optional: 'Opcional',
        mandatory: 'Obligatorio',
      },
    },
    stt: {
      transcription: 'Transcripción | Transcripciones',
      downloadTxt: 'Descargar TXT',
      transcribe: 'Transcribir',
      jobState: {
        idle: 'Inactivo',
      },
      error: 'Hubo un error durante la transcripción de la llamada',
    },
    recordings: {
      recording: 'Grabación | Grabaciones',
    },
  },
  dashboards: {
    dashboards: 'Paneles',
    newBtn: 'Nuevo panel',
    dashboardSelect: 'Seleccionar panel:',
    dashboardConfig: 'Configuración del panel:',
    interval: {
      interval: 'Intervalo',
      options: {
        auto: 'Auto',
        min: '{value} min | {value} mins',
        hour: '{value} hora | {value} horas',
        day: '{value} día | {value} días',
        week: '{value} semana | {value} semanas',
        month: '{value} mes | {value} meses',
        year: '{value} año | {value} años',
      },
    },
    dashboardConfigForm: {
      name: 'Nombre',
      visualization: 'Visualización',
      aggregation: 'Agregación',
      param: 'Parámetro de visualización',
      relative: 'Mostrar valores relativos (%)',
      limit: {
        limit: 'Registros principales',
        5: 'Top-5 registros',
        10: 'Top-10 registros',
        15: 'Top-15 registros',
        20: 'Top-20 registros',
      },
      variable: 'Variable',
    },
    visualizations: {
      doughnut: 'Dona',
      bar: 'Barra',
      line: 'Línea',
      metric: 'Métrica',
    },
    aggregations: {
      count: 'COUNT: Contar',
      min: 'MIN: Valor mínimo',
      max: 'MAX: Valor máximo',
      sum: 'SUM: Valor sumado',
      avg: 'AVG: Valor promedio',
    },
    bridged: {
      true: 'Conectado',
      false: 'Abandonado',
    },
    empty: {
      resultSearch: 'Por favor, verifique la consulta de filtros',
      workspace: 'No hay llamadas hoy',
    },
    callsByPeriod: {
      title: 'Llamadas por período',
      description:
        'Representa el número de llamadas basado en los filtros y período seleccionados',
    },
    callsCount: {
      title: 'Recuento de llamadas',
      description:
        'Agrupa el recuento de llamadas en un diagrama de dona basado en los filtros seleccionados',
    },
    callsCountMetric: {
      title: 'Recuento de llamadas (métricas)',
      description:
        'Representa el número de llamadas basado en los filtros y período seleccionados',
    },
    callsCountVariable: {
      title: 'Recuento de llamadas (variables)',
      description:
        'Representa el número de llamadas donde se seleccionó la opción de variable, basado en los filtros y período seleccionados',
    },
    callsDuration: {
      title: 'Duración de llamadas',
      description:
        'Agrupa la duración total de llamadas basado en los filtros seleccionados',
    },
    callsDurationMetric: {
      title: 'Duración de llamadas (métricas)',
      description:
        'Representa la duración numérica de llamadas basado en los filtros y período seleccionados',
    },
  },
  fields: {
    agent: 'Agente',
    cause: 'Causa de colgado',
    direction: 'Dirección',
    duration: 'Duración total',
    from: 'De',
    to: 'Para',
    dateTime: 'Fecha y hora:',
    gateway: 'Pasarela',
    queue: 'Cola',
    team: 'Equipo',
    type: 'Tipo',
    user: 'Usuario',
    date: 'Fecha',
    time: 'Hora',
    answeredAt: 'Respondido en',
    bridgedAt: 'Conectado en',
    queueBridgedAt: 'Cola conectada en',
    joinedAt: 'Unido en',
    leavingAt: 'Saliendo en',
    hangupAt: 'Colgado en',
    hangupPhrase: 'Descripción de colgado',
    reportingAt: 'Reportando en',
    extension: 'Extensión',
    destination: 'Destino',
    member: 'Miembro',
    hangupBy: 'Colgado por',
    tags: 'Etiquetas',
    display: 'Mostrar',
    holdSec: 'Espera',
    waitSec: 'Espera',
    billSec: 'Facturación',
    talkSec: 'Duración de conversación',
    reportingSec: 'Reporte',
    queueWaitSec: 'Espera en cola',
    queueDurationSec: 'Duración en cola',
    result: 'Resultado',
    sipCode: 'Código SIP',
    agentDescription: 'Comentario del agente',
    amd: 'AMD',
    amdResult: 'Resultado AMD',
    hangupDisposition: 'Disposición de colgado',
    blindTransfer: 'Transferencia ciega',
    grantee: 'Beneficiario',
    ratedBy: 'Calificado por',
    score: 'Puntuación',
    memberId: 'ID de miembro',
    attemptId: 'ID de intento',
    postProcessing: 'Postprocesamiento',
    contact: 'Contacto',
  },
  variableColumnSelect: {
    title: 'Seleccionar columnas de variables',
  },
  hangupDisposition: {
    notAnswered: 'No contestado',
    cancelled: 'Cancelado',
    agentDropped: 'Agente colgó',
    clientDropped: 'Cliente colgó',
    error: 'Error',
    ended: 'Finalizado por el sistema',
  },
  filters: {
    tag: {
      options: {
        vm: 'Correo de voz',
      },
    },
    search: {
      [SearchMode.Search]: 'Búsqueda regular',
      [SearchMode.Fts]: 'Búsqueda de texto completo',
      [SearchMode.Description]: "Comentario del agente",
    },
    hasFile: 'Tiene grabación',
    hasTranscription: 'Tiene transcripción',
    rated: 'Calificado',
    duration: 'Duración total (Seg)',
    talkSec: 'Duración de conversación (Seg)',
    score: 'Puntuación (%)',
    variableSearchHint: 'Formato de consulta: "clave=valor"',
  },
  components: {
    dtPicker: {
      from: 'Desde:',
      to: 'Hasta:',
    },
    columnSelect: {
      header: 'Seleccionar columnas para mostrar:',
    },
  },
};
