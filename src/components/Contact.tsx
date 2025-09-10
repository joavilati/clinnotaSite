import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./ui/accordion";
import { Send, MessageCircle, HelpCircle, Mail, Phone, MapPin, Clock, CheckCircle, AlertCircle, Check } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const formatPhone = (value: string) => {
    // Remove tudo que não for número
    const numbers = value.replace(/\D/g, "");
    
    // Limita a 11 dígitos
    const limited = numbers.substring(0, 11);
    
    // Aplica a máscara
    if (limited.length >= 11) {
      return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7, 11)}`;
    } else if (limited.length >= 7) {
      return `(${limited.substring(0, 2)}) ${limited.substring(2, 7)}-${limited.substring(7)}`;
    } else if (limited.length >= 2) {
      return `(${limited.substring(0, 2)}) ${limited.substring(2)}`;
    } else if (limited.length >= 1) {
      return `(${limited}`;
    }
    return limited;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === "phone") {
      const formatted = formatPhone(value);
      setFormData(prev => ({ ...prev, [id]: formatted }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
    
    // Valida em tempo real se o campo já foi tocado
    if (touched[id as keyof typeof touched]) {
      validateField(id, value);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setTouched(prev => ({ ...prev, [id]: true }));
    validateField(id, value);
  };

  const validateField = (id: string, value: string) => {
    let error = "";
    
    switch (id) {
      case "name":
        if (!value.trim()) error = "Por favor, insira seu nome";
        break;
      case "email":
        if (!value.trim()) {
          error = "Por favor, insira seu e-mail";
        } else if (!validateEmail(value)) {
          error = "Por favor, insira um e-mail válido";
        }
        break;
      case "subject":
        if (!value.trim()) error = "Por favor, insira o assunto";
        break;
      case "message":
        if (!value.trim()) error = "Por favor, escreva sua mensagem";
        break;
    }
    
    setErrors(prev => ({ ...prev, [id]: error }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      subject: "",
      message: ""
    };
    
    if (!formData.name.trim()) {
      newErrors.name = "Por favor, insira seu nome";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Por favor, insira seu e-mail";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Por favor, insira um e-mail válido";
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = "Por favor, insira o assunto";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Por favor, escreva sua mensagem";
    }
    
    setErrors(newErrors);
    setTouched({ name: true, email: true, subject: true, message: true });
    
    // Retorna true se não houver erros
    return !Object.values(newErrors).some(error => error !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aqui você faria o envio do formulário
      toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.", {
        icon: "✅",
        duration: 5000
      });
      
      // Limpa o formulário
      setFormData({
        name: "",
        email: "",
        company: "",
        phone: "",
        subject: "",
        message: ""
      });
      setTouched({
        name: false,
        email: false,
        subject: false,
        message: false
      });
      setErrors({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } else {
      toast.error("Por favor, preencha todos os campos obrigatórios", {
        icon: "⚠️",
        duration: 4000
      });
    }
  };

  const getFieldStatus = (fieldId: string) => {
    const hasError = errors[fieldId as keyof typeof errors];
    const isTouched = touched[fieldId as keyof typeof touched];
    const hasValue = formData[fieldId as keyof typeof formData];
    
    if (!isTouched) return "default";
    if (hasError) return "error";
    if (hasValue && !hasError) return "success";
    return "default";
  };
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
      answer: "Oferecemos um período de teste gratuito de 7 dias com acesso completo a todos os recursos. Após este período, temos planos flexíveis a partir de R$ 29,90/mês para pequenos prestadores de serviço, com descontos para pagamento anual.",
      category: "Planos"
    },
    {
      question: "Os dados ficam seguros na nuvem?",
      answer: "Sim, utilizamos criptografia de ponta a ponta e servidores certificados no Brasil. Seus dados são protegidos por certificação ICP-Brasil e fazemos backups automáticos diários. Garantimos 99.9% de uptime e conformidade total com a LGPD.",
      category: "Segurança"
    },
    {
      question: "Qual o suporte oferecido?",
      answer: "Oferecemos suporte técnico especializado via email e telefone durante horário comercial. Clientes dos planos premium têm acesso a suporte prioritário 24/7 e treinamento personalizado.",
      category: "Suporte"
    }
  ];

  const contactMethods = [
    {
      icon: Mail,
      title: "E-mail",
      description: "contato@clinnota.com.br",
      subtitle: ""
    },
    {
      icon: Phone,
      title: "Telefone",
      description: "(11) 3000-0000",
      subtitle: "Seg à Sex, 9h às 18h"
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
            <span className="text-indigo-600 font-medium"> otimizar </span> 
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
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                      Nome completo <span className="text-red-400 text-xs">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="name" 
                        placeholder="Como podemos te chamar?" 
                        className={`bg-white/50 dark:bg-gray-800/50 transition-all duration-300 pr-10 ${
                          getFieldStatus('name') === 'error' ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 
                          getFieldStatus('name') === 'success' ? 'border-green-400 focus:border-green-500 focus:ring-green-500/20' : 
                          'border-gray-200/50'
                        }`}
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <AnimatePresence mode="wait">
                        {getFieldStatus('name') === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                        {getFieldStatus('name') === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {errors.name && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {errors.name}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="email" className="flex items-center gap-2 font-medium">
                      E-mail <span className="text-red-400 text-xs">*</span>
                    </Label>
                    <div className="relative">
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="seu@email.com.br"
                        className={`bg-white/50 dark:bg-gray-800/50 transition-all duration-300 pr-10 ${
                          getFieldStatus('email') === 'error' ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 
                          getFieldStatus('email') === 'success' ? 'border-green-400 focus:border-green-500 focus:ring-green-500/20' : 
                          'border-gray-200/50'
                        }`}
                        value={formData.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <AnimatePresence mode="wait">
                        {getFieldStatus('email') === 'success' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          </motion.div>
                        )}
                        {getFieldStatus('email') === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            className="absolute right-3 top-1/2 -translate-y-1/2"
                          >
                            <AlertCircle className="w-5 h-5 text-red-400" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <AnimatePresence>
                      {errors.email && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0, marginTop: 0 }}
                          animate={{ opacity: 1, height: "auto", marginTop: 8 }}
                          exit={{ opacity: 0, height: 0, marginTop: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                            <AlertCircle className="w-4 h-4 flex-shrink-0" />
                            {errors.email}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label htmlFor="company" className="font-medium">Empresa <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <Input 
                      id="company" 
                      placeholder="Nome da sua empresa"
                      className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 transition-all duration-300"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-3">
                    <Label htmlFor="phone" className="font-medium">Telefone <span className="text-gray-400 text-xs">(opcional)</span></Label>
                    <div className="relative">
                      <Input 
                        id="phone" 
                        placeholder="(00) 00000-0000"
                        className="bg-white/50 dark:bg-gray-800/50 border-gray-200/50 transition-all duration-300"
                        value={formData.phone}
                        onChange={handleChange}
                        maxLength={15}
                      />
                      {formData.phone && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <Phone className="w-4 h-4 text-gray-400" />
                        </motion.div>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="subject" className="flex items-center gap-2 font-medium">
                    Assunto <span className="text-red-400 text-xs">*</span>
                  </Label>
                  <div className="relative">
                    <Input 
                      id="subject" 
                      placeholder="Sobre o que você gostaria de falar?"
                      className={`bg-white/50 dark:bg-gray-800/50 transition-all duration-300 pr-10 ${
                        getFieldStatus('subject') === 'error' ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 
                        getFieldStatus('subject') === 'success' ? 'border-green-400 focus:border-green-500 focus:ring-green-500/20' : 
                        'border-gray-200/50'
                      }`}
                      value={formData.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <AnimatePresence mode="wait">
                      {getFieldStatus('subject') === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                      {getFieldStatus('subject') === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-3 top-1/2 -translate-y-1/2"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.subject}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <div className="space-y-3">
                  <Label htmlFor="message" className="flex items-center gap-2 font-medium">
                    Mensagem <span className="text-red-400 text-xs">*</span>
                  </Label>
                  <div className="relative">
                    <Textarea 
                      id="message" 
                      placeholder="Descreva sua dúvida, necessidade ou sugestão. Quanto mais detalhes, melhor poderemos ajudar!"
                      className={`min-h-[140px] bg-white/50 dark:bg-gray-800/50 transition-all duration-300 pr-10 ${
                        getFieldStatus('message') === 'error' ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : 
                        getFieldStatus('message') === 'success' ? 'border-green-400 focus:border-green-500 focus:ring-green-500/20' : 
                        'border-gray-200/50'
                      }`}
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                    <AnimatePresence mode="wait">
                      {getFieldStatus('message') === 'success' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-3 top-3"
                        >
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        </motion.div>
                      )}
                      {getFieldStatus('message') === 'error' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0 }}
                          className="absolute right-3 top-3"
                        >
                          <AlertCircle className="w-5 h-5 text-red-400" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  <AnimatePresence>
                    {errors.message && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0, y: -10 }}
                        animate={{ opacity: 1, height: "auto", y: 0 }}
                        exit={{ opacity: 0, height: 0, y: -10 }}
                        className="overflow-hidden"
                      >
                        <div className="flex items-center gap-2 text-red-500 text-sm bg-red-50 dark:bg-red-900/20 px-3 py-2 rounded-lg">
                          <AlertCircle className="w-4 h-4 flex-shrink-0" />
                          {errors.message}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    type="submit"
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
                </form>
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
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}