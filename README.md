
  # Landing Page Design

  This is a code bundle for Landing Page Design. The original project is available at https://www.figma.com/design/GOx1G8j8W6qqS8Yf1W38PG/Landing-Page-Design.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Checkout Pro (Mercado Pago)

- Nova página: `checkout.html` (entrada separada do Vite). Acesse `/checkout.html` para abrir o fluxo de pagamento.
- Formas de uso:
  - Via preferência pronta: `/checkout.html?pref_id=SEU_PREFERENCE_ID`
  - Via link hospedado: `/checkout.html?init_point=https%3A%2F%2Fwww.mercadopago.com%2F...`
  - Via backend próprio: configure `VITE_MP_PUBLIC_KEY` e `VITE_BACKEND_URL` e implemente um endpoint `POST /api/checkout/preference` que retorne `{ id, init_point }`.

### Variáveis de ambiente (exemplo)

Crie um arquivo `.env` baseado em `.env.example`:

```
VITE_MP_PUBLIC_KEY=APP_USR-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
VITE_BACKEND_URL=https://sua-api.com
# Alternativa para testes locais sem backend:
# VITE_CHECKOUT_INIT_POINT=https://www.mercadopago.com/checkout/v1/redirect?pref_id=...
```

### Observações

- O Checkout Pro requer a criação de uma preferência no backend (servidor) com suas credenciais secretas; o front recebe apenas o `preference_id` e/ou `init_point`.
- Em hospedagens estáticas sem rewrite de SPA, use a rota direta `checkout.html` (por exemplo, `https://seusite.com/checkout.html`).
