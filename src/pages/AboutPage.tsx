export default function AboutPage() {
  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold mb-3">About / How it works</h1>
        <p className="lead text-muted mx-auto" style={{ maxWidth: 700 }}>
          Focus Recipe; kısa odak planlarını oluşturabileceğin, düzenleyebileceğin
          ve ilerlemeni takip edebileceğin modern bir mini üretkenlik uygulamasıdır.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 about-card">
            <div className="card-body text-center p-4">
              <div className="about-icon mb-3">📝</div>
              <h5 className="fw-semibold">1. Plan Oluştur</h5>
              <p className="text-muted small">
                Kısa ve net odak planlarını başlık, açıklama ve süre ile oluştur.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 about-card">
            <div className="card-body text-center p-4">
              <div className="about-icon mb-3">✏️</div>
              <h5 className="fw-semibold">2. Düzenle & Güncelle</h5>
              <p className="text-muted small">
                Planlarını istediğin zaman düzenleyebilir ve optimize edebilirsin.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm border-0 about-card">
            <div className="card-body text-center p-4">
              <div className="about-icon mb-3">📊</div>
              <h5 className="fw-semibold">3. İlerlemeni Takip Et</h5>
              <p className="text-muted small">
                Toplam plan ve dakika istatistikleri ile üretkenliğini ölç.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-5 text-center">
        <h4 className="fw-semibold mb-3">Neden Focus Recipe?</h4>
        <p className="text-muted mx-auto" style={{ maxWidth: 650 }}>
          Bu proje sadece bir TODO uygulaması değil; kullanıcıya sade,
          odaklı ve görsel olarak dengeli bir üretkenlik deneyimi sunmayı
          hedefler. LocalStorage entegrasyonu sayesinde veriler kaybolmaz,
          sayfa değişimlerinde akış bozulmaz.
        </p>
      </div>
    </div>
  );
}
