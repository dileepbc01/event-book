export const AppLayout = ({ children }: { children: React.ReactNode }) => {
    return (
      <div className="flex flex-col min-h-screen">
        <header className=" text-white p-4">
          <h1 className="text-xl font-bold">Event Book</h1>
        </header>
        <main className="flex-grow p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-2">
          <p>&copy; 2025 Event Book. All rights reserved.</p>
        </footer>
      </div>
    );
  };
