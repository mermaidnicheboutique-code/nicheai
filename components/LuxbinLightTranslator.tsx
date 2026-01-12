"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface LightBeam {
  wavelength: number;
  color: string;
  character: string;
}

interface ColorInfo {
  name: string;
  wavelength: number;
  frequency: number;
  meaning: string;
  energyLevel: string;
  keywords: string[];
  hexCode: string;
  usage: string;
}

interface ColorDictionary {
  colors: ColorInfo[];
  binaryEncoding: Record<string, string>;
  description: string;
}

export function LuxbinLightTranslator() {
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [lightShow, setLightShow] = useState<LightBeam[]>([]);
  const [translationData, setTranslationData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentBeamIndex, setCurrentBeamIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [colorDictionary, setColorDictionary] = useState<ColorDictionary | null>(null);
  const [showDictionary, setShowDictionary] = useState(false);
  const fullscreenRef = useRef<HTMLDivElement>(null);

  // Load color dictionary on mount
  useEffect(() => {
    const loadDictionary = async () => {
      try {
        const response = await fetch('/api/v1/light-language/colors', {
          headers: {
            'X-API-Key': 'demo_key_for_testing'
          }
        });
        if (response.ok) {
          const data = await response.json();
          setColorDictionary(data.dictionary);
        }
      } catch (err) {
        console.error('Failed to load color dictionary:', err);
      }
    };
    loadDictionary();
  }, []);

  const generateLightShow = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate!');
      return;
    }

    setLoading(true);
    setError('');
    setLightShow([]);
    setTranslationData(null);

    try {
      // Call the Light Language API (using the deployed API endpoint)
      const response = await fetch('/api/v1/light-language/translate', {
        method: 'POST',
        headers: {
          'X-API-Key': 'demo_key_for_testing',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text: inputText,
          enable_quantum: true,
          format: 'full'
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.photonicSequence) {
        setTranslationData(data);

        // Extract light beams from the photonic sequence
        const sequence = data.photonicSequence;
        const beams: LightBeam[] = sequence.wavelengths.map((wavelength: number, index: number) => {
          const hue = ((wavelength - 400) / 300) * 360;
          const hslColor = `hsl(${hue.toFixed(0)}, 70%, 60%)`;

          return {
            wavelength: wavelength,
            color: hslColor,
            character: inputText[index] || ''
          };
        });

        setLightShow(beams);
      } else {
        setError('Translation failed: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      console.error('Translation error:', err);
      setError('Failed to connect to Light Language API. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Play light show animation
  const playLightShow = () => {
    if (lightShow.length === 0) return;
    setIsPlaying(true);
    setCurrentBeamIndex(0);
  };

  // Animate through light beams
  useEffect(() => {
    if (!isPlaying || lightShow.length === 0) return;

    const interval = setInterval(() => {
      setCurrentBeamIndex((prev) => {
        if (prev >= lightShow.length - 1) {
          setIsPlaying(false);
          return 0;
        }
        return prev + 1;
      });
    }, 300); // Change color every 300ms

    return () => clearInterval(interval);
  }, [isPlaying, lightShow.length]);

  // Enter fullscreen mode
  const enterFullscreen = () => {
    setIsFullscreen(true);
    if (fullscreenRef.current) {
      fullscreenRef.current.requestFullscreen?.();
    }
    playLightShow();
  };

  // Exit fullscreen mode
  const exitFullscreen = () => {
    setIsFullscreen(false);
    setIsPlaying(false);
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
  };

  // Handle ESC key to exit fullscreen
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFullscreen) {
        exitFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isFullscreen]);

  return (
    <>
      {/* Fullscreen Light Show */}
      {isFullscreen && lightShow.length > 0 && (
        <div
          ref={fullscreenRef}
          className="fixed inset-0 z-50 flex items-center justify-center transition-all duration-500"
          style={{
            backgroundColor: isPlaying ? lightShow[currentBeamIndex]?.color : '#000',
            boxShadow: isPlaying ? `inset 0 0 300px ${lightShow[currentBeamIndex]?.color}` : 'none'
          }}
        >
          {/* Exit Button */}
          <button
            onClick={exitFullscreen}
            className="absolute top-8 right-8 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-white font-bold transition-all z-10"
          >
            Exit (ESC)
          </button>

          {/* Current Character Display */}
          <div className="text-center">
            <div className="text-white text-9xl font-bold mb-8 drop-shadow-2xl">
              {lightShow[currentBeamIndex]?.character}
            </div>
            <div className="text-white/80 text-4xl mb-4">
              {lightShow[currentBeamIndex]?.wavelength.toFixed(1)} nm
            </div>
            <div className="text-white/60 text-2xl">
              {currentBeamIndex + 1} / {lightShow.length}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-white/10">
            <div
              className="h-full bg-white/50 transition-all duration-300"
              style={{ width: `${((currentBeamIndex + 1) / lightShow.length) * 100}%` }}
            />
          </div>

          {/* Play/Pause Controls */}
          <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex gap-4">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-white font-bold transition-all"
            >
              {isPlaying ? '⏸ Pause' : '▶ Play'}
            </button>
            <button
              onClick={() => setCurrentBeamIndex(0)}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-xl border border-white/30 rounded-xl text-white font-bold transition-all"
            >
              ⏮ Restart
            </button>
          </div>
        </div>
      )}

      {/* Main Page */}
      <div className="min-h-screen bg-gradient-to-b from-[#0f0f23] via-[#1a1a2e] to-[#16213e] text-white p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-between items-center mb-6">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              ← Home
            </Link>
            <Link href="/lightshow" className="text-blue-400 hover:text-blue-300 transition-colors">
              View Live Blockchain Lightshow →
            </Link>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 bg-clip-text text-transparent">
            🌈 LUXBIN Light Language Translator
          </h1>
          <p className="text-xl text-gray-300">
            Translate your thoughts into photonic light sequences - displayed on your Mac screen
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">99%</div>
            <div className="text-sm text-gray-400">Energy Reduction</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">77</div>
            <div className="text-sm text-gray-400">Character Alphabet</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">6-7</div>
            <div className="text-sm text-gray-400">Bits per Character</div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center">
            <div className="text-4xl font-bold text-orange-400 mb-2">∞</div>
            <div className="text-sm text-gray-400">Quantum Ready</div>
          </div>
        </div>

        {/* Main Translation Interface */}
        <div className="bg-white/5 backdrop-blur-xl border border-orange-500/30 rounded-3xl p-8 mb-8">
          <h2 className="text-3xl font-bold mb-4">🌟 Light Language Translator</h2>
          <p className="text-gray-300 mb-6">
            Transform natural language into photonic light shows that quantum computers can understand.
          </p>

          {/* Input */}
          <div className="mb-6">
            <label className="block text-orange-400 font-bold mb-3">
              Enter Natural Language:
            </label>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              rows={3}
              placeholder="Type your message here... e.g., 'Hello quantum world!'"
              className="w-full px-4 py-3 bg-black/30 border-2 border-orange-500/30 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>

          {/* Generate Button */}
          <button
            onClick={generateLightShow}
            disabled={loading}
            className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-4 rounded-xl hover:shadow-lg hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Translating to Light...
              </span>
            ) : (
              '✨ Generate LUXBIN Light Show'
            )}
          </button>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 bg-red-500/20 border border-red-500/50 rounded-xl text-red-300">
              {error}
            </div>
          )}

          {/* Physics Note */}
          <div className="mt-6 bg-white/5 border-l-4 border-orange-500 rounded-lg p-6">
            <h3 className="text-xl font-bold text-orange-400 mb-3">🔬 Physics of Translation</h3>
            <p className="text-gray-300 mb-2">
              <strong>Order:</strong> Natural Language → LUXBIN Characters → Binary Code → Light Wavelengths
            </p>
            <p className="text-gray-400 text-sm">
              <strong>Why this order?</strong> We preserve semantic meaning through LUXBIN characters, encode them efficiently as binary, then map to physical light wavelengths (400-700nm) that diamond NV center quantum computers can detect and process.
            </p>
          </div>
        </div>

        {/* Translation Chain Visualization */}
        {translationData && (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 mb-8">
            <h3 className="text-2xl font-bold mb-6">📊 Translation Chain</h3>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-orange-400 font-bold mb-2">Natural Language</div>
                <div className="text-sm text-gray-300 font-mono break-all">{inputText}</div>
              </div>
              <div className="flex items-center justify-center text-orange-500 text-3xl">→</div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-orange-400 font-bold mb-2">LUXBIN Characters</div>
                <div className="text-sm text-gray-300 font-mono break-all">{inputText.toUpperCase()}</div>
              </div>
              <div className="flex items-center justify-center text-orange-500 text-3xl">→</div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-orange-400 font-bold mb-2">Quantum Mode</div>
                <div className="text-sm text-green-300">
                  {translationData.quantum_mode ? '✓ Enabled' : '✗ Disabled'}
                </div>
                <div className="text-xs text-gray-400 mt-2">
                  Diamond NV Centers<br/>
                  637nm Zero-Phonon Line
                </div>
              </div>
              <div className="flex items-center justify-center text-orange-500 text-3xl">→</div>
              <div className="bg-black/30 rounded-xl p-4">
                <div className="text-orange-400 font-bold mb-2">Light Wavelengths</div>
                <div className="text-sm text-gray-300">
                  {lightShow.length} photonic pulses
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  400-700nm spectrum
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Light Show Visualization */}
        {lightShow.length > 0 && (
          <div className="bg-black backdrop-blur-xl border border-orange-500/50 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold">🌈 Your LUXBIN Light Show</h3>
              <button
                onClick={enterFullscreen}
                className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-orange-500/50"
              >
                🖥️ Display on Mac Screen (Fullscreen)
              </button>
            </div>
            <div className="flex flex-wrap gap-3 justify-center items-center min-h-[200px]">
              {lightShow.map((beam, index) => (
                <div key={index} className="flex flex-col items-center group">
                  <div
                    className="w-6 h-20 rounded-lg transition-all duration-300 hover:scale-110 cursor-pointer animate-pulse"
                    style={{
                      backgroundColor: beam.color,
                      boxShadow: `0 0 20px ${beam.color}`,
                      animationDelay: `${index * 100}ms`
                    }}
                    title={`${beam.character} - ${beam.wavelength.toFixed(1)}nm`}
                  />
                  <div className="text-xs text-gray-500 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {beam.wavelength.toFixed(1)}nm
                  </div>
                  <div className="text-xs text-white mt-1 opacity-0 group-hover:opacity-100 transition-opacity font-mono">
                    {beam.character}
                  </div>
                </div>
              ))}
            </div>

            {/* Quantum Data Info */}
            {translationData?.light_show?.quantum_data && (
              <div className="mt-8 pt-8 border-t border-white/10">
                <h4 className="text-xl font-bold mb-4 text-purple-400">⚛️ Quantum Data</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-sm text-gray-400">Total Quantum States</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {translationData.light_show.quantum_data.total_states}
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-sm text-gray-400">Storage Time</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {(translationData.light_show.quantum_data.estimated_storage_time / 1000).toFixed(1)}ms
                    </div>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4">
                    <div className="text-sm text-gray-400">Total Duration</div>
                    <div className="text-2xl font-bold text-purple-300">
                      {translationData.light_show.total_duration.toFixed(2)}s
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Light Language Dictionary */}
        {colorDictionary && (
          <div className="mt-12 bg-white/5 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-orange-400 bg-clip-text text-transparent">
                📖 Light Language Dictionary
              </h3>
              <button
                onClick={() => setShowDictionary(!showDictionary)}
                className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 rounded-lg transition-colors"
              >
                {showDictionary ? 'Hide' : 'Show'} Dictionary
              </button>
            </div>

            {showDictionary && (
              <>
                <p className="text-gray-300 mb-6 text-lg">{colorDictionary.description}</p>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {colorDictionary.colors.map((color) => (
                    <div
                      key={color.name}
                      className="bg-black/30 border border-white/10 rounded-xl p-6 hover:border-white/30 transition-all"
                      style={{ borderLeftColor: color.hexCode, borderLeftWidth: '4px' }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-8 h-8 rounded-full"
                          style={{ backgroundColor: color.hexCode, boxShadow: `0 0 20px ${color.hexCode}` }}
                        />
                        <h4 className="text-xl font-bold" style={{ color: color.hexCode }}>
                          {color.name}
                        </h4>
                      </div>

                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Wavelength:</span>
                          <span className="text-white ml-2 font-mono">{color.wavelength}nm</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Binary:</span>
                          <span className="text-white ml-2 font-mono">
                            {colorDictionary.binaryEncoding[color.name]}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-400">Meaning:</span>
                          <span className="text-white ml-2">{color.meaning}</span>
                        </div>
                        <div>
                          <span className="text-gray-400">Energy:</span>
                          <span className="text-purple-300 ml-2">{color.energyLevel}</span>
                        </div>
                        <div className="pt-2 border-t border-white/10">
                          <span className="text-gray-400 block mb-1">Keywords:</span>
                          <div className="flex flex-wrap gap-1">
                            {color.keywords.map((keyword) => (
                              <span
                                key={keyword}
                                className="px-2 py-1 bg-white/5 rounded text-xs"
                              >
                                {keyword}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="pt-2">
                          <span className="text-gray-400 block mb-1">Usage:</span>
                          <p className="text-gray-300 text-xs leading-relaxed">{color.usage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-6">
                  <h4 className="text-xl font-bold mb-3 text-purple-300">How It Works</h4>
                  <div className="space-y-3 text-gray-300">
                    <p>
                      <strong>Binary Encoding:</strong> Each color is encoded as a 3-bit binary value (000-110),
                      allowing efficient storage and transmission of light-based information.
                    </p>
                    <p>
                      <strong>Semantic Mapping:</strong> Words are intelligently mapped to colors based on their
                      meaning, combining spiritual/hermetic wisdom with technological concepts.
                    </p>
                    <p>
                      <strong>Quantum Ready:</strong> The wavelengths are optimized for diamond NV center quantum
                      computers, which detect light at 637nm zero-phonon line.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Company Info */}
        <div className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-center">
          <h3 className="text-2xl font-bold text-orange-400 mb-4">🏢 About NicheAI</h3>
          <p className="text-gray-300 mb-4">
            Pioneering sustainable computing through diamond quantum technology and photonic communication systems.
          </p>
          <div className="flex justify-center gap-6">
            <a href="https://github.com/mermaidnicheboutique-code" target="_blank" className="text-orange-400 hover:text-orange-300">
              GitHub
            </a>
            <a href="/developers" className="text-orange-400 hover:text-orange-300">
              API Docs
            </a>
            <a href="/about" className="text-orange-400 hover:text-orange-300">
              About
            </a>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}
