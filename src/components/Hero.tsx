import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Download, Play, Sparkles, Shield, Zap, ChevronRight, Star, FileText, CheckCircle, TrendingUp } from "lucide-react";
import { motion } from "motion/react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-16">
      {/* Background sofisticado com múltiplas camadas */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/50 to-indigo-50 dark:from-slate-950 dark:via-blue-950/20 dark:to-indigo-950/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.15),transparent_50%)] dark:bg-[radial-gradient(circle_at_80%_80%,rgba(139,92,246,0.1),transparent_50%)]" />
      </div>
      
      {/* Elementos geométricos flutuantes */}
      <motion.div 
        className="absolute top-20 left-20 w-2 h-2 bg-indigo-400 rounded-full"
        animate={{ 
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.8, 0.3]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      <motion.div 
        className="absolute top-40 right-32 w-1 h-1 bg-violet-400 rounded-full"
        animate={{ 
          scale: [1, 2, 1],
          opacity: [0.4, 0.9, 0.4]
        }}
        transition={{ 
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      
      <motion.div 
        className="absolute bottom-32 left-32 w-3 h-3 bg-blue-400 rounded-full"
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.6, 0.2]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Lado esquerdo - Conteúdo */}
        <motion.div 
          className="space-y-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge sofisticado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Badge 
              variant="secondary" 
              className="px-4 py-2 text-sm bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-indigo-200/50 dark:border-indigo-800/50 shadow-lg"
            >
              <Sparkles className="w-4 h-4 mr-2 text-indigo-600" />
              ✨ Integração nacional com a Receita Federal
            </Badge>
          </motion.div>

          {/* Título principal com animação elegante */}
          <div className="space-y-6">
            <motion.h1 
              className="text-5xl md:text-6xl xl:text-7xl leading-[1.1] tracking-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="block text-gray-900 dark:text-gray-100">
                Emita NFS-e em
              </span>
              <span className="block">
                <motion.span
                  className="bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-600 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  segundos
                </motion.span>
              </span>
              <span className="block text-gray-700 dark:text-gray-300">
                com o ClinNota
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              A plataforma mais completa para prestadores de serviço que buscam 
              <span className="text-indigo-600 font-semibold"> agilidade</span>, 
              <span className="text-violet-600 font-semibold"> segurança</span> e 
              <span className="text-purple-600 font-semibold"> conformidade</span> 
              na emissão de notas fiscais.
            </motion.p>
          </div>

          {/* Estatísticas em linha */}
          <motion.div 
            className="flex flex-wrap items-center gap-8 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-gray-600 dark:text-gray-400">4.9 (2.3k avaliações)</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
              <TrendingUp className="w-4 h-4 text-emerald-600" />
              <span>50k+ empresas ativas</span>
            </div>
          </motion.div>
          
          {/* CTAs elegantes */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                size="lg" 
                className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white border-0 px-8 py-6 text-lg shadow-xl shadow-indigo-500/25"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                />
                <Download className="w-5 h-5 mr-2" />
                Começar gratuitamente
                <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="group bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border-gray-200/50 dark:border-gray-700/50 hover:bg-white/90 dark:hover:bg-gray-800/90 px-8 py-6 text-lg shadow-lg"
              >
                <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Ver demonstração
              </Button>
            </motion.div>
          </motion.div>

          {/* Features destacadas */}
          <motion.div 
            className="flex flex-wrap gap-3 pt-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {[
              { icon: Zap, text: "Emissão em 10 segundos", color: "text-amber-600" },
              { icon: Shield, text: "Certificação ICP-Brasil", color: "text-emerald-600" },
              { icon: CheckCircle, text: "Sistema nacional", color: "text-blue-600" }
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                className="flex items-center gap-2 px-4 py-2 bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-full border border-gray-200/30 dark:border-gray-700/30"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <feature.icon className={`w-4 h-4 ${feature.color}`} />
                <span className="text-sm text-gray-700 dark:text-gray-300">{feature.text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Lado direito - Visualização sofisticada */}
        <motion.div 
          className="relative flex justify-center lg:justify-end"
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          {/* Container principal do mockup */}
          <div className="relative">
            {/* Mockup principal - App interface */}
            <motion.div
              className="relative z-10 max-w-sm w-full"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {/* Simulação de interface do app */}
              <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-1 border border-gray-200/50 dark:border-gray-700/50">
                <div className="bg-gradient-to-br from-indigo-50 to-violet-50 dark:from-indigo-950/50 dark:to-violet-950/50 rounded-3xl p-6">
                  {/* Header da interface */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">ClinNota</div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">Dashboard</div>
                      </div>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  </div>

                  {/* Cards de estatísticas */}
                  <div className="space-y-4">
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">NFS-e emitidas hoje</div>
                          <div className="text-2xl font-bold text-indigo-600">47</div>
                        </div>
                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-5 h-5 text-indigo-600" />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-4 border border-white/50 dark:border-gray-700/50">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Valor total</div>
                          <div className="text-2xl font-bold text-emerald-600">R$ 12.580</div>
                        </div>
                        <div className="w-10 h-10 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-emerald-600" />
                        </div>
                      </div>
                    </div>

                    {/* Último item da lista */}
                    <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm rounded-xl p-3 border border-white/50 dark:border-gray-700/50">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full" />
                        <div className="flex-1">
                          <div className="text-xs text-gray-900 dark:text-gray-100 font-medium">NFS-e #001247</div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">Emitida há 2 min</div>
                        </div>
                        <div className="text-xs text-emerald-600 font-medium">R$ 1.250,00</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Efeitos de glow */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 via-violet-500/20 to-purple-500/20 rounded-3xl blur-2xl -z-10" />
            </motion.div>

            {/* Elementos flutuantes informativos */}
            <motion.div 
              className="absolute -top-6 -left-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 px-4 py-3 max-w-48"
              animate={{ 
                y: [0, -8, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Zap className="w-4 h-4 text-amber-500" />
                <div className="text-xs text-gray-500 dark:text-gray-400">Tempo médio</div>
              </div>
              <div className="text-lg font-bold text-gray-900 dark:text-gray-100">8.5s</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">por emissão</div>
            </motion.div>

            <motion.div 
              className="absolute -bottom-6 -right-8 bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-xl border border-white/50 dark:border-gray-700/50 px-4 py-3 max-w-48"
              animate={{ 
                y: [0, 8, 0],
                rotate: [0, -1, 0]
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <Shield className="w-4 h-4 text-emerald-500" />
                <div className="text-xs text-gray-500 dark:text-gray-400">Conformidade</div>
              </div>
              <div className="text-lg font-bold text-emerald-600">100%</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">certificada</div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Indicador de scroll refinado */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-6 h-10 border border-gray-300 dark:border-gray-600 rounded-full flex justify-center bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm">
          <div className="w-1 h-3 bg-indigo-400 rounded-full mt-2 animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}