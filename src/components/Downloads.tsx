import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Download, Smartphone, Monitor, Apple, Star, Users, CheckCircle, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

export function Downloads() {
  const platforms = [
    {
      icon: Smartphone,
      title: "Google Play",
      subtitle: "Android 8.0+",
      description: "App nativo com sincronização em tempo real",
      rating: 4.8,
      downloads: "10k+",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20",
      features: ["Segurança criptografada", "Push notifications", "Sync automática"],
      popular: false
    },
    {
      icon: Apple,
      title: "App Store", 
      subtitle: "iOS 14.0+",
      description: "Interface otimizada para iPhone",
      rating: 4.9,
      downloads: "8k+",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20",
      features: ["Interface adaptativa", "Acessibilidade avançada", "Widgets iOS"],
      popular: false
    },
    {
      icon: Monitor,
      title: "Desktop",
      subtitle: "Windows",
      description: "Versão completa com recursos avançados e integração com sistemas",
      rating: 4.9,
      downloads: "25k+",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-gradient-to-br from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20",
      features: ["Recursos completos", "Integração APIs", "Multi-monitor"],
      popular: true
    }
  ];

  const globalStats = [
    { label: "Downloads totais", value: "50k+" },
    { label: "Avaliação média", value: "4.9★" },
    { label: "Empresas ativas", value: "12k+" }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20" />
      
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-violet-200/30 to-purple-300/30 rounded-full blur-3xl"
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute bottom-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-200/30 to-indigo-300/30 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 0.8, 1],
          rotate: [0, -90, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge variant="secondary" className="mb-4 px-4 py-2 backdrop-blur-sm bg-white/80 border border-violet-200/50">
            📱 Multiplataforma
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 via-violet-900 to-indigo-900 bg-clip-text text-transparent dark:from-gray-100 dark:via-violet-100 dark:to-indigo-100">
            Baixe o ClinNota
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed mb-8">
            Escolha a plataforma ideal e tenha acesso completo às suas notas fiscais em 
            <span className="text-violet-600 font-medium"> qualquer lugar</span>, 
            <span className="text-indigo-600 font-medium"> a qualquer momento</span>. 
            Dados sempre sincronizados entre todos os dispositivos.
          </p>
          
          {/* Stats globais */}
          <div className="flex flex-wrap justify-center gap-8 text-sm">
            {globalStats.map((stat, index) => (
              <motion.div 
                key={index}
                className="flex items-center gap-2"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-2xl text-violet-600">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* Cards das plataformas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {platforms.map((platform, index) => {
            const Icon = platform.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
                className="relative"
              >
                {/* Badge "Popular" */}
                {platform.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-20">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white border-0 px-3 py-1">
                      ⭐ Mais popular
                    </Badge>
                  </div>
                )}
                
                <Card className={`relative text-center hover:shadow-2xl transition-all duration-500 ${platform.bgColor} border-0 overflow-hidden group ${platform.popular ? 'ring-2 ring-yellow-400/50' : ''}`}>
                  {/* Efeito hover */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${platform.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  <CardContent className="pt-10 pb-8 relative z-10">
                    {/* Ícone da plataforma */}
                    <motion.div 
                      className="flex justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`p-5 bg-gradient-to-br ${platform.color} rounded-3xl shadow-lg`}>
                        <Icon className="w-12 h-12 text-white" />
                      </div>
                    </motion.div>

                    {/* Informações da plataforma */}
                    <div className="mb-6">
                      <h3 className="text-2xl mb-2 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                        {platform.title}
                      </h3>
                      <div className="text-gray-500 dark:text-gray-400 mb-2">{platform.subtitle}</div>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                        {platform.description}
                      </p>
                    </div>

                    {/* Estatísticas */}
                    <div className="flex justify-center gap-6 mb-6 text-sm">
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-gray-700 dark:text-gray-300">{platform.rating}</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Avaliação</div>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center gap-1 justify-center mb-1">
                          <Users className="w-4 h-4 text-blue-500" />
                          <span className="text-gray-700 dark:text-gray-300">{platform.downloads}</span>
                        </div>
                        <div className="text-gray-500 dark:text-gray-400">Downloads</div>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-6 space-y-2">
                      {platform.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 justify-center">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">{feature}</span>
                        </div>
                      ))}
                    </div>


                    {/* Botão de download */}
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button 
                        className={`w-full flex items-center gap-2 bg-gradient-to-r ${platform.color} hover:from-gray-700 hover:to-gray-900 text-white border-0 py-6 text-lg group transition-all duration-300`}
                      >
                        <Download className="w-5 h-5" />
                        Baixar agora
                        <ExternalLink className="w-4 h-4 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                      </Button>
                    </motion.div>
                  </CardContent>

                  {/* Elemento decorativo */}
                  <motion.div 
                    className={`absolute -bottom-4 -right-4 w-20 h-20 bg-gradient-to-br ${platform.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}