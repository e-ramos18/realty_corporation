import "@styles/globals.css";

export const metadata = {
  title: "Golden Liberty",
  description: "Realty Corporation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main className="app">{children}</main>
      </body>
    </html>
  );
}
