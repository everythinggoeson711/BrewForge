import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { QuizQuestion } from '../certification/certificationSlice';

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  isQuiz: boolean;
  videoUrl?: string;
  notes?: string;
  quizQuestions?: QuizQuestion[];
}

export interface TrainingCourse {
  id: string;
  recipeId: string;
  title: string;
  subtitle: string;
  branch: string;
  lessons: Lesson[];
}

interface TrainingState {
  courses: TrainingCourse[];
  completedLessons: Record<string, boolean>;
}

const initialState: TrainingState = {
  courses: [
    {
      id: 't1',
      recipeId: 'r1',
      title: 'Iced Peach Oolong Prep Track',
      subtitle: 'Dosing sequence, shake technique, and shelf-life checks for the published SOP.',
      branch: 'Branch Nguyen Hue',
      lessons: [
        {
          id: 'l1',
          title: '01. Ingredient Staging & Shelf-Life Check',
          duration: '6m',
          isQuiz: false,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          notes:
            'Confirm peach puree and oolong concentrate are within their shelf-life window before staging. Discard and log anything past the printed date on the branch shelf-life board.',
        },
        {
          id: 'l2',
          title: '02. Dosing Machine Sequence (Model DM-200)',
          duration: '9m',
          isQuiz: false,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          notes:
            'Run oolong base first at setting 3, then peach puree at setting 1. Never reverse the order — puree first clogs the DM-200 nozzle on branches without the wide-bore attachment.',
        },
        {
          id: 'l3',
          title: '03. Shake Technique & Ice Fill',
          duration: '5m',
          isQuiz: false,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          notes:
            'Mandatory 12-count shake before ice fill. This is a validator-enforced gate — SOPs that skip it fail constraint review.',
        },
        {
          id: 'l4',
          title: '04. Module Certification Quiz',
          duration: '8m',
          isQuiz: true,
          quizQuestions: [
            {
              id: 'q1',
              question: 'What happens if the DM-200 doses peach puree before the oolong base?',
              options: [
                'Nothing, order does not matter',
                'The nozzle clogs on branches without the wide-bore attachment',
                'The drink becomes sweeter',
                'The shelf-life window resets',
              ],
              correctAnswer: 1,
              explanation:
                'Puree dosed first clogs the DM-200 nozzle unless the branch has the wide-bore attachment installed — always run oolong base first.',
            },
            {
              id: 'q2',
              question: 'How many shake counts does the validator require before ice fill?',
              options: ['6', '8', '12', '20'],
              correctAnswer: 2,
              explanation: 'The mandatory technique gate is a 12-count shake before ice fill.',
            },
            {
              id: 'q3',
              question: 'What should you do if the peach puree is past its shelf-life date?',
              options: [
                'Use it anyway, it is usually fine',
                'Discard it and log the event on the shelf-life board',
                'Mix it with fresh puree to dilute it',
                'Freeze it for later use',
              ],
              correctAnswer: 1,
              explanation: 'Expired ingredients are discarded and logged — never blended with fresh stock.',
            },
          ],
        },
      ],
    },
    {
      id: 't2',
      recipeId: 'r2',
      title: 'Brown Sugar Boba Milk Tea Prep Track',
      subtitle: 'Topping fill order, dosing calibration, and technique checks for validated SOP v2.',
      branch: 'Branch Hoan Kiem',
      lessons: [
        {
          id: 'l1',
          title: '01. Topping Fill Sequence',
          duration: '7m',
          isQuiz: false,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          notes:
            'Boba pearls go in before the syrup drizzle — drizzling first over dry pearls causes uneven stripe patterns that fail the visual QA check.',
        },
        {
          id: 'l2',
          title: '02. Milk Base Dosing Calibration',
          duration: '10m',
          isQuiz: false,
          videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
          notes:
            'Calibrate the DM-150 milk pump weekly. An uncalibrated pump is the #1 cause of branch-reported inconsistency for this drink.',
        },
        {
          id: 'l3',
          title: '03. Module Certification Quiz',
          duration: '6m',
          isQuiz: true,
          quizQuestions: [
            {
              id: 'q1',
              question: 'What causes uneven syrup stripe patterns to fail visual QA?',
              options: [
                'Using the wrong syrup brand',
                'Drizzling syrup before the boba pearls are added',
                'Serving the drink too cold',
                'Using a paper straw',
              ],
              correctAnswer: 1,
              explanation: 'Pearls must go in first; drizzling over dry pearls produces uneven stripes.',
            },
            {
              id: 'q2',
              question: 'How often should the DM-150 milk pump be calibrated?',
              options: ['Daily', 'Weekly', 'Monthly', 'Only when it breaks'],
              correctAnswer: 1,
              explanation: 'Weekly calibration prevents the #1 branch-reported consistency issue.',
            },
          ],
        },
      ],
    },
  ],
  completedLessons: {},
};

const trainingSlice = createSlice({
  name: 'training',
  initialState,
  reducers: {
    markLessonComplete: (state, action: PayloadAction<{ lessonId: string; complete: boolean }>) => {
      state.completedLessons[action.payload.lessonId] = action.payload.complete;
    },
  },
});

export const { markLessonComplete } = trainingSlice.actions;
export default trainingSlice.reducer;
