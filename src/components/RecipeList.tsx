import type { FocusRecipe } from "../interfaces/FocusRecipe";

function formatTime(totalSeconds: number) {
  const s = Math.max(0, totalSeconds || 0);
  const mm = String(Math.floor(s / 60)).padStart(2, "0");
  const ss = String(s % 60).padStart(2, "0");
  return `${mm}:${ss}`;
}

type Props = {
  // Liste verisi
  recipes: FocusRecipe[];

  // CRUD aksiyonları
  onEdit: (recipe: FocusRecipe) => void;
  onDelete: (id: string) => void;

  // ⏱ Timer aksiyonları
  onStart: (id: string) => void;
  onPause: (id: string) => void;
  onReset: (id: string) => void;
};

export default function RecipeList({
  recipes,
  onEdit,
  onDelete,
  onStart,
  onPause,
  onReset,
}: Props) {
  if (recipes.length === 0) {
    return <p className="text-muted mb-0">Henüz plan eklenmedi.</p>;
  }

  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-0">
        <ul className="list-group list-group-flush">
          {recipes.map((recipe) => (
            <li
              key={recipe.id}
              className="list-group-item d-flex justify-content-between align-items-center p-3"
            >
              {/* Sol taraf: içerik */}
              <div className="me-3">
                <div className="d-flex align-items-center gap-2">
                  <div className="fw-semibold">{recipe.title}</div>
                  <span className="badge text-bg-light">
                    {recipe.duration} dk
                  </span>

                  {recipe.completed ? (
                    <span className="badge text-bg-success">Done</span>
                  ) : null}

                  {recipe.isRunning ? (
                    <span className="badge text-bg-warning">Running</span>
                  ) : null}
                </div>

                <div className="text-muted small">{recipe.description || "—"}</div>

                {/* ⏱ Kalan süre */}
                <div className="mt-2">
                  <span className="badge text-bg-light">
                    ⏱ {formatTime(recipe.remainingSeconds)}
                  </span>
                </div>
              </div>

              {/* Sağ taraf: butonlar */}
              <div className="d-flex flex-wrap gap-2 justify-content-end">
                {/* Timer controls */}
                {recipe.isRunning ? (
                  <button
                    type="button"
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => onPause(recipe.id)}
                  >
                    Pause
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={() => onStart(recipe.id)}
                    disabled={recipe.remainingSeconds === 0}
                  >
                    Start
                  </button>
                )}

                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary"
                  onClick={() => onReset(recipe.id)}
                >
                  Reset
                </button>

                {/* CRUD controls */}
                <button
                  type="button"
                  className="btn btn-sm btn-outline-primary"
                  onClick={() => onEdit(recipe)}
                >
                  Düzenle
                </button>

                <button
                  type="button"
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => onDelete(recipe.id)}
                >
                  Sil
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
