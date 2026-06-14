import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Image
          src="/images/banner.png"
          alt="Fitness training hero banner"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div className="hero-content animate-fade-in-up">
        <h1 className="hero-title">
          SHAPEIT UP ! <br />
          GET FIT <br />
          DON&apos;T QUIT
        </h1>
        <p className="hero-subtitle">
          Personalized workout and nutrition plans tailored to your morphology
          and goals. Stop following generic programs and start seeing real
          results.
        </p>

        <div className="hero-buttons">
          <Link href="/features" className="btn-primary">
            Get Started Now
          </Link>
          <a href="#precision" className="btn-secondary">
            Download the App
          </a>
        </div>
      </div>
    </section>
  );
}
