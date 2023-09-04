import {
  PrismaClient,
  PartOfSpeech,
  ProficiencyLevel,
  QuestionType,
  // FIXME:
  Categories,
} from "@prisma/client";

const prisma = new PrismaClient();

export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  level: ProficiencyLevel;
  vocab: Bookmarks[];
}

export interface Vocabulary {
  id: number;
  word: string;
  // pronunciation: string;
  partOfSpeech: PartOfSpeech;
  translation: string;
  inJapanese: string;
  sentence: string;
  sentenceTranslation: string;
  level: ProficiencyLevel;
  users: Bookmarks[];
}

export interface Bookmarks {
  id: number;
  userId: number;
  vocabId: number;
  lastStudied: Date;
  frequency: number;
  user: User;
  vocab: Vocabulary;
}

export interface Quiz {
  id: number;
  // name: string;
  categories: Categories;
  level: ProficiencyLevel;
  questions: Question[];
}

export interface Question {
  id: number;
  quizId: number;
  questionType: QuestionType;
  question: string;
  answerOptions: string[];
  correctAnswer: string;
  quiz: Quiz;
}

export interface ConversationExample {
  id: number;
  title: string;
  // pronunciation: string;
  sentences: String[];
  translations: String[];
  level: ProficiencyLevel;
}

export interface Notification {
  id: number;
  title: string;
  content: string;
  publishedAt: Date;
}

export interface Database {
  users: User;
  bookmarks: Bookmarks;
  vocabulary: Vocabulary;
  quiz: Quiz;
  question: Question;
  conversationExample: ConversationExample;
  notification: Notification;
}

export { Categories, PartOfSpeech, ProficiencyLevel, QuestionType };

export default prisma;
