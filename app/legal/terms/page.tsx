/* eslint-disable react/no-unescaped-entities */
import React from "react";

export const metadata = { title: "Terms of Use — Bean You®" };

export default function TermsPage() {
  return (
    <main
      id="top"
      className="relative mx-auto max-w-5xl px-4 sm:px-6 py-12 bg-gray-50 text-gray-900"
    >
      {/* Header */}
      <header className="mb-10">
        <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[11px] tracking-wide text-gray-600 shadow-sm">
          ASILIF T&C • Updated 28 July 2025
        </div>
        <h1 className="mt-3 text-3xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
          Terms of Use
        </h1>
        <p className="mt-3 max-w-2xl text-gray-700 leading-relaxed">
          Please read these Terms and Conditions (“T&Cs”) carefully. They set out
          the basis on which you may make a Contribution to Asili Coffee Group
          Foundation (“ASILIF”) and receive BEANYOU and/or intangible Real World
          Assets (iRWA).
        </p>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[260px,1fr] gap-6 lg:gap-10">
        {/* TOC */}
        <aside className="lg:sticky lg:top-6 h-fit">
          <nav className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold tracking-wide text-orange-600">
              Contents
            </h2>
            <ol className="space-y-2 text-[13px] leading-6 text-gray-700">
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#intro"
                >
                  1. Introduction & Definitions
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#risks"
                >
                  2. Risks of Making a Contribution
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#audit"
                >
                  3. Audit of the BEANYOU Token Code
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#conditions"
                >
                  4. Conditions for Making a Contribution
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#allocation"
                >
                  5. Procedure for Allocating BEANYOU / iRWA
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#nonaccept"
                >
                  6. Non-acceptance of a Contribution
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#execution"
                >
                  7. ASILIF Project Execution
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#communication"
                >
                  8. Communication
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#tax"
                >
                  9. Taxation & Other Costs
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#liability"
                >
                  10. Exclusion from Liability
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#personal"
                >
                  11. Personal Information
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#misc"
                >
                  12. Miscellaneous
                </a>
              </li>
              <li>
                <a
                  className="hover:text-orange-600 underline decoration-gray-300 underline-offset-4"
                  href="#further"
                >
                  Further Information
                </a>
              </li>
            </ol>
          </nav>
        </aside>

        {/* Body */}
        <article className="space-y-8 sm:space-y-10 text-gray-900">
          {/* 1. Introduction */}
          <section
            id="intro"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">1. Introduction</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              These Terms and Conditions (the “T&Cs”) govern the basis on which
              you (the “Contributor”) can make a contribution (a “Contribution”)
              to Asili Coffee Group Foundation (“we”, “ASILIF”), and the
              subsequent allocation of BEANYOU tokens and/or intangible Real
              World Assets (iRWA).
            </p>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-orange-600">
                Key Definitions
              </h3>
              <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-4 text-[14px] leading-6">
                <div>
                  <dt className="font-semibold text-gray-900">
                    Collaborating Entity
                  </dt>
                  <dd className="text-gray-700">
                    Entities contracted with ASILIF to provide services/points
                    (including farms). Where none exists, contributions are fully
                    held by ASILIF.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">Fiat Money</dt>
                  <dd className="text-gray-700">
                    Government-issued legal tender.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Bean You Points
                  </dt>
                  <dd className="text-gray-700">
                    A non-financial token (derivative of Microshare/MCR)
                    representing non-financial attributes (e.g., ESG actions).
                    Optional in BEANYOU/iRWA transactions.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">BEANYOU</dt>
                  <dd className="text-gray-700">
                    A transferable blockchain-based token (on Solana; derived
                    conceptually from Seratio). Does not represent equity,
                    security, or ownership.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Bean You Platform
                  </dt>
                  <dd className="text-gray-700">
                    Planned platform funded by contributions, capable of
                    recording non-financial attributes within transactions.
                  </dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-900">
                    Bean You Wallet
                  </dt>
                  <dd className="text-gray-700">
                    The initial repository for BEANYOU and Bean You Points.
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-gray-900">
                    Intangible Real World Assets (iRWA)
                  </dt>
                  <dd className="text-gray-700">
                    Tokenization of intangible rights (e.g., ESG rights) linked
                    to tangible assets. Not the tokenization of tangible assets.
                  </dd>
                </div>
                <div className="sm:col-span-2">
                  <dt className="font-semibold text-gray-900">Social Impact</dt>
                  <dd className="text-gray-700">
                    As measured by the Social Earnings Ratio®. BEANYOU value
                    relates to impact received by participating farms in iRWA.
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          {/* 2. Risks */}
          <section
            id="risks"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              2. Risks of Making a Contribution
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Contributing to a new fundraising model carries inherent risks
              which you should understand before proceeding.
            </p>
            <ol className="mt-4 list-decimal pl-5 space-y-3 text-gray-700 leading-relaxed">
              <li>
                <span className="font-semibold text-gray-900">
                  Software Weaknesses:
                </span>{" "}
                Early-stage software may contain vulnerabilities (“Glitches”),
                and the process for receipt/use/ownership may not be error-free.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Regulatory Risk:
                </span>{" "}
                Regulatory changes could affect BEANYOU, Solana/Ethereum
                networks, or require substantial modifications, including
                possible termination.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Abandonment/Lack of Success:
                </span>{" "}
                The platform or allocation may be paused or discontinued (e.g.,
                due to low interest, funding, or competing projects).
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Loss of Private Key:
                </span>{" "}
                If your key/seed is lost or stolen, associated BEANYOU is
                permanently unrecoverable.
              </li>
              <li>
                <span className="font-semibold text-gray-900">Theft/Hacking:</span>{" "}
                Attacks may lead to loss of tokens or funds and impede
                development.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Blockchain Attacks:
                </span>{" "}
                Double-spend, majority power, selfish-mining, and race-condition
                risks exist.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  Liquidity Risk:
                </span>{" "}
                Market liquidity is not guaranteed; value may be volatile or fall
                to zero.
              </li>
              <li>
                <span className="font-semibold text-gray-900">
                  General Economic Risks:
                </span>{" "}
                Values can rise or fall with market conditions outside our
                control.
              </li>
            </ol>
            <p className="mt-4 text-gray-600">
              Provided we act in good faith, we do not accept responsibility for
              these risks to the maximum extent permitted by law.
            </p>
          </section>

          {/* 3. Audit */}
          <section
            id="audit"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              3. Audit of the BEANYOU Token Code
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Experts have audited BEANYOU/iRWA code on a reasonable-efforts
              basis. While this raises security and accuracy, it is not a
              warranty that the code is free of weaknesses or bugs, and losses
              could still occur.
            </p>
          </section>

          {/* 4. Conditions */}
          <section
            id="conditions"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              4. Conditions for Making a Contribution
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              You may not contribute if you are a US person (citizen or
              permanent resident). By contributing or
              receiving/using/holding BEANYOU, you represent that:
            </p>
            <ol className="mt-4 list-decimal pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                We have not provided advice on suitability of BEANYOU/iRWA as an
                investment.
              </li>
              <li>
                You understand crypto/token functionality, storage, and
                transmission.
              </li>
              <li>
                You are legally permitted to receive/hold/use BEANYOU in
                relevant jurisdictions and to receive software.
              </li>
              <li>
                You will provide accurate KYC/AML or other documentation as
                required and keep it updated.
              </li>
              <li>
                You take sole responsibility for risks, and that contributions
                are not regulated investments in your jurisdiction.
              </li>
              <li>You will not use BEANYOU/iRWA for illegal purposes.</li>
              <li>
                You waive any right to class action/class-wide arbitration
                related to contributions or BEANYOU/iRWA.
              </li>
              <li>
                Your contribution/allocation does not grant equity, shares, or
                ownership in any entity.
              </li>
              <li>
                We provide no warranties (including title/merchantability/fitness)
                and provide BEANYOU/iRWA “as is” and “under development”.
              </li>
              <li>
                You bear responsibility for any tax implications related to
                contributions or BEANYOU/iRWA.
              </li>
            </ol>
          </section>

          {/* 5. Allocation */}
          <section
            id="allocation"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              5. Procedure for Allocating BEANYOU / iRWA
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                One BEANYOU allocated per US $1.00 contributed (discounts at
                ASILIF/Collaborating Entity discretion). All contributions are
                non-refundable.
              </li>
              <li>
                Contribution Period: 01 September 202? 00:01 (UK) — 31 August
                2026 23:59 (UK). We may pause for security reasons if needed.
              </li>
              <li>Accepted: BTC, ETH, ETC, Fiat Money, MPesa.</li>
              <li>Minimum contribution: US $5. No cap on total contributions.</li>
              <li>
                Official site: www.beanyou.com; use of exchanges/intermediaries
                is at your own risk.
              </li>
              <li>
                You must supply information necessary to set up a compatible
                Wallet for delivery.
              </li>
              <li>
                Allocations are recorded/confirmed by email; non-USD
                contributions are converted using historical rates from leading
                providers.
              </li>
              <li>
                Target: allocate BEANYOU within 52 weeks of contribution
                (subject to Section 2 risks).
              </li>
              <li>
                Bean You Points may be issued; target dates for Points and
                Platform Launch: 31 August 2026.
              </li>
            </ul>
          </section>

          {/* 6. Non-acceptance */}
          <section
            id="nonaccept"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              6. Non-acceptance of a Contribution
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              We may refuse contributions where acceptance would breach
              legal/regulatory requirements, be impracticable or against your
              interests, or risk financial loss. We will endeavour to inform you
              promptly.
            </p>
          </section>

          {/* 7. Execution */}
          <section
            id="execution"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              7. ASILIF Project Execution
            </h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                Use of contributions is at ASILIF’s sole discretion to
                develop/execute the project and platform.
              </li>
              <li>Contributors gain no governance rights.</li>
              <li>
                Funds shared with a Collaborating Entity may be used at that
                entity’s sole discretion.
              </li>
            </ul>
          </section>

          {/* 8. Communication */}
          <section
            id="communication"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">8. Communication</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Communications are in English and may be by email (subject to
              inherent delivery/security risks). We may monitor/record
              conversations as required by law and retain records as required.
            </p>
          </section>

          {/* 9. Tax */}
          <section
            id="tax"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              9. Taxation and Other Costs
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              We do not provide legal, tax, or accounting advice. You are solely
              responsible for any tax implications arising from contributions,
              allocations, or transactions related to BEANYOU/iRWA.
            </p>
          </section>

          {/* 10. Liability */}
          <section
            id="liability"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              10. Exclusion from Liability
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              Neither ASILIF nor associated developers/auditors/contractors/
              founders accept liability for use or inability to use BEANYOU or
              compatible software/wallets, to the maximum extent permitted by
              law and where acting in good faith. This does not limit liability
              for fraud or death/personal injury.
            </p>
          </section>

          {/* 11. Personal Information */}
          <section
            id="personal"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">
              11. Personal Information
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              ASILIF is the data controller of personal information processed
              under these T&Cs. We may share data with service providers,
              advisors, group companies, regulators, law enforcement, tax
              authorities, courts, and in restructuring scenarios, including
              outside the EEA with appropriate safeguards.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                Subject Access Requests (SAR) may be made; a nominal statutory
                fee may apply.
              </li>
              <li>
                Marketing communications may be sent (subject to consent); you
                can opt out.
              </li>
            </ul>
          </section>

          {/* 12. Misc */}
          <section
            id="misc"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">12. Miscellaneous</h2>
            <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700 leading-relaxed">
              <li>
                Governing law: England and Wales. Courts of England and Wales
                have exclusive jurisdiction.
              </li>
              <li>
                If a provision is invalid/unenforceable, the remainder continues
                in force.
              </li>
              <li>
                Contributions, BEANYOU creation, and iRWA allocation are
                considered executed in the UK.
              </li>
              <li>
                These T&Cs supersede public statements about BEANYOU/Bean You
                Platform.
              </li>
              <li>No modifications unless expressly stated in writing by us.</li>
              <li>
                This document is informational and not a prospectus or regulated
                securities offering.
              </li>
              <li>
                ASILIF is not FCA-authorised; contributions/BEANYOU are not
                FCA-regulated products or services.
              </li>
              <li>
                No partnership/joint venture is created by contributing or
                holding BEANYOU.
              </li>
              <li>
                You may not act for another person (e.g., as agent/trustee) when
                contributing.
              </li>
              <li>
                No assignment/transfer of your rights/responsibilities without
                our consent.
              </li>
              <li>
                No third-party rights under the Contracts (Rights of Third
                Parties) Act 1999.
              </li>
            </ul>
          </section>

          {/* Further info */}
          <section
            id="further"
            className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm"
          >
            <h2 className="text-2xl sm:text-3xl font-bold">Further Information</h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              For questions or complaints regarding your Contribution, BEANYOU,
              or iRWA, contact:
            </p>
            <div className="mt-3 text-sm text-gray-800">
              <div>
                <span className="text-gray-600">Email:</span>{" "}
                dataprotection@cceg.org.uk
              </div>
              <div className="mt-1">
                <span className="text-gray-600">Address:</span> Data Protection
                Team Bureau, Trinity Chapel, Wesley Place, Nixonsville, CF48
                4Rs, UK (registered office)
              </div>
            </div>
          </section>

          {/* Back to top */}
          <div className="flex justify-end">
            <a
              href="#top"
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-800 shadow-sm hover:bg-gray-50"
            >
              ↑ Back to top
            </a>
          </div>
        </article>
      </div>

      {/* soft brand accents behind content */}
      <div
        className="pointer-events-none absolute -z-10 inset-0 opacity-[0.06]"
        aria-hidden
      >
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl bg-orange-400" />
        <div className="absolute bottom-0 -right-24 h-72 w-72 rounded-full blur-3xl bg-amber-300" />
      </div>
    </main>
  );
}
