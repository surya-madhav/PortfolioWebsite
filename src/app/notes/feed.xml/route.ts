import { getAllContent } from '@/lib/content';
import { generateRSSFeed } from '@/lib/feed';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://yoursite.com';

export async function GET() {
  const notes = await getAllContent('note', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc',
    limit: 50
  });
  
  const feed = generateRSSFeed(
    notes,
    'Portfolio - Notes',
    'Quick thoughts, tips, and learnings from my development journey',
    `${SITE_URL}/notes/feed.xml`,
    SITE_URL
  );
  
  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600'
    }
  });
}
