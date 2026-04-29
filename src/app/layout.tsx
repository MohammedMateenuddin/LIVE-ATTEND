import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"),
  title: "Live Attend Portal",
  description: "Secure Attendance Management System",
};

import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Toaster position="top-right" />
          <script dangerouslySetInnerHTML={{
            __html: `
              (function() {
                const originalError = console.error;
                console.error = function(...args) {
                  const msg = args[0];
                  if (
                    (typeof msg === 'string' && msg.includes('Missing property')) ||
                    (msg && msg instanceof Error && msg.message && msg.message.includes('Missing property')) ||
                    (msg && msg.message && typeof msg.message === 'string' && msg.message.includes('Missing property'))
                  ) {
                    return; // Silence internal Spline/Turbopack non-critical warning
                  }
                  originalError.apply(console, args);
                };
              })();
            `
          }} />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
