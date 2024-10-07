"use client";

import { useRouter } from "next/navigation";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";

export default function CreateInterfaceConfig() {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState({
    interfaceId: "",
    sourceSystem: "",
    targetSystem: "",
    destinationValue: "",
    destinationType: "",
    businessEvent: "",
    messageProperties: "",
    description: "",
    domainId: "",
    replayable: false,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormInputs((prevData) => ({
      ...prevData,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
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
    if (formInputs.interfaceId.trim() === "") {
      alert("INTERFACEID cannot be empty");
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
      const response = await fetch(
        "/api/configurations/interfaceConfigs/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (response.ok) {
        router.push("/configurations/interfaceConfig");
      } else {
        console.error(
          "Failed to create new InterfaceConfig, something went wrong :("
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/interfaceConfig");
  };

  return (
    <DetailsPageLayout header="New Mule InterfaceConfig">
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex flex-col pt-2 space-y-4 text-[10px]"
      >
        <div className="grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
          <label htmlFor="INTERFACEID" className="text-gray-500 ">
            INTERFACEID <span className="text-red-600 text-[11px]">*</span>
          </label>
          <input
            type="text"
            name="interfaceId"
            value={formInputs.interfaceId}
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
          <label htmlFor="targetSystem" className="text-gray-500">
            TARGETSYSTEM
          </label>
          <input
            type="text"
            name="targetSystem"
            value={formInputs.targetSystem}
            onChange={handleInputChange}
            className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
          />
          <label htmlFor="destinationValue" className="text-gray-500">
            DESTINATIONVALUE
          </label>
          <input
            type="text"
            name="destinationValue"
            value={formInputs.destinationValue}
            onChange={handleInputChange}
            className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
          />
          <label htmlFor="destinationValue" className="text-gray-500">
            DESTINATIONTYPE
          </label>
          <input
            type="text"
            name="destinationType"
            value={formInputs.destinationType}
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
          <label htmlFor="messageProperties" className="text-gray-500">
            MESSAGEPROPERTIES
          </label>
          <textarea
            name="messageProperties"
            value={formInputs.messageProperties}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
            rows={4}
          />
          <label htmlFor="description" className="text-gray-500">
            DESCRIPTION
          </label>
          <input
            type="text"
            name="description"
            value={formInputs.description}
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
        </div>
        <div className="flex space-x-3 grid grid-cols-[auto,1fr] max-w-2xl">
          <label htmlFor="replayable" className="text-gray-500 mr-2">
            REPLAYABLE
          </label>
          <label className="custom-checkbox">
            <input
              type="checkbox"
              name="replayable"
              checked={formInputs.replayable}
              onChange={handleInputChange}
            />
            <span className="checkmark ml-20"></span>
          </label>
        </div>
        <div className="flex space-x-3 gap-x-36 w-full max-w-2xl">
          <div></div>
          <div className="mt-2">
            <SaveDetails />
            <CancelDetails onClick={handleCancel} />
          </div>
        </div>
      </form>
    </DetailsPageLayout>
  );
}
