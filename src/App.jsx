import React, { useState } from 'react';
import { initialInvoices } from './data/initialInvoices';
import InvoiceForm from './components/InvoiceForm';
import InvoiceList from './components/InvoiceList';
import InvoiceView from './components/InvoiceView';
import DashboardMetrics from './components/DashboardMetrics';
import DashboardCharts from './components/DashboardCharts';
import OutlierAlerts from './components/OutlierAlerts';

export default function App() {
  const [invoices, setInvoices] = useState(initialInvoices);
  const [selectedInvoice, setSelectedInvoice] = useState(initialInvoices[0] || null);
  const [activeTab, setActiveTab] = useState('facturacion');

  const handleCreateInvoice = (newInvoice) => {
    setInvoices((prev) => [newInvoice, ...prev]);
    setSelectedInvoice(newInvoice);
  };

  return (
    <div className="app-container">
      <header className="main-header">
        <h1>Sistema de Facturación & Analítica</h1>
        <div className="nav-buttons">
          <button
            type="button"
            onClick={() => setActiveTab('facturacion')}
            className={`btn-nav ${activeTab === 'facturacion' ? 'active' : ''}`}
          >
            Módulo Facturación (Empleado)
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
          </div>
        )}
      </main>
    </div>
  );
}