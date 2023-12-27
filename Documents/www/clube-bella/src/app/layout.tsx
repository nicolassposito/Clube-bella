import { Poppins as FontSans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";

import { cn } from "@/lib/utils";
import "@/styles/globals.css";
import { ReactNode } from "react";

interface RootLayoutProps {
  children: ReactNode;
}

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: {
    default: "Bella Hair",
    template: `%s | Bella Hair`,
  },
  description: "Descricao",
  keywords: [],
  authors: [
    {
      name: "Nicolas Sposito",
      url: "https://github.com/nicolassposito",
    },
  ],
  creator: "Nicolas Sposito",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen font-sans bg-background antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          themes={['light', 'dark']}
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
          enableSystem={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
