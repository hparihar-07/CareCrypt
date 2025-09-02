export default function About() {
  return (
    <div className="flex flex-col items-center min-h-screen px-6 py-20 bg-gray-900 text-gray-100">
      <div className="max-w-5xl text-center mb-20">
        <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 text-teal-400 animate-fadeInDown">
          About CareCrypt
        </h1>
        <p className="text-lg sm:text-xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
          CareCrypt focuses on{" "}
          <span className="text-amber-400 font-semibold">
            Secure Electronic Health Records (SEHR)
          </span>{" "}
          — a blockchain-powered platform designed to securely manage, store, and share patient health data with privacy and transparency. We believe in putting control back in the hands of patients.
        </p>
      </div>

      <div className="w-full max-w-6xl space-y-28">
        {/* --- The Problem Section --- */}
        <section className="text-center" aria-labelledby="problem-title">
          <h2
            id="problem-title"
            className="text-4xl font-bold mb-12 text-sky-400 tracking-wide animate-fadeInDown"
          >
            The Problem with Traditional EHRs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                icon: "🗃️",
                title: "Data Silos",
                description:
                  "Patient data is fragmented across different hospitals and clinics, making it difficult for providers to get a complete view of a patient's health history.",
              },
              {
                icon: "🚨",
                title: "Security Risks",
                description:
                  "Centralized databases are prime targets for cyberattacks, leading to millions of patient records being compromised every year.",
              },
              {
                icon: "🚫",
                title: "Lack of Control",
                description:
                  "Patients often have little to no control over who accesses their health information, or how it is used by third parties.",
              },
            ].map(({ icon, title, description }) => (
              <article
                key={title}
                className="p-8 rounded-xl bg-gray-800 shadow-xl border border-gray-700 hover:border-sky-400 transition cursor-default animate-fadeInUp"
                tabIndex={0}
                aria-label={title}
              >
                <div
                  className="text-5xl mb-5 select-none"
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="text-2xl font-semibold mb-3 text-red-400">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Our Solution Section --- */}
        <section className="text-center" aria-labelledby="solution-title">
          <h2
            id="solution-title"
            className="text-4xl font-bold mb-12 text-sky-400 tracking-wide animate-fadeInDown"
          >
            Our Blockchain-Based Solution
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: "🔒",
                title: "Unmatched Security",
                description:
                  "Your medical records are encrypted, tamper-proof, and stored on a decentralized ledger, making them virtually impervious to hacking.",
              },
              {
                icon: "🤝",
                title: "Complete Control",
                description:
                  "You have sole authority. Use your unique wallet key to grant or revoke access to doctors, labs, and other providers at any time.",
              },
              {
                icon: "⚡",
                title: "Seamless Access",
                description:
                  "Doctors can instantly view your records from anywhere in the world, ensuring you receive the best care without delays or paperwork.",
              },
              {
                icon: "🔎",
                title: "Full Transparency",
                description:
                  "Every access and modification to your record is logged on the blockchain, creating an immutable, transparent history you can verify.",
              },
            ].map(({ icon, title, description }) => (
              <article
                key={title}
                className="p-6 rounded-xl bg-gray-800 shadow-lg hover:shadow-sky-500 border border-gray-700 hover:border-sky-400 transition cursor-default animate-fadeInUp"
                tabIndex={0}
                aria-label={title}
              >
                <div
                  className="text-4xl mb-4 text-teal-300 select-none"
                  aria-hidden="true"
                >
                  {icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-400 leading-relaxed">{description}</p>
              </article>
            ))}
          </div>
        </section>

        {/* --- Our Mission Section --- */}
        <section className="text-center" aria-labelledby="mission-title">
          <h2
            id="mission-title"
            className="text-4xl font-bold mb-8 text-sky-400 animate-fadeInDown"
          >
            Our Mission
          </h2>
          <p className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed animate-fadeInUp">
            Our mission is to empower patients by giving them complete ownership and control over their health data, while providing healthcare professionals with a secure, efficient, and reliable platform for collaborative care.
          </p>
        </section>
      </div>
    </div>
  );
}
