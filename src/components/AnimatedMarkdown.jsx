import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

const AnimatedMarkdown = ({ content, speed = 20 }) => {
  const [typedContent, setTypedContent] = useState("");

  useEffect(() => {
    setTypedContent("");
    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setTypedContent((prev) => prev + content.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [content, speed]);

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
    >
      {typedContent}
    </ReactMarkdown>
  );
};

export default AnimatedMarkdown;
