import { useEffect } from 'react';

/**
 * Dynamic SEO Component for TakeHomeUSA
 * Updates title, meta description, Open Graph tags, canonical URL, and JSON-LD schema
 */
export default function SEO({
  title = 'Salary After Tax Calculator — Estimate Your US Take-Home Pay | TakeHomeUSA',
  description = 'Calculate your estimated salary after federal tax, state tax, Social Security, Medicare, and common deductions. Free US take-home pay calculator.',
  canonicalPath = '',
  jsonLd = null,
}) {
  useEffect(() => {
    // 1. Title
    document.title = title;

    // 2. Meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    metaDesc.content = description;

    // 3. Open Graph
    updateMetaTag('property', 'og:title', title);
    updateMetaTag('property', 'og:description', description);
    updateMetaTag('property', 'og:type', 'website');
    updateMetaTag('property', 'og:site_name', 'TakeHomeUSA');

    const canonicalUrl = `${window.location.origin}${canonicalPath || window.location.pathname}`;
    updateMetaTag('property', 'og:url', canonicalUrl);

    // 4. Twitter tags
    updateMetaTag('name', 'twitter:card', 'summary_large_image');
    updateMetaTag('name', 'twitter:title', title);
    updateMetaTag('name', 'twitter:description', description);

    // 5. Canonical Link
    let linkCanonical = document.querySelector('link[rel="canonical"]');
    if (!linkCanonical) {
      linkCanonical = document.createElement('link');
      linkCanonical.rel = 'canonical';
      document.head.appendChild(linkCanonical);
    }
    linkCanonical.href = canonicalUrl;

    // 6. JSON-LD structured data injection
    let jsonLdScript = document.getElementById('dynamic-jsonld');
    if (jsonLd) {
      if (!jsonLdScript) {
        jsonLdScript = document.createElement('script');
        jsonLdScript.id = 'dynamic-jsonld';
        jsonLdScript.type = 'application/ld+json';
        document.head.appendChild(jsonLdScript);
      }
      jsonLdScript.textContent = JSON.stringify(jsonLd);
    } else if (jsonLdScript) {
      jsonLdScript.remove();
    }

    // Scroll to top on page navigation
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [title, description, canonicalPath, jsonLd]);

  return null;
}

function updateMetaTag(keyType, keyName, value) {
  let element = document.querySelector(`meta[${keyType}="${keyName}"]`);
  if (!element) {
    element = document.createElement('meta');
    element.setAttribute(keyType, keyName);
    document.head.appendChild(element);
  }
  element.setAttribute('content', value);
}
