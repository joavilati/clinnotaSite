import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Send, MessageCircle, HelpCircle, Mail, Phone, MapPin, Clock, CheckCircle } from "lucide-react";
import { motion } from "motion/react";

export function Contact() {
  const faqs = [
    {
      question: "Preciso de conta para usar o ClinNota?",
      answer: "Sim, é necessário criar uma conta gratuita para sincronizar seus dados entre dispositivos e manter seu histórico de notas fiscais seguro na nuvem. O cadastro é simples e leva menos de 2 minutos.",
      category: "Conta"
    },
    {
      question: "Como funciona a emissão nacional de NFS-e?",
      answer: "O ClinNota utiliza o sistema nacional de NFS-e da Receita Federal, permitindo emissão válida em todo território brasileiro. Não há limitações por município ou estado - sua nota fiscal é aceita nacionalmente com total conformidade fiscal.",
      category: "Sistema"
    },
    {
      question: "Tem plano grátis ou período de teste?",
      answer: "Oferecemos um período de teste gratuito de 30 dias com acesso completo a todos os recursos. Após este período, temos planos flexíveis a partir de R$ 29,90/mês para pequenos prestadores de serviço, com descontos para pagamento anual.",
      category: "Planos"
    },
    {
      question: "Como funciona a integração com sistemas contábeis?",
      answer: "O ClinNota oferece integração nativa com os principais sistemas contábeis do mercado através de APIs e exportação automatizada. Também oferecemos suporte técnico especializado para configuração e treinamento da sua equipe.",
      category: "Integração"
    },
    {
      question: "Os dados ficam seguros na nuvem?",
      answer: "Sim, utilizamos criptografia de ponta a ponta e servidores certificados no Brasil. Seus dados são protegidos por certificação ICP-Brasil e fazemos backups automáticos diários. Garantimos 99.9% de uptime e conformidade total com a LGPD.",
      category: "Segurança"
    },
    {
      question: "Qual o suporte oferecido?",
      answer: "Oferecemos suporte técnico especializado via chat, email e telefone durante horário comercial. Clientes dos planos premium têm acesso a suporte prioritário 24/7 e treinamento personalizado.",
      category: "Suporte"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail",
      description: "contato@clinnota.com.br",
      subtitle: "Resposta em até 4 horas"
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "(11) 3000-0000",
      subtitle: "Seg à Sex, 9h às 18h"
    },
    {
      icon: MessageCircle,
      title: "Chat online",
      description: "Disponível no app",
      subtitle: "Resposta imediata"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-900/50 dark:via-blue-950/20 dark:to-indigo-950/20" />
      
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-10 w-40 h-40 bg-gradient-to-br from-violet-200/30 to-purple-300/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 0.8, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header da seção */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 backdrop-blur-sm bg-white/80 border border-blue-200/50">
            💬 Estamos aqui para ajudar
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-blue-100 dark:to-indigo-100">
            Fale com nossa equipe
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Dúvidas sobre cadastro, sistema nacional, planos ou configuração? 
            Nossa equipe especializada está pronta para ajudar você a 
            <span className="text-blue-600 font-medium"> começar</span> ou 
            <span className="text-indigo-600 font-medium"> otimizar</span> 
            seu uso do ClinNota.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-16 mb-16">
          {/* Formulário de contato */}
          <motion.div 
            className="xl:col-span-2"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/50 dark:border-gray-700/50 shadow-2xl">
              <CardHeader className="pb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
                    <Send className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl">Entre em contato</CardTitle>
                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                      Resposta garantida em até 4 horas úteis
                    </p>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2">
                      Nome completo
                    </Label>
                    <Input 
                      id="name" 
                      placeholder="Como podemos te chamar?" 
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="flex items-center gap-2">
                      E-mail
                    </Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="seu@email.com.br"
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="company">Empresa (opcional)</Label>
                    <Input 
                      id="company" 
                      placeholder="Nome da sua empresa"
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone (opcional)</Label>
                    <Input 
                      id="phone" 
                      placeholder="(11) 99999-9999"
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="subject">Assunto</Label>
                  <Input 
                    id="subject" 
                    placeholder="Sobre o que você gostaria de falar?"
                    className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="message">Mensagem</Label>
                  <Textarea 
                    id="message" 
                    placeholder="Descreva sua dúvida, necessidade ou sugestão. Quanto mais detalhes, melhor poderemos ajudar!"
                    className="min-h-[140px] bg-white/50 dark:bg-gray-800/50 border-gray-200/50"
                  />
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-6 text-lg group"
                  >
                    <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                    Enviar mensagem
                  </Button>
                </motion.div>
                
                <div className="text-center text-sm text-gray-500 dark:text-gray-400">
                  Ao enviar, você aceita nossos termos de privacidade
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Informações de contato */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Métodos de contato */}
            <div className="space-y-4">
              <h3 className="text-xl mb-4">Outros meios de contato</h3>
              {contactMethods.map((method, index) => {
                const Icon = method.icon;
                return (
                  <motion.div 
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-xl border border-white/30 dark:border-gray-700/30 hover:bg-white/80 dark:hover:bg-gray-800/80 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <Icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 dark:text-gray-100">{method.title}</div>
                      <div className="text-gray-700 dark:text-gray-300">{method.description}</div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">{method.subtitle}</div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Horário de atendimento */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h4 className="text-lg">Horário de atendimento</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Segunda à Sexta:</span>
                    <span className="font-medium">9h às 18h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sábado:</span>
                    <span className="font-medium">9h às 13h</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Domingo:</span>
                    <span className="text-gray-500">Fechado</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400 text-sm">
                    <CheckCircle className="w-4 h-4" />
                    <span>Suporte premium: 24/7 via chat</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ expandido */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <HelpCircle className="w-6 h-6 text-indigo-600" />
              <h3 className="text-3xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Perguntas frequentes
              </h3>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Respostas detalhadas para as dúvidas mais comuns sobre o ClinNota
            </p>
          </div>
          
          <Accordion type="single" collapsible className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl px-6 border border-white/50 dark:border-gray-700/50 shadow-sm hover:shadow-md transition-all"
                >
                  <AccordionTrigger className="text-left hover:no-underline py-6">
                    <div className="flex items-start gap-3">
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {faq.category}
                      </Badge>
                      <span className="text-left">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300 pb-6 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>

          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Não encontrou sua resposta?
            </p>
            <Button variant="outline" className="px-6">
              <MessageCircle className="w-4 h-4 mr-2" />
              Ver mais perguntas
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}