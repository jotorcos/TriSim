'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function GoBack() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to handle the back navigation
  const goBack = () => {
    router.back();
  };

  if (pathname === '/') {
    return null; // Do not render the button on the home page
  }

  return (
    <button
      onClick={goBack}
      className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 transition"
    >
      {/* SVG for the left arrow */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-5 h-5"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      <span>Atrás</span>
    </button>
  );
}
