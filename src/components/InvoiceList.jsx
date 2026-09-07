export default function InvoiceList({ invoices, selectedInvoice, onSelectInvoice }) {
  if (!invoices.length) {
    return <p style={{ padding: '16px', color: '#64748b' }}>No hay facturas registradas.</p>;
  }

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ marginBottom: '14px', fontSize: '1.1rem', color: '#0f172a' }}>Listado de Facturas</h3>
      <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {invoices.map((inv) => (
          <li
            key={inv.id}
            onClick={() => onSelectInvoice(inv)}
            style={{
              padding: '12px 16px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              cursor: 'pointer',
              background: selectedInvoice?.id === inv.id ? '#eff6ff' : '#ffffff',
              borderColor: selectedInvoice?.id === inv.id ? '#2563eb' : '#e2e8f0',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: '700', color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {inv.id} - {inv.clientName}
              </div>
              <div style={{ fontSize: '12px', color: '#64748b' }}>Emisión: {inv.issueDate}</div>
            </div>
            <strong style={{ color: '#2563eb', fontSize: '14px', whiteSpace: 'nowrap' }}>
              ₡{inv.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
            </strong>
          </li>
        ))}
      </ul>
    </div>
  );
}