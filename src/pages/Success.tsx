import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { CheckCircle, Mail, ArrowRight, Download } from "lucide-react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";

export default function Success() {
  const navigate = useNavigate();

  useEffect(() => {
    // Aqui você pode adicionar lógica para verificar o status do pagamento
    // e buscar informações da sessão do Stripe
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50/50 to-emerald-50 dark:from-slate-950 dark:via-green-950/20 dark:to-emerald-950/20 py-8 sm:py-16 px-4 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-xl">
          <CardHeader className="text-center pb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <CardTitle className="text-2xl sm:text-3xl mb-2">Pagamento confirmado!</CardTitle>
            <CardDescription className="text-base sm:text-lg">
              Bem-vindo ao ClinNota Pro! Sua assinatura está ativa.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
              <h3 className="font-semibold mb-2 flex items-center gap-2 text-sm sm:text-base">
                <Mail className="w-5 h-5 text-indigo-600" />
                Próximos passos:
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                <li>Você receberá um e-mail de confirmação em alguns minutos</li>
                <li>Faça o download do aplicativo ClinNota</li>
                <li>Use suas credenciais para fazer login</li>
                <li>Configure seu certificado digital</li>
                <li>Comece a emitir notas fiscais!</li>
              </ol>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                size="lg"
                className="flex-1 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700"
                onClick={() => navigate('/downloads')}
              >
                <Download className="w-5 h-5 mr-2" />
                Baixar ClinNota
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="flex-1"
                onClick={() => navigate('/')}
              >
                Voltar ao início
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}