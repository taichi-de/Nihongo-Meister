export type User = {
  id: number;
  email: string;
  password: string;
  level: "Onigiri" | "BentoBox" | "Sakura" | "Katana" | "Kiku";
  savedWords: Vocabulary[];
};

export type UserVocabulary = {
  userId: number;
  vocabularyId: number;
};

export type Vocabulary = {
  id: number;
  word: string;
  meaning: string;
  category: string;
  partOfSpeech:
    | "noun"
    | "verb"
    | "adjective"
    | "adverb"
    | "pronoun"
    | "preposition"
    | "conjunction"
    | "interjection";
};

export type Quiz = {
  id: number;
  questions: Question[];
  level: "Onigiri" | "BentoBox" | "Sakura" | "Katana" | "Kiku";
};

export type Question = {
  id: number;
  quizId: number;
  prompt: string;
  choices: string[];
  answer: string;
};

export type QuizAttempt = {
  userId: number;
  quizId: number;
  score: number;
};

export type Conversation = {
  id: number;
  sentences: string[];
  level: "Onigiri" | "BentoBox" | "Sakura" | "Katana" | "Kiku";
};

export interface Database {
  users: User;
  userVocabulary: UserVocabulary;
  vocabulary: Vocabulary;
  quizzes: Quiz;
  questions: Question;
  quizAttempts: QuizAttempt;
  conversations: Conversation;
}
