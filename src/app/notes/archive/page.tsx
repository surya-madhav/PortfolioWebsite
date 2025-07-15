import { getAllContent } from '@/lib/content';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notes Archive | Portfolio',
  description: 'Complete archive of all notes organized by date.',
};

export default async function NotesArchivePage() {
  const notes = await getAllContent('note', {
    published: true,
    sortBy: 'date',
    sortOrder: 'desc'
  });
  
  // Group notes by year and month
  const groupedNotes = notes.reduce((acc, note) => {
    const date = new Date(note.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('en-US', { month: 'long' });
    
    if (!acc[year]) {
      acc[year] = {};
    }
    
    if (!acc[year][month]) {
      acc[year][month] = [];
    }
    
    acc[year][month].push(note);
    
    return acc;
  }, {} as Record<number, Record<string, typeof notes>>);
  
  const years = Object.keys(groupedNotes).sort((a, b) => Number(b) - Number(a));
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl py-24">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-4">
          Notes Archive
        </h1>
        <p className="text-lg text-gray-300">
          All notes organized by date. Total: {notes.length} notes.
        </p>
      </header>
      
      {years.map(year => (
        <section key={year} className="mb-12">
          <h2 className="text-2xl font-heading font-bold text-orange-400 mb-6">
            {year}
          </h2>
          
          {Object.entries(groupedNotes[Number(year)])
            .sort((a, b) => {
              const months = ['January', 'February', 'March', 'April', 'May', 'June',
                            'July', 'August', 'September', 'October', 'November', 'December'];
              return months.indexOf(b[0]) - months.indexOf(a[0]);
            })
            .map(([month, monthNotes]) => (
            <div key={month} className="mb-8">
              <h3 className="text-lg font-medium text-gray-400 mb-3">
                {month} ({monthNotes.length})
              </h3>
              
              <ul className="space-y-2">
                {monthNotes.map(note => (
                  <li key={note.slug}>
                    <Link
                      href={`/notes/${note.slug}`}
                      className="group flex items-start gap-4 p-3 rounded-lg hover:bg-gray-800/30 transition-all duration-200"
                    >
                      <time className="text-sm text-gray-500 mt-0.5 flex-shrink-0">
                        {new Date(note.date).getDate().toString().padStart(2, '0')}
                      </time>
                      <div className="flex-1">
                        <h4 className="font-medium text-white group-hover:text-orange-400 transition-colors">
                          {note.title}
                        </h4>
                        {note.tags.length > 0 && (
                          <div className="mt-1 flex flex-wrap gap-2">
                            {note.tags.slice(0, 3).map(tag => (
                              <span
                                key={tag}
                                className="text-xs text-gray-400"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      ))}
      
      {/* Navigation */}
      <div className="mt-12 pt-8 border-t border-gray-800">
        <Link
          href="/notes"
          className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Notes
        </Link>
      </div>
    </div>
  );
}
