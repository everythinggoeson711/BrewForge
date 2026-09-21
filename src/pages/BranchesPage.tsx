import { useAppSelector, useAppDispatch } from '../app/hooks';
import { selectBranch } from '../features/branches/branchesSlice';
import { useStaggerReveal } from '../hooks/useStaggerReveal';

export const BranchesPage = () => {
  const branches = useAppSelector((state) => state.branches.items);
  const selectedBranchId = useAppSelector((state) => state.branches.selectedBranchId);
  const dispatch = useAppDispatch();
  const gridRef = useStaggerReveal<HTMLDivElement>('.branch-card');

  return (
    <div className="branches">
      <h1 className="page-heading">Branches</h1>
      <div className="branch-grid" ref={gridRef}>
        {branches.map((branch) => (
          <button
            key={branch.id}
            type="button"
            className={`branch-card${selectedBranchId === branch.id ? ' branch-card--selected' : ''}`}
            onClick={() => dispatch(selectBranch(branch.id))}
          >
            <div className="branch-card__name">{branch.name}</div>
            <div className="branch-card__city">{branch.city}</div>
            <div className="branch-card__meta">
              <span>{branch.equipmentCount} machines</span>
              <span>{branch.certifiedStaff} certified staff</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};
