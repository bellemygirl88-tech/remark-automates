import { Header } from "./Header";
import { Footer } from "./Footer";
import { InteractionEffects } from "./InteractionEffects";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <InteractionEffects />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
