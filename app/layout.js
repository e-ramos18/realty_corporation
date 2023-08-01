import "@styles/globals.css";

import Nav from "@components/Nav";

export const metadata = {
  title: "Golden Liberty",
  description: "Realty Corporation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app">
          <Nav />
          {children}
        </main>
      </body>
    </html>
  );
}
