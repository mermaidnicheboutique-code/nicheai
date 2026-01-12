'use client';

import { useEffect } from 'react';

export default function LightTranslatorPage() {
  useEffect(() => {
    // Redirect to the deployed Light Language application
    window.location.href = 'https://luxbin-light-language-p2em.vercel.app';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center">
      <div className="text-center text-white">
        <div className="text-6xl mb-4">✨</div>
        <h1 className="text-2xl font-bold mb-2">Redirecting to Light Language...</h1>
        <p className="text-gray-400">Taking you to the Light Translator app</p>
        <a
          href="https://luxbin-light-language-p2em.vercel.app"
          className="mt-4 inline-block text-purple-400 hover:text-purple-300 underline"
        >
          Click here if you're not redirected automatically
        </a>
      </div>
    </div>
  );
}
