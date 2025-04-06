export type Notification = {
  notification_id: number;
  notified_username: string | null;
  phone: string;
  sent_at: Date;
  message: string;
  notification_type: string;
};
