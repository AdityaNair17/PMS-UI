export interface ToastMessageBody {
  severity: string;
  summary: string;
  detail?: string;
  icon?: string;
  life?: number;
} 