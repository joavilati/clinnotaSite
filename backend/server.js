const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY || 'sk_test_51SCMcAEo2lnNCQ7jHvhciH2MaZjEDyxOPLaM84UT0ubBPo6wOsnTPakllCXDkD4WjMPtknG6rJGTA2RYE1Ez4JHu00z2GpWtN1');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());

// Webhook precisa de raw body
app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    console.log('✅ Webhook verificado:', event.type);
  } catch (err) {
    console.log(`❌ Erro no webhook: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Processar eventos
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object;
      console.log('💰 Pagamento concluído!', session);
      // TODO: Ativar assinatura do usuário
      break;

    case 'invoice.payment_succeeded':
      console.log('🔄 Pagamento recorrente bem-sucedido');
      break;

    case 'invoice.payment_failed':
      console.log('❌ Falha no pagamento recorrente');
      break;

    case 'customer.subscription.deleted':
      console.log('🚫 Assinatura cancelada');
      break;

    default:
      console.log(`Evento não tratado: ${event.type}`);
  }

  res.json({ received: true });
});

// Aplicar express.json() apenas para outras rotas
app.use(express.json());

// Criar sessão de checkout
app.post('/api/create-checkout-session', async (req, res) => {
  const { planId, billingCycle } = req.body;

  // Preços de exemplo - você deve criar estes produtos no Dashboard do Stripe
  const priceIds = {
    starter: {
      monthly: 'price_starter_monthly', // Substitua com IDs reais
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
    // Para teste, criar preço dinamicamente
    const prices = {
      starter: { monthly: 2990, yearly: 29900 },
      professional: { monthly: 7990, yearly: 79900 },
      enterprise: { monthly: 19990, yearly: 199900 }
    };

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'], // PIX requer configuração adicional
      mode: 'subscription',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: `ClinNota ${planId.charAt(0).toUpperCase() + planId.slice(1)}`,
              description: `Plano ${billingCycle === 'monthly' ? 'mensal' : 'anual'}`,
            },
            unit_amount: prices[planId][billingCycle],
            recurring: {
              interval: billingCycle === 'monthly' ? 'month' : 'year',
            },
          },
          quantity: 1,
        },
      ],
      success_url: `http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:3000/checkout`,
      locale: 'pt-BR',
    });

    console.log('✅ Sessão criada:', session.id);
    res.json({ sessionId: session.id });
  } catch (error) {
    console.error('❌ Erro ao criar sessão:', error);
    res.status(500).json({ error: error.message });
  }
});

// Verificar status
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Backend rodando em http://localhost:${PORT}`);
  console.log('\n📝 Instruções:');
  console.log('1. Execute: stripe listen --forward-to localhost:3001/api/webhook');
  console.log('2. Copie o webhook secret do terminal');
  console.log('3. Adicione ao .env: STRIPE_WEBHOOK_SECRET=whsec_...');
  console.log('4. Reinicie o servidor\n');
});