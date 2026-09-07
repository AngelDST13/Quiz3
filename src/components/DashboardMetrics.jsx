import React, { useMemo } from 'react';

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
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ color: '#64748b', fontSize: '13px' }}>Total Facturado</h4>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>${stats.total.toFixed(2)}</p>
      </div>
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ color: '#64748b', fontSize: '13px' }}>N° Facturas</h4>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>{stats.count}</p>
      </div>
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ color: '#64748b', fontSize: '13px' }}>Ticket Promedio</h4>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#0f172a' }}>${stats.avg.toFixed(2)}</p>
      </div>
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ color: '#64748b', fontSize: '13px' }}>Proyección Siguiente Período</h4>
        <p style={{ fontSize: '22px', fontWeight: 'bold', color: '#16a34a' }}>${stats.projection.toFixed(2)}</p>
        <small style={{ color: '#94a3b8' }}>(Estimación +15%)</small>
      </div>
    </div>
  );
}