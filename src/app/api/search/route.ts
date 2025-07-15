import { NextRequest, NextResponse } from 'next/server';
import { searchContent } from '@/lib/content';
import { ContentType } from '@/types/content';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const query = searchParams.get('q');
  const type = searchParams.get('type') as ContentType | undefined;
  const limit = parseInt(searchParams.get('limit') || '10');
  
  if (!query) {
    return NextResponse.json({ results: [], query: '' });
  }
  
  try {
    const results = await searchContent(query, type);
    const limitedResults = results.slice(0, limit);
    
    // Return simplified results for client
    const simplifiedResults = limitedResults.map(content => ({
      slug: content.slug,
      title: content.title,
      summary: content.summary,
      type: content.type,
      date: content.date,
      tags: content.tags,
      categories: content.categories,
      readingTime: content.readingTime,
    }));
    
    return NextResponse.json({ 
      results: simplifiedResults, 
      query,
      total: results.length 
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ results: [], query, error: 'Search failed' }, { status: 500 });
  }
}
