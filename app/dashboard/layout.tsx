import { Navbar } from "@/components/layout/navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="relative flex min-h-screen flex-col">
      {/* Ta Navbar reste fixe en haut */}
      <Navbar />

      {/* Le contenu des pages s'injecte ici */}
      <main className="flex-1">{children}</main>

      {/* Tu pourras ajouter un Footer ici plus tard */}
    </div>
  );
};

export default Layout;
