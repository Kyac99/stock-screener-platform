import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import Screener from './pages/Screener';
import StockDetail from './pages/StockDetail';
import { IndexProvider } from './contexts/IndexContext';

function App() {
  return (
    <Router>
      <IndexProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/screener" element={<Screener />} />
            <Route path="/stock/:symbol" element={<StockDetail />} />
          </Routes>
        </Layout>
      </IndexProvider>
    </Router>
  );
}

export default App;
