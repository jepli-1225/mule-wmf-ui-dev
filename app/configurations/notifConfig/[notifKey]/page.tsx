"use client";

import { NotifConfig } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function NotificationConfig({
  params,
}: {
  params: { notifKey: string };
}) {
  const router = useRouter();
  const [notifConfig, setNotifConfig] = useState<NotifConfig | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formInputs, setFormInputs] = useState<Partial<NotifConfig>>({
    NOTIFICATIONKEY: "",
    INTERFACEID: "",
    BUSINESSEVENT: "",
    SOURCESYSTEM: "",
    DOMAINID: "",
    RECIPIENTTO: "",
    RECIPIENTCC: "",
    EMAILSUBJECT: "",
    EMAILTEMPLATE: "",
    TRIGGERCONDITION: "",
    DESCRIPTION: "",
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

  const isNotEmpty = (formInputs: Partial<NotifConfig>): boolean => {
    const requiredFields: (keyof Partial<NotifConfig>)[] = [
      "NOTIFICATIONKEY",
      "INTERFACEID",
      "BUSINESSEVENT",
      "SOURCESYSTEM",
      "DOMAINID",
      "RECIPIENTTO",
      "RECIPIENTCC",
      "EMAILSUBJECT",
      "EMAILTEMPLATE",
      "TRIGGERCONDITION",
      "DESCRIPTION",
    ];

    // for (const field of requiredFields) {
    //   if (!formInputs[field]) {
    //     alert(`${field} cannot be empty.`);
    //     return false;
    //   }
    // }
    return true;
  };

  useEffect(() => {
    const fetchNotifConfig = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/configurations/notifConfigs/${params.notifKey}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch notification configuration");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setNotifConfig(data.notifConfig);
        setFormInputs(data.notifConfig);
      } catch (err) {
        setError("Error fetching notification configuration");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifConfig();
  }, [params.notifKey]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty(formInputs)) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/configurations/notifConfigs/${params.notifKey}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Notification configuration");
      }

      const updatedData = await response.json();
      setNotifConfig(updatedData.notifConfig);
      setIsLoading(false);
      alert("Notification configuration updated successfully :)");
    } catch (error) {
      console.error("Error updating Notification configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/notifConfig");
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={
        notifConfig?.INTERFACEID ? `${notifConfig?.INTERFACEID}` : `Loading...`
      }
      isLoading={isLoading}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center justify-between gap-2 pt-2 text-[10px]"
        >
          <ul className=" grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <label htmlFor="NOTIFICATIONKEY" className="text-gray-500 ">
              NOTIFICATIONKEY{" "}
              <span className="text-red-600 text-[11px]">*</span>
            </label>
            <input
              type="text"
              name="NOTIFICATIONKEY"
              value={formInputs.NOTIFICATIONKEY}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] default-cursor bg-gray-100"
              readOnly
            />
            <label htmlFor="INTERFACEID" className="text-gray-500 ">
              INTERFACEID
            </label>
            <input
              type="text"
              name="INTERFACEID"
              value={formInputs.INTERFACEID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="BUSINESSEVENT" className="text-gray-500 ">
              BUSINESSEVENT
            </label>
            <input
              type="text"
              name="BUSINESSEVENT"
              value={formInputs.BUSINESSEVENT}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="SOURCESYSTEM" className="text-gray-500 ">
              SOURCESYSTEM
            </label>
            <input
              type="text"
              name="SOURCESYSTEM"
              value={formInputs.SOURCESYSTEM}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="DOMAINID" className="text-gray-500 ">
              DOMAINID
            </label>
            <input
              type="text"
              name="DOMAINID"
              value={formInputs.DOMAINID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="RECIPIENTTO" className="text-gray-500 ">
              RECIPIENTTO
            </label>
            <input
              type="text"
              name="RECIPIENTTO"
              value={formInputs.RECIPIENTTO}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="RECIPIENTCC" className="text-gray-500 ">
              RECIPIENTCC
            </label>
            <textarea
              name="RECIPIENTCC"
              value={formInputs.RECIPIENTCC}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px] text-[11px]"
              rows={4}
            />
            <label htmlFor="EMAILSUBJECT" className="text-gray-500 ">
              EMAILSUBJECT
            </label>
            <input
              type="text"
              name="EMAILSUBJECT"
              value={formInputs.EMAILSUBJECT}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="EMAILTEMPLATE" className="text-gray-500 ">
              EMAILTEMPLATE
            </label>
            <textarea
              name="EMAILTEMPLATE"
              value={formInputs.EMAILTEMPLATE}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px] text-[11px]"
              rows={4}
            />
            <label htmlFor="TRIGGERCONDITION" className="text-gray-500 ">
              TRIGGERCONDITION
            </label>
            <textarea
              name="TRIGGERCONDITION"
              value={formInputs.TRIGGERCONDITION}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px] text-[11px]"
              rows={4}
            />
            <label htmlFor="DESCRIPTION" className="text-gray-500 ">
              DESCRIPTION
            </label>
            <input
              type="text"
              name="DESCRIPTION"
              value={formInputs.DESCRIPTION}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <li></li>
            <li className="flex space-x-3 mt-4 pb-6">
              <SaveDetails />
              <CancelDetails onClick={handleCancel} />
            </li>
          </ul>
        </form>
      </div>
    </DetailsPageLayout>
  );
}
