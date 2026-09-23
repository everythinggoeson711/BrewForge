import { useCallback, useEffect, useState } from 'react';
import type { QuizQuestion } from '../../features/certification/certificationSlice';

export interface QuizRunnerProps {
  title: string;
  questions: QuizQuestion[];
  durationSeconds?: number;
  onComplete?: (score: number, total: number) => void;
}

const formatTime = (secs: number) => {
  const mins = Math.floor(secs / 60);
  const s = secs % 60;
  return `${String(mins).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const QuizRunner = ({ title, questions, durationSeconds, onComplete }: QuizRunnerProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(durationSeconds ?? questions.length * 45);

  const currentQ = questions[currentIndex];

  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctAnswer) score++;
    });
    return score;
  }, [questions, selectedAnswers]);

  const handleSubmit = useCallback(() => {
    setSubmitted(true);
    const finalScore = calculateScore();
    onComplete?.(finalScore, questions.length);
  }, [calculateScore, questions.length, onComplete]);

  useEffect(() => {
    if (submitted || timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [submitted, timeLeft, handleSubmit]);

  const handleSelect = (optionIdx: number) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [currentIndex]: optionIdx }));
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
    setCurrentIndex(0);
    setTimeLeft(durationSeconds ?? questions.length * 45);
  };

  if (!questions || questions.length === 0) {
    return <div className="quiz-runner quiz-runner--empty">No questions available.</div>;
  }

  const score = calculateScore();
  const percentage = Math.round((score / questions.length) * 100);
  const passed = percentage >= 70;

  return (
    <div className="quiz-runner">
      <div className="quiz-runner__header">
        <h3 className="quiz-runner__title">{title}</h3>
        {!submitted && (
          <div className="quiz-runner__timer">
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}
      </div>

      {submitted ? (
        <div className="quiz-result">
          <span className="quiz-result__label">Final Score</span>
          <div className="quiz-result__score">
            {score} / {questions.length}
          </div>
          <div className={`quiz-result__status${passed ? ' quiz-result__status--pass' : ' quiz-result__status--fail'}`}>
            {percentage}% &mdash; {passed ? 'PASSED' : 'NEEDS REVIEW'}
          </div>

          <div className="quiz-breakdown">
            {questions.map((q, qIdx) => {
              const isCorrect = selectedAnswers[qIdx] === q.correctAnswer;
              return (
                <div key={q.id} className={`quiz-breakdown__item${isCorrect ? ' quiz-breakdown__item--correct' : ' quiz-breakdown__item--wrong'}`}>
                  <div className="quiz-breakdown__question">
                    <span>Q{qIdx + 1}: {q.question}</span>
                    <span className="quiz-breakdown__verdict">{isCorrect ? 'CORRECT' : 'WRONG'}</span>
                  </div>
                  <div className="quiz-breakdown__answer">
                    Your answer: {q.options[selectedAnswers[qIdx]] ?? 'None'}
                  </div>
                  {!isCorrect && (
                    <div className="quiz-breakdown__answer quiz-breakdown__answer--correct">
                      Correct answer: {q.options[q.correctAnswer]}
                    </div>
                  )}
                  {q.explanation && <p className="quiz-breakdown__explanation">{q.explanation}</p>}
                </div>
              );
            })}
          </div>

          <button type="button" className="btn btn--outline" onClick={handleReset}>
            Retake Quiz
          </button>
        </div>
      ) : (
        <div>
          <div className="quiz-progress">
            <span className="quiz-progress__label">
              Question {currentIndex + 1} of {questions.length}
            </span>
            <div className="quiz-progress__dots">
              {questions.map((_, idx) => (
                <span
                  key={idx}
                  className={`quiz-progress__dot${
                    idx === currentIndex
                      ? ' quiz-progress__dot--active'
                      : selectedAnswers[idx] !== undefined
                        ? ' quiz-progress__dot--answered'
                        : ''
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="quiz-question">{currentQ.question}</div>

          <div className="quiz-options">
            {currentQ.options.map((opt, optIdx) => {
              const isSelected = selectedAnswers[currentIndex] === optIdx;
              return (
                <button
                  type="button"
                  key={optIdx}
                  className={`quiz-option${isSelected ? ' quiz-option--selected' : ''}`}
                  onClick={() => handleSelect(optIdx)}
                >
                  <span className="quiz-option__letter">{String.fromCharCode(65 + optIdx)}</span>
                  <span>{opt}</span>
                </button>
              );
            })}
          </div>

          <div className="quiz-nav">
            <button
              type="button"
              className="btn btn--outline"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
            >
              Previous
            </button>

            {currentIndex < questions.length - 1 ? (
              <button type="button" className="btn btn--outline" onClick={() => setCurrentIndex((prev) => prev + 1)}>
                Next
              </button>
            ) : (
              <button type="button" className="btn btn--solid" onClick={handleSubmit}>
                Submit Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
