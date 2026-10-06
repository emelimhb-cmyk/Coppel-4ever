export const handler = async (event: any) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  let body: any = {};
  try {
    body = event.body ? JSON.parse(event.body) : {};
  } catch {
    body = {};
  }

  const precio = Number(body.precioContado) || 8000;
  const plazo = Number(body.plazoQuincenas) || 24;
  const enganchePct = Number(body.enganchePorcentaje) || 0;

  const enganche = Math.round(precio * (enganchePct / 100));
  const montoAFinanciar = Math.max(0, precio - enganche);

  let factor = 1.17;
  if (plazo <= 16) factor = 1.10;
  else if (plazo <= 24) factor = 1.17;
  else if (plazo <= 36) factor = 1.50;
  else factor = 1.82;

  const totalCredito = Math.round(montoAFinanciar * factor) + enganche;
  const saldoFinanciado = Math.round(montoAFinanciar * factor);
  const abonoQuincenal = Math.ceil(saldoFinanciado / plazo);

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      precioContado: precio,
      enganche,
      montoAFinanciar,
      plazoQuincenas: plazo,
      factor,
      totalCredito,
      abonoQuincenal,
      ahorroLiquidarContado: totalCredito - precio,
    }),
  };
};
