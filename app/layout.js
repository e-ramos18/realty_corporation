import "@styles/globals.css";

import Nav from "@components/Nav";
import Footer from "@components/Footer";

export const metadata = {
  title: "Golden Liberty",
  description: "Realty Corporation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="relative">
          <Nav />
          {children}
          <Footer />
        </main>
      </body>
    </html>
  );
}
