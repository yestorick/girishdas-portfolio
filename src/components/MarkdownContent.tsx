import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface MarkdownContentProps {
  content: string;
  imageAltFallback?: string;
  tableAriaLabel?: string;
}

export default function MarkdownContent({
  content,
  imageAltFallback = 'Embedded screenshot',
  tableAriaLabel = 'Data table',
}: MarkdownContentProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h2 className="text-xl sm:text-2xl font-bold text-[#1C1917] mt-6 first:mt-0 mb-3 font-display">
            {children}
          </h2>
        ),
        h2: ({ children }) => (
          <h2 className="text-lg sm:text-xl font-bold text-[#1C1917] mt-8 mb-3 font-display">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="text-base sm:text-lg font-bold text-[#1C1917] mt-6 mb-2 font-display">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="text-sm sm:text-base text-[#44403C] my-4 leading-relaxed max-w-[68ch]">
            {children}
          </p>
        ),
        ul: ({ children }) => (
          <ul className="list-disc list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#44403C]">
            {children}
          </ul>
        ),
        ol: ({ children }) => (
          <ol className="list-decimal list-inside space-y-1.5 my-4 text-sm sm:text-base text-[#44403C]">
            {children}
          </ol>
        ),
        strong: ({ children }) => (
          <strong className="font-bold text-[#1C1917]">{children}</strong>
        ),
        hr: () => <hr className="my-7 border-[#1C1917]/10" />,
        img: ({ src, alt }) => (
          <span className="block my-6">
            <img
              src={src || ''}
              alt={alt || imageAltFallback}
              loading="lazy"
              className="w-full h-auto rounded-xl border border-[#1C1917]/15 bg-white"
            />
            {alt && (
              <span className="block mt-2 text-xs text-[#78716C] text-center">
                {alt}
              </span>
            )}
          </span>
        ),
        table: ({ children }) => (
          <div
            tabIndex={0}
            role="region"
            aria-label={tableAriaLabel}
            className="overflow-x-auto my-6 border border-[#1C1917]/20 rounded-xl bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C84B31]"
          >
            <table className="w-full min-w-[460px] text-left text-xs sm:text-sm border-collapse">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-[#F5F2EB] text-[#1C1917] font-bold border-b border-[#1C1917]/15">
            {children}
          </thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-[#1C1917]/10 bg-white">
            {children}
          </tbody>
        ),
        tr: ({ children }) => (
          <tr className="divide-x divide-[#1C1917]/10">{children}</tr>
        ),
        th: ({ children }) => (
          <th scope="col" className="px-4 py-3 font-bold whitespace-nowrap">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-4 py-3 text-[#44403C]">{children}</td>
        ),
        code: ({ children }) => (
          <code className="bg-[#F5F2EB] text-[#1C1917] px-1.5 py-0.5 rounded text-xs sm:text-sm font-mono border border-[#1C1917]/10">
            {children}
          </code>
        ),
        pre: ({ children }) => (
          <pre className="bg-[#18181B] text-stone-100 p-4 rounded-xl overflow-x-auto text-xs sm:text-sm font-mono my-4">
            {children}
          </pre>
        ),
        blockquote: ({ children }) => (
          <blockquote className="border-l-2 border-[#C84B31] pl-4 italic my-4 text-sm text-[#44403C]">
            {children}
          </blockquote>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
