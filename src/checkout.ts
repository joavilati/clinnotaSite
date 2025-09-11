/*
  Minimal Checkout Pro loader page
  Usage options:
  - Provide a preference id:   /checkout.html?pref_id=YOUR_PREFERENCE_ID
  - Provide an init_point URL: /checkout.html?init_point=https%3A%2F%2Fwww.mercadopago.com%2F...
  - Or configure env vars in build: VITE_MP_PUBLIC_KEY and fetch a preference id from your backend, then redirect/open.
*/

type MPGlobal = typeof window & { MercadoPago?: any };

const el = {
  status: document.getElementById('status') as HTMLElement,
  container: document.querySelector('.cho-container') as HTMLElement,
};

function setStatus(text: string) {
  if (el.status) el.status.textContent = text;
}

function getQueryParam(name: string): string | null {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

async function loadMPScript(): Promise<void> {
  if ((window as MPGlobal).MercadoPago) return;
  await new Promise<void>((resolve, reject) => {
    const s = document.createElement('script');
    s.src = 'https://sdk.mercadopago.com/js/v2';
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error('Falha ao carregar SDK do Mercado Pago'));
    document.head.appendChild(s);
  });
}

async function init() {
  const publicKey = import.meta.env.VITE_MP_PUBLIC_KEY as string | undefined;
  const backendUrl = import.meta.env.VITE_BACKEND_URL as string | undefined;

  const prefFromUrl = getQueryParam('pref_id');
  const initPointFromUrl = getQueryParam('init_point');

  try {
    // If we have an init_point, redirect directly (hosted checkout)
    if (initPointFromUrl) {
      setStatus('Redirecionando para o checkout…');
      window.location.href = initPointFromUrl;
      return;
    }

    // Use provided preference id (best option when backend creates it)
    if (prefFromUrl) {
      if (!publicKey) {
        setStatus('Configure VITE_MP_PUBLIC_KEY para abrir o Checkout Pro.');
        return;
      }
      await loadMPScript();
      const mp = new (window as MPGlobal).MercadoPago(publicKey, { locale: 'pt-BR' });
      setStatus('Abrindo checkout…');
      mp.checkout({
        preference: { id: prefFromUrl },
        render: {
          container: '.cho-container',
          label: 'Pagar com Mercado Pago',
        },
        autoOpen: true,
      });
      return;
    }

    // Try to request a new preference id from your backend
    if (backendUrl && publicKey) {
      setStatus('Criando preferência de pagamento…');
      // Adjust the endpoint/body to your backend implementation
      const res = await fetch(`${backendUrl.replace(/\/$/, '')}/api/checkout/preference`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // Example payload — customize as needed
        body: JSON.stringify({ description: 'Plano ClinNota', quantity: 1, currency_id: 'BRL', unit_price: 1 }),
      });
      if (!res.ok) throw new Error('Falha ao criar preferência');
      const data = await res.json();
      const prefId = data?.id || data?.preferenceId || data?.preference_id;
      const initPoint = data?.init_point || data?.initPoint;

      if (initPoint) {
        setStatus('Redirecionando para o checkout…');
        window.location.href = initPoint;
        return;
      }

      if (!prefId) throw new Error('Resposta sem preference id');

      await loadMPScript();
      const mp = new (window as MPGlobal).MercadoPago(publicKey, { locale: 'pt-BR' });
      setStatus('Abrindo checkout…');
      mp.checkout({
        preference: { id: prefId },
        render: {
          container: '.cho-container',
          label: 'Pagar com Mercado Pago',
        },
        autoOpen: true,
      });
      return;
    }

    // Final fallback: allow env init_point for quick testing
    const envInitPoint = import.meta.env.VITE_CHECKOUT_INIT_POINT as string | undefined;
    if (envInitPoint) {
      setStatus('Redirecionando para o checkout…');
      window.location.href = envInitPoint;
      return;
    }

    // Nothing configured
    setStatus(
      'Forneça ?pref_id=… ou ?init_point=… na URL, ou configure VITE_BACKEND_URL + VITE_MP_PUBLIC_KEY para criar a preferência.'
    );
  } catch (err: any) {
    console.error(err);
    setStatus(`Erro: ${err?.message || 'Falha ao iniciar checkout'}`);
  }
}

init();

