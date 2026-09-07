import React from 'react';

export default function InvoiceList({ invoices, selectedInvoice, onSelectInvoice }) {
  if (!invoices.length) {
    return <p>No hay facturas registradas.</p>;
  }

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginBottom: '12px' }}>Listado de Facturas</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {invoices.map((inv) => (
          <li
            key={inv.id}
            onClick={() => onSelectInvoice(inv)}
            style={{
              padding: '12px',
              borderBottom: '1px solid #f1f5f9',
              cursor: 'pointer',
              borderRadius: '6px',
              background: selectedInvoice?.id === inv.id ? '#eff6ff' : 'transparent',
              display: 'flex',
              justify: 'space-between',
              marginBottom: '4px'
            }}
          >
            <div>
              <strong>{inv.id}</strong> - {inv.clientName}
              <div style={{ fontSize: '12px', color: '#64748b' }}>Emisión: {inv.issueDate}</div>
            </div>
            <strong>${inv.total.toFixed(2)}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
}