import React from 'react';

export default function InvoiceView({ invoice }) {
  if (!invoice) return null;

  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #0f172a', paddingBottom: '12px' }}>
        <div>
          <h2>{invoice.issuerName}</h2>
          <p style={{ fontSize: '13px', color: '#475569' }}>ID Fiscal: {invoice.issuerTaxId}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3>FACTURA: {invoice.id}</h3>
          <p style={{ fontSize: '13px', color: '#475569' }}>Emisión: {invoice.issueDate}</p>
          <p style={{ fontSize: '13px', color: '#475569' }}>Vencimiento: {invoice.dueDate}</p>
        </div>
      </div>

      <div style={{ marginTop: '16px' }}>
        <h4>Cliente:</h4>
        <p>{invoice.clientName}</p>
        <p style={{ fontSize: '13px', color: '#475569' }}>{invoice.clientEmail}</p>
      </div>

      <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
            <th style={{ padding: '8px' }}>Descripción</th>
            <th style={{ padding: '8px' }}>Cant.</th>
            <th style={{ padding: '8px' }}>Precio</th>
            <th style={{ padding: '8px' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, idx) => (
            <tr key={idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
              <td style={{ padding: '8px' }}>{item.description}</td>
              <td style={{ padding: '8px' }}>{item.quantity}</td>
              <td style={{ padding: '8px' }}>${item.price.toFixed(2)}</td>
              <td style={{ padding: '8px' }}>${(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: 'right', marginTop: '20px' }}>
        <p style={{ color: '#475569' }}>Subtotal: ${invoice.subtotal.toFixed(2)}</p>
        <h3 style={{ color: '#2563eb', marginTop: '4px' }}>Total: ${invoice.total.toFixed(2)}</h3>
      </div>
    </div>
  );
}