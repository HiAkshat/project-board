import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "jotai";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Akshat's Pro Board",
  description: "Move your ideas around fluently!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <Provider>
        <body className={inter.className}>{children}</body>
      </Provider>
    </html>
  );
}
