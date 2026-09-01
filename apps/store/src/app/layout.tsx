import type { Metadata } from 'next';
import { color, fontFamily } from '@/lib/tokens';

export const metadata: Metadata = {
  title: 'Drinkit Store',
  description: 'Licensed store operations panel',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: '100vh',
          background: color.bg,
          color: color.textPrimary,
          fontFamily: fontFamily.sansFallback,
        }}
      >
        {children}
      </body>
    </html>
  );
}
