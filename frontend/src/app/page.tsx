import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Welcome to Secure Notes
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          A secure and simple way to store and manage your notes. Your data is encrypted
          and protected with industry-standard security measures.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/register"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Get Started
          </Link>
          <Link
            href="/login"
            className="px-6 py-3 bg-white text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Sign In
          </Link>
        </div>
        <div className="mt-12 grid md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Secure Storage</h3>
            <p className="text-gray-600">
              Your notes are encrypted and stored securely using industry-standard protocols.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Easy Access</h3>
            <p className="text-gray-600">
              Access your notes from anywhere with our user-friendly interface.
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold mb-3">Protected</h3>
            <p className="text-gray-600">
              Advanced security measures protect against unauthorized access.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 