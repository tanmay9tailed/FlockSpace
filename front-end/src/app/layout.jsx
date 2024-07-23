import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./componenets/Navbar";
import AuthProvider from "./componenets/AuthProvider";
import FeedProvider from "./componenets/FeedContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <FeedProvider>
            <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[500px] shadow-2xl">
              <Navbar />
              <div className="pl-2 pr-2 pt-2 h-[630px] bg-slate-300 mt-16 overflow-auto">{children}</div>
            </div>
          </FeedProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
