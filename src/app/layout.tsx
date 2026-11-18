import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Клёвое место — рыбалка по всей России",
  description: "Водоёмы, рыболовные сообщества, места отдыха и полезные сервисы для рыболовов России.",
  applicationName: "Клёвое место",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
