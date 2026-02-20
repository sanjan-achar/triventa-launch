import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('theme') === 'dark';
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch {}
  }, [dark]);
  return (
    <header className="bg-[#F4EDE6]/95 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-primary flex items-center justify-center text-white font-semibold">TE</div>
          <div>
            <h1 className="text-[#2B2B2B] font-semibold text-lg">Triventa Exports Pvt. Ltd.</h1>
            <p className="text-sm text-gray-600">Karnataka, India</p>
          </div>
        </a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#2B2B2B]">
          <a href="#about" className="hover:text-primary">About</a>
          <a href="#products" className="hover:text-primary">Products</a>
          <a href="#quality" className="hover:text-primary">Quality</a>
          <a href="#packaging" className="hover:text-primary">Packaging</a>
          <a href="#contact" className="hover:text-primary">Contact</a>
          <a href="#contact" className="ml-4 inline-block bg-[#6B1F2A] text-white px-4 py-2 rounded-md">Request Specifications</a>
          <button onClick={() => setDark(!dark)} aria-label="toggle theme" className="ml-3 p-2 rounded-md border border-gray-200 bg-white">
            {dark ? (
              <svg className="w-5 h-5 text-[#6B1F2A]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            ) : (
              <svg className="w-5 h-5 text-[#2B2B2B]" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M12 3v2M12 19v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            )}
          </button>
        </nav>

          <div className="md:hidden">
          <button aria-label="menu" onClick={() => setOpen(!open)} className="p-2 inline-flex items-center justify-center rounded-md border border-gray-200">
            <svg className="w-5 h-5 text-[#2B2B2B]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-200">
            <div className="px-6 py-4 flex flex-col gap-4">
            <a href="#about" className="text-[#2B2B2B]">About</a>
            <a href="#products" className="text-[#2B2B2B]">Products</a>
            <a href="#quality" className="text-[#2B2B2B]">Quality</a>
            <a href="#packaging" className="text-[#2B2B2B]">Packaging</a>
            <a href="#contact" className="text-[#2B2B2B]">Contact</a>
            <div className="flex gap-3">
              <a href="#contact" className="inline-block bg-[#6B1F2A] text-white px-4 py-2 rounded-md">Request Specifications</a>
              <button onClick={() => setDark(!dark)} className="px-3 py-2 border rounded-md">{dark ? 'Light' : 'Dark'}</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

type ProductCardProps = {
  title: string;
  subtitle: string;
  details: ReactNode;
};

const ProductCard = ({ title, subtitle, details }: ProductCardProps) => (
  <article className="bg-white/90 border border-gray-100 rounded-lg p-6 shadow-sm">
    <div className="h-40 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">Image placeholder</div>
    <h3 className="text-lg font-semibold text-[#2B2B2B] mb-1">{title}</h3>
    <p className="text-sm text-gray-600 mb-3">{subtitle}</p>
    <div className="text-sm text-[#2B2B2B]">{details}</div>
  </article>
);

const LandingPage = () => {
  return (
    <div className="min-h-screen text-[#2B2B2B] bg-[#F4EDE6]">
      <Nav />

      <main id="home">
        {/* Hero */}
        <section className="max-w-7xl mx-auto px-6 py-20 grid gap-12 md:grid-cols-2 items-center">
          <div>
            <p className="text-sm uppercase tracking-widest text-gray-600">Export • Sourcing • Quality</p>
            <h2 className="mt-4 text-3xl md:text-4xl font-extrabold leading-tight text-[#2B2B2B]">Premium Coffee Exports from Karnataka, India</h2>
            <p className="mt-4 text-lg text-gray-700">Green & Roasted Arabica and Robusta Beans for Global Buyers</p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a href="#products" className="inline-flex items-center justify-center px-5 py-3 bg-[#6B1F2A] text-white rounded-md shadow-sm">Request Specifications</a>
              <a href="#contact" className="inline-flex items-center justify-center px-5 py-3 border border-gray-300 rounded-md text-[#2B2B2B]">Contact for Samples</a>
            </div>

            <ul className="mt-8 text-sm text-gray-600 space-y-2">
              <li>• FOB | CIF | CFR</li>
              <li>• Export-grade packaging & logistics</li>
              <li>• Certifications available on request</li>
            </ul>
          </div>

          <div className="order-first md:order-last flex items-center justify-center">
            <div className="w-full max-w-md rounded-lg overflow-hidden shadow-lg bg-white">
              <div className="h-64 bg-gray-100 flex items-center justify-center text-gray-400">Hero image placeholder</div>
            </div>
          </div>
        </section>

        {/* About */}
        <section id="about" className="relative border-t border-gray-100 py-20 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1493925410384-84f842e616fb?q=80&w=1600&auto=format&fit=crop"
            alt="Coffee beans and cultivation in Karnataka"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E293B]/55 via-[#1E293B]/42 to-[#1E293B]/55" />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#F4EDE6] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#F4EDE6] to-transparent" />

          <div className="relative max-w-7xl mx-auto px-6">
            <h3 className="text-2xl font-semibold text-white">About Triventa Exports</h3>
            <p className="mt-4 max-w-3xl text-white/90">
              Triventa Exports Pvt. Ltd. is a structured coffee exporter based in Karnataka, India. We source directly from trusted farms,
              apply rigorous quality control at origin, and provide reliable export services tailored for B2B international buyers.
            </p>
          </div>
        </section>

        {/* Products */}
        <section id="products" className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xl font-semibold">Products</h3>
            <p className="text-gray-600 mt-2">Our product range includes carefully graded green beans and professionally roasted lots for international markets.</p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <ProductCard
                title="Green Coffee Beans — HS Code 090111"
                subtitle="Arabica & Robusta — Screen sizes 16 / 17 / 18"
                details={<>
                  <p><strong>Processing:</strong> Washed | Natural</p>
                  <p><strong>Moisture:</strong> 10–12.5%</p>
                  <p><strong>Grades:</strong> A | AA | AAA | B</p>
                  <p><strong>Packaging:</strong> 60 kg Jute Bags</p>
                </>}
              />

              <ProductCard
                title="Roasted Coffee Beans — HS Code 090121"
                subtitle="Medium | Dark | Espresso — Whole Bean"
                details={<>
                  <p><strong>Shelf Life:</strong> 9–12 months (vacuum packed)</p>
                  <p><strong>Packaging:</strong> Vacuum packs | 60 kg Jute Bags</p>
                  <p><strong>Note:</strong> Not decaffeinated</p>
                </>}
              />
            </div>
          </div>
        </section>

        {/* Quality & Sourcing */}
        <section id="quality" className="bg-white/50 py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xl font-semibold">Quality & Sourcing</h3>
            <ul className="mt-4 space-y-2 text-gray-700">
              <li>• Quality assessed at green stage with controlled grading and moisture checks</li>
              <li>• Batch inspection and traceability maintained for every shipment</li>
              <li>• Certifications and test reports available on request</li>
            </ul>
          </div>
        </section>

        {/* Packaging & Logistics */}
        <section id="packaging" className="py-16">
          <div className="max-w-7xl mx-auto px-6">
            <h3 className="text-xl font-semibold">Packaging & Logistics</h3>
            <p className="mt-4 text-gray-700 max-w-3xl">We offer export-grade packaging, customized logistics solutions, and flexible incoterms including FOB, CIF and CFR to meet buyers' requirements.</p>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="bg-white/50 py-16 border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-6 grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="text-xl font-semibold">Contact</h3>
              <p className="mt-4 text-gray-700">Email: <a href="mailto:info@triventaexports.com" className="text-[#6B1F2A]">info@triventaexports.com</a></p>
              <p className="mt-1 text-gray-700">Phone: <a href="tel:+919148025018" className="text-[#6B1F2A]">+91 91480 25018</a></p>
              <p className="mt-1 text-gray-700">Website: <a href="https://www.triventaexports.com" className="text-[#6B1F2A]">www.triventaexports.com</a></p>
            </div>

            <form className="space-y-4 bg-white p-6 rounded-md shadow-sm">
              <div>
                <label className="block text-sm text-gray-700">Name</label>
                <input className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2" placeholder="Your name" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Email</label>
                <input className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2" placeholder="you@company.com" />
              </div>
              <div>
                <label className="block text-sm text-gray-700">Message</label>
                <textarea className="mt-1 w-full border border-gray-200 rounded-md px-3 py-2" rows={4} placeholder="Brief requirements or sample request"></textarea>
              </div>
              <div>
                <button type="submit" className="bg-[#6B1F2A] text-white px-4 py-2 rounded-md">Send Message</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="border-t border-gray-100 mt-12">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start gap-6">
          <div>
            <h4 className="font-semibold">Triventa Exports Pvt. Ltd.</h4>
            <p className="mt-2 text-gray-600">Premium coffee exports — sourcing, grading and shipping from Karnataka, India.</p>
          </div>

          <div className="text-sm text-gray-600">
            <p>Info: info@triventaexports.com</p>
            <p className="mt-1">Phone: +91 91480 25018</p>
            <p className="mt-1">© {new Date().getFullYear()} Triventa Exports Pvt. Ltd.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
