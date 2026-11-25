// app/reports/lehigh-valley-email-safety/page.js
// Lehigh Valley Email Safety Report (data checked Nov 20, 2026).
// Source of every number: AIBusiness/marketing/lv-email-report/summary.md (check.py, METHOD.md).
// No business is named on this page, on purpose.
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { site } from "@/lib/siteConfig";

const CHECKED_ON = "November 20, 2026";
const TOTAL = 815;
const IMPERSONABLE = 656;

// [label, domains counted, impersonable]
const COUNTIES = [
  ["Lehigh County", 446, 354],
  ["Northampton County", 369, 302],
];

// Towns with 10 or more counted domains
const TOWNS = [
  ["Allentown", 270, 207],
  ["Bethlehem", 196, 161],
  ["Easton", 80, 66],
  ["Emmaus", 56, 49],
  ["Hellertown", 27, 22],
  ["Nazareth", 25, 21],
  ["Whitehall", 24, 19],
  ["Coopersburg", 17, 15],
  ["Center Valley", 16, 14],
  ["Bath", 12, 10],
  ["Macungie", 12, 7],
  ["Slatington", 11, 10],
  ["Northampton", 10, 6],
];

// Industries with 15 or more counted domains (smaller samples are left out)
const INDUSTRIES = [
  ["Home services and trades", 153, 112],
  ["Restaurants and food", 133, 124],
  ["Retail", 51, 41],
  ["Marketing and creative", 50, 42],
  ["Personal services and fitness", 48, 45],
  ["Insurance", 41, 30],
  ["Consulting and business services", 37, 30],
  ["Financial services", 37, 23],
  ["Real estate", 36, 35],
  ["Health practices", 35, 28],
  ["Manufacturing and industrial", 29, 21],
  ["Architecture and engineering", 25, 17],
  ["Legal", 25, 19],
  ["IT and telecom", 25, 15],
  ["Accounting and tax", 19, 16],
  ["Auto", 17, 16],
  ["Dental", 17, 12],
];

const pct = (part, whole) => Math.round((part / whole) * 100);

export async function generateMetadata() {
  const brand = site?.name || "Supreme IT Experts";
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const canonical = `${baseUrl}/reports/lehigh-valley-email-safety`;
  const title = "Lehigh Valley Email Safety Report: 8 in 10 Local Businesses Can Be Faked by Email";
  const description = `We checked the public email records of ${TOTAL} Lehigh Valley small-business websites. ${IMPERSONABLE} of them (${pct(
    IMPERSONABLE,
    TOTAL
  )}%) do not tell other mail servers to block email that pretends to be them. Results by town and industry, method included. No business named.`;
  const ogImage = `${baseUrl}/og-image.png?v=7`;
  return {
    metadataBase: new URL(baseUrl),
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      siteName: brand,
      images: [{ url: ogImage, width: 1200, height: 630, alt: `${brand} — Lehigh Valley Email Safety Report` }],
    },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
  };
}

function Bar({ value }) {
  return (
    <div className="h-2 w-full rounded-full bg-white/10" aria-hidden="true">
      <div className="h-2 rounded-full bg-gradient-to-r from-cyan-400 to-violet-400" style={{ width: `${value}%` }} />
    </div>
  );
}

function RowList({ rows }) {
  return (
    <ul className="mt-5 space-y-3">
      {rows.map(([label, n, imp]) => {
        const p = pct(imp, n);
        return (
          <li key={label} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <div className="flex items-baseline justify-between gap-4 text-sm">
              <span className="font-semibold text-slate-100">{label}</span>
              <span className="text-slate-300 whitespace-nowrap">
                <span className="font-bold text-cyan-300">{p}%</span> · {imp} of {n}
              </span>
            </div>
            <div className="mt-2">
              <Bar value={p} />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

const STATS = [
  { big: `${pct(IMPERSONABLE, TOTAL)}%`, small: `${IMPERSONABLE} of ${TOTAL} domains can be impersonated by email` },
  { big: "47%", small: "387 domains have no DMARC record at all" },
  { big: "30%", small: "247 only watch (p=none) and block nothing" },
  { big: "6%", small: "Only 47 fully block fakes (p=reject)" },
];

export default function LehighValleyEmailSafetyReport() {
  const baseUrl = (site?.url || "https://supremeitexperts.com").replace(/\/$/, "");
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Report",
    name: "Lehigh Valley Email Safety Report",
    url: `${baseUrl}/reports/lehigh-valley-email-safety`,
    datePublished: "2026-11-30",
    about: "Email impersonation protection (SPF and DMARC) of small businesses in Lehigh and Northampton County, Pennsylvania",
    author: { "@type": "Organization", name: site?.name || "Supreme IT Experts", url: baseUrl },
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <PageHero
        compact
        eyebrow={`Lehigh Valley Email Safety Report · data checked ${CHECKED_ON}`}
        title="8 in 10 Lehigh Valley businesses can be faked by email"
        sub={`We read the public email records of ${TOTAL} small-business websites in Lehigh and Northampton County. ${IMPERSONABLE} of them do not tell other mail servers to stop email that pretends to come from them. That is how fake invoices and “we changed our bank details” scams reach customers.`}
      />

      <section className="max-w-6xl mx-auto px-4 pb-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.small} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-3xl font-extrabold text-cyan-300">{s.big}</div>
              <p className="mt-1 text-sm text-slate-300">{s.small}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-sm text-slate-400">
          No business is named in this report, and none ever will be. We only read records that anyone can look up; we
          sent nothing to any of these domains.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">What this means in plain words</h2>
        <div className="mt-4 space-y-3 text-slate-300 max-w-3xl">
          <p>
            Every business domain can publish a short public instruction called DMARC. It tells Gmail, Outlook and every
            other mail server what to do with an email that claims to be from that business but was not sent by it. With
            “reject” the fake is blocked. With no record, a broken record or “p=none”, nothing tells the receiving server to stop it, so it is often delivered.
          </p>
          <p>
            So for {pct(IMPERSONABLE, TOTAL)}% of the local businesses we checked, a scammer can put the business’s own
            address in the From line of a fake invoice, and their customers’ mail servers have no instruction to stop it.
            It does not mean any of these businesses has been hacked. It means the door is unlocked.
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-6 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold">By county</h2>
          <RowList rows={COUNTIES} />
          <h2 className="mt-10 text-xl md:text-2xl font-extrabold">By town</h2>
          <p className="mt-1 text-sm text-slate-400">Towns with 10 or more domains in the sample.</p>
          <RowList rows={TOWNS} />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-extrabold">By industry</h2>
          <p className="mt-1 text-sm text-slate-400">Industries with 15 or more domains in the sample.</p>
          <RowList rows={INDUSTRIES} />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">Check your own business in 10 seconds</h2>
        <p className="mt-3 text-slate-300 max-w-3xl">
          Our free checker reads the same records the same way this report did. Type your website address; no sign-up.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href="/tools/email-security-check?source=lv-report"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-cyan-300/30 text-cyan-300 bg-cyan-400/10 hover:bg-cyan-400/20 transition"
          >
            Check my domain →
          </Link>
          <Link
            href="/lp/allentown?source=lv-report"
            className="inline-flex items-center gap-2 text-sm rounded-lg px-4 py-2.5 border border-white/10 bg-white/5 hover:border-cyan-300/30 hover:bg-white/10 transition"
          >
            Free IT + AI Checkup for Lehigh Valley businesses
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-2xl md:text-3xl font-extrabold">How we did it</h2>
        <ul className="mt-4 space-y-2 text-sm text-slate-300 max-w-3xl list-disc pl-5">
          <li>
            The sample: 830 small-business websites listed in the Greater Lehigh Valley Chamber online directory and on
            Visit Historic Bethlehem merchant pages, plus businesses we already knew in the two counties. We left out
            national chains, franchises, car dealerships, hospitals and health systems, schools, government and large
            employers. It is a sample of chamber-listed businesses, not a census.
          </li>
          <li>
            {TOTAL} domains were counted. 14 no longer exist and 1 could not be looked up, so those 15 are left out.
          </li>
          <li>
            For each domain we read three public records on {CHECKED_ON}: MX (who handles its email), SPF (who may send
            as it) and DMARC (what to do with fakes), asking two public resolvers (1.1.1.1 and 8.8.8.8). The two agreed
            on every domain.
          </li>
          <li>
            “Can be impersonated” means the DMARC policy is missing, broken, set to “none”, or set to “quarantine” for
            less than all mail. “Blocks fakes” means “reject”, or “quarantine” for all mail.
          </li>
          <li>
            Other findings: 176 domains (22%) have no SPF record and 31 (4%) have a broken one. Mail providers: Microsoft
            33%, Google 26%, GoDaddy 2%, others 28%, no mail server 11%.
          </li>
          <li>What we cannot see from outside: DKIM signing keys, spam filters, logins and mailbox settings.</li>
        </ul>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-6 pb-20">
        <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-7 md:p-10">
          <h2 className="text-2xl md:text-3xl font-extrabold">For reporters, chambers and associations</h2>
          <p className="mt-3 text-slate-300 max-w-3xl">
            You are welcome to quote these numbers with a link to this page. For the full method, or a short interview
            with Muhammad Barkat about what local businesses can do about it, write to{" "}
            <a className="text-cyan-300 underline" href="mailto:support@supremeitexperts.com?subject=Lehigh%20Valley%20Email%20Safety%20Report">
              support@supremeitexperts.com
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
