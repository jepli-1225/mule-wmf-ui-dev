import React from "react";
import SafeHtml from "./SafeHtml";

interface HtmlDialogProps {
  htmlContent: string;
}

const HtmlDialog: React.FC<HtmlDialogProps> = ({ htmlContent }) => {
  return (
    <div className="html-dialog-wrapper">
      <SafeHtml htmlContent={htmlContent} />
    </div>
  );
};

export default HtmlDialog;