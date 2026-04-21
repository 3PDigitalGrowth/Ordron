import type { Metadata } from "next";
import { Sora, Commissioner } from "next/font/google";
import "./globals.css";
import { HealthCheckDialogProvider } from "@/components/health-check/health-check-dialog";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const commissioner = Commissioner({
  variable: "--font-commissioner",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ordron.com"),
  title: {
    default: "Ordron | Finance automation for Australian mid-market businesses",
    template: "%s | Ordron",
  },
  description:
    "Ordron builds the finance automation infrastructure that runs AP, AR, reconciliations and reporting on autopilot. 130 frameworks across 13 finance platforms. Sydney-based.",
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "Ordron",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${sora.variable} ${commissioner.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-surface text-ink">
        <HealthCheckDialogProvider>{children}</HealthCheckDialogProvider>
      </body>
    </html>
  );
}
