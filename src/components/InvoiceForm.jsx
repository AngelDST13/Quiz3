import { useState } from 'react';

const generateInvoiceId = () => `FAC-00${Math.floor(Math.random() * 900) + 100}`;
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getDueDate = () => new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

export default function InvoiceForm({ onCreateInvoice }) {
  const [issuerName] = useState('TechStore S.A.');
  const [issuerTaxId] = useState('3-101-123456');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  const [id, setId] = useState(() => generateInvoiceId());
  const [issueDate, setIssueDate] = useState(() => getTodayDate());
  const [dueDate, setDueDate] = useState(() => getDueDate());
  const [taxRate, setTaxRate] = useState(13); // 13% IVA
  
  const [items, setItems] = useState([
    { id: 1, description: '', quantity: 1, price: 0 }
  ]);

  const handleAddItem = () => {
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), description: '', quantity: 1, price: 0 }
    ]);
  };

  const handleRemoveItem = (itemId) => {
    if (items.length > 1) {
      setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }
  };

  const handleItemChange = (itemId, field, value) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, [field]: field === 'description' ? value : Number(value) };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = (subtotal * taxRate) / 100;
  const total = subtotal + tax;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!clientName || items.some((i) => !i.description || i.price <= 0)) {
      alert('Por favor completa todos los campos requeridos.');
      return;
    }

    const newInvoice = {
      id,
      issuerName,
      issuerTaxId,
      clientName,
      clientEmail,
      issueDate,
      dueDate,
      paid: false,
      items,
      subtotal,
      taxRate,
      tax,
      total
    };

    onCreateInvoice(newInvoice);
    setClientName('');
    setClientEmail('');
    setId(generateInvoiceId());
    setItems([{ id: Date.now(), description: '', quantity: 1, price: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Factura</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '12px' }}>
        <div>
          <label>N° Factura</label>
          <input type="text" value={id} onChange={(e) => setId(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div>
          <label>Cliente</label>
          <input type="text" placeholder="Ej. Juan Pérez" value={clientName} onChange={(e) => setClientName(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div>
          <label>Correo Cliente</label>
          <input type="email" placeholder="correo@ejemplo.com" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} required style={{ width: '100%' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label>Emisión</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div>
            <label>Vencimiento</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required style={{ width: '100%' }} />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
          <h4>Ítems</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <label style={{ fontSize: '12px' }}>% IVA:</label>
            <input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} style={{ width: '50px', padding: '4px' }} />
          </div>
        </div>

        {/* Encabezados claros para identificar los dos inputs numéricos */}
        <div style={{ display: 'flex', gap: '6px', fontSize: '12px', fontWeight: 'bold', color: '#64748b' }}>
          <span style={{ flex: 2 }}>Descripción</span>
          <span style={{ width: '60px' }}>Cant.</span>
          <span style={{ width: '80px' }}>Precio</span>
          {items.length > 1 && <span style={{ width: '28px' }}></span>}
        </div>

        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Ej. Teclado USB"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              required
              style={{ flex: 2 }}
            />
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
              required
              style={{ width: '60px' }}
            />
            <input
              type="number"
              min="0"
              value={item.price}
              onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
              required
              style={{ width: '80px' }}
            />
            {items.length > 1 && (
              <button type="button" onClick={() => handleRemoveItem(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>✕</button>
            )}
          </div>
        ))}

        <button type="button" onClick={handleAddItem} style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600' }}>
          + Agregar Ítem
        </button>

        <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px', fontSize: '14px' }}>
          <p style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b', marginTop: '4px' }}>
            <span>Impuesto ({taxRate}%):</span>
            <span>${tax.toFixed(2)}</span>
          </p>
          <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px', color: '#0f172a', marginTop: '6px' }}>
            <span>Total:</span>
            <span>${total.toFixed(2)}</span>
          </p>
        </div>

        <button type="submit" style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '8px' }}>
          Guardar Factura
        </button>
      </div>
    </form>
  );
}