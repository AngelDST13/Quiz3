export default function InvoiceList({ invoices, selectedInvoice, onSelectInvoice }) {
  if (!invoices.length) {
    return <p style={{ padding: '16px', color: '#64748b' }}>No hay facturas registradas.</p>;
  }

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginBottom: '12px', fontSize: '1.1rem', color: '#0f172a' }}>Listado de Facturas</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {invoices.map((inv) => (
          <li
            key={inv.id}
            onClick={() => onSelectInvoice(inv)}
            style={{
              padding: '12px',
              borderBottom: '1px solid #f1f5f9',
              cursor: 'pointer',
              borderRadius: '8px',
              background: selectedInvoice?.id === inv.id ? '#eff6ff' : 'transparent',
              display: 'flex',
              justify: 'space-between',
              alignItems: 'center',
              marginBottom: '6px'
            }}
          >
            <div>
              <div style={{ fontWeight: '700', color: '#0f172a' }}>{inv.id} - {inv.clientName}</div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Emisión: {inv.issueDate}</div>
            </div>
            <strong style={{ color: '#2563eb', fontSize: '14px' }}>
              ₡{inv.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}