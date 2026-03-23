import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col items-center justify-center p-8">
      <div className="text-center max-w-2xl mx-auto w-full">
        {/* Logo / Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-indigo-600 mb-8 shadow-lg shadow-indigo-500/40">
          <svg
            className="w-10 h-10 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold text-white mb-4 tracking-tight">
          SecureAuth
        </h1>
        <p className="text-lg text-slate-400 leading-relaxed mb-10">
          A production-ready JWT authentication system built with Next.js 15,
          MongoDB, and TypeScript. Secure by default with httpOnly cookie sessions.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/login"
            className="px-8 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:-translate-y-0.5"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/20 transition-all duration-200 hover:-translate-y-0.5 backdrop-blur-sm"
          >
            Create Account
          </Link>
        </div>

        {/* Feature Cards */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-5 text-left">
          {[
            {
              icon: "🔐",
              title: "JWT Tokens",
              desc: "Secure token-based auth stored in httpOnly cookies protecting against XSS.",
            },
            {
              icon: "🗄️",
              title: "MongoDB",
              desc: "Persistent user storage powered by Mongoose ODM with schema validation.",
            },
            {
              icon: "⚡",
              title: "Next.js 15",
              desc: "App Router with server components, middleware-based route guards.",
            },
          ].map((feature) => (
            <div
              key={feature.title}
              className="p-5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <div className="text-2xl mb-2">{feature.icon}</div>
              <h3 className="text-white font-semibold mb-1">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
