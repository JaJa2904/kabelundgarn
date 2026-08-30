export type Locale = "de" | "en";

export const defaultLocale: Locale = "de";
export const locales: Locale[] = ["de", "en"];

export const translations = {
  de: {
    nav: {
      home: "Start",
      services: "Leistungen",
      process: "Ablauf",
      gallerie: "Galerie",
      faq: "FAQ",
      contact: "Kontakt",
      itServices: "IT-Services",
    },
    hero: {
      headline: "Präzision, die man sieht.",
      subheadline: "Aus deiner Idee wird ein hochwertiges Ergebnis.",
      description:
        "Als lokale Stickerei stehen wir für Zuverlässigkeit, Genauigkeit und persönliche Beratung, damit aus deiner Idee ein hochwertiges Ergebnis wird.",
    },
    contact: {
      title: "Kontakt",
      email: "E-Mail",
      phone: "Telefon / WhatsApp",
      instagram: "Instagram",
      emailLabel: "E-Mail",
      phoneLabel: "Anrufen",
      whatsappLabel: "WhatsApp",
      instagramLabel: "Instagram",
    },
    services: {
      title: "Leistungen",
      subtitle: "Stickerei, Siebdruck und mehr, aus einer Hand in Augsburg.",
      embroidery: {
        title: "Stickerei-Service",
        description: "Individuelle Stickaufträge für Privatkunden, von Logo bis Text.",
        imageAlt:
          "Nahaufnahme: Stickmaschine bestickt eine hellblaue Cap mit weißem Schriftzug.",
      },
      b2b: {
        title: "B2B Stickerei",
        description: "Großaufträge für Unternehmen, Vereine und Events.",
        imageAlt:
          "Industrielle Mehrkopf-Stickmaschine mit bunten Garnen und grünen Stickrahmen.",
      },
      screenprint: {
        title: "Siebdruck",
        description: "Hochwertiger Siebdruck auf Textilien und mehr.",
        imageAlt:
          "Hände führen einen Rakel über ein Sieb beim manuellen Siebdruck.",
      },
    },
    process: {
      title: "So arbeiten wir",
      step1: {
        title: "Idee schicken",
        description:
          "Schick uns deine Idee, dein Logo oder deine Wunschvorstellung über das Kontaktformular oder per E-Mail.",
      },
      step2: {
        title: "Angebot & Beratung",
        description:
          "Wir prüfen dein Design, beraten dich zur Umsetzung und senden dir ein individuelles Angebot.",
      },
      step3: {
        title: "Fertigstellung",
        description:
          "Nach deiner Freigabe starten wir mit der Stickerei. Du erhältst dein fertiges Produkt schnell und zuverlässig.",
      },
    },
    pricing: {
      title: "Individuelle Preisgestaltung",
      intro: "Jede Stickerei ist so individuell wie dein Motiv. Der Preis richtet sich nach:",
      item1: "Motivgröße und Stichanzahl",
      item2: "Anzahl der Teile",
      item3: "Textilart",
      item4: "Erstellung der Stickdatei (Digitalisierung deines Motivs)",
      transparency: "Digitalisierung und Produktion werden transparent ausgewiesen.",
      volume: "Für größere Stückzahlen bieten wir attraktive Staffelpreise an.",
      cta: "Jetzt unverbindlich anfragen",
    },
    form: {
      title: "Anfrage senden",
      name: "Name",
      namePlaceholder: "Dein Name",
      email: "E-Mail",
      emailPlaceholder: "deine@email.de",
      message: "Nachricht",
      messagePlaceholder: "Beschreibe dein Projekt, Logo-Anhänge erwähnen …",
      quantity: "Menge (optional)",
      quantityPlaceholder: "z. B. 10 Stück",
      deadline: "Wunschtermin (optional)",
      deadlinePlaceholder: "z. B. in 2 Wochen",
      attachmentLabel: "Anhang (optional)",
      chooseFile: "Datei auswählen",
      noFileChosen: "Keine Datei ausgewählt",
      attachmentUploading: "Wird hochgeladen …",
      attachmentError: "Fehler beim Hochladen. Bitte erneut versuchen.",
      attachmentSizeError: "Datei maximal 10 MB.",
      submit: "Anfrage absenden",
      sending: "Wird gesendet …",
      success: "Vielen Dank! Deine Nachricht wurde gesendet.",
      error: "Beim Senden ist ein Fehler aufgetreten. Bitte versuche es später erneut.",
    },
    footer: {
      tagline: "Stickerei & Textilveredelung in Augsburg",
      legal: "Impressum",
      privacy: "Datenschutz",
      itServices: "IT-Services",
    },
    itServices: {
      title: "IT-Services",
      intro:
        "Neben Stickerei und Textilveredelung bieten wir IT-Dienstleistungen an: Reparaturen, Datenrettung und Microsoldering.",
      repairs: "Reparaturen",
      repairsDesc: "Hardware- und Software-Reparaturen.",
      dataRecovery: "Datenrettung",
      dataRecoveryDesc: "Wiederherstellung von Daten von defekten Datenträgern.",
      microsoldering: "Microsoldering",
      microsolderingDesc: "Feine Lötarbeiten für Elektronik und Geräte.",
    },
    seo: {
      homeTitle: "Stickerei Augsburg | Textilveredelung & B2B Stickerei – Kabel und Garn",
      homeDescription:
        "Lokale Stickerei in Augsburg: Stickerei-Service, B2B Stickerei, Siebdruck. Zuverlässig, präzise, mit persönlicher Beratung.",
      gallerieTitle: "Galerie | Kabel und Garn",
      gallerieDescription:
        "Einblicke in unsere bisherigen Arbeiten: Stickerei, Siebdruck und Textilveredelung aus Augsburg.",
      faqTitle: "FAQ – Stickerei Augsburg | kabelundgarn",
      faqDescription:
        "Antworten auf häufige Fragen zu Stickerei, Digitalisierung, Lieferzeit und Preisen – kabelundgarn aus Augsburg.",
      itServicesTitle: "IT-Services | Kabel und Garn",
      itServicesDescription: "IT-Dienstleistungen: Reparaturen, Datenrettung, Microsoldering.",
    },
    gallerie: {
      title: "Galerie",
      intro: "Hier zeigen wir dir eine Auswahl an bisherigen Projekten.",
      frameLabel: "Platzhalter",
    },
    faq: {
      title: "Häufige Fragen",
      intro:
        "Hier findest du Antworten auf die wichtigsten Fragen zu Stickerei, Preisen und Ablauf. Deine Frage ist nicht dabei? Schreib uns einfach.",
      ctaIntro: "Weitere Fragen? Wir beraten dich gern.",
      cta: "Jetzt unverbindlich anfragen",
      question1: "Welche Dateien kann ich euch schicken?",
      answer1:
        "Am besten sind Vektorformate (SVG, PDF, AI). PNG/JPG gehen auch – je höher die Auflösung, desto besser. Falls du unsicher bist, schick einfach, was du hast.",
      question2: "Was bedeutet „Digitalisierung“ bei Stickerei?",
      answer2:
        "Für die Stickmaschine wird aus deinem Motiv eine Stickdatei erstellt. Das ist ein einmaliger Einrichtungsschritt und wird separat ausgewiesen.",
      question3: "Wovon hängt der Preis ab?",
      answer3:
        "Preisfaktoren sind Motivgröße und Stichanzahl, Textilart, Stückzahl sowie der Aufwand für die Digitalisierung. Für größere Mengen bieten wir Staffelpreise.",
      question4: "Gibt es eine Mindestbestellmenge?",
      answer4:
        "Wir besticken sowohl Einzelstücke als auch größere Aufträge. Für B2B-Projekte sind Mengenrabatte möglich.",
      question5: "Wie lange dauert die Produktion?",
      answer5:
        "Das hängt von Motiv, Stückzahl und Auslastung ab. Nach deiner Anfrage nennen wir dir eine realistische Lieferzeit.",
      question6: "Kann ich eigene Textilien mitbringen?",
      answer6:
        "Ja, in vielen Fällen. Wir prüfen vorab Material und Eignung, damit das Ergebnis hochwertig wird.",
      question7: "Welche Textilien bestickt ihr?",
      answer7:
        "Z.B. Hoodies, T-Shirts, Polos, Caps, Jacken, Arbeitskleidung, Taschen und Handtücher. Bei speziellen Materialien beraten wir dich gerne.",
      question8: "Wo kann die Stickerei platziert werden?",
      answer8:
        "Übliche Positionen sind Brust, Rücken, Ärmel, Caps oder Taschen. Wir helfen dir, eine passende Größe und Position zu wählen.",
      question9: "Könnt ihr auch Siebdruck machen?",
      answer9:
        "Ja. Für bestimmte Motive und Stückzahlen kann Siebdruck eine sehr gute Alternative oder Ergänzung sein.",
      question10: "Wie läuft eine Bestellung ab?",
      answer10:
        "Anfrage senden → wir beraten und erstellen ein Angebot → nach Freigabe produzieren wir und stimmen Abholung oder Versand ab.",
      question11: "Bietet ihr auch Express an?",
      answer11:
        "Wenn es zeitlich passt, versuchen wir Express-Lösungen möglich zu machen. Sag uns deine Deadline direkt in der Anfrage.",
      question12: "Kann ich vorab ein Muster sehen?",
      answer12:
        "Bei größeren Aufträgen können Muster oder Freigaben sinnvoll sein. Wir klären das individuell je nach Projekt.",
    },
  },
  en: {
    nav: {
      home: "Home",
      services: "Services",
      process: "Process",
      gallerie: "Gallery",
      faq: "FAQ",
      contact: "Contact",
      itServices: "IT Services",
    },
    hero: {
      headline: "Precision you can see.",
      subheadline: "Your idea becomes a high-quality result.",
      description:
        "As a local embroidery studio, we stand for reliability, precision and personal service – turning your idea into a high-quality result.",
    },
    contact: {
      title: "Contact",
      email: "Email",
      phone: "Phone / WhatsApp",
      instagram: "Instagram",
      emailLabel: "Email",
      phoneLabel: "Call",
      whatsappLabel: "WhatsApp",
      instagramLabel: "Follow on Instagram",
    },
    services: {
      title: "Services",
      subtitle: "Embroidery, screen printing and more, all from one place in Augsburg.",
      embroidery: {
        title: "Embroidery Service",
        description: "Custom embroidery for private customers, from logos to text.",
        imageAlt:
          "Close-up of an embroidery machine stitching white lettering onto a light blue cap.",
      },
      b2b: {
        title: "B2B Embroidery",
        description: "Bulk orders for companies, clubs and events.",
        imageAlt:
          "Industrial multi-head embroidery machine with colorful threads and green hoops.",
      },
      screenprint: {
        title: "Screen Printing",
        description: "High-quality screen printing on textiles and more.",
        imageAlt:
          "Hands pulling a squeegee across a screen during manual screen printing.",
      },
    },
    process: {
      title: "How we work",
      step1: {
        title: "Send your idea",
        description:
          "Send us your idea, logo or vision via the contact form or by email.",
      },
      step2: {
        title: "Quote & consultation",
        description:
          "We review your design, advise you on implementation and send you a custom quote.",
      },
      step3: {
        title: "Completion",
        description:
          "After your approval we start the embroidery. You receive your finished product quickly and reliably.",
      },
    },
    pricing: {
      title: "Individual Pricing",
      intro: "Each embroidery project is unique. Pricing depends on:",
      item1: "Design size and stitch count",
      item2: "Quantity",
      item3: "Type of garment",
      item4: "Creation of embroidery file (digitizing)",
      transparency: "Digitizing and production costs are communicated transparently.",
      volume: "We offer attractive volume discounts for larger quantities.",
      cta: "Request a Quote",
    },
    form: {
      title: "Send enquiry",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your@email.com",
      message: "Message",
      messagePlaceholder: "Describe your project, mention logo attachments …",
      quantity: "Quantity (optional)",
      quantityPlaceholder: "e.g. 10 pieces",
      deadline: "Deadline (optional)",
      deadlinePlaceholder: "e.g. in 2 weeks",
      attachmentLabel: "Attachment (optional)",
      chooseFile: "Choose file",
      noFileChosen: "No file chosen",
      attachmentUploading: "Uploading …",
      attachmentError: "Upload failed. Please try again.",
      attachmentSizeError: "File must be 10 MB or less.",
      submit: "Send enquiry",
      sending: "Sending …",
      success: "Thank you! Your message has been sent.",
      error: "Something went wrong. Please try again later.",
    },
    footer: {
      tagline: "Embroidery & textile finishing in Augsburg",
      legal: "Legal",
      privacy: "Privacy",
      itServices: "IT Services",
    },
    itServices: {
      title: "IT Services",
      intro:
        "Alongside embroidery and textile finishing we offer IT services: repairs, data recovery and microsoldering.",
      repairs: "Repairs",
      repairsDesc: "Hardware and software repairs.",
      dataRecovery: "Data recovery",
      dataRecoveryDesc: "Recovery of data from defective storage devices.",
      microsoldering: "Microsoldering",
      microsolderingDesc: "Fine soldering work for electronics and devices.",
    },
    seo: {
      homeTitle: "Embroidery Augsburg | Textile Finishing & B2B – Kabel und Garn",
      homeDescription:
        "Local embroidery in Augsburg: embroidery service, B2B embroidery, screen printing. Reliable, precise, with personal consultation.",
      gallerieTitle: "Gallery | Kabel und Garn",
      gallerieDescription:
        "A look at some of our previous work: embroidery, screen printing and textile finishing in Augsburg.",
      faqTitle: "FAQ – Embroidery in Augsburg | kabelundgarn",
      faqDescription:
        "Answers to common questions about custom embroidery, digitizing, lead times and pricing – kabelundgarn in Augsburg.",
      itServicesTitle: "IT Services | Kabel und Garn",
      itServicesDescription: "IT services: repairs, data recovery, microsoldering.",
    },
    gallerie: {
      title: "Gallery",
      intro:
        "Here you’ll find a selection of previous projects.",
      frameLabel: "Placeholder",
    },
    faq: {
      title: "Frequently asked questions",
      intro:
        "Here you'll find answers to the most common questions about embroidery, pricing and process. Can't find your question? Just get in touch.",
      ctaIntro: "More questions? We're happy to help.",
      cta: "Request a Quote",
      question1: "What file formats can I send?",
      answer1:
        "Vector files are best (SVG, PDF, AI). PNG/JPG also work — the higher the resolution, the better. If unsure, send what you have.",
      question2: "What does \"digitizing\" mean for embroidery?",
      answer2:
        "Your artwork is converted into an embroidery file for the machine. This is a one-time setup step and is quoted separately.",
      question3: "What does pricing depend on?",
      answer3:
        "Pricing depends on design size and stitch count, garment type, quantity, and digitizing effort. We offer volume discounts for larger orders.",
      question4: "Do you have a minimum order quantity?",
      answer4:
        "We do both single pieces and larger orders. For B2B projects, volume discounts are available.",
      question5: "How long does production take?",
      answer5:
        "It depends on design complexity, quantity, and current workload. After your request, we'll provide an accurate timeframe.",
      question6: "Can I bring my own garments?",
      answer6:
        "Yes, in many cases. We'll check the material beforehand to ensure a high-quality result.",
      question7: "What items can you embroider?",
      answer7:
        "e.g., hoodies, t-shirts, polos, caps, jackets, workwear, bags, towels. For special materials, we'll advise you.",
      question8: "Where can embroidery be placed?",
      answer8:
        "Common placements are chest, back, sleeves, caps, or bags. We'll help you choose the right size and placement.",
      question9: "Do you also offer screen printing?",
      answer9:
        "Yes. For certain designs and quantities, screen printing can be a great alternative or addition.",
      question10: "What is the ordering process?",
      answer10:
        "Send a request → we consult and quote → after approval we produce and arrange pickup or shipping.",
      question11: "Do you offer express service?",
      answer11:
        "If feasible, we can offer express options. Please include your deadline in the request.",
      question12: "Can I see a sample first?",
      answer12:
        "For larger orders, samples or approvals can make sense. We'll decide individually depending on the project.",
    },
  },
} as const;

export type Translations = (typeof translations)["de"];
