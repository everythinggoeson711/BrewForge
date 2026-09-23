import { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { markLessonComplete } from '../features/training/trainingSlice';
import { QuizRunner } from '../components/training/QuizRunner';

export const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const dispatch = useAppDispatch();
  const course = useAppSelector((state) => state.training.courses.find((c) => c.id === courseId));
  const completedLessons = useAppSelector((state) => state.training.completedLessons);
  const [activeTab, setActiveTab] = useState<'video' | 'notes' | 'quiz'>('video');

  const lesson = course?.lessons.find((l) => l.id === lessonId) ?? course?.lessons[0];

  useEffect(() => {
    if (!lesson) return;
    if (lesson.videoUrl) setActiveTab('video');
    else if (lesson.notes) setActiveTab('notes');
    else if (lesson.isQuiz) setActiveTab('quiz');
  }, [lesson]);

  if (!course || !lesson) {
    return <Navigate to="/app/training" replace />;
  }

  const isComplete = Boolean(completedLessons[lesson.id]);
  const doneCount = course.lessons.filter((l) => completedLessons[l.id]).length;

  const toggleComplete = () => {
    dispatch(markLessonComplete({ lessonId: lesson.id, complete: !isComplete }));
  };

  const tabs: Array<{ key: typeof activeTab; label: string; visible: boolean }> = [
    { key: 'video', label: 'Video', visible: Boolean(lesson.videoUrl) },
    { key: 'notes', label: 'Notes', visible: Boolean(lesson.notes) },
    { key: 'quiz', label: 'Quiz', visible: lesson.isQuiz },
  ];

  return (
    <div className="lesson">
      <div className="lesson__top">
        <div>
          <Link to="/app/training" className="lesson__back">
            &larr; {course.title}
          </Link>
          <h1 className="lesson__heading">{lesson.title}</h1>
        </div>
        <button
          type="button"
          className={`btn ${isComplete ? 'btn--solid' : 'btn--outline'}`}
          onClick={toggleComplete}
        >
          {isComplete ? 'Completed' : 'Mark Complete'}
        </button>
      </div>

      <div className="lesson__layout">
        <aside className="lesson__syllabus">
          <div className="lesson__syllabus-progress">
            <span>{doneCount} of {course.lessons.length} completed</span>
            <div className="progress-track">
              <div
                className="progress-track__fill"
                style={{ width: `${Math.round((doneCount / course.lessons.length) * 100)}%` }}
              />
            </div>
          </div>
          <nav className="lesson__syllabus-list">
            {course.lessons.map((item) => {
              const active = item.id === lesson.id;
              const done = completedLessons[item.id];
              return (
                <Link
                  key={item.id}
                  to={`/app/training/${course.id}/${item.id}`}
                  className={`lesson__syllabus-item${active ? ' lesson__syllabus-item--active' : ''}${done ? ' lesson__syllabus-item--done' : ''}`}
                >
                  <span>
                    {item.isQuiz && <span className="lesson__syllabus-quiz-tag">QUIZ</span>}
                    {item.title}
                  </span>
                  <span className="lesson__syllabus-duration">{item.duration}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        <div className="lesson__main">
          <div className="lesson__tabs">
            {tabs
              .filter((tab) => tab.visible)
              .map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  className={`lesson__tab${activeTab === tab.key ? ' lesson__tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.key)}
                >
                  {tab.label}
                </button>
              ))}
          </div>

          {activeTab === 'video' && lesson.videoUrl && (
            <div className="lesson__video-frame">
              <video src={lesson.videoUrl} controls className="lesson__video" />
            </div>
          )}

          {activeTab === 'notes' && lesson.notes && <p className="lesson__notes">{lesson.notes}</p>}

          {activeTab === 'quiz' && lesson.quizQuestions && (
            <QuizRunner
              title={lesson.title}
              questions={lesson.quizQuestions}
              onComplete={(score, total) => {
                if (score / total >= 0.7) {
                  dispatch(markLessonComplete({ lessonId: lesson.id, complete: true }));
                }
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
