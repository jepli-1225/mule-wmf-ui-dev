import React from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import SafeHtml from "./HtmlDialog";

interface EmailInfoPopupProps {
  emailTemplate: string;
}

const EmailInfoPopup: React.FC<EmailInfoPopupProps> = ({ emailTemplate }) => {
  return (
    <div className="email-info-container">
      <InformationCircleIcon className="h-5 w-5 text-blue-600 cursor-pointer" />
      <div className="email-info-popup">
        <SafeHtml htmlContent={emailTemplate} />
      </div>
    </div>
  );
};

export default EmailInfoPopup;
