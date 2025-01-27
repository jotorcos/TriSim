import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          <Link href="/">TriSim</Link>
        </h1>
        <nav className="space-x-6">
          <Link href="/racePacing" className="hover:underline">
            Race Pacing
          </Link>
          <Link href="/transitions" className="hover:underline">
            Transitions
          </Link>
          <Link href="/checklist" className="hover:underline">
            Checklist
          </Link>
        </nav>
      </div>
    </header>
  );
}
