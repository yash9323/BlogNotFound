import "./globals.css";
import AuthProvider from "./(components)/AuthProvider";

export const metadata = {
  title: "Blog Not Found",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className="bg-black text-white">
          {children}
          </body>
      </AuthProvider>
    </html>
  );
}


