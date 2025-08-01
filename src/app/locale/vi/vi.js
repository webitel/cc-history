import { SearchMode } from '../../../modules/filters/enums/SearchMode';

export default {
  reusable: {
    answer: 'Trả lời',
    reject: 'Từ chối',
    logout: 'Đăng xuất',
    description: 'Mô tả',
    settings: 'Cài đặt',
    history: 'Lịch sử',
    download: 'Tải xuống',
    both: 'Tất cả',
    logs: 'Log | Các log',
    display: 'Hiển thị',
  },
  confirmDelete: {
    title: 'Xác nhận xóa',
    askConfirmation:
      'Bạn có chắc chắn muốn xóa {count} bản ghi? | Bạn có chắc chắn muốn xóa {count} bản ghi?',
  },
  headerSection: {
    filesLoaded: 'Tệp đã tải:',
    zippingProgress: 'Tiến trình nén',
    exportPopup: {
      separator: 'Dấu phân cách',
    },
  },
  registry: {
    registry: 'Lịch sử',
    call: {
      callInfo: 'Thông tin',
      agentDescription: 'Mô tả tác vụ',
      callLegs: 'Chân A-B',
      transferFrom: '...chuyển từ',
      transferMerge: 'Gộp cuộc gọi',
      transferTo: '...chuyển đến',
      noInfo: 'Không có thông tin cho cuộc gọi này',
      callVisualization: 'Trực quan hóa cuộc gọi',
      hold: 'Giữ máy | Giữ máy',
      comment: 'Bình luận | Các bình luận',
      wave: {
        wave: 'Đánh dấu cuộc gọi',
      },
      stt: {
        noTranscript: 'Không có bản ghi âm',
        transcribingInProgress:
          'Đang chuyển đổi bản ghi. Vui lòng làm mới trang sau một phút.',
      },
      evaluation: {
        rateTheCall: 'Đánh giá cuộc gọi',
        evaluation: 'Đánh giá',
        scorecard: 'Bảng điểm',
        comment: 'Bình luận',
        selectTheScorecard: 'Chọn bảng điểm',
        noEvaluation: 'Chưa được đánh giá',
        optional: 'Tùy chọn',
        mandatory: 'Bắt buộc',
      },
    },
    stt: {
      transcription: 'Bản ghi | Các bản ghi',
      downloadTxt: 'Tải TXT',
      transcribe: 'Chuyển đổi bản ghi',
      jobState: {
        idle: 'Chờ',
      },
      error: 'Có lỗi khi chuyển đổi bản ghi',
    },
    recordings: {
      recording: 'Ghi âm cuộc gọi | Các ghi âm',
    },
  },
  dashboards: {
    dashboards: 'Bảng điều khiển',
    newBtn: 'Bảng điều khiển mới',
    dashboardSelect: 'Chọn bảng điều khiển:',
    dashboardConfig: 'Cấu hình bảng điều khiển:',
    interval: {
      interval: 'Khoảng',
      options: {
        auto: 'Tự động',
        min: '{value} phút | {value} phút',
        hour: '{value} giờ | {value} giờ',
        day: '{value} ngày | {value} ngày',
        week: '{value} tuần | {value} tuần',
        month: '{value} tháng | {value} tháng',
        year: '{value} năm | {value} năm',
      },
    },
    dashboardConfigForm: {
      name: 'Tên',
      visualization: 'Trực quan hóa',
      aggregation: 'Tổng hợp',
      param: 'Tham số trực quan hóa',
      relative: 'Nhập giá trị tương đối (%)',
      limit: {
        5: 'Top 5 bản ghi',
        10: 'Top 10 bản ghi',
        15: 'Top 15 bản ghi',
        20: 'Top 20 bản ghi',
        limit: 'Các bản ghi hàng đầu',
      },
      variable: 'Biến',
    },
    visualizations: {
      doughnut: 'Biểu đồ tròn',
      bar: 'Biểu đồ cột',
      line: 'Bảng',
      metric: 'Chỉ số',
    },
    aggregations: {
      count: 'COUNT: Số lượng',
      min: 'MIN: Giá trị nhỏ nhất',
      max: 'MAX: Giá trị lớn nhất',
      sum: 'SUM: Tổng giá trị',
      avg: 'AVG: Giá trị trung bình',
    },
    bridged: {
      true: 'Đã kết nối',
      false: 'Chưa kết nối',
    },
    empty: {
      resultSearch: 'Kiểm tra cấu hình bộ lọc',
      workspace: 'Không có cuộc gọi nào hôm nay',
    },
    callsByPeriod: {
      title: 'Cuộc gọi theo khoảng thời gian',
      description:
        'Hiển thị số lượng cuộc gọi trong khoảng thời gian đã chọn dựa trên bộ lọc',
    },
    callsCount: {
      title: 'Số lượng cuộc gọi',
      description: 'Nhóm số lượng cuộc gọi dựa trên bộ lọc đã chọn',
    },
    callsCountMetric: {
      title: 'Số lượng cuộc gọi (chỉ số)',
      description:
        'Hiển thị số lượng cuộc gọi đã kết nối và chưa kết nối trong khoảng thời gian đã chọn dựa trên bộ lọc',
    },
    callsCountVariable: {
      title: 'Số lượng cuộc gọi (biến)',
      description:
        'Hiển thị số lượng cuộc gọi theo biến trong khoảng thời gian đã chọn dựa trên bộ lọc',
    },
    callsDuration: {
      title: 'Thời lượng cuộc gọi',
      description:
        'Nhóm tổng thời lượng cuộc gọi (theo trường duration) trong khoảng thời gian đã chọn dựa trên bộ lọc',
    },
    callsDurationMetric: {
      title: 'Thời lượng cuộc gọi (chỉ số)',
      description:
        'Hiển thị thời lượng cuộc gọi đã kết nối và chưa kết nối trong khoảng thời gian đã chọn dựa trên bộ lọc.',
    },
  },
  fields: {
    agent: 'Tác vụ',
    cause: 'Lý do kết thúc',
    direction: 'Hướng',
    duration: 'Tổng thời lượng',
    from: 'Từ',
    to: 'Đến',
    dateTime: 'Ngày & giờ:',
    gateway: 'Cổng',
    queue: 'Hàng đợi',
    team: 'Nhóm',
    type: 'Loại',
    user: 'Người dùng',
    date: 'Ngày',
    time: 'Thời gian',
    answeredAt: 'Thời gian kết nối',
    bridgedAt: 'Thời gian trả lời',
    queueBridgedAt: 'Thời gian trả lời trong hàng đợi',
    joinedAt: 'Thời gian tham gia hàng đợi',
    leavingAt: 'Thời gian rời hàng đợi',
    hangupAt: 'Thời gian kết thúc',
    reportingAt: 'Thời gian sau xử lý',
    extension: 'Số nội bộ',
    destination: 'Điểm đến',
    member: 'Khách hàng',
    hangupBy: 'Người kết thúc',
    tags: 'Thẻ',
    display: 'Số hiển thị',
    holdSec: 'Thời gian giữ máy',
    waitSec: 'Thời gian chờ',
    billSec: 'Thời gian tính phí',
    talkSec: 'Thời lượng hội thoại',
    reportingSec: 'Thời lượng sau xử lý',
    queueWaitSec: 'Thời gian chờ trong hàng đợi',
    queueDurationSec: 'Thời lượng trong hàng đợi',
    result: 'Kết quả',
    sipCode: 'Mã SIP',
    agentDescription: 'Mô tả tác vụ',
    amd: 'AMD',
    amdResult: 'Kết quả AMD',
    hangupDisposition: 'Kết quả kết thúc',
    blindTransfer: 'Chuyển tiếp mù',
    grantee: 'Người nhận',
    ratedBy: 'Người đánh giá',
    score: 'Điểm',
    memberId: 'Id khách hàng',
    attemptId: 'Id lần thử',
    postProcessing: 'Xử lý sau',
    contact: 'Liên hệ',
    hangupPhrase: 'Cụm từ kết thúc',
  },
  variableColumnSelect: {
    title: 'Chọn cột biến',
  },
  hangupDisposition: {
    notAnswered: 'Không trả lời',
    cancelled: 'Đã hủy',
    agentDropped: 'Tác vụ từ chối',
    clientDropped: 'Khách hàng từ chối',
    error: 'Lỗi',
    ended: 'Hệ thống kết thúc',
  },
  filters: {
    tag: {
      options: {
        vm: 'Thư thoại',
      },
    },
    search: {
      settingsHint: 'Cài đặt tìm kiếm',
      [SearchMode.Search]: 'Tìm kiếm thông thường',
      [SearchMode.Fts]: 'Tìm kiếm toàn văn bản',
      [SearchMode.Description]: 'Bình luận của tác vụ',
    },
    hasFile: 'Có ghi âm',
    hasTranscription: 'Có bản ghi',
    rated: 'Đã đánh giá',
    duration: 'Tổng thời lượng (giây)',
    talkSec: 'Thời lượng hội thoại (giây)',
    score: 'Điểm (%)',
    variableSearchHint: 'Định dạng truy vấn: "khóa=giá trị"',
  },
  components: {
    dtPicker: {
      from: 'Từ:',
      to: 'Đến:',
    },
    columnSelect: {
      header: 'Chọn các cột hiển thị:',
    },
  },
};
