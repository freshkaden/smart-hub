import { useState, useEffect } from 'react';
//import './index.css';
import './App.css';
import LiveClock from './components/LiveClock';
import Weather from './components/Weather';
import News from './components/News';
import Search from './components/Search';
import TodoList from './components/TodoList';

function App() {

  const [searchQuery, setSearchQuery] = useState("");

  const currentDate = new Date().toLocaleDateString(undefined, {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
  });

  const [bgUrl, setBgUrl] = useState(() => {
      return localStorage.getItem('dashboard_bg_config') || "";
  });

  useEffect(() => {
      localStorage.setItem('dashboard_bg_config', bgUrl);
  }, [bgUrl]);

  const resetBackground = () => setBgUrl("");

  return (
    <div className="dashboard-container"
    style={{
        backgroundImage: bgUrl ? `url("${bgUrl}")` : 'none',
        backgroundSize: 'cover'
    }}
    >
      <header className="dashboard-header">
        <h1 className="dashboard-title">Smart Hub Dashboard</h1>
        <p className="date">{currentDate}</p>
        <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      </header>
      
      <div className="status-bar">
        <div className="top-widget left">
            <LiveClock />
        </div>

        <div className="top-widget right">
            <Weather />
        </div>
       </div>
       
      <main className="dashboard-grid">
        <section className="widget-card">
            <TodoList searchQuery={searchQuery}/>
        </section> 

        <section className="widget-card">
            <News searchQuery={searchQuery} />
        </section>
      </main>

      <footer className="dashboard-footer">
        <div className="bg-config">
            <label htmlFor="bg-input" className="footer-label">Custom Background: </label>
            <input
                id="bg-input" type="text" placeholder="Put Image URL here" value={bgUrl} onChange={(e) => setBgUrl(e.target.value)}
                className="bg-input"
                />
            {bgUrl && <button onClick={resetBackground} className="bg-reset">Reset</button>}
        </div>
       </footer>


        
      
    </div>
  );
}

export default App;