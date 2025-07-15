import { Content } from '@/types/content';

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export function generateRSSFeed(
  content: Content[],
  feedTitle: string,
  feedDescription: string,
  feedUrl: string,
  siteUrl: string
): string {
  const now = new Date().toUTCString();
  
  const items = content.map(item => {
    const url = `${siteUrl}/${item.type === 'project' ? 'projects' : item.type === 'note' ? 'notes' : 'blog'}/${item.slug}`;
    
    return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(item.summary)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
      ${item.author ? `<author>${escapeXml(item.author)}</author>` : ''}
      ${item.categories.map(cat => `<category>${escapeXml(cat)}</category>`).join('')}
    </item>`;
  }).join('');
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(feedTitle)}</title>
    <description>${escapeXml(feedDescription)}</description>
    <link>${siteUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <lastBuildDate>${now}</lastBuildDate>
    <language>en-US</language>
    ${items}
  </channel>
</rss>`;
}

export function generateJSONFeed(
  content: Content[],
  feedTitle: string,
  feedDescription: string,
  feedUrl: string,
  siteUrl: string,
  author?: { name: string; url?: string; avatar?: string }
): string {
  const items = content.map(item => {
    const url = `${siteUrl}/${item.type === 'project' ? 'projects' : item.type === 'note' ? 'notes' : 'blog'}/${item.slug}`;
    
    return {
      id: url,
      url,
      title: item.title,
      summary: item.excerpt,
      content_html: item.htmlContent,
      date_published: item.date,
      date_modified: item.updated || item.date,
      author: item.author ? { name: item.author } : author,
      tags: item.tags,
      _meta: {
        categories: item.categories
      }
    };
  });
  
  const feed = {
    version: 'https://jsonfeed.org/version/1.1',
    title: feedTitle,
    description: feedDescription,
    home_page_url: siteUrl,
    feed_url: feedUrl,
    author,
    items
  };
  
  return JSON.stringify(feed, null, 2);
}
