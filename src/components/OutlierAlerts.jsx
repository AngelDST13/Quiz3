import { useMemo } from 'react';

export default function OutlierAlerts({ invoices }) {
  const analysis = useMemo(() => {
    if (!invoices.length) return { outliers: [], counts: { Pagada: 0, Pendiente: 0, Vencida: 0 }, threshold: 0 };

    const totals = invoices.map(i => i.total);
    const mean = totals.reduce((a, b) => a + b, 0) / totals.length;
    const variance = totals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / totals.length;
    const stdDev = Math.sqrt(variance);
    const threshold = mean + 1.5 * stdDev;

    const outliers = invoices.filter(inv => inv.total > threshold);

    const today = new Date();
    const counts = { Pagada: 0, Pendiente: 0, Vencida: 0 };

    invoices.forEach(inv => {
      if (inv.paid) {
        counts.Pagada++;
      } else {
        const dueDate = new Date(inv.dueDate);
        if (dueDate < today) {
          counts.Vencida++;
        } else {
          counts.Pendiente++;
        }
      }
    });

    return { outliers, counts, threshold };
  }, [invoices]);

  return (
    <div style={{ background: '#ffffff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
      <h3 style={{ fontSize: '1.1rem', color: '#0f172a', marginBottom: '16px' }}>Alertas y Estados de Vencimiento</h3>
      
      {/* Tarjetas de Estados */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '20px' }}>
        <div style={{ padding: '12px 16px', background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#166534', fontWeight: '600' }}>Pagadas</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#15803d' }}>{analysis.counts.Pagada}</span>
        </div>

        <div style={{ padding: '12px 16px', background: '#fefce8', border: '1px solid #fef08a', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#854d0e', fontWeight: '600' }}>Pendientes</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#a16207' }}>{analysis.counts.Pendiente}</span>
        </div>

        <div style={{ padding: '12px 16px', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#991b1b', fontWeight: '600' }}>Vencidas</span>
          <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#dc2626' }}>{analysis.counts.Vencida}</span>
        </div>
      </div>

      {/* Bloque de Facturas Atípicas */}
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', padding: '16px', borderRadius: '8px' }}>
        <h4 style={{ color: '#b45309', fontSize: '14px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          ⚠️ Detección de Facturas Atípicas ({analysis.outliers.length})
        </h4>

        {analysis.outliers.length === 0 ? (
          <p style={{ color: '#78350f', fontSize: '13px', margin: 0 }}>No se detectaron transacciones fuera del comportamiento estándar.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {analysis.outliers.map((outlier) => (
              <div key={outlier.id} style={{ background: '#ffffff', padding: '10px 14px', borderRadius: '6px', border: '1px solid #fcd34d', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px' }}>
                <div>
                  <strong style={{ color: '#0f172a' }}>{outlier.id} - {outlier.clientName}</strong>
                  <span style={{ color: '#64748b', marginLeft: '8px', fontSize: '12px' }}>
                    (Umbral estadístico: ₡{analysis.threshold.toLocaleString('es-CR', { minimumFractionDigits: 2 })})
                  </span>
                </div>
                <span style={{ fontWeight: 'bold', color: '#d97706', fontSize: '14px' }}>
                  ₡{outlier.total.toLocaleString('es-CR', { minimumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}