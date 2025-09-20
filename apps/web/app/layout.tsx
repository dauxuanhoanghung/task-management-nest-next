import type {Metadata} from "next";
import localFont from "next/font/local";
import "./globals.css";
import {ApolloWrapper} from "@/lib/apollo-wrapper";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Task Management System",
  description: "Task Management System",
};

const RootLayout = ({children}: Readonly<{children: React.ReactNode}>) => {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
