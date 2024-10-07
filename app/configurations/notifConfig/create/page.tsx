"use client";

import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

export default function CreateNotifConfig() {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState({
    notifKey: "",
    interfaceId: "",
    businessEvent: "",
    sourceSystem: "",
    domainId: "",
    recipientTo: "",
    recipientCc: "",
    emailSubject: "",
    emailTemplate: "",
    triggerCondition: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const isNotEmpty = () => {
  //   const emptyFields = Object.entries(formInputs).filter(([, value]) => {
  //     if (typeof value === "boolean") return false;
  //     return value.trim() === "";
  //   });

  //   if (emptyFields.length > 0) {
  //     const emptyFieldNames = emptyFields.map(([key]) => key).join(", ");
  //     alert(`The following fields cannot be empty: ${emptyFieldNames}`);
  //     return false;
  //   }
  //   return true;
  // };

  const isNotEmpty = () => {
    if (formInputs.notifKey.trim() === "") {
      alert("Notification Key cannot be empty");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    if (!isNotEmpty()) {
      return;
    }

    try {
      const response = await fetch("/api/configurations/notifConfigs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      });

      if (response.ok) {
        router.push("/configurations/notifConfig");
      } else {
        console.error(
          "Failed to create new Notification Configuration, something went wrong :("
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/notifConfig");
  };

  return (
    <DetailsPageLayout header={`New Mule Notificationconfig`}>
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center justify-between gap-2 pt-2"
        >
          <div className="text-[10px] grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <label htmlFor="notifKey" className="text-gray-500">
              NOTIFICATIONKEY{" "}
              <span className="text-red-600 text-[11px]">*</span>
            </label>
            <input
              type="text"
              name="notifKey"
              value={formInputs.notifKey}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="interfaceId" className="text-gray-500">
              INTERFACEID
            </label>
            <input
              type="text"
              name="interfaceId"
              value={formInputs.interfaceId}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="businessEvent" className="text-gray-500">
              BUSINESSEVENT
            </label>
            <input
              type="text"
              name="businessEvent"
              value={formInputs.businessEvent}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="sourceSystem" className="text-gray-500">
              SOURCESYSTEM
            </label>
            <input
              type="text"
              name="sourceSystem"
              value={formInputs.sourceSystem}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="domainId" className="text-gray-500">
              DOMAINID
            </label>
            <input
              type="text"
              name="domainId"
              value={formInputs.domainId}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="recipientTo" className="text-gray-500">
              RECIPIENTTO
            </label>
            <textarea
              name="recipientTo"
              value={formInputs.recipientTo}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <label htmlFor="recipientCc" className="text-gray-500">
              RECIPIENTCC
            </label>
            <textarea
              name="recipientCc"
              value={formInputs.recipientCc}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <label htmlFor="emailSubject" className="text-gray-500">
              EMAILSUBJECT
            </label>
            <input
              type="text"
              name="emailSubject"
              value={formInputs.emailSubject}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="emailTemplate" className="text-gray-500">
              EMAILTEMPLATE
            </label>
            <textarea
              name="emailTemplate"
              value={formInputs.emailTemplate}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <label htmlFor="triggerCondition" className="text-gray-500">
              TRIGGERCONDITION
            </label>
            <textarea
              name="triggerCondition"
              value={formInputs.triggerCondition}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <label htmlFor="description" className="text-gray-500">
              DESCRIPTION
            </label>
            <textarea
              name="description"
              value={formInputs.description}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <div></div>
            <div className="flex space-x-3 pt-4 pb-6">
              <SaveDetails />
              <CancelDetails onClick={handleCancel} />
            </div>
          </div>
        </form>
      </div>
    </DetailsPageLayout>
  );
}
