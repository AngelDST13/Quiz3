import React, { useMemo } from 'react';

export default function OutlierAlerts({ invoices }) {
  const analysis = useMemo(() => {
    if (!invoices.length) return { outliers: [], counts: { Pagada: 0, Pendiente: 0, Vencida: 0 } };

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
      <h3>Alertas y Estados de Vencimiento</h3>
      
      <div style={{ display: 'flex', gap: '20px', margin: '12px 0' }}>
        <span><strong>Pagadas:</strong> {analysis.counts.Pagada}</span>
        <span><strong>Pendientes:</strong> {analysis.counts.Pendiente}</span>
        <span style={{ color: '#dc2626' }}><strong>Vencidas:</strong> {analysis.counts.Vencida}</span>
      </div>

      <h4 style={{ color: '#d97706', marginTop: '12px' }}>Facturas Atípicas Detectadas ({analysis.outliers.length}):</h4>
      {analysis.outliers.length === 0 ? (
        <p>No se encontraron facturas atípicas.</p>
      ) : (
        <ul style={{ marginTop: '8px' }}>
          {analysis.outliers.map(outlier => (
            <li key={outlier.id} style={{ color: '#b45309', fontWeight: 'bold' }}>
              {outlier.id} - {outlier.clientName}: ${outlier.total.toFixed(2)} (Supera el umbral de ${analysis.threshold.toFixed(2)})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}