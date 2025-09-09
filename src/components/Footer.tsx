import { Separator } from "./ui/separator";

export function Footer() {
  return (
    <footer className="py-12 px-4 bg-background border-t">
      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-muted-foreground">
            <span>© 2025 ClinNota. Todos os direitos reservados.</span>
            <div className="flex items-center gap-4">
              <Separator orientation="vertical" className="h-4 hidden sm:block" />
              <a href="#" className="hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <span>|</span>
              <a href="#" className="hover:text-foreground transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}