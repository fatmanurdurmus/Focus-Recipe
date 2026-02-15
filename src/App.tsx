import { useEffect, useState } from "react";
import { Routes, Route, NavLink, Link, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import type { FocusRecipe } from "./interfaces/FocusRecipe";

const STORAGE_KEY = "focus_recipes_v1";

export default function App() {
  //Veriyi App seviyesinde tutuyoruz: sayfa değişse de kaybolmaz
  const [recipes, setRecipes] = useState<FocusRecipe[]>([]);

  //İlk açılışta localStorage'dan oku
  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    try {
      setRecipes(JSON.parse(raw));
    } catch {
      //bozuk veri varsa yok say
    }
  }, []);

  //Her değişiklikte localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recipes));
  }, [recipes]);

    //Timer motoru: her saniye çalışan tek interval
  useEffect(() => {
    const timer = setInterval(() => {
      setRecipes((prev) => {
        const running = prev.find((r) => r.isRunning);
        if (!running) return prev;

        return prev.map((r) => {
          if (!r.isRunning) return r;

          const next = Math.max(0, (r.remainingSeconds ?? 0) - 1);

          // 0'a gelince otomatik durdur ve tamamlandı işaretle
          if (next === 0) {
            return { ...r, remainingSeconds: 0, isRunning: false, completed: true };
          }

          return { ...r, remainingSeconds: next };
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);


  const navClass = ({ isActive }: { isActive: boolean }) =>
    `nav-link ${isActive ? "active-nav" : ""}`;

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand navbar-light border-bottom sticky-top">
        <div className="container">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <span
              className="d-inline-flex align-items-center justify-content-center"
              style={{
                width: 30,
                height: 30,
                borderRadius: 10,
                background: "linear-gradient(135deg, var(--p), var(--p2))",
                color: "white",
                fontWeight: 900,
                fontSize: 14,
                boxShadow: "0 10px 22px rgba(111,97,192,0.22)",
              }}
              aria-label="Focus Recipe logo"
              title="Focus Recipe"
            >
              FR
            </span>
            <span style={{ fontWeight: 900 }}>Focus Recipe</span>
          </Link>

          <div className="navbar-nav ms-auto">
            <NavLink className={navClass} to="/">
              Home
            </NavLink>
            <NavLink className={navClass} to="/about">
              About
            </NavLink>
          </div>
        </div>
      </nav>

      {/* Sayfalar */}
      <Routes>
        <Route
          path="/"
          element={<HomePage recipes={recipes} setRecipes={setRecipes} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
