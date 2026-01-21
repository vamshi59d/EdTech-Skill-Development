
export enum AppTab {
  DASHBOARD = 'dashboard',
  TASKS = 'tasks',
  STUDY_BUDDY = 'study_buddy',
  FLASHCARDS = 'flashcards',
  SCHEDULE = 'schedule'
}

export interface Task {
  id: string;
  title: string;
  subject: string;
  dueDate: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

export interface Flashcard {
  question: string;
  answer: string;
}

export interface ScheduleEvent {
  id: string;
  day: string;
  title: string;
  time: string;
  room: string;
  subject: string;
}

export interface Message {
  role: 'user' | 'model';
  text: string;
}
