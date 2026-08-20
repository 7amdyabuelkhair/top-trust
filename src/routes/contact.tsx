import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

import { ContactForm, PageHero } from "@/components/site-chrome";
import { useLang } from "@/lib/lang";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "تواصل معنا | Contact — Top Trust Metal Products" },
      {
        name: "description",
        content: "اطلب عرض سعر للمنتجات المعدنية من توب ترست — رد فني وسعري خلال 24 ساعة عمل.",
      },
      { property: "og:title", content: "تواصل معنا | Contact — Top Trust Metal Products" },
      {
        property: "og:description",
        content: "أرسل تفاصيل مشروعك وسيصلك عرض فني وسعري خلال 24 ساعة عمل.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { t } = useLang();
  return (
    <div>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} body={t.contact.body} />
      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <dl className="space-y-8 text-sm">
          <div className="flex items-start gap-4">
            <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
              <Phone className="size-4" />
            </span>
            <div>
              <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {t.contact.phoneLabel}
              </dt>
              <dd dir="ltr" className="mt-1 font-display text-lg font-bold rtl:text-end">
                <a
                  href={`tel:${t.contact.phone.replace(/\s/g, "")}`}
                  className="transition-colors hover:text-primary"
                >
                  {t.contact.phone}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
              <Mail className="size-4" />
            </span>
            <div>
              <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {t.contact.mailLabel}
              </dt>
              <dd dir="ltr" className="mt-1 space-y-1 font-display text-lg font-bold rtl:text-end">
                <a
                  href={`mailto:${t.contact.email}`}
                  className="block transition-colors hover:text-primary"
                >
                  {t.contact.email}
                </a>
                <a
                  href={`mailto:${t.contact.emailSecondary}`}
                  className="block transition-colors hover:text-primary"
                >
                  {t.contact.emailSecondary}
                </a>
              </dd>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <span className="bg-gradient-ember grid size-10 shrink-0 place-items-center rounded-sm text-primary-foreground">
              <MapPin className="size-4" />
            </span>
            <div>
              <dt className="text-xs font-bold tracking-widest text-muted-foreground uppercase">
                {t.contact.addressLabel}
              </dt>
              <dd className="mt-1 text-base">{t.contact.address}</dd>
            </div>
          </div>
        </dl>
        <ContactForm />
      </section>
    </div>
  );
}
