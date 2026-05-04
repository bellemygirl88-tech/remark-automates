import { Header } from "./Header";
import { Footer } from "./Footer";
import { InteractionEffects } from "./InteractionEffects";
import { LightningCursor } from "./LightningCursor";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <InteractionEffects />
      <LightningCursor />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
