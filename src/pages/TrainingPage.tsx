import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const TrainingPage = () => {
  const courses = useAppSelector((state) => state.training.courses);
  const completedLessons = useAppSelector((state) => state.training.completedLessons);
  const gridRef = useStaggerReveal<HTMLDivElement>('.training-card');

  return (
    <div className="training">
      <h1 className="page-heading">Training</h1>
      <div className="training-grid" ref={gridRef}>
        {courses.map((course) => {
          const doneCount = course.lessons.filter((lesson) => completedLessons[lesson.id]).length;
          const progress = Math.round((doneCount / course.lessons.length) * 100);
          const firstLesson = course.lessons[0];

          return (
            <div className="training-card" key={course.id}>
              <div className="training-card__meta">
                <span>{course.branch}</span>
                <span>{doneCount}/{course.lessons.length} modules</span>
              </div>
              <h2 className="training-card__title">{course.title}</h2>
              <p className="training-card__subtitle">{course.subtitle}</p>

              <div className="progress-track">
                <div className="progress-track__fill" style={{ width: `${progress}%` }} />
              </div>
              <span className="training-card__progress-label">{progress}% complete</span>

              <Link to={`/app/training/${course.id}/${firstLesson.id}`} className="btn btn--outline">
                {progress > 0 ? 'Continue Training' : 'Start Training'}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};
