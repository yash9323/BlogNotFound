import "./globals.css";
import AuthProvider from "./(components)/AuthProvider";
import Navbar from "./(components)/navbar";

export const metadata = {
  title: "Blog Not Found",
};

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-black text-white">
          <Navbar />
          {children}
          </body>
      </AuthProvider>
    </html>
  );
}


