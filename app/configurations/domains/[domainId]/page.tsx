"use client";

import { Domains } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { Delete } from "@/app/ui/configurations/domains/buttons";
import { useEffect, useState } from "react";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

export default function DomainDetails({
  params,
}: {
  params: { domainId: string };
}) {
  const router = useRouter();
  const [domainConfig, setDomainConfig] = useState<Domains | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formInputs, setFormInputs] = useState<Partial<Domains>>({
    DOMAINID: "",
    DOMAINDESCRIPTION: "",
  });

  useEffect(() => {
    const fetchDomainConfig = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/configurations/domains/${params.domainId}`
        );
        if (!response.ok)
          throw new Error("Failed to fetch domain configuration");
        const data = await response.json();
        if (data.error) throw new Error(data.error);
        setDomainConfig(data.domainConfig);
        setFormInputs(data.domainConfig);
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDomainConfig();
  }, [params.domainId]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormInputs((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isNotEmpty = (formInputs: Partial<Domains>): boolean => {
    const requiredFields: (keyof Partial<Domains>)[] = [
      "DOMAINID",
      "DOMAINDESCRIPTION",
    ];

    // for (const field of requiredFields) {
    //   if (!formInputs[field]) {
    //     alert(`${field} cannot be empty.`);
    //     return false;
    //   }
    // }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty(formInputs)) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/configurations/domains/${params.domainId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formInputs),
        }
      );
      if (!response.ok)
        throw new Error("Failed to update Domain configuration");
      const updatedData = await response.json();
      setDomainConfig(updatedData.domainConfig);
      setIsLoading(false);
      alert("Domain configuration updated successfully :)");
    } catch (error) {
      console.error("Error updating Domain configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${formInputs.DOMAINID}?`
    );
    if (confirmDelete) {
      try {
        setIsLoading(true);
        const response = await fetch(
          `/api/configurations/domains/${params.domainId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok)
          throw new Error("Failed to delete domain configuration");
        alert("Domain configuration deleted successfully :)");
        router.push("/configurations/domains");
      } catch (error) {
        console.error("Error deleting Domain configuration:", error);
        alert("Unable to delete domain");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/domains");
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={domainConfig?.DOMAINID || "Loading..."}
      extraButton={<Delete onClick={handleDelete} />}
      isLoading={isLoading}
    >
      <div>
        <form
          onSubmit={handleSubmit}
          className="mt-4 flex items-center justify-between gap-2 pt-2 text-[10px]"
        >
          <ul className=" grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
            <label htmlFor="DOMAINID" className="text-gray-500 ">
              DOMAINID
            </label>
            <input
              type="text"
              name="DOMAINID"
              value={formInputs.DOMAINID || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <label htmlFor="DOMAINDESCRIPTION" className="text-gray-500 ">
              DOMAINDESCRIPTION
            </label>
            <input
              type="text"
              name="DOMAINDESCRIPTION"
              value={formInputs.DOMAINDESCRIPTION || ""}
              onChange={handleInputChange}
              className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
            />
            <li></li>
            <li className="flex space-x-3 mt-4">
              <SaveDetails />
              <CancelDetails onClick={handleCancel} />
            </li>
          </ul>
        </form>
      </div>
    </DetailsPageLayout>
  );
}
