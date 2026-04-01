import './App.css';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

// Try the webpack-bundled logo first; falls back gracefully if not present yet.
let octofitLogo;
try {
  // eslint-disable-next-line import/no-webpack-loader-syntax
  octofitLogo = require('./octofit-logo.png');
} catch (_) {
  octofitLogo = `${process.env.PUBLIC_URL}/octofit-logo.png`;
}

function App() {
  return (
    <div className="container py-4">

      {/* ── Banner ─────────────────────────────────────────── */}
      <header className="octofit-banner">
        <img
          src={octofitLogo}
          alt="OctoFit logo"
          onError={(e) => { e.target.style.display = 'none'; }}
        />
        <div>
          <h1 className="mb-0">OctoFit Tracker</h1>
          <p className="banner-subtitle mb-0">Your fitness journey, together</p>
        </div>
      </header>

      {/* ── Navigation ─────────────────────────────────────── */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary rounded px-3 mb-4 octofit-nav">
        <span className="navbar-brand fw-bold">Navigate</span>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#octofitNav"
          aria-controls="octofitNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="octofitNav">
          <ul className="navbar-nav me-auto">
            {[
              { to: '/users', label: 'Users' },
              { to: '/teams', label: 'Teams' },
              { to: '/activities', label: 'Activities' },
              { to: '/leaderboard', label: 'Leaderboard' },
              { to: '/workouts', label: 'Workouts' },
            ].map(({ to, label }) => (
              <li className="nav-item" key={to}>
                <NavLink
                  className={({ isActive }) =>
                    'nav-link' + (isActive ? ' active' : '')
                  }
                  to={to}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ── Page content ───────────────────────────────────── */}
      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;
