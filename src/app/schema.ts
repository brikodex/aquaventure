// src/app/schema.ts

// JSON-LD structured data

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Aquaventure",
  "url": "https://www.aquaventure.com",
  "logo": "https://www.aquaventure.com/logo.png",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-123-456-7890",
    "contactType": "Customer Service"
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Aquaventure",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Ocean Drive",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "postalCode": "33139",
    "addressCountry": "US"
  },
  "openingHours": "Mo-Su 09:00-17:00",
};

const webSiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Aquaventure",
  "url": "https://www.aquaventure.com",
  "sameAs": [
    "https://www.facebook.com/aquaventure",
    "https://twitter.com/aquaventure",
    "https://www.instagram.com/aquaventure"
  ]
};

const touristAttractionSchema = {
  "@context": "https://schema.org",
  "@type": "TouristAttraction",
  "name": "Aquaventure Waterpark",
  "description": "A thrilling waterpark with various attractions and fun activities for all ages.",
  "image": "https://www.aquaventure.com/image.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Ocean Drive",
    "addressLocality": "Miami",
    "addressRegion": "FL",
    "postalCode": "33139",
    "addressCountry": "US"
  },
};

export { organizationSchema, localBusinessSchema, webSiteSchema, touristAttractionSchema };