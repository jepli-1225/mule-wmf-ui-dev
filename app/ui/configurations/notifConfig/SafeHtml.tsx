import React from "react";
import DOMPurify from "dompurify";

interface SafeHtmlProps {
  htmlContent: string;
}

const SafeHtml: React.FC<SafeHtmlProps> = ({ htmlContent }) => {
  const sanitizedHtml = DOMPurify.sanitize(htmlContent);

  return (
    <div className="safe-html-content">
      <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
    </div>
  );
};

export default SafeHtml;
