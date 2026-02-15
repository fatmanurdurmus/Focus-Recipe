type Props = {
  // Form alanları (controlled inputs)
  title: string;
  description: string;
  duration: number | "";

  // Setter fonksiyonları
  setTitle: (v: string) => void;
  setDescription: (v: string) => void;
  setDuration: (v: number | "") => void;

  // Düzenleme modu
  editingId: string | null;

  // CRUD aksiyonları
  onAdd: () => void;
  onUpdate: () => void;
  onCancel: () => void;
};

export default function RecipeForm({
  title,
  description,
  duration,
  setTitle,
  setDescription,
  setDuration,
  editingId,
  onAdd,
  onUpdate,
  onCancel,
}: Props) {
  return (
    <div className="card shadow-sm border-0">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">{editingId ? "Planı Güncelle" : "Yeni Odak Planı"}</h5>
          <span className="badge text-bg-light">{editingId ? "Edit mode" : "Create mode"}</span>
        </div>

        <label className="form-label">Başlık</label>
        <input
          className="form-control mb-3"
          placeholder="Örn: Pomodoro 25"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label className="form-label">Açıklama</label>
        <textarea
          className="form-control mb-3"
          placeholder="Örn: Telefonu uzaklaştır, tek işe odaklan"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label className="form-label">Süre (dakika)</label>
        <input
        className="form-control"
        placeholder="Örn: 25"
        type="number"
        inputMode="numeric"
        min={0}
        step={1}
        value={duration}
        onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) e.preventDefault();
        }}
        onChange={(e) => {
            const v = e.target.value;
            setDuration(v === "" ? "" : Number(v));
        }}
        />


        {/* Ekleme modunda: Ekle butonu. Düzenleme modunda: Kaydet + İptal */}
        <div className="d-flex gap-2 mt-3">
          {editingId ? (
            <>
              <button className="btn btn-success" onClick={onUpdate}>
                Kaydet
              </button>
              <button className="btn btn-outline-secondary" onClick={onCancel}>
                İptal
              </button>
            </>
          ) : (
            <button className="btn btn-primary w-100 mt-2" type="button" onClick={onAdd}>
            Ekle
            </button>

          )}
        </div>

        {/* Küçük not: Bu form controlled input kullanır (React state ile yönetilir). */}
        <div className="small text-muted mt-3">
          İpucu: Plan ekledikten sonra listeden “Düzenle” ile güncelleyebilirsin.
        </div>
      </div>
    </div>
  );
}
