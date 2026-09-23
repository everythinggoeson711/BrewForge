import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

export interface CertificationExam {
  id: string;
  gate: string;
  title: string;
  durationMinutes: number;
  questions: QuizQuestion[];
}

export interface CertificationRecord {
  id: string;
  examId: string;
  examTitle: string;
  gate: string;
  score: number;
  total: number;
  percent: number;
  status: 'passed' | 'failed';
  date: string;
}

interface CertificationState {
  exams: CertificationExam[];
  history: CertificationRecord[];
}

const initialState: CertificationState = {
  exams: [
    {
      id: 'e1',
      gate: 'Dosing Machine Operation',
      title: 'DM-200 & DM-150 Operation Certification',
      durationMinutes: 10,
      questions: [
        {
          id: 'q1',
          question: 'What must you check before running the DM-200 dosing sequence?',
          options: [
            'The branch Wi-Fi connection',
            'Ingredient shelf-life and correct nozzle attachment',
            'The weather forecast',
            'The till float amount',
          ],
          correctAnswer: 1,
          explanation: 'Shelf-life and nozzle attachment are the two pre-flight checks before any dosing run.',
        },
        {
          id: 'q2',
          question: 'How often does BrewForge require milk pump calibration?',
          options: ['Daily', 'Weekly', 'Monthly', 'Never'],
          correctAnswer: 1,
          explanation: 'Weekly calibration is the enforced rule for milk-base dosing equipment.',
        },
      ],
    },
    {
      id: 'e2',
      gate: 'Shelf-Life Awareness',
      title: 'Ingredient Shelf-Life & Rotation Certification',
      durationMinutes: 8,
      questions: [
        {
          id: 'q1',
          question: 'An ingredient is past its printed shelf-life date. What is the correct action?',
          options: [
            'Use it in the next drink to avoid waste',
            'Discard it and log the event on the shelf-life board',
            'Mix it with fresh stock',
            'Ask a customer if they mind',
          ],
          correctAnswer: 1,
          explanation: 'Expired stock is always discarded and logged, never blended or served.',
        },
      ],
    },
    {
      id: 'e3',
      gate: 'Technique Mastery',
      title: 'Mandatory Technique Gates Certification',
      durationMinutes: 8,
      questions: [
        {
          id: 'q1',
          question: 'What is the mandatory shake count before ice fill on shaken drinks?',
          options: ['6', '8', '12', '20'],
          correctAnswer: 2,
          explanation: 'A 12-count shake is enforced by the validator before ice fill.',
        },
        {
          id: 'q2',
          question: 'For layered/topping drinks, what fill order avoids failing visual QA?',
          options: [
            'Syrup before toppings',
            'Toppings before syrup',
            'Order does not affect QA',
            'Ice before toppings',
          ],
          correctAnswer: 1,
          explanation: 'Toppings go in before syrup drizzle to keep the stripe pattern even.',
        },
      ],
    },
  ],
  history: [
    {
      id: 'h1',
      examId: 'e1',
      examTitle: 'DM-200 & DM-150 Operation Certification',
      gate: 'Dosing Machine Operation',
      score: 2,
      total: 2,
      percent: 100,
      status: 'passed',
      date: '2026-09-18',
    },
    {
      id: 'h2',
      examId: 'e2',
      examTitle: 'Ingredient Shelf-Life & Rotation Certification',
      gate: 'Shelf-Life Awareness',
      score: 1,
      total: 1,
      percent: 100,
      status: 'passed',
      date: '2026-09-15',
    },
  ],
};

const certificationSlice = createSlice({
  name: 'certification',
  initialState,
  reducers: {
    recordCertificationResult: (state, action: PayloadAction<Omit<CertificationRecord, 'id'>>) => {
      state.history.unshift({ id: `h${state.history.length + 1}-${Date.now()}`, ...action.payload });
    },
  },
});

export const { recordCertificationResult } = certificationSlice.actions;
export default certificationSlice.reducer;
