type Props = {
  onAddPreset: (title: string, description: string, duration: number) => void;
};

const presets = [
  { title: "Pomodoro 25", description: "Tek işe odaklan, telefonu uzağa koy.", duration: 25 },
  { title: "Deep Work 50", description: "Bildirimleri kapat, tek görev.", duration: 50 },
  { title: "Reading 30", description: "30 dk okuma + kısa not.", duration: 30 },
  { title: "Quick Cleanup 10", description: "10 dk hızlı toparlama.", duration: 10 },
];

export default function EmptyState({ onAddPreset }: Props) {
  return (
    <div className="card p-4">
      <div className="d-flex align-items-start justify-content-between flex-wrap gap-3">
        <div>
          <h5 className="mb-1" style={{ fontWeight: 900 }}>
            Henüz plan yok
          </h5>
          <p className="text-muted mb-0">
            Soldaki formdan ekleyebilirsin veya aşağıdan <b>tek tıkla</b> hazır şablon seç.
          </p>
        </div>

        <span className="badge text-bg-light">İpucu: küçük başla ✨</span>
      </div>

      <div className="d-flex flex-wrap gap-2 mt-3">
        {presets.map((p) => (
          <button
            key={p.title}
            type="button"
            className="btn btn-outline-primary"
            onClick={() => onAddPreset(p.title, p.description, p.duration)}
          >
            {p.title} • {p.duration} dk
          </button>
        ))}
      </div>

      <div className="mt-3 small text-muted">
        Bu şablonlar “odak planı” fikrini hızlı başlatman için. İstersen düzenleyebilirsin.
      </div>
    </div>
  );
}
