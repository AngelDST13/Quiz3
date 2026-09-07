import { useState } from 'react';

const generateInvoiceId = () => `00700001010000${Math.floor(Math.random() * 90000) + 10000}`;
const generateClave = (id) => `50607052400310173587${id}199999999`;
const getTodayDate = () => new Date().toISOString().split('T')[0];
const getDueDate = () => new Date(Date.now() + 15 * 86400000).toISOString().split('T')[0];

export default function InvoiceForm({ onCreateInvoice }) {
  const [issuerName] = useState('Extreme Technology Corp ETC, S.A');
  const [issuerTaxId] = useState('3-101-735870');
  const [issuerAddress] = useState('Heredia, Santo Domingo, Santa Rosa, Bodegas la Valencia, Bodega #6');
  const [issuerPhone] = useState('4350-2222');
  const [issuerEmail] = useState('ventas@extremetechcr.com');

  const [clientName, setClientName] = useState('');
  const [clientTaxId, setClientTaxId] = useState('');
  const [clientAddress, setClientAddress] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [paymentTerms, setPaymentTerms] = useState('Neto 1 día (envío)');

  const [id, setId] = useState(() => generateInvoiceId());
  const [issueDate, setIssueDate] = useState(() => getTodayDate());
  const [dueDate, setDueDate] = useState(() => getDueDate());
  const [taxRate, setTaxRate] = useState(13);

  const [items, setItems] = useState([
    { id: 'PROD101', description: '', serial: '', quantity: 1, price: 0 }
  ]);

  const allowOnlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleAddItem = () => {
    setItems((prev) => [
      ...prev,
      { id: `PROD${prev.length + 101}`, description: '', serial: '', quantity: 1, price: 0 }
    ]);
  };

  const handleRemoveItem = (itemId) => {
    if (items.length > 1) {
      setItems((prev) => prev.filter((item) => item.id !== itemId));
    }
  };

  const handleItemChange = (itemId, field, value) => {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, [field]: field === 'description' || field === 'serial' || field === 'id' ? value : Number(value) };
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
    if (!clientName || !clientTaxId || !clientPhone || items.some((i) => !i.description || i.price <= 0)) {
      alert('Por favor completa los campos requeridos y que los precios sean mayores a 0.');
      return;
    }

    const currentId = id;
    const newInvoice = {
      id: currentId,
      clave: generateClave(currentId),
      issuerName,
      issuerTaxId,
      issuerAddress,
      issuerPhone,
      issuerEmail,
      clientName,
      clientTaxId,
      clientAddress,
      clientPhone,
      clientEmail,
      paymentTerms,
      issueDate,
      dueDate,
      paid: false,
      currency: '₡',
      taxRate,
      items,
      subtotal,
      tax,
      total
    };

    onCreateInvoice(newInvoice);

    setClientName('');
    setClientTaxId('');
    setClientAddress('');
    setClientPhone('');
    setClientEmail('');
    const newId = generateInvoiceId();
    setId(newId);
    setItems([{ id: 'PROD101', description: '', serial: '', quantity: 1, price: 0 }]);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 style={{ fontSize: '1.2rem', marginBottom: '12px' }}>Crear Factura Electrónica</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div>
          <label style={{ fontSize: '12px' }}>N° Factura (Sólo números)</label>
          <input
            type="text"
            value={id}
            onKeyDown={allowOnlyNumbers}
            onChange={(e) => setId(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div>
          <label style={{ fontSize: '12px' }}>Nombre del Cliente / Empresa</label>
          <input
            type="text"
            placeholder="Ej. Natanael Lorente"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '12px' }}>Cédula / Tax ID</label>
            <input
              type="text"
              placeholder="Ej. 208890467"
              value={clientTaxId}
              onKeyDown={allowOnlyNumbers}
              onChange={(e) => setClientTaxId(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px' }}>Teléfono</label>
            <input
              type="text"
              placeholder="Ej. 83534519"
              value={clientPhone}
              onKeyDown={allowOnlyNumbers}
              onChange={(e) => setClientPhone(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '12px' }}>Dirección Exacta</label>
          <input
            type="text"
            placeholder="Ej. San Isidro de Heredia"
            value={clientAddress}
            onChange={(e) => setClientAddress(e.target.value)}
            required
            style={{ width: '100%' }}
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '12px' }}>Correo Electrónico</label>
            <input
              type="email"
              placeholder="cliente@correo.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '12px' }}>Términos de Pago</label>
            <input
              type="text"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              required
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
          <div>
            <label style={{ fontSize: '11px' }}>Emisión</label>
            <input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px' }}>Vencimiento</label>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} required style={{ width: '100%' }} />
          </div>
          <div>
            <label style={{ fontSize: '11px' }}>% IVA</label>
            <input
              type="number"
              value={taxRate}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              required
              style={{ width: '100%' }}
            />
          </div>
        </div>

        <h4 style={{ marginTop: '8px', fontSize: '13px' }}>Ítems de Factura</h4>

        {items.map((item) => (
          <div key={item.id} style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: '#f8fafc', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <input
                type="text"
                placeholder="Código"
                value={item.id}
                onChange={(e) => handleItemChange(item.id, 'id', e.target.value)}
                style={{ width: '80px' }}
                required
              />
              <input
                type="text"
                placeholder="Descripción del Producto"
                value={item.description}
                onChange={(e) => handleItemChange(item.id, 'description', e.target.value)}
                style={{ flex: 1, minWidth: 0 }}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="N° Serie (Opcional)"
                value={item.serial}
                onChange={(e) => handleItemChange(item.id, 'serial', e.target.value)}
                style={{ flex: 1, minWidth: 0 }}
              />
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontSize: '10px' }}>Cant:</span>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(item.id, 'quantity', e.target.value)}
                  style={{ width: '40px', padding: '4px' }}
                  required
                />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <span style={{ fontSize: '10px' }}>Precio:</span>
                <input
                  type="number"
                  min="0"
                  value={item.price}
                  onChange={(e) => handleItemChange(item.id, 'price', e.target.value)}
                  style={{ width: '60px', padding: '4px' }}
                  required
                />
              </div>
              {items.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveItem(item.id)}
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 6px', borderRadius: '4px', cursor: 'pointer' }}
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddItem}
          style={{ background: '#f1f5f9', color: '#334155', border: '1px solid #cbd5e1', padding: '8px', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
        >
          + Agregar Producto / Servicio
        </button>

        <div style={{ marginTop: '6px', borderTop: '1px solid #e2e8f0', paddingTop: '6px', fontSize: '12px' }}>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Subtotal:</span><span>₡{subtotal.toFixed(2)}</span></p>
          <p style={{ display: 'flex', justifyContent: 'space-between' }}><span>Impuesto ({taxRate}%):</span><span>₡{tax.toFixed(2)}</span></p>
          <p style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '14px', marginTop: '4px' }}>
            <span>Total:</span><span>₡{total.toFixed(2)}</span>
          </p>
        </div>

        <button
          type="submit"
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: '600', cursor: 'pointer', marginTop: '4px' }}
        >
          Guardar Factura Electrónica
        </button>
      </div>
    </form>
  );
}