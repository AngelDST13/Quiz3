export default function InvoiceView({ invoice }) {
  if (!invoice) return null;

  const curr = invoice.currency || '₡';

  return (
    <div style={{ background: '#ffffff', padding: '24px', borderRadius: '4px', border: '1px solid #94a3b8', fontFamily: 'Arial, sans-serif', color: '#0f172a', fontSize: '12px' }}>
      
      {/* Encabezado Principal */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #000', paddingBottom: '12px' }}>
        <div style={{ maxWidth: '60%' }}>
          <h2 style={{ fontSize: '15px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{invoice.issuerName}</h2>
          <p style={{ margin: 0, color: '#334155' }}>{invoice.issuerAddress}</p>
          <p style={{ margin: 0, color: '#334155' }}>Tel: {invoice.issuerPhone}</p>
          <p style={{ margin: 0, color: '#334155' }}>Cédula Jurídica: {invoice.issuerTaxId}</p>
          <p style={{ margin: 0, color: '#334155' }}>Email: {invoice.issuerEmail}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <h3 style={{ fontSize: '14px', margin: '0 0 4px 0', textTransform: 'uppercase' }}>Factura Electrónica No. {invoice.id}</h3>
          <p style={{ margin: '0 0 8px 0', fontSize: '10px', color: '#475569', wordBreak: 'break-all' }}>
            <strong>Clave:</strong> {invoice.clave || '50607052400310173587000700001010000127713199999999'}
          </p>
          <table style={{ borderCollapse: 'collapse', float: 'right', border: '1px solid #000' }}>
            <thead>
              <tr style={{ background: '#cbd5e1', fontSize: '10px', textAlign: 'center' }}>
                <th style={{ border: '1px solid #000', padding: '2px 8px' }}>Día</th>
                <th style={{ border: '1px solid #000', padding: '2px 8px' }}>Mes</th>
                <th style={{ border: '1px solid #000', padding: '2px 8px' }}>Año</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ textAlign: 'center', fontWeight: 'bold' }}>
                <td style={{ border: '1px solid #000', padding: '2px 8px' }}>{invoice.issueDate.split('-')[2]}</td>
                <td style={{ border: '1px solid #000', padding: '2px 8px' }}>{invoice.issueDate.split('-')[1]}</td>
                <td style={{ border: '1px solid #000', padding: '2px 8px' }}>{invoice.issueDate.split('-')[0]}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Bloque Información de Cliente / Detalles */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', border: '1px solid #000', marginTop: '12px', background: '#f8fafc' }}>
        <div style={{ padding: '8px', borderRight: '1px solid #000' }}>
          <div style={{ background: '#cbd5e1', padding: '2px 4px', fontWeight: 'bold', fontSize: '11px', marginBottom: '4px' }}>Información de Cliente:</div>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{invoice.clientName}</p>
          <p style={{ margin: 0 }}>Cédula: {invoice.clientTaxId || '2-0889-0467'}</p>
          <p style={{ margin: 0 }}>{invoice.clientAddress || 'Costa Rica'}</p>
          <p style={{ margin: 0 }}>Tel: {invoice.clientPhone || '8888-8888'}</p>
        </div>
        <div style={{ padding: '8px' }}>
          <div style={{ background: '#cbd5e1', padding: '2px 4px', fontWeight: 'bold', fontSize: '11px', marginBottom: '4px' }}>Detalles:</div>
          <p style={{ margin: 0 }}><strong>Email:</strong> {invoice.clientEmail}</p>
          <p style={{ margin: 0 }}><strong>Términos de Pago:</strong> Contado / Neto 15 días</p>
          <p style={{ margin: 0 }}><strong>Fecha de Vencimiento:</strong> {invoice.dueDate}</p>
        </div>
      </div>

      {/* Tabla de Productos / Servicios */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', border: '1px solid #000' }}>
        <thead>
          <tr style={{ background: '#cbd5e1', textAlign: 'left', fontSize: '11px' }}>
            <th style={{ border: '1px solid #000', padding: '4px' }}>Producto</th>
            <th style={{ border: '1px solid #000', padding: '4px' }}>Descripción</th>
            <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'center' }}>Cantidad</th>
            <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>Precio Unitario</th>
            <th style={{ border: '1px solid #000', padding: '4px', textAlign: 'right' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #000', padding: '4px', verticalAlign: 'top', fontWeight: 'bold' }}>{item.id || `PROD${index+1}`}</td>
              <td style={{ border: '1px solid #000', padding: '4px' }}>
                <div>{item.description}</div>
                {item.serial && <div style={{ fontSize: '10px', color: '#475569' }}>Nos. de Serie: {item.serial}</div>}
                <div style={{ fontSize: '10px', color: '#475569' }}>IVA - Tarifa Plena 13%: {curr}{( (item.quantity * item.price * 0.13) ).toFixed(2)}</div>
              </td>
              <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'center', verticalAlign: 'top' }}>{item.quantity.toFixed(2)} Unidad</td>
              <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', verticalAlign: 'top' }}>{curr}{item.price.toFixed(2)}</td>
              <td style={{ border: '1px solid #000', padding: '4px', textAlign: 'right', verticalAlign: 'top', fontWeight: 'bold' }}>{curr}{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Términos, Firmas y Totales Finales */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr 1fr', gap: '0px', marginTop: '12px', border: '1px solid #000' }}>
        <div style={{ padding: '8px', borderRight: '1px solid #000', fontSize: '10px' }}>
          <div style={{ background: '#cbd5e1', padding: '2px 4px', fontWeight: 'bold', marginBottom: '4px' }}>Términos y Condiciones:</div>
          <p style={{ margin: 0 }}>Esta factura devenga intereses del 3% mensual después de su vencimiento.</p>
          <p style={{ margin: '4px 0 0 0' }}>** Un año de garantía por defectos de fábrica **</p>
        </div>
        <div style={{ padding: '8px', borderRight: '1px solid #000', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center' }}>
          <span style={{ fontSize: '10px', borderTop: '1px solid #000', width: '80%', textAlign: 'center', paddingTop: '2px' }}>(Firma Recibido)</span>
        </div>
        <div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '11px' }}>
            <tbody>
              <tr>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px', background: '#cbd5e1' }}>SubTotal Gravado:</td>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px', textAlign: 'right', fontWeight: 'bold' }}>{curr}{invoice.subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px' }}>Impuestos (13%):</td>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px', textAlign: 'right' }}>{curr}{invoice.tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px', background: '#cbd5e1', fontWeight: 'bold' }}>Total a Pagar:</td>
                <td style={{ borderBottom: '1px solid #000', padding: '2px 4px', textAlign: 'right', fontWeight: 'bold', fontSize: '13px', color: '#2563eb' }}>{curr}{invoice.total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: '8px', fontSize: '9px', color: '#64748b', textAlign: 'center' }}>
        Emitida conforme lo establecido en la resolución de Facturación Electrónica No. DGT-R-033-2019 de la D.G.T.D.
      </div>
    </div>
  );
}