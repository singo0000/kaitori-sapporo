export default function TableOfContents({ items }: { items: { id: string, text: string, level: number }[] }) {
    if (!items || items.length === 0) return null;

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-7 my-10 not-prose shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
            <h3 className="font-bold text-lg sm:text-xl mb-4 flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-3">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg>
                目次
            </h3>
            <ul className="space-y-3 text-sm sm:text-base">
                {items.map((item) => (
                    <li key={item.id} className={`${item.level === 3 ? 'ml-6 text-gray-500 text-sm' : 'font-bold text-gray-800'}`}>
                        <a href={`#${item.id}`} className="hover:text-blue-600 hover:underline transition-colors block py-0.5 flex items-start gap-2 group">
                            <span className="text-gray-300 group-hover:text-blue-400 mt-1 shrink-0">
                                {item.level === 2 ? (
                                    <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                ) : (
                                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                                )}
                            </span>
                            {item.text}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
}
