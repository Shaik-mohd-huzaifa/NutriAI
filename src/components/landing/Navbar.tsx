import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <nav className="fixed w-full z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">NutriAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Features</Button>
            <Button variant="ghost">Pricing</Button>
            <Button variant="ghost">About</Button>
            <Button onClick={() => (window.location.href = "/dashboard")}>
              Dashboard
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
