import { Link } from 'react-router-dom';

const HealthShieldSVG = ({ className = "w-72 h-auto opacity-90 drop-shadow-lg" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
    aria-hidden="true"
  >
    {/* Shield outline */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
    />
    {/* Green checkmark inside */}
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12l2 2 4-4"
      stroke="#22c55e"
      strokeWidth={3}
    />
  </svg>
);

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-6 py-16 text-white bg-gradient-to-r from-gray-950 to-gray-800">
      <div className="text-center max-w-3xl animate-fadeInUp">
        <h1 className="text-5xl sm:text-7xl font-extrabold leading-tight mb-7 tracking-tight">
          Your <span className="text-teal-400 underline decoration-2 decoration-teal-400">Health</span>, Your{' '}
          <span className="text-sky-500 underline decoration-2 decoration-sky-500">Control</span>.
        </h1>

        <div className="relative inline-block py-5 px-10 mb-12 rounded-xl border border-indigo-500 shadow-2xl shadow-indigo-500/50 transform rotate-3 transition-transform duration-300 hover:rotate-0">
          <h2 className="text-7xl font-extrabold leading-tight tracking-tight whitespace-nowrap text-green-400 select-none">
            CareCrypt
          </h2>
        </div>

        <p className="text-xl sm:text-2xl mb-14 text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
          A secure, blockchain-based platform for managing your <span className='text-green-300 underline font-mono font-bold'>electronic health records</span> with unparalleled privacy and transparency.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Link
            to="/register"
            className="px-10 py-3 bg-green-400 text-white font-semibold rounded-lg shadow-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-400 transition-transform transform hover:scale-105 focus:scale-105"
            aria-label="Get Started with CareCrypt"
          >
            Get Started
          </Link>
          <Link
            to="/about"
            className="px-10 py-3 border-2 border-sky-500 text-sky-500 font-semibold rounded-lg hover:bg-sky-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-sky-400 transition-transform transform hover:scale-105 focus:scale-105"
            aria-label="Learn more about CareCrypt"
          >
            Learn More
          </Link>
        </div>
      </div>

      <div
        className="mt-28 animate-float text-white cursor-pointer transition-transform hover:scale-105 focus:scale-105"
        tabIndex={0}
        aria-label="Electronic Health Records Illustration"
      >
        <HealthShieldSVG />
      </div>

      <hr className="w-full h-px my-12 bg-gray-700 border-0" />

      {/* --- Why Choose Us Section --- */}
      <section className="mt-16 text-center max-w-4xl">
        <h2 className="text-4xl font-extrabold mb-10 text-white leading-tight tracking-tight">
          Why <span className="text-green-400 underline decoration-2">CareCrypt</span> Is Better
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              title: 'Unmatched Security',
              text: 'Your data is stored on a decentralized ledger, making it nearly impossible to tamper with or hack. Every transaction is transparent and immutable.',
            },
            {
              title: 'Complete Control',
              text: 'You, the patient, have sole authority over your records. You decide who can access your health information and for how long.',
            },
            {
              title: 'Seamless Portability',
              text: 'Forget paperwork. Your records are instantly accessible to any authorized provider, anywhere in the world, ensuring better, faster care.',
            },
          ].map(({ title, text }) => (
            <article
              key={title}
              className="p-6 rounded-xl bg-gray-800 shadow-xl border border-gray-700 hover:border-indigo-400 transition cursor-default focus-within:ring-2 focus-within:ring-indigo-400"
              tabIndex={0}
              aria-label={title}
            >
              <h3 className="text-2xl font-semibold mb-4 text-teal-300">{title}</h3>
              <p className="text-gray-400 leading-relaxed">{text}</p>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease forwards;
        }
      `}</style>
    </main>
  );
}
