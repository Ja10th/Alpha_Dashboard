import type { Metadata } from "next";
import "./globals.css";
import { DarkModeProvider } from "./context/DarkModeProvider";


export const metadata: Metadata = {
  title: "Alphatwelve",
  description: "Project for frontend role",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className='font antialiased scroll-smooth scroll-m-0'
      >
        <DarkModeProvider>
        {children}
        </DarkModeProvider>
      </body>
    </html>
  );
}
