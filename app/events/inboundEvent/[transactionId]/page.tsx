"use client";

import { InboundEvent } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { useEffect, useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

export default function InboundDetails({
  params,
}: {
  params: { transactionId: string };
}) {
  const router = useRouter();
  const [inboundEvent, setInboundEvent] = useState<InboundEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formInputs, setFormInputs] = useState({
    INSTANCEID: "",
    INTERFACEID: "",
    BUSINESSEVENT: "",
    SOURCESYSTEM: "",
    TARGETSYSTEM: "",
    INBOUNDPROPERTIES: "",
    DOMAINID: "",
    STATUS: "",
    CREATEDBY: "",
    CREATEDON: "",
    UPDATEDBY: "",
    UPDATEDON: "",
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

  const isNotEmpty = (): boolean => {
    // if (
    //   !formInputs.INSTANCEID ||
    //   formInputs.INSTANCEID.trim() === "" ||
    //   !formInputs.INTERFACEID ||
    //   formInputs.INTERFACEID.trim() === "" ||
    //   !formInputs.BUSINESSEVENT ||
    //   formInputs.BUSINESSEVENT.trim() === "" ||
    //   !formInputs.SOURCESYSTEM ||
    //   formInputs.SOURCESYSTEM.trim() === "" ||
    //   !formInputs.TARGETSYSTEM ||
    //   formInputs.TARGETSYSTEM.trim() === "" ||
    //   !formInputs.INBOUNDPROPERTIES ||
    //   formInputs.INBOUNDPROPERTIES.trim() === "" ||
    //   !formInputs.DOMAINID ||
    //   formInputs.DOMAINID.trim() === "" ||
    //   !formInputs.STATUS ||
    //   formInputs.STATUS.trim() === "" ||
    //   !formInputs.CREATEDBY ||
    //   formInputs.CREATEDON.trim() === "" ||
    //   !formInputs.UPDATEDBY ||
    //   formInputs.UPDATEDBY.trim() === "" ||
    //   !formInputs.UPDATEDON ||
    //   formInputs.UPDATEDON.trim() === ""
    // ) {
    //   alert("field cannot be empty.");
    //   return false;
    // }
    return true;
  };

  useEffect(() => {
    const fetchinboundEvent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/events/inboundEvents/${params.transactionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch inbound events");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInboundEvent(data.inboundEvent);
        setFormInputs(data.inboundEvent);
      } catch (err) {
        setError("Error fetching inbound event");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchinboundEvent();
  }, [params.transactionId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty()) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/events/inboundEvents/${params.transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Inbound Event");
      }

      const updatedData = await response.json();
      setInboundEvent(updatedData.inboundEvent);

      setIsLoading(false);
      alert("Inbound event updated successfully :)");
    } catch (error) {
      console.error("Error updating Inbound Event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/events/inboundEvent");
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={`Inbound Event ${
        inboundEvent ? inboundEvent.TRANSACTIONID : `Loading...`
      }`}
      isLoading={isLoading}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex items-center justify-between gap-2 pt-2 text-[10px]"
        >
          <ul className=" grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <label htmlFor="INSTANCEID" className="text-gray-500">
              INSTANCEID
            </label>
            <input
              type="text"
              name="INSTANCEID"
              value={formInputs.INSTANCEID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="INTERFACEID" className="text-gray-500 text-[10px]">
              INTERFACEID
            </label>
            <input
              type="text"
              name="INTERFACEID"
              value={formInputs.INTERFACEID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label
              htmlFor="BUSINESSEVENT"
              className="text-gray-500 text-[10px]"
            >
              BUSINESSEVENT
            </label>
            <input
              type="text"
              name="BUSINESSEVENT"
              value={formInputs.BUSINESSEVENT}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="SOURCESYSTEM" className="text-gray-500 text-[10px]">
              SOURCESYSTEM
            </label>
            <input
              type="text"
              name="SOURCESYSTEM"
              value={formInputs.SOURCESYSTEM}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="TARGETSYSTEM" className="text-gray-500 text-[10px]">
              TARGETSYSTEM
            </label>
            <input
              type="text"
              name="TARGETSYSTEM"
              value={formInputs.TARGETSYSTEM}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label
              htmlFor="INBOUNDPROPERTIES"
              className="text-gray-500 text-[10px]"
            >
              INBOUNDPROPERTIES
            </label>
            <textarea
              name="INBOUNDPROPERTIES"
              value={formInputs.INBOUNDPROPERTIES}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
              rows={4}
            />
            <label htmlFor="DOMAINID" className="text-gray-500 text-[10px]">
              DOMAINID
            </label>
            <input
              type="text"
              name="DOMAINID"
              value={formInputs.DOMAINID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="STATUS" className="text-gray-500 text-[10px]">
              STATUS
            </label>
            <input
              type="text"
              name="STATUS"
              value={formInputs.STATUS}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="CREATEDBY" className="text-gray-500 text-[10px]">
              CREATEDBY
            </label>
            <input
              type="text"
              name="CREATEDBY"
              value={formInputs.CREATEDBY}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] default-cursor bg-gray-100"
              readOnly
            />
            <label htmlFor="CREATEDON" className="text-gray-500 text-[10px]">
              CREATEDON
            </label>
            <input
              type="text"
              name="CREATEDON"
              value={formInputs.CREATEDON}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] default-cursor bg-gray-100"
            />
            <label htmlFor="UPDATEDBY" className="text-gray-500 text-[10px]">
              UPDATEDBY
            </label>
            <input
              type="text"
              name="UPDATEDBY"
              value={formInputs.UPDATEDBY}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] default-cursor bg-gray-100"
              readOnly
            />
            <label htmlFor="UPDATEDON" className="text-gray-500 text-[10px]">
              UPDATEDON
            </label>
            <input
              type="text"
              name="UPDATEDON"
              value={formInputs.UPDATEDON}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] default-cursor bg-gray-100"
              readOnly
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
