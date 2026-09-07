import { useMemo } from 'react';

export default function DashboardMetrics({ invoices }) {
  const stats = useMemo(() => {
    if (!invoices.length) return { total: 0, count: 0, avg: 0, topClients: [], projection: 0 };

    const total = invoices.reduce((acc, inv) => acc + inv.total, 0);
    const count = invoices.length;
    const avg = total / count;
    const projection = total * 1.15;

    const clientMap = {};
    invoices.forEach(inv => {
      clientMap[inv.clientName] = (clientMap[inv.clientName] || 0) + inv.total;
    });

    const topClients = Object.entries(clientMap)
      .map(([name, amount]) => ({ name, amount }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 3);

    return { total, count, avg, topClients, projection };
  }, [invoices]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#64748b', fontSize: '13px' }}>Total Facturado</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>₡{stats.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#64748b', fontSize: '13px' }}>N° Facturas</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>{stats.count}</p>
        </div>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#64748b', fontSize: '13px' }}>Ticket Promedio</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#0f172a' }}>₡{stats.avg.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</p>
        </div>
        <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
          <h4 style={{ color: '#64748b', fontSize: '13px' }}>Proyección Siguiente Período</h4>
          <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a' }}>₡{stats.projection.toLocaleString('es-CR', { minimumFractionDigits: 2 })}</p>
          <small style={{ color: '#94a3b8' }}>(Estimación +15%)</small>
        </div>
      </div>

      {/* Bloque de Ranking Top 3 Clientes */}
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ color: '#0f172a', marginBottom: '10px', fontSize: '14px' }}>Top 3 Clientes por Facturación</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '10px' }}>
          {stats.topClients.map((client, index) => (
            <div key={index} style={{ padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontWeight: 'bold', color: '#2563eb' }}>#{index + 1}</span> <strong>{client.name}</strong>
              <div style={{ fontSize: '13px', color: '#475569', marginTop: '2px' }}>
                ₡{client.amount.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}