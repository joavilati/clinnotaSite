import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, MapPin, Package, FileText, History, Headphones, ArrowRight, CheckCircle, Settings, Zap, Globe } from "lucide-react";
import { motion } from "motion/react";

export function Features() {
  const featureCategories = [
    {
      id: "setup",
      label: "Configuração",
      icon: Settings,
      features: [
        {
          icon: User,
          title: "Cadastro Inteligente do Prestador",
          description: "Configure seus dados fiscais uma única vez com validação automática de CNPJ, inscrição municipal e certificado digital",
          highlights: ["Validação automática", "Backup na nuvem", "Assinatura digital integrada"]
        },
        {
          icon: MapPin,
          title: "Integração Nacional Avançada",
          description: "Conexão direta com a Receita Federal para emissão de NFS-e nacional com validação automática",
          highlights: ["Sistema nacional", "Receita Federal", "Validação automática"]
        }
      ]
    },
    {
      id: "emission",
      label: "Emissão",
      icon: Zap,
      features: [
        {
          icon: Package,
          title: "Catálogo de Serviços Inteligente",
          description: "Gerencie serviços com códigos CNAE, tributação automática e sugestões baseadas em IA",
          highlights: ["IA para tributação", "Códigos CNAE", "Templates personalizados"]
        },
        {
          icon: FileText,
          title: "Assinatura e Transmissão Segura",
          description: "Assinatura digital ICP-Brasil automática e transmissão criptografada para a Receita Federal",
          highlights: ["ICP-Brasil", "Transmissão segura", "Conformidade nacional"]
        }
      ]
    },
    {
      id: "management",
      label: "Gestão",
      icon: Globe,
      features: [
        {
          icon: History,
          title: "Histórico e Relatórios Avançados",
          description: "Dashboard completo com analytics, exportação em múltiplos formatos e sincronização contábil",
          highlights: ["Dashboard analytics", "Múltiplos formatos", "Sync contábil"]
        },
        {
          icon: Headphones,
          title: "Suporte Premium e Atualizações",
          description: "Suporte técnico especializado 24/7, atualizações automáticas e treinamento incluído",
          highlights: ["Suporte 24/7", "Treinamento incluído", "Updates automáticos"]
        }
      ]
    }
  ];

  const benefits = [
    "Redução de 90% no tempo de emissão",
    "100% de conformidade fiscal garantida",  
    "Integração com sistemas contábeis",
    "Backup automático na nuvem",
    "Interface responsiva e intuitiva",
    "Relatórios gerenciais avançados"
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background com padrão */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50 dark:from-gray-950 dark:to-gray-900/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_60%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.05),transparent_60%)]" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 backdrop-blur-sm bg-white/80 border border-indigo-200/50">
            🚀 Recursos que fazem a diferença
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-indigo-900 to-purple-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-indigo-100 dark:to-purple-100">
            Plataforma completa para NFS-e
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Do cadastro inicial até relatórios avançados, temos tudo que sua empresa precisa 
            para uma gestão fiscal <span className="text-indigo-600 font-medium">moderna</span>, 
            <span className="text-purple-600 font-medium"> eficiente</span> e 
            <span className="text-violet-600 font-medium"> 100% conforme</span>.
          </p>
        </motion.div>

        {/* Features organizadas em tabs */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="setup" className="mb-16">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-12 bg-white/50 backdrop-blur-sm border border-white/20">
              {featureCategories.map((category) => {
                const Icon = category.icon;
                return (
                  <TabsTrigger 
                    key={category.id} 
                    value={category.id}
                    className="flex items-center gap-2 data-[state=active]:bg-indigo-100 data-[state=active]:text-indigo-700"
                  >
                    <Icon className="w-4 h-4" />
                    {category.label}
                  </TabsTrigger>
                );
              })}
            </TabsList>

            {featureCategories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {category.features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: index * 0.1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5 }}
                      >
                        <Card className="h-full hover:shadow-2xl transition-all duration-500 bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm border-white/50 dark:border-gray-700/50 group">
                          <CardHeader className="pb-4">
                            <div className="flex items-start gap-4">
                              <motion.div 
                                className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:shadow-indigo-200 group-hover:scale-110 transition-all duration-300"
                                whileHover={{ rotate: 5 }}
                              >
                                <Icon className="w-6 h-6 text-white" />
                              </motion.div>
                              <div className="flex-1">
                                <CardTitle className="text-xl mb-2 group-hover:text-indigo-700 dark:group-hover:text-indigo-300 transition-colors">
                                  {feature.title}
                                </CardTitle>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                  {feature.description}
                                </p>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {feature.highlights.map((highlight, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                  <span className="text-sm text-gray-600 dark:text-gray-400">{highlight}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Seção de benefícios */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {/* Benefícios */}
          <div>
            <h3 className="text-3xl mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Benefícios comprovados
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-lg border border-white/30 dark:border-gray-700/30"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                >
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">{benefit}</span>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="mt-8"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
            </motion.div>
          </div>

          {/* Imagem ilustrativa */}
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="relative bg-gradient-to-br from-indigo-100 to-purple-100 dark:from-indigo-950/20 dark:to-purple-950/20 p-8 rounded-3xl">
              <div className="aspect-video bg-white dark:bg-gray-800 rounded-2xl shadow-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <FileText className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-lg text-gray-800 dark:text-gray-200">Interface do ClinNota</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">Dashboard principal</div>
                </div>
              </div>
              
              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
            
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-3xl blur-2xl -z-10" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}