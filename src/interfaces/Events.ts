export interface EventResponse {
  id: number;
  title: string;
  body: string;
  userId: number;
  date: string;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  eventType: string;
  startTime: Date,
  endTime: Date,
  IsAllDay: false
}
