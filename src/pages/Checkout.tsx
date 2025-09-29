import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Check, CreditCard, FileText, Smartphone, Calendar, Users, Shield, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";
import { loadStripe } from "@stripe/stripe-js";

// Configurar chave pública do Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || '');

// Planos disponíveis
const plans = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Ideal para profissionais liberais',
    price: 'R$ 29,90',
    priceMonthly: 29.90,
    priceYearly: 299.00,
    features: [
      'Até 50 NFS-e por mês',
      'Emissão em segundos',
      'Suporte via email',
      'Certificado digital incluso',
      'Dashboard básico',
    ],
    recommended: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Para pequenas e médias empresas',
    price: 'R$ 79,90',
    priceMonthly: 79.90,
    priceYearly: 799.00,
    features: [
      'Até 300 NFS-e por mês',
      'Emissão em segundos',
      'Suporte prioritário',
      'Certificado digital incluso',
      'Dashboard completo',
      'API de integração',
      'Relatórios avançados',
    ],
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Para grandes empresas',
    price: 'R$ 199,90',
    priceMonthly: 199.90,
    priceYearly: 1999.00,
    features: [
      'NFS-e ilimitadas',
      'Emissão em segundos',
      'Suporte dedicado 24/7',
      'Certificado digital incluso',
      'Dashboard customizável',
      'API completa',
      'Relatórios personalizados',
      'Múltiplos usuários',
      'Integrações customizadas',
    ],
    recommended: false,
  },
];

// Métodos de pagamento aceitos
const paymentMethods = [
  { id: 'card', name: 'Cartão de crédito/débito', icon: CreditCard, available: true },
  { id: 'pix', name: 'PIX', icon: Smartphone, available: true },
];

export default function Checkout() {
  const [selectedPlan, setSelectedPlan] = useState('professional');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const selectedPlanData = plans.find(p => p.id === selectedPlan);
      if (!selectedPlanData) return;

      // Fazer chamada para o backend
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/create-checkout-session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: selectedPlan,
          billingCycle: billingCycle
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao criar sessão de checkout');
      }

      const { sessionId } = await response.json();
      const stripe = await stripePromise;

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          console.error('Erro no checkout:', error);
          alert('Erro ao processar pagamento: ' + error.message);
        }
      }
    } catch (error) {
      console.error('Erro ao processar checkout:', error);
      alert('Erro ao processar checkout. Verifique se o backend está rodando em http://localhost:3001');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20 py-8 sm:py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="w-4 h-4 mr-2" />
            Oferta especial de lançamento
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">
            Escolha seu plano ClinNota
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Comece a emitir notas fiscais em segundos, com segurança e conformidade total
          </p>
        </motion.div>

        {/* Billing cycle toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-lg p-1 shadow-lg inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Mensal
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-md transition-all ${
                billingCycle === 'yearly'
                  ? 'bg-indigo-600 text-white'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              Anual <span className="text-xs">(-17%)</span>
            </button>
          </div>
        </motion.div>

        {/* Plans grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <Card
                className={`relative h-full transition-all cursor-pointer ${
                  selectedPlan === plan.id
                    ? 'ring-2 ring-indigo-600 shadow-xl scale-105'
                    : 'hover:shadow-lg'
                } ${
                  plan.recommended
                    ? 'border-indigo-600'
                    : ''
                }`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.recommended && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                      Mais popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-6 sm:pb-8">
                  <CardTitle className="text-xl sm:text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="mb-4">{plan.description}</CardDescription>
                  <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
                    {billingCycle === 'monthly'
                      ? plan.price
                      : `R$ ${(plan.priceYearly / 12).toFixed(2).replace('.', ',')}`
                    }
                    <span className="text-lg font-normal text-gray-500">/mês</span>
                  </div>
                  {billingCycle === 'yearly' && (
                    <div className="text-sm text-gray-500 mt-2">
                      Total: R$ {plan.priceYearly.toFixed(2).replace('.', ',')} / ano
                    </div>
                  )}
                </CardHeader>

                <CardContent className="pb-6 sm:pb-8">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600 dark:text-gray-400 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>

                <CardFooter>
                  <Button
                    className={`w-full ${
                      selectedPlan === plan.id
                        ? 'bg-indigo-600 hover:bg-indigo-700'
                        : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
                    }`}
                  >
                    {selectedPlan === plan.id ? 'Selecionado' : 'Selecionar'}
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Payment methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Métodos de pagamento aceitos</CardTitle>
              <CardDescription>
                Escolha a forma de pagamento mais conveniente para você
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={`flex items-center gap-3 p-4 rounded-lg border ${
                      method.available
                        ? 'border-gray-200 dark:border-gray-700'
                        : 'border-gray-100 dark:border-gray-800 opacity-50'
                    }`}
                  >
                    <method.icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    <span className="text-gray-700 dark:text-gray-300">{method.name}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm text-blue-900 dark:text-blue-100 font-medium">
                      Pagamento 100% seguro
                    </p>
                    <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                      Seus dados estão protegidos com criptografia de ponta a ponta.
                      Processamento realizado pelo Stripe, líder mundial em pagamentos online.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                onClick={handleCheckout}
                disabled={loading}
              >
                {loading ? (
                  'Processando...'
                ) : (
                  <>
                    Continuar para pagamento
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </motion.div>

        {/* Additional benefits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <h2 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            Incluído em todos os planos
          </h2>
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { icon: FileText, title: 'Certificado digital', desc: 'ICP-Brasil incluso' },
              { icon: Calendar, title: 'Sem fidelidade', desc: 'Cancele quando quiser' },
              { icon: Users, title: 'Suporte técnico', desc: 'Time especializado' },
              { icon: Shield, title: 'Garantia', desc: '30 dias de reembolso' },
            ].map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}