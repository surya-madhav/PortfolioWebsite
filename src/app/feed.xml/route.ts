import { getAllContent } from '@/lib/content';
import { generateRSSFeed } from '@/lib/feed';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://rssmv.in';

export async function GET() {
  const content = await getAllContent(undefined, {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc',
    limit: 50
  });
  
  const feed = generateRSSFeed(
    content,
    "Sai Surya's Portfolio - AI & Software Engineering Insights",
    'Latest projects, technical insights, and learnings in AI engineering, GenAI, distributed systems, and full-stack development.',
    `${SITE_URL}/feed.xml`,
    SITE_URL
  );
  
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
