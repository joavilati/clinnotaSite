# Requisitos do Backend para Integração Stripe

## Visão Geral

O backend precisa implementar os seguintes endpoints e funcionalidades para integrar o Stripe Checkout com suporte para assinaturas recorrentes.

## Configuração Inicial

### 1. Variáveis de Ambiente
```env
STRIPE_SECRET_KEY=sk_live_xxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxx
FRONTEND_URL=https://app.clinnota.com
```

### 2. Dependências
```bash
# Node.js
npm install stripe express body-parser cors

# Python
pip install stripe flask flask-cors

# ou para sua linguagem preferida
```

## Endpoints Necessários

### 1. POST /api/create-checkout-session

**Descrição**: Cria uma sessão de checkout do Stripe

**Request Body**:
```json
{
  "planId": "professional",
  "billingCycle": "monthly" | "yearly"
}
```

**Implementação**:
```javascript
// Exemplo em Node.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

app.post('/api/create-checkout-session', async (req, res) => {
  const { planId, billingCycle } = req.body;

  // Mapear IDs dos planos para Price IDs do Stripe
  const priceIds = {
    starter: {
      monthly: 'price_starter_monthly',
      yearly: 'price_starter_yearly'
    },
    professional: {
      monthly: 'price_professional_monthly',
      yearly: 'price_professional_yearly'
    },
    enterprise: {
      monthly: 'price_enterprise_monthly',
      yearly: 'price_enterprise_yearly'
    }
  };

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card', 'customer_balance'],
      payment_method_options: {
        customer_balance: {
          funding_type: 'bank_transfer',
          bank_transfer: {
            type: 'br_bank_transfer',
            br_bank_transfer: {
              bank_codes: ['001'] // PIX
            }
          }
        }
      },
      mode: 'subscription',
      line_items: [{
        price: priceIds[planId][billingCycle],
        quantity: 1,
      }],
      success_url: `${process.env.FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/checkout`,
      locale: 'pt-BR',
      billing_address_collection: 'required',
      customer_email: req.body.email, // Se disponível
    });

    res.json({ sessionId: session.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
```

### 2. POST /api/webhook

**Descrição**: Webhook para processar eventos do Stripe

**Headers Necessários**:
- `stripe-signature`: Assinatura do webhook para validação

**Eventos Importantes**:
- `checkout.session.completed`: Pagamento inicial concluído
- `invoice.payment_succeeded`: Pagamento recorrente bem-sucedido
- `invoice.payment_failed`: Falha no pagamento recorrente
- `customer.subscription.deleted`: Assinatura cancelada

**Implementação**:
```javascript
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      // Criar conta do usuário
      // Ativar assinatura no banco de dados
      // Enviar email de boas-vindas
      await handleCheckoutSessionCompleted(session);
      break;

    case 'invoice.payment_succeeded':
      // Renovar assinatura
      await handleInvoicePaymentSucceeded(event.data.object);
      break;

    case 'invoice.payment_failed':
      // Notificar usuário
      // Suspender acesso após X tentativas
      await handleInvoicePaymentFailed(event.data.object);
      break;

    case 'customer.subscription.deleted':
      // Cancelar acesso
      await handleSubscriptionDeleted(event.data.object);
      break;
  }

  res.json({ received: true });
});
```

### 3. GET /api/subscription-status/:customerId

**Descrição**: Verifica status da assinatura do cliente

**Response**:
```json
{
  "active": true,
  "plan": "professional",
  "billingCycle": "monthly",
  "currentPeriodEnd": "2025-02-28T23:59:59Z",
  "cancelAtPeriodEnd": false
}
```

### 4. POST /api/create-portal-session

**Descrição**: Cria sessão do portal do cliente para gerenciar assinatura

**Request Body**:
```json
{
  "customerId": "cus_xxxxx"
}
```

**Response**:
```json
{
  "url": "https://billing.stripe.com/session/xxxxx"
}
```

## Configuração no Dashboard do Stripe

### 1. Produtos e Preços

Criar os seguintes produtos no Stripe Dashboard:

**Produto: ClinNota Starter**
- Preço Mensal: R$ 29,90 (ID: price_starter_monthly)
- Preço Anual: R$ 299,00 (ID: price_starter_yearly)

**Produto: ClinNota Professional**
- Preço Mensal: R$ 79,90 (ID: price_professional_monthly)
- Preço Anual: R$ 799,00 (ID: price_professional_yearly)

**Produto: ClinNota Enterprise**
- Preço Mensal: R$ 199,90 (ID: price_enterprise_monthly)
- Preço Anual: R$ 1.999,00 (ID: price_enterprise_yearly)

### 2. Métodos de Pagamento

Habilitar no Dashboard:
- Cartões (crédito e débito)
- PIX (através do Customer Balance com bank_transfer)

### 3. Configurar Webhook

1. Acessar Dashboard > Developers > Webhooks
2. Adicionar endpoint: `https://api.clinnota.com/api/webhook`
3. Selecionar eventos:
   - checkout.session.completed
   - invoice.payment_succeeded
   - invoice.payment_failed
   - customer.subscription.deleted
4. Copiar webhook secret para as variáveis de ambiente

## Modelo de Dados Sugerido

### Tabela: subscriptions
```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  stripe_customer_id VARCHAR(255) UNIQUE,
  stripe_subscription_id VARCHAR(255) UNIQUE,
  plan_id VARCHAR(50), -- starter, professional, enterprise
  billing_cycle VARCHAR(20), -- monthly, yearly
  status VARCHAR(50), -- active, canceled, past_due
  current_period_end TIMESTAMP,
  cancel_at_period_end BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Tabela: payment_history
```sql
CREATE TABLE payment_history (
  id UUID PRIMARY KEY,
  subscription_id UUID REFERENCES subscriptions(id),
  stripe_invoice_id VARCHAR(255),
  amount DECIMAL(10, 2),
  currency VARCHAR(3),
  status VARCHAR(50), -- paid, failed
  payment_method VARCHAR(50), -- card, pix
  paid_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Fluxo de Implementação PIX

Para aceitar PIX através do Stripe:

1. **Habilitar Customer Balance** no Dashboard
2. **Configurar bank_transfer** com tipo 'br_bank_transfer'
3. **Informar ao cliente** o processo:
   - Cliente será redirecionado para tela com QR Code
   - Pagamento deve ser feito em até 60 minutos
   - Após confirmação, assinatura é ativada automaticamente

## Segurança

### Boas Práticas:
1. **Sempre validar webhooks** usando a assinatura do Stripe
2. **Usar HTTPS** em produção
3. **Não expor** chaves secretas no frontend
4. **Implementar rate limiting** nos endpoints
5. **Logar todos os eventos** de pagamento para auditoria

## Testes

### Cartões de Teste:
- Sucesso: 4242 4242 4242 4242
- Recusa: 4000 0000 0000 0002
- Autenticação 3D Secure: 4000 0027 6000 3184

### Webhook Testing:
Usar Stripe CLI para testar webhooks localmente:
```bash
stripe listen --forward-to localhost:3001/api/webhook
```

## Monitoramento

Implementar alertas para:
- Falhas em pagamentos recorrentes
- Taxa de conversão do checkout
- Webhooks falhando
- Tentativas de fraude

## Suporte ao Cliente

Preparar respostas para:
- Como cancelar assinatura
- Como atualizar método de pagamento
- Como fazer downgrade/upgrade de plano
- Como obter recibos/notas fiscais

---

## Próximos Passos

1. Configurar produtos e preços no Stripe Dashboard
2. Implementar endpoints no backend
3. Testar fluxo completo com Stripe CLI
4. Configurar webhooks em produção
5. Implementar portal do cliente para autoatendimento