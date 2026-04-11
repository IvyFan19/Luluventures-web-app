import { Suspense, lazy, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ensureAmplifyConfigured, loadAmplifyAuth } from './utils/loadAmplifyAuth';

interface AuthUser {
  username: string;
  [key: string]: unknown;
}

const LoginPage = lazy(async () => {
  await ensureAmplifyConfigured();
  const module = await import('./components/LoginPage');

  return { default: module.LoginPage };
});

const ResearchAnalysisPage = lazy(async () => {
  const module = await import('./components/ResearchAnalysisPage');

  return { default: module.ResearchAnalysisPage };
});

const ArticleDetailPage = lazy(async () => {
  const module = await import('./components/ArticleDetailPage');

  return { default: module.ArticleDetailPage };
});

function RouteLoader({ theme }: { theme: 'dark' | 'light' }) {
  const isDark = theme === 'dark';

  return (
    <div className={`flex min-h-screen items-center justify-center ${isDark ? 'bg-black text-white' : 'bg-white text-[#1d1d1f]'}`}>
      <div className="text-center">
        <div className={`mx-auto h-12 w-12 animate-spin rounded-full border-b-2 ${isDark ? 'border-emerald-400' : 'border-blue-600'}`} />
        <p className={isDark ? 'mt-4 text-white/60' : 'mt-4 text-gray-600'}>Loading...</p>
      </div>
    </div>
  );
}

function AppRoutes() {
  const location = useLocation();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [themeOverride, setThemeOverride] = useState<'dark' | 'light' | null>(null);
  const theme = themeOverride ?? 'dark';
  const toggleTheme = () => setThemeOverride(theme === 'dark' ? 'light' : 'dark');
  const [lang, setLang] = useState<'en' | 'zh'>(() => {
    const saved = localStorage.getItem('lang');
    if (saved === 'en' || saved === 'zh') return saved;
    return navigator.language.startsWith('zh') ? 'zh' : 'en';
  });
  const changeLang = (newLang: 'en' | 'zh') => {
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };
  const [loading, setLoading] = useState(location.pathname !== '/');

  const refreshUser = useCallback(async (blockUi = false) => {
    if (blockUi) {
      setLoading(true);
    }

    try {
      const auth = await loadAmplifyAuth();
      const currentUser = await auth.getCurrentUser();
      setUser(currentUser as AuthUser);
    } catch {
      setUser(null);
    } finally {
      if (blockUi) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (location.pathname === '/') {
      setLoading(false);

      const timer = window.setTimeout(() => {
        void refreshUser(false);
      }, 1200);

      return () => window.clearTimeout(timer);
    }

    void refreshUser(true);
  }, [location.pathname, refreshUser]);

  const handleSignOut = async () => {
    try {
      const auth = await loadAmplifyAuth();
      await auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleLoginSuccess = () => {
    void refreshUser(false);
  };

  if (loading) {
    return <RouteLoader theme={theme} />;
  }

  return (
    <Suspense fallback={<RouteLoader theme={theme} />}>
      <Routes>
        <Route
          path="/"
          element={<HomePage user={user} signOut={handleSignOut} theme={theme} lang={lang} onChangeLang={changeLang} />}
        />
        <Route
          path="/login"
          element={<LoginPage onLoginSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/research-analysis"
          element={<ResearchAnalysisPage user={user} signOut={handleSignOut} />}
        />
        <Route
          path="/research-analysis/:slug"
          element={<ArticleDetailPage user={user} signOut={handleSignOut} />}
        />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
