import { Link } from 'react-router-dom';
import { useAppSelector } from '../app/hooks';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const DashboardPage = () => {
  const recipes = useAppSelector((state) => state.recipes.items);
  const branches = useAppSelector((state) => state.branches.items);
  const training = useAppSelector((state) => state.training);
  const certificationHistory = useAppSelector((state) => state.certification.history);
  const gridRef = useStaggerReveal<HTMLDivElement>('.stat-card');

  const publishedCount = recipes.filter((recipe) => recipe.status === 'published').length;
  const draftCount = recipes.filter((recipe) => recipe.status === 'draft').length;
  const totalLessons = training.courses.reduce((sum, course) => sum + course.lessons.length, 0);
  const completedLessons = Object.values(training.completedLessons).filter(Boolean).length;
  const gatesPassed = certificationHistory.filter((record) => record.status === 'passed').length;

  const stats = [
    { value: recipes.length, label: 'Total Recipes' },
    { value: publishedCount, label: 'Published SOPs' },
    { value: draftCount, label: 'Drafts Pending Validation' },
    { value: branches.length, label: 'Branches' },
    { value: `${completedLessons}/${totalLessons}`, label: 'Training Modules Done' },
    { value: gatesPassed, label: 'Capability Gates Passed' },
  ];

  return (
    <div className="dashboard">
      <h1 className="page-heading">Dashboard</h1>
      <div className="stat-grid" ref={gridRef}>
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div className="stat-card__value">{stat.value}</div>
            <div className="stat-card__label">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="dashboard__links">
        <Link to="/app/training" className="btn btn--outline">
          Continue Training
        </Link>
        <Link to="/app/certifications" className="btn btn--outline">
          View Certifications
        </Link>
      </div>
    </div>
  );
};
