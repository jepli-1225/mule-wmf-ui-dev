"use client";

import { OutboundEvent } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { useEffect, useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

export default function OutboundDetails({
  params,
}: {
  params: { transactionId: string };
}) {
  const router = useRouter();
  const [outboundEvent, setOutboundEvent] = useState<OutboundEvent | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formInputs, setFormInputs] = useState({
    BUSINESSEVENT: "",
    STATUS: "",
    INSTANCEID: "",
    INTERFACEID: "",
    TARGETSYSTEM: "",
    DOMAINID: "",
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
    //   !formInputs.BUSINESSEVENT ||
    //   formInputs.BUSINESSEVENT.trim() === "" ||
    //   !formInputs.STATUS ||
    //   formInputs.STATUS.trim() === "" ||
    //   !formInputs.INSTANCEID ||
    //   formInputs.INSTANCEID.trim() === "" ||
    //   !formInputs.INTERFACEID ||
    //   formInputs.INTERFACEID.trim() === "" ||
    //   !formInputs.TARGETSYSTEM ||
    //   formInputs.TARGETSYSTEM.trim() === "" ||
    //   !formInputs.DOMAINID ||
    //   formInputs.DOMAINID.trim() === "" ||
    //   !formInputs.CREATEDBY ||
    //   formInputs.CREATEDBY.trim() === "" ||
    //   !formInputs.CREATEDON ||
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
    const fetchOutboundEvent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/events/outboundEvents/${params.transactionId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch outbound events");
        }
        const data = await response.json();
        setOutboundEvent(data.outboundEvent);
        setFormInputs(data.outboundEvent);
      } catch (err) {
        setError("Error fetching outbound event");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOutboundEvent();
  }, [params.transactionId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty()) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/events/outboundEvents/${params.transactionId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Outbound Event");
      }

      const updatedData = await response.json();
      setOutboundEvent(updatedData.outboundEvent);

      setIsLoading(false);
      alert("Outbound event updated successfully :)");
    } catch (error) {
      console.error("Error updating Outbound Event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/events/outboundEvent");
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={
        outboundEvent?.BUSINESSEVENT
          ? outboundEvent.BUSINESSEVENT
          : `Loading...`
      }
      isLoading={isLoading}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-2 flex items-center justify-between gap-2 pt-2 text-[10px]"
        >
          <ul className="grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <li className="text-gray-500">TRANSACTIONID <span className="text-red-600 text-[11px]">*</span></li>
            <li>{outboundEvent ? `${outboundEvent.TRANSACTIONID}` : ``}</li>
            <label htmlFor="BUSINESSEVENT" className="text-gray-500">
              BUSINESSEVENT
            </label>
            <input
              type="text"
              name="BUSINESSEVENT"
              value={formInputs.BUSINESSEVENT}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="STATUS" className="text-gray-500">
              STATUS
            </label>
            <input
              type="text"
              name="STATUS"
              value={formInputs.STATUS}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
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
            <label htmlFor="INTERFACEID" className="text-gray-500">
              INTERFACEID
            </label>
            <input
              type="text"
              name="INTERFACEID"
              value={formInputs.INTERFACEID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="TARGETSYSTEM" className="text-gray-500">
              TARGETSYSTEM
            </label>
            <input
              type="text"
              name="TARGETSYSTEM"
              value={formInputs.TARGETSYSTEM}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="DOMAINID" className="text-gray-500">
              DOMAINID
            </label>
            <input
              type="text"
              name="DOMAINID"
              value={formInputs.DOMAINID}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="CREATEDBY" className="text-gray-500">
              CREATEDBY
            </label>
            <input
              type="text"
              name="CREATEDBY"
              value={formInputs.CREATEDBY}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="CREATEDON" className="text-gray-500">
              CREATEDON
            </label>
            <input
              type="text"
              name="CREATEDON"
              value={formInputs.CREATEDON}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="UPDATEDBY" className="text-gray-500">
              UPDATEDBY
            </label>
            <input
              type="text"
              name="UPDATEDBY"
              value={formInputs.UPDATEDBY}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="UPDATEDON" className="text-gray-500">
              UPDATEDON
            </label>
            <input
              type="text"
              name="UPDATEDON"
              value={formInputs.UPDATEDON}
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
