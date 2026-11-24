import type { Metadata } from "next";
import { MessageCircle, Heart, Award, Users } from "lucide-react";
import { siteConfig } from "@/config/site";
import { strings } from "@/lib/strings";
import { getWhatsAppBaseUrl } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: strings.about.title,
  description: strings.about.storyText,
};

const values = [
  { icon: Award, title: "Qualité", desc: "Chaque produit est contrôlé et certifié." },
  { icon: Heart, title: "Passion", desc: "Nous aimons ce que nous faisons." },
  { icon: Users, title: "Communauté", desc: "Nous soutenons les artisans locaux." },
  { icon: MessageCircle, title: "Proximité", desc: "Toujours à votre écoute." },
];

export default function AProposPage() {
  const whatsappUrl = getWhatsAppBaseUrl();

  return (
    <div>
      {/* Hero */}
      <div className="bg-gradient-to-br from-primary to-primary-dark text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-4">
            {strings.about.title}
          </h1>
          <p className="text-white/80 text-lg max-w-2xl mx-auto">
            {strings.about.subtitle}
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Story */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
            {strings.about.storyTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            {strings.about.storyText}
          </p>
        </section>

        {/* Mission */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-5">
            {strings.about.missionTitle}
          </h2>
          <p className="text-gray-600 leading-relaxed text-base sm:text-lg">
            {strings.about.missionText}
          </p>
        </section>

        {/* Values */}
        <section>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm"
                >
                  <div className="shrink-0 w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Icon size={22} className="text-primary" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                    <p className="text-sm text-gray-500">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="bg-primary text-white rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold mb-3">{strings.about.ctaTitle}</h2>
          <p className="text-white/80 mb-6">{strings.about.ctaSubtitle}</p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-primary font-bold px-7 py-3.5 rounded-xl hover:bg-pink-50 transition-colors shadow-md"
          >
            <MessageCircle size={18} aria-hidden="true" />
            {strings.about.ctaButton}
          </a>
        </section>
      </div>
    </div>
  );
}
