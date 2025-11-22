import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono, Poppins, Moirai_One as Mirador } from "next/font/google"
import "./globals.css"
import AIChatbotWidget from "@/components/ai-chatbot-widget"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })
const _poppins = Poppins({ subsets: ["latin"], weight: ["400", "600", "700", "900"] })
const _mirador = Mirador({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
  title: "Inventra - Inventory Management",
  description: "Professional inventory management system",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <AIChatbotWidget />
      </body>
    </html>
  )
}
