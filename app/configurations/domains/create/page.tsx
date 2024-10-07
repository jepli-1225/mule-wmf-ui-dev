"use client";

import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

export default function CreateDomains() {
  const router = useRouter();
  const [formInputs, setFormInputs] = useState({
    domainId: "",
    domainDescription: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // if (!isNotEmpty()) {
    //   return;
    // }

    try {
      const response = await fetch("/api/configurations/domains/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formInputs,
        }),
      });

      if (response.ok) {
        router.push("/configurations/domains");
      } else {
        console.error("Failed to create new Domain, something went wrong :(");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/domains");
  };

  return (
    <DetailsPageLayout header={`New Mule Domain`}>
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center justify-between pt-3 text-[10px]"
      >
        <div className="grid grid-cols-[auto,1fr] gap-x-12 gap-y-0.5 w-full max-w-2xl">
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
          <label htmlFor="domainDescription" className="text-gray-500">
            DOMAINDESCRIPTION
          </label>
          <input
            type="text"
            name="domainDescription"
            value={formInputs.domainDescription}
            onChange={handleInputChange}
            className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
          />
          <div></div>
          <div className="flex space-x-3 pt-4">
            <SaveDetails />
            <CancelDetails onClick={handleCancel} />
          </div>
        </div>
      </form>
    </DetailsPageLayout>
  );
}
