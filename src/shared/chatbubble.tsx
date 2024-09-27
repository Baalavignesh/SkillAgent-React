import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Prism from "prismjs";
import "prismjs/themes/prism-twilight.css";

type Props = {
  markdownContent: string;
};

const MarkdownRenderer: React.FC<Props> = ({ markdownContent }) => {
  let [newContent, setNewContent] = useState<string>(markdownContent);

  const removeExtraLineBreaks = (markdownContent: string): string => {
    return markdownContent.replace(
      /(```[\s\S]*?```)|(\n\s*\n)+/g, // Preserve code blocks and handle extra line breaks
      (match, codeBlock) => {
        if (codeBlock) {
          return codeBlock; // Preserve code block content
        }
        return "\n"; // Replace multiple consecutive newlines with a single newline
      }
    ).replace(/\n{2,}/g, "\n\n"); // Ensure only one empty line between blocks
  };

  useEffect(() => {
    Prism.highlightAll();
    let cleanContent = removeExtraLineBreaks(markdownContent);
    setNewContent(cleanContent);
  }, []);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      className="markdown"
      skipHtml={false}
      components={{
        code({ node, className, children, ...props }) {
          // Determine if the code block is inline (i.e., not inside a <pre> tag)
          const isInlineCode = !className?.includes("language-");
          if (isInlineCode) {
            return (
              <code
                style={{
                  backgroundColor: "#545454",
                  color: "white", // Light background for inline code
                  borderRadius: "4px",
                  padding: "2px 4px",
                  fontSize: "90%",
                  fontFamily: "monospace",
                }}
                {...props}
              >
                {children}
              </code>
            );
          }

          // For block code inside <pre>, apply Prism.js highlighting
          return (
            <pre className={className}>
              <code {...props}>{children}</code>
            </pre>
          );
        },
        img: ({ src, alt }) => (
          <img
            src={src}
            alt={alt}
            className="h-40"
            style={{ maxWidth: "100%", height: "auto" }} // Custom styles for images
            loading="lazy" // Optional: for performance optimization
          />
        ),
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }} // Custom styles for links
          >
            {children}
          </a>
        ),
      }}
    >
      {newContent}
    </ReactMarkdown>
  );
};

export default MarkdownRenderer;
