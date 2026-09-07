import React, { useState, useEffect } from 'react';
import { initialInvoices } from './data/initialInvoices';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceView from './components/InvoiceView';
import DashboardMetrics from './components/DashboardMetrics';
import DashboardCharts from './components/DashboardCharts';
import OutlierAlerts from './components/OutlierAlerts';

export default function App() {
  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('invoices_quiz3');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.length >= 8) return parsed;
    }
    return initialInvoices;
  });

  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [activeTab, setActiveTab] = useState('facturacion');

  useEffect(() => {
    localStorage.setItem('invoices_quiz3', JSON.stringify(invoices));
    if (invoices.length > 0 && !selectedInvoice) {
      setSelectedInvoice(invoices[0]);
    }
  }, [invoices]);

  const handleCreateInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setSelectedInvoice(newInvoice);
  };

  const handleResetData = () => {
    if (window.confirm('¿Deseas restaurar las 8 facturas de prueba originales?')) {
      setInvoices(initialInvoices);
      setSelectedInvoice(initialInvoices[0]);
      localStorage.setItem('invoices_quiz3', JSON.stringify(initialInvoices));
    }
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <div>
          <h1>Sistema de Facturación & Analítica</h1>
        </div>
        <div className="nav-buttons">
          <button
            type="button"
            onClick={() => setActiveTab('facturacion')}
            className={`btn-nav ${activeTab === 'facturacion' ? 'active' : ''}`}
          >
            Módulo Facturación
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('dashboard')}
            className={`btn-nav ${activeTab === 'dashboard' ? 'active' : ''}`}
          >
            Dashboard Admin
          </button>
        </div>
      </header>

      <main>
        {activeTab === 'facturacion' ? (
          <div className="grid-layout">
            <div>
              <InvoiceForm onCreateInvoice={handleCreateInvoice} />
            </div>

            <div className="right-column">
              <InvoiceList
                invoices={invoices}
                selectedInvoice={selectedInvoice}
                onSelectInvoice={setSelectedInvoice}
              />
              {selectedInvoice && <InvoiceView invoice={selectedInvoice} />}
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <DashboardMetrics invoices={invoices} />
            <OutlierAlerts invoices={invoices} />
            <DashboardCharts invoices={invoices} />

            <div style={{ textAlign: 'right', marginTop: '12px' }}>
              <button
                type="button"
                onClick={handleResetData}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#94a3b8',
                  fontSize: '12px',
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                Restablecer datos de prueba a valores de fábrica
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}