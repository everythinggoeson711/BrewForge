import { useAppSelector } from '../app/hooks';
import { useStaggerReveal } from '../hooks/useStaggerReveal';
import type { SopStatus } from '../features/recipes/recipesSlice';

const statusLabel: Record<SopStatus, string> = {
  draft: 'Draft',
  validated: 'Validated',
  published: 'Published',
};

export const RecipesPage = () => {
  const recipes = useAppSelector((state) => state.recipes.items);
  const tableRef = useStaggerReveal<HTMLTableSectionElement>('.data-table__row');

  return (
    <div className="recipes">
      <h1 className="page-heading">Recipes</h1>
      <div className="table-panel">
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Version</th>
              <th>Status</th>
              <th>Updated</th>
            </tr>
          </thead>
          <tbody ref={tableRef}>
            {recipes.map((recipe) => (
              <tr className="data-table__row" key={recipe.id}>
                <td>{recipe.name}</td>
                <td>v{recipe.version}</td>
                <td>
                  <span className={`badge badge--${recipe.status}`}>{statusLabel[recipe.status]}</span>
                </td>
                <td>{recipe.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
