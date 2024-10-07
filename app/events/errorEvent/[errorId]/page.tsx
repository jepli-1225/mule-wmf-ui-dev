"use client";

import { ErrorEvent, InboundEvent } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { ViewPopup } from "@/app/ui/events/errorEvent/buttons";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { XMarkIcon } from "@heroicons/react/16/solid";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

const bufferToString = (bufferObj: any): string => {
  if (
    bufferObj &&
    typeof bufferObj === "object" &&
    bufferObj.type === "Buffer" &&
    Array.isArray(bufferObj.data)
  ) {
    return Buffer.from(bufferObj.data).toString("utf-8");
  }
  if (bufferObj && typeof bufferObj === "object") {
    return JSON.stringify(bufferObj);
  }
  return String(bufferObj);
};

const customStyles = {
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    maxWidth: "80vh",
    maxHeight: "80vh",
    overflow: "auto",
  },
};

export default function ErrorDetails({
  params,
}: {
  params: { errorId: string };
}) {
  const router = useRouter();
  const [errorEvent, setErrorEvents] = useState<ErrorEvent | null>(null);
  const [relatedInboundEvent, setRelatedInboundEvent] =
    useState<InboundEvent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isInboundLoading, setIsInboundLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [formInputs, setFormInputs] = useState<Partial<ErrorEvent>>({
    ERRORTITLE: "",
    ERRORDETAIL: "",
    STATUS: "",
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
    //   !formInputs.ERRORTITLE ||
    //   formInputs.ERRORTITLE.trim() === "" ||
    //   !formInputs.ERRORDETAIL ||
    //   formInputs.ERRORDETAIL.trim() === "" ||
    //   !formInputs.STATUS ||
    //   formInputs.STATUS.trim() === ""
    // ) {
    //   alert("field cannot be empty.");
    //   return false;
    // }
    return true;
  };

  useEffect(() => {
    const fetchErrorEvent = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/events/errorEvents/${params.errorId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch error events");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setErrorEvents(data.errorEvent);
        setFormInputs(data.errorEvent);
      } catch (err) {
        setError("Error fetching error event");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchErrorEvent();
  }, [params.errorId]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty()) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/events/errorEvents/${params.errorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update Error Event");
      }

      const updatedData = await response.json();
      setErrorEvents(updatedData.errorEvent);

      setIsLoading(false);
      alert("Error event updated successfully :)");
    } catch (error) {
      console.error("Error updating Error Event:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/events/errorEvent");
  };

  const fetchInboundEvent = async () => {
    setIsInboundLoading(true);
    try {
      const response = await fetch(
        `/api/events/inboundEvents/${errorEvent?.RELATEDINBOUNDINSTANCE}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch inbound event");
      }
      const data = await response.json();
      setRelatedInboundEvent(data.inboundEvent);
    } catch (err) {
      console.error("Error fetching inbound event:", err);
      setError("Error fetching inbound event");
    } finally {
      setIsInboundLoading(false);
    }
  };

  const handleViewClick = () => {
    setIsOpen(true);
    fetchInboundEvent();
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={`Error Event - ${errorEvent ? errorEvent.ERRORID : `Loading...`}`}
      isLoading={isLoading}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center justify-between gap-2 pt-2"
        >
          <ul className="text-sm grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <label htmlFor="ERRORTITLE" className="text-gray-500 text-[10px]">
              ERRORTITLE
            </label>
            <textarea
              name="ERRORTITLE"
              value={formInputs.ERRORTITLE}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px] text-[11px]"
              rows={4}
            />
            <label htmlFor="ERRORDETAIL" className="text-gray-500 text-[10px]">
              ERRORDETAIL
            </label>
            <textarea
              name="ERRORDETAIL"
              value={formInputs.ERRORDETAIL}
              onChange={handleInputChange}
              className="w-full border border-gray-300 p-2 resize-y min-h-[100px] text-[11px]"
              rows={4}
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
            <li className="text-gray-500 text-[10px]">
              RELATEDINBOUNDINSTANCE
            </li>
            <li className="flex">
              <div>
                <ViewPopup onClick={handleViewClick} />
              </div>
              <Modal
                isOpen={isOpen}
                onRequestClose={() => setIsOpen(false)}
                style={customStyles}
              >
                <h1>
                  <div className="flex justify-between items-center">
                    <div className="text-xl">Viewing Content</div>
                    <div
                      onClick={() => setIsOpen(false)}
                      className="cursor-pointer"
                    >
                      <XMarkIcon className="h-5 w-5 text-red-500 hover:text-gray-700" />
                    </div>
                  </div>
                  {isInboundLoading ? (
                    <div className="flex justify-center items-center h-20">
                      <p className="text-lg">Loading...</p>
                    </div>
                  ) : (
                    <div>
                      <ul className="flex items-center justify-between md:mt-4 grid grid-cols-12 gap-x-2">
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Instance
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.INSTANCEID}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Interface
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.INTERFACEID}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Business Event
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.BUSINESSEVENT}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Source System
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.SOURCESYSTEM}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Domain
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.DOMAINID}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-2 mr-2 text-[10px]">
                          Status
                        </li>
                        <input
                          type="text"
                          value={relatedInboundEvent?.STATUS}
                          className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px] col-span-4 default-cursor"
                          readOnly
                        />
                        <li className="text-gray-500 col-span-12 mt-2 text-[10px]">
                          Event Content
                        </li>
                        <textarea
                          value={bufferToString(
                            relatedInboundEvent?.INBOUNDCONTENT
                          )}
                          className="w-full border border-gray-300 p-2 resize-none min-h-[100px] text-[11px] col-span-12 mb-2"
                          style={{ cursor: "default" }}
                          rows={4}
                          readOnly
                        />
                        <li className="text-gray-500 col-span-12 text-[10px]">
                          Inbound Properties
                        </li>
                        <textarea
                          value={relatedInboundEvent?.INBOUNDPROPERTIES}
                          className="w-full border border-gray-300 p-2 resize-none min-h-[70px] text-[11px] col-span-12"
                          style={{ cursor: "default" }}
                          rows={4}
                          readOnly
                        />
                        <li className="flex items-center space-x-5 md:mt-4 pl-36">
                          <SaveDetails />
                          <div onClick={() => setIsOpen(false)}>
                            <button className="border border-gray-300 bg-white hover:bg-[#f6f6f6] hover:border-b text-[#c3a300] text-xs py-1 px-4 rounded border-b-2 border-b-[#d0d1d1]">
                              Cancel
                            </button>
                          </div>
                        </li>
                      </ul>
                    </div>
                  )}
                </h1>
              </Modal>
            </li>
            <li></li>
            <li></li>
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
