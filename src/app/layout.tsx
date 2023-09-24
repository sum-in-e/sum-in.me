import './globals.css';

export const metadata = {
  title: 'sumDev',
  description: 'Hello, world!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* Header */}
        <main className="min-h-screen flex justify-center">
          <div className="max-w-screen-lg flex flex-col items-center w-full">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
