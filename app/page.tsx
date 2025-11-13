import FeatureVoting from '@/components/FeatureVoting';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">
      {/* Animated background effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-50">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-block mb-6 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <span className="text-sm font-semibold tracking-wider">COMING SOON</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-pink-200">
            The Best English China Expo Website
          </h1>

          <p className="text-xl md:text-2xl text-gray-200 mb-4 max-w-2xl mx-auto">
            Specially designed for exhibition professionals unfamiliar with China
          </p>

          <p className="text-base md:text-lg text-gray-300 mb-16 max-w-xl mx-auto">
            Stay tuned. We&apos;ll help you succeed with your first expo in China
          </p>
        </div>

        {/* Feature Voting Section */}
        <div className="w-full max-w-5xl px-4">
          <FeatureVoting />
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Expo Coming Soon. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
