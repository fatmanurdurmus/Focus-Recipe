import { useMemo, useState } from "react";
import RecipeForm from "../components/RecipeForm";
import RecipeList from "../components/RecipeList";
import ConfirmModal from "../components/ConfirmModal";
import EmptyState from "../components/EmptyState";
import type { FocusRecipe } from "../interfaces/FocusRecipe";

type Props = {
  recipes: FocusRecipe[];
  setRecipes: React.Dispatch<React.SetStateAction<FocusRecipe[]>>;
};

export default function HomePage({ recipes, setRecipes }: Props) {
  // Form state'leri (controlled inputs)
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // ✅ 0 yerine boş başlar, böylece inputta "0" takılı kalmaz
  const [duration, setDuration] = useState<number | "">("");
  const [editingId, setEditingId] = useState<string | null>(null);

  // Dashboard için arama
  const [query, setQuery] = useState("");

  // ✅ Silme modalı için (confirm() yerine)
  const [deleteId, setDeleteId] = useState<string | null>(null);

  // CREATE
  function handleAdd() {
    if (title.trim() === "") return;

    const newItem: FocusRecipe = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      duration: Number(duration) || 0,
      completed: false,
      remainingSeconds: (Number(duration) || 0) * 60,
      isRunning: false,

    };

    setRecipes((prev) => [newItem, ...prev]);
    resetForm();
  }

  function addPreset(t: string, d: string, m: number) {
    const newItem: FocusRecipe = {
        id: crypto.randomUUID(),
        title: t,
        description: d,
        duration: m,
        completed: false,
        remainingSeconds: m * 60,
        isRunning: false,

    };
    setRecipes((prev) => [newItem, ...prev]);
    }


  // DELETE (modalı aç)
  function handleDelete(id: string) {
    setDeleteId(id);
  }

  // DELETE (modal onayı sonrası gerçekten sil)
  function confirmDelete() {
    if (!deleteId) return;
    setRecipes((prev) => prev.filter((r) => r.id !== deleteId));
    setDeleteId(null);
  }

  // UPDATE hazırlık
  function handleEditStart(item: FocusRecipe) {
    setEditingId(item.id);
    setTitle(item.title);
    setDescription(item.description);
    setDuration(item.duration); // düzenlemede sayı gelsin
  }

  // UPDATE
   function handleUpdate() {
    if (!editingId) return;
    if (title.trim() === "") return;

    setRecipes((prev) =>
      prev.map((r) =>
        r.id === editingId
          ? {
              ...r,
              title: title.trim(),
              description: description.trim(),
              duration: Number(duration) || 0,
            }
          : r
      )
    );

    resetForm();
  }

 
   function handleStartTimer(id: string) {
    setRecipes((prev) =>
        prev.map((r) => {
        if (r.id === id) return { ...r, isRunning: true };
        return { ...r, isRunning: false };
        })
    );
    }

    function handlePauseTimer(id: string) {
    setRecipes((prev) =>
        prev.map((r) => (r.id === id ? { ...r, isRunning: false } : r))
    );
    }

    function handleResetTimer(id: string) {
    setRecipes((prev) =>
        prev.map((r) =>
        r.id === id
            ? {
                ...r,
                isRunning: false,
                completed: false,
                remainingSeconds: (r.duration || 0) * 60,
            }
            : r
        )
    );
    }


  function resetForm() {
    setEditingId(null);
    setTitle("");
    setDescription("");
    setDuration("");
  }

  // Mini istatistik (abartısız wow)
  const stats = useMemo(() => {
    const total = recipes.length;
    const totalMinutes = recipes.reduce((acc, r) => acc + (r.duration || 0), 0);
    return { total, totalMinutes };
  }, [recipes]);

  // Arama filtresi
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return recipes;
    return recipes.filter(
      (r) =>
        r.title.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q)
    );
  }, [recipes, query]);

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="d-flex flex-wrap justify-content-between align-items-end gap-3 mb-4">
        <div>
          <h1 className="mb-1">Focus Recipe</h1>
          <p className="text-muted mb-0">
            “Tarif” burada yemek değil 🙂 <b>odak planı</b> demek. Kısa
            planlarını ekle, düzenle, sakla.
          </p>
        </div>

        <div className="d-flex gap-2">
          <div className="card border-0 shadow-sm">
            <div className="card-body py-2 px-3">
              <div className="small text-muted">Toplam Plan</div>
              <div className="fw-semibold">{stats.total}</div>
            </div>
          </div>
          <div className="card border-0 shadow-sm">
            <div className="card-body py-2 px-3">
              <div className="small text-muted">Toplam Dakika</div>
              <div className="fw-semibold">{stats.totalMinutes}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Arama */}
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Ara: başlık veya açıklama..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {/* Layout */}
      <div className="row g-3">
        <div className="col-12 col-lg-5">
          <RecipeForm
            title={title}
            description={description}
            duration={duration}
            setTitle={setTitle}
            setDescription={setDescription}
            setDuration={setDuration}
            editingId={editingId}
            onAdd={handleAdd}
            onUpdate={handleUpdate}
            onCancel={resetForm}
          />
        </div>

        <div className="col-12 col-lg-7">
        {filtered.length === 0 ? (
            <EmptyState onAddPreset={addPreset} />
        ) : (
            <RecipeList
            recipes={filtered}
            onEdit={handleEditStart}
            onDelete={handleDelete}
            onStart={handleStartTimer}
            onPause={handlePauseTimer}
            onReset={handleResetTimer}
            />
        )}
        </div>

      </div>

      {/* ✅ Silme için güzel modal */}
      <ConfirmModal
        title="Planı sil?"
        message="Bu odak planını silersen geri alamazsın."
        isOpen={deleteId !== null}
        confirmText="Evet, sil"
        cancelText="İptal"
        onConfirm={confirmDelete}
        onClose={() => setDeleteId(null)}
      />
    </div>
  );
}
