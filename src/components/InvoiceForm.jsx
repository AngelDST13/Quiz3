import { useState } from 'react';

// Funciones puras declaradas fuera del render
const generateInvoiceId = () => `FAC-00${Math.floor(Math.random() * 900) + 100}`;
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getDueDate = () => new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

export default function InvoiceForm({ onCreateInvoice }) {
  const [issuerName] = useState('TechStore S.A.');
  const [issuerTaxId] = useState('3-101-123456');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  
  // Inicializaciones puras usando funciones de inicio diferido
  const [id, setId] = useState(() => generateInvoiceId());
  const [issueDate, setIssueDate] = useState(() => getTodayDate());
  const [dueDate, setDueDate] = useState(() => getDueDate());
  
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
  const total = subtotal;

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
      tax: 0,
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

        <h4 style={{ marginTop: '8px' }}>Ítems</h4>
        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Descripción"
              value={item.description}
              onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
              required
              style={{ flex: 2 }}
            />
            <input
              type="number"
              min="1"
              placeholder="Cant"
              value={item.quantity}
              onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
              required
              style={{ width: '60px' }}
            />
            <input
              type="number"
              min="0"
              placeholder="Precio"
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

        <div style={{ marginTop: '12px', borderTop: '1px solid #e2e8f0', paddingTop: '12px' }}>
          <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '700', fontSize: '16px' }}>
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