import './globals.css';
import * as React from 'react';
import { Metadata } from 'next';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Deku Editor',
  description: 'A powerful visual editor for building web interfaces',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
