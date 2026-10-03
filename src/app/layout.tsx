import type { Metadata } from "next";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Eneagrama from "../components/layout/Eneagrama";
import ModalProvider from "@/providers/ModalProvider";
import CookiesBannerProvider from "@/providers/CookiesBannerProvider";
import ToastProvider from "@/providers/ToastProvider";
import { GlobalPublicClientErrorCapture } from "@/features/observability/client/GlobalPublicClientErrorCapture";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className="h-full antialiased"
    >
      <body className="flex flex-col min-h-screen">
        <GlobalPublicClientErrorCapture />
        <CookiesBannerProvider>
          <ToastProvider>
            <ModalProvider>
              <Navbar />
              <div className={"mt-24 md:mt-0"}>{children}</div>
              <Eneagrama />
              <Footer />
            </ModalProvider>
          </ToastProvider>
        </CookiesBannerProvider>
      </body>
    </html>
  );
}
