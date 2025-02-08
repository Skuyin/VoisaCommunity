import { Toaster } from "sonner";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReCaptchaProvider from "./components/ReCaptchaProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Voisa Community",
  description:
    "Voisa Community adalah komunitas dari aplikasi Anonymous di Playstore yang menyatukan orang-orang dari berbagai latar belakang di Indonesia. Kami menyediakan ruang untuk berbagi pengalaman, bertukar ide, dan menjalin persahabatan. Di sini, kamu bisa ngobrol santai, bermain game, ikut meetup, serta berdiskusi tentang buku, musik, film, dan topik menarik lainnya. Voisa Community juga mendorong sosialisasi dan kolaborasi dalam kegiatan positif. Jika kamu mencari tempat untuk berinteraksi dan membangun koneksi bermakna, Voisa Community adalah jawabannya!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReCaptchaProvider>{children}</ReCaptchaProvider>
        <Toaster richColors />
      </body>
    </html>
  );
}
