import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Poppins({
  style: "normal",
  weight: "400",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Raplens: Rapor Online Holistik",
  description:
    "Rapor Online Holistik dengan Visualisasi Kemajuan Siswa untuk Analisis dan Prediksi",
  applicationName: "Raplens: Rapor Online Holistik",
  keywords: ["Raplens: Rapor Online Holistik"],
  openGraph: {
    title: "Raplens: Rapor Online Holistik",
    description:
      "Rapor Online Holistik dengan Visualisasi Kemajuan Siswa untuk Analisis dan Prediksi",
    url: "",
    type: "website",
    countryName: "Indonesia",
    images: [
      {
        url: "/brand/color-logo.png",
        width: 800,
        height: 600,
        alt: "Raplens: Rapor Online Holistik",
      },
      {
        url: "/brand/color-logo.png",
        width: 800,
        height: 600,
        alt: "Raplens: Rapor Online Holistik",
      },
    ],
  },
  twitter: {
    title: "Raplens: Rapor Online Holistik",
    card: "summary_large_image",
    images: [
      {
        url: "/brand/color-logo.png",
        width: 800,
        height: 600,
        alt: "Raplens: Rapor Online Holistik",
      },
      {
        url: "/brand/color-logo.png",
        width: 800,
        height: 600,
        alt: "Eusthetic Learning Center LMS",
      },
    ],
  },
  publisher: "Eusthetic Learning Center LMS",
  icons: {
    icon: ["/fav/favicon.ico?v=4"],
    apple: ["/fav/apple-touch-icon.png?v=4"],
    shortcut: ["/fav/apple-touch-icon.png"],
  },
  manifest: "/fav/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
