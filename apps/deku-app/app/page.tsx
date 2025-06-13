"use client";

import { useState } from 'react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white p-8">
      <header className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="text-purple-600 text-2xl">⚡</div>
            <span className="font-semibold text-gray-900">deku</span>
            <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">v2.1.5</span>
          </div>
          <a href="https://twitter.com/intent/tweet" className="nav-link">
            Share on Twitter
          </a>
        </nav>

        <div className="mt-16 text-center">
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-600 mb-4">
            <span>316 icons</span>
            <span>•</span>
            <span>MIT license</span>
            <span>•</span>
            <span>React & Vue libraries</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Beautiful hand-crafted SVG icons,<br />
            by the makers of Deku Pro.
          </h1>

          <div className="flex items-center justify-center space-x-4">
            <a href="/docs" className="btn-primary inline-flex items-center space-x-2">
              <span>📚</span>
              <span>Editor Documentation</span>
            </a>
            <a href="/sponsor" className="btn-secondary inline-flex items-center space-x-2">
              <span>❤️</span>
              <span>Sponsor</span>
            </a>
            <a href="/contribute" className="btn-secondary inline-flex items-center space-x-2">
              <span>🤝</span>
              <span>Contribute</span>
            </a>
          </div>

          <div className="mt-16 max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search icons..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-600 focus:ring-opacity-20 outline-none transition-all"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                ⌘K
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}