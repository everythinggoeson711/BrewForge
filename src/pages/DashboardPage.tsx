import { useAppSelector } from '../app/hooks';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const DashboardPage = () => {
  const recipes = useAppSelector((state) => state.recipes.items);
  const branches = useAppSelector((state) => state.branches.items);
  const gridRef = useStaggerReveal<HTMLDivElement>('.stat-card');

  const publishedCount = recipes.filter((recipe) => recipe.status === 'published').length;
  const draftCount = recipes.filter((recipe) => recipe.status === 'draft').length;

  const stats = [
    { value: recipes.length, label: 'Total Recipes' },
    { value: publishedCount, label: 'Published SOPs' },
    { value: draftCount, label: 'Drafts Pending Validation' },
    { value: branches.length, label: 'Branches' },
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
    </div>
  );
};
