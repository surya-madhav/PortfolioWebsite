import { Metadata } from 'next';
import { Content, ContentType } from '@/types/content';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rssmv.in';
const SITE_NAME = "Sai Surya's Portfolio";
const DEFAULT_AUTHOR = 'Sai Surya Madhav Rebbapragada';

/**
 * Generate base metadata for the site
 */
export function getBaseMetadata(): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: SITE_NAME,
      template: `%s | ${SITE_NAME}`,
    },
    description: "AI Engineer portfolio showcasing production-ready GenAI applications, distributed systems, and full-stack projects. Specializing in LLMs, RAG, and cloud-native architectures.",
    keywords: ['AI Engineer', 'GenAI', 'LLMs', 'Full-Stack Developer', 'Distributed Systems', 'Data Engineering', 'React', 'Python', 'Machine Learning', 'Cloud Architecture', 'Portfolio'],
    authors: [{ name: DEFAULT_AUTHOR }],
    creator: DEFAULT_AUTHOR,
    publisher: DEFAULT_AUTHOR,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      locale: 'en_US',
      url: SITE_URL,
      siteName: SITE_NAME,
      title: SITE_NAME,
      description: "AI Engineer portfolio showcasing production-ready GenAI applications, distributed systems, and full-stack projects. Specializing in LLMs, RAG, and cloud-native architectures.",
      images: [
        {
          url: `${SITE_URL}/images/banner.png`,
          width: 1200,
          height: 630,
          alt: SITE_NAME,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: SITE_NAME,
      description: "AI Engineer portfolio showcasing production-ready GenAI applications, distributed systems, and full-stack projects. Specializing in LLMs, RAG, and cloud-native architectures.",
      creator: '@surya_madhav_',
      images: [`${SITE_URL}/images/banner.png`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

/**
 * Generate metadata for content pages
 */
export function generateContentMetadata(content: Content): Metadata {
  const url = `${SITE_URL}/${getContentPath(content.type)}/${content.slug}`;
  const title = content.seo.title || content.title;
  const description = content.seo.description || content.summary;
  const keywords = content.seo.keywords || content.tags;
  const image = content.seo.image || content.hero?.src || content.thumbnail;

  const metadata: Metadata = {
    title,
    description,
    keywords,
    alternates: {
      canonical: content.seo.canonical || url,
    },
    openGraph: {
      type: content.type === 'blog' ? 'article' : 'website',
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_US',
      images: image
        ? [
            {
              url: image.startsWith('http') ? image : `${SITE_URL}${image}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: '@surya_madhav_',
      images: image ? [image.startsWith('http') ? image : `${SITE_URL}${image}`] : undefined,
    },
    robots: {
      index: !content.seo.noindex,
      follow: !content.seo.nofollow,
    },
  };

  // Add article-specific metadata for blog posts
  if (content.type === 'blog') {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: content.date,
      modifiedTime: content.updated || content.date,
      authors: content.author ? [content.author] : [DEFAULT_AUTHOR],
      tags: content.tags,
    };

    metadata.other = {
      'article:published_time': content.date,
      'article:modified_time': content.updated || content.date,
      'article:author': content.author || DEFAULT_AUTHOR,
      'article:section': content.categories[0] || 'Technology',
      'article:tag': content.tags.join(', '),
    };
  }

  return metadata;
}

/**
 * Get content path based on type
 */
export function getContentPath(type: ContentType): string {
  switch (type) {
    case 'project':
      return 'projects';
    case 'note':
      return 'notes';
    case 'blog':
      return 'blog';
    default:
      return '';
  }
}

/**
 * Generate structured data for different content types
 */
export function generateStructuredData(content: Content): object {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: `${SITE_URL}/${getContentPath(content.type)}/${content.slug}`,
    name: content.title,
    description: content.summary,
    datePublished: content.date,
    dateModified: content.updated || content.date,
    author: {
      '@type': 'Person',
      name: content.author || DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Person',
      name: DEFAULT_AUTHOR,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/${getContentPath(content.type)}/${content.slug}`,
    },
  };

  // Article schema for blog posts
  if (content.type === 'blog') {
    return {
      ...baseData,
      '@type': 'BlogPosting',
      headline: content.title,
      articleBody: content.content,
      wordCount: content.content.split(' ').length,
      keywords: content.tags.join(', '),
      articleSection: content.categories.join(', '),
      image: content.hero?.src || content.thumbnail
        ? {
            '@type': 'ImageObject',
            url: `${SITE_URL}${content.hero?.src || content.thumbnail}`,
            width: 1200,
            height: 630,
          }
        : undefined,
    };
  }

  // Project schema
  if (content.type === 'project') {
    return {
      ...baseData,
      '@type': 'CreativeWork',
      headline: content.title,
      abstract: content.summary,
      keywords: content.tags.join(', '),
      genre: 'Software Project',
      creator: {
        '@type': 'Person',
        name: DEFAULT_AUTHOR,
        url: SITE_URL,
      },
      url: content.demoUrl || content.githubUrl || baseData.url,
      sameAs: [
        content.githubUrl,
        content.demoUrl,
      ].filter(Boolean),
    };
  }

  // Note schema
  if (content.type === 'note') {
    return {
      ...baseData,
      '@type': 'TechArticle',
      headline: content.title,
      articleBody: content.content,
      keywords: content.tags.join(', '),
    };
  }

  return baseData;
}

/**
 * Generate breadcrumb structured data
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>
): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}

/**
 * Generate person/organization schema for the home page
 */
export function generatePersonSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: DEFAULT_AUTHOR,
    url: SITE_URL,
    sameAs: [
      'https://github.com/surya-madhav',
      'https://linkedin.com/in/saisuryarebbapragada',
      'https://x.com/surya_madhav_',
    ],
    jobTitle: 'AI Engineer | Data Systems Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Northeastern University',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Seattle',
      addressRegion: 'WA',
      addressCountry: 'US',
    },
    description: 'AI Engineer with experience building production-ready GenAI applications using LLMs, embeddings, and agentic architectures. Specialized in full-stack development, distributed systems, and data engineering.',
    image: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/ProfileRedJacket.png`,
      width: 400,
      height: 400,
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'Northeastern University',
    },
    knowsAbout: [
      // Programming Languages
      'Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'SQL',
      // AI/ML Technologies
      'LangChain', 'LangGraph', 'RAG Models', 'Vector Databases',
      'LLMs', 'OpenAI', 'Gemini APIs', 'Agentic Architecture',
      'Machine Learning', 'Deep Learning', 'Neural Networks',
      // Web Technologies
      'React', 'Next.js', 'Angular', 'Node.js', 'Spring Boot',
      'FastAPI', 'Streamlit',
      // Data & Cloud
      'Snowflake', 'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
      'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform',
      'Airflow', 'Kafka', 'Spark', 'DBT',
      // Systems
      'Distributed Systems', 'Microservices', 'CI/CD',
      'High-Performance Computing', 'Big Data Systems',
    ],
  };
}

/**
 * Generate website schema for search appearance
 */
export function generateWebsiteSchema(): object {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: "AI Engineer portfolio showcasing production-ready GenAI applications, distributed systems, and full-stack projects. Specializing in LLMs, RAG, and cloud-native architectures.",
    author: {
      '@type': 'Person',
      name: DEFAULT_AUTHOR,
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}
