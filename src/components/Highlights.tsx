import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Zap, Shield, Smartphone, TrendingUp, Award, Users } from "lucide-react";
import { motion } from "motion/react";

export function Highlights() {
  const highlights = [
    {
      icon: Zap,
      title: "Velocidade extraordinária",
      description: "Emita suas NFS-e em menos de 10 segundos com validação automática",
      metric: "10s",
      metricLabel: "tempo médio",
      color: "from-yellow-400 to-orange-500",
      bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20"
    },
    {
      icon: Shield,
      title: "Segurança empresarial",
      description: "Certificação ICP-Brasil, criptografia avançada e conformidade total",
      metric: "100%",
      metricLabel: "seguro",
      color: "from-emerald-400 to-green-500",
      bgColor: "bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-950/20 dark:to-green-950/20"
    },
    {
      icon: Smartphone,
      title: "Experiência unificada",
      description: "Sincronização perfeita entre Desktop, Android e iOS com dados na nuvem",
      metric: "3",
      metricLabel: "plataformas",
      color: "from-blue-400 to-indigo-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20"
    }
  ];

  const stats = [
    {
      icon: Users,
      value: "50k+",
      label: "empresas ativas",
      color: "text-violet-600"
    },
    {
      icon: TrendingUp,
      value: "2.5M+",
      label: "NFS-e emitidas",
      color: "text-emerald-600"
    },
    {
      icon: Award,
      value: "99.9%",
      label: "uptime garantido",
      color: "text-blue-600"
    }
  ];

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decorativo */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white dark:from-gray-900/50 dark:to-gray-950" />
      
      {/* Elementos decorativos */}
      <motion.div 
        className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-violet-200/30 to-purple-300/30 rounded-full blur-2xl"
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
        className="absolute bottom-20 right-10 w-40 h-40 bg-gradient-to-br from-cyan-200/30 to-blue-300/30 rounded-full blur-2xl"
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.4, 0.6, 0.4]
        }}
        transition={{ 
          duration: 10,
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
          <Badge variant="secondary" className="mb-4 px-4 py-2 backdrop-blur-sm bg-white/80 border border-violet-200/50">
            ⚡ Por que escolher o ClinNota
          </Badge>
          <h2 className="text-4xl md:text-5xl mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent dark:from-gray-100 dark:to-gray-400">
            A plataforma mais completa para NFS-e
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Desenvolvida especialmente para prestadores de serviço que buscam 
            <span className="text-violet-600 font-medium"> eficiência</span>, 
            <span className="text-emerald-600 font-medium"> segurança</span> e 
            <span className="text-blue-600 font-medium"> praticidade </span> 
            na emissão de notas fiscais.
          </p>
        </motion.div>

        {/* Cards principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {highlights.map((highlight, index) => {
            const Icon = highlight.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className={`relative text-center border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group ${highlight.bgColor}`}>
                  {/* Gradiente de fundo animado */}
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${highlight.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  
                  <CardContent className="pt-10 pb-8 relative">
                    {/* Ícone com animação */}
                    <motion.div 
                      className="flex justify-center mb-6"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`p-4 bg-gradient-to-br ${highlight.color} rounded-2xl shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </motion.div>

                    {/* Métrica destacada */}
                    <div className="mb-4">
                      <div className={`text-3xl bg-gradient-to-r ${highlight.color} bg-clip-text text-transparent`}>
                        {highlight.metric}
                      </div>
                      <div className="text-sm text-gray-500 uppercase tracking-wide">
                        {highlight.metricLabel}
                      </div>
                    </div>

                    <h3 className="mb-3 text-xl">{highlight.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {highlight.description}
                    </p>

                    {/* Elemento decorativo */}
                    <motion.div 
                      className={`absolute -bottom-2 -right-2 w-20 h-20 bg-gradient-to-br ${highlight.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Estatísticas adicionais */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div 
                key={index}
                className="text-center p-6 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-white/20 dark:border-gray-700/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <div className="text-3xl mb-1 text-gray-900 dark:text-gray-100">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}