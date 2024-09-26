export interface IAlarmMessage {
  createdAt: string;
  content: string;
  id: number;
}

export interface RequestNotifications {
  list?: Array<IAlarmMessage>;
  totalCount?: number;
}
