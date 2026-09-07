import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function DashboardCharts({ invoices }) {
  if (!invoices.length) return null;

  const barData = invoices.map(i => ({ name: i.id, total: i.total }));

  const clientMap = {};
  invoices.forEach(inv => {
    clientMap[inv.clientName] = (clientMap[inv.clientName] || 0) + inv.total;
  });
  const pieData = Object.entries(clientMap).map(([name, value]) => ({ name, value }));

  const COLORS = ['#2563eb', '#16a34a', '#d97706', '#dc2626', '#8b5cf6'];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ marginBottom: '12px' }}>Ingresos por Factura</h4>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#2563eb" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div style={{ background: '#ffffff', padding: '16px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        <h4 style={{ marginBottom: '12px' }}>Distribución por Cliente</h4>
        <ResponsiveContainer width="100%" height={240}>
          <PieChart>
            <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label>
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}