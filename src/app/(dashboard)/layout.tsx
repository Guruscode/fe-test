import '../styles/globals.css';
import Navbar from '@/app/components/Navbar';
import Sidebar from '@/app/components/Sidebar';

export const metadata = {
  title: 'Dashboard',
  description: 'Financial Dashboard',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 min-h-screen">
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <main>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
