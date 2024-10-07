"use client";

import { InterfaceConfig } from "@/app/lib/definitions";
import { SaveDetails, CancelDetails } from "@/app/ui/buttons";
import { SaveNewDetails } from "@/app/ui/configurations/interfaceConfig/buttons";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import Modal from "react-modal";
import PermissionsTable from "@/app/ui/configurations/interfaceConfig/permissionsTable";
import DetailsPageLayout from "@/app/ui/detailsPageLayout";
import { useRouter } from "next/navigation";

interface UserPermission {
  ID: number;
  USER: number;
  userName: string;
  VIEW: boolean;
  DOWNLOAD: boolean;
  REPLAY: boolean;
}

export default function InterfaceDetails({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();
  const [interfaceConfig, setInterfaceConfig] =
    useState<InterfaceConfig | null>(null);
  const [permissions, setPermissions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [checkedView, setCheckedView] = useState(false);
  const [checkedDownload, setCheckedDownload] = useState(false);
  const [checkedReplay, setCheckedReplay] = useState(false);
  const [userNames, setUserNames] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [formInputs, setFormInputs] = useState<Partial<InterfaceConfig>>({
    INTERFACEID: "",
    SOURCESYSTEM: "",
    TARGETSYSTEM: "",
    DESTINATIONVALUE: "",
    DESTINATIONTYPE: "",
    BUSINESSEVENT: "",
    MESSAGEPROPERTIES: "",
    DESCRIPTION: "",
    DOMAINID: "",
    REPLAYABLE: false,
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

  const handleChangeView = () => {
    setCheckedView(!checkedView);
  };
  const handleChangeDownload = () => {
    setCheckedDownload(!checkedDownload);
  };
  const handleChangeReplay = () => {
    setCheckedReplay(!checkedReplay);
  };
  const [isOpen, setIsOpen] = useState(false);
  const resetCheckboxes = () => {
    setCheckedView(false);
    setCheckedDownload(false);
    setCheckedReplay(false);
    setSelectedUser("");
  };

  const handleSelectedUsersChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedUser(event.target.value);
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
      width: "80vh",
      height: "37vh",
      maxWidth: "80vh",
      maxHeight: "40vh",
      overflow: "auto",
    },
  };

  const isNotEmpty = (formInputs: Partial<InterfaceConfig>): boolean => {
    const requiredFields: (keyof Partial<InterfaceConfig>)[] = ["INTERFACEID"];

    for (const field of requiredFields) {
      if (!formInputs[field]) {
        alert(`${field} cannot be empty.`);
        return false;
      }
    }
    return true;
  };

  useEffect(() => {
    const fetchInterfaceConfig = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/api/configurations/interfaceConfigs/${params.id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch interface configuration");
        }
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setInterfaceConfig(data.interfaceConfig);
        setPermissions(data.permissions || []);
        setFormInputs(data.interfaceConfig);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInterfaceConfig();
  }, [params.id]);

  useEffect(() => {
    const fetchUserNames = async () => {
      try {
        const response = await fetch("/api/users");
        if (!response.ok) {
          throw new Error("Failed to fetch user names");
        }
        const data = await response.json();
        setUserNames(data);
      } catch (err) {
        console.error("Error fetching user names:", err);
      }
    };

    fetchUserNames();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isNotEmpty(formInputs)) return;
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/configurations/interfaceConfigs/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formInputs),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update interface configuration");
      }

      const updatedData = await response.json();
      setInterfaceConfig(updatedData.interfaceConfig);
      setIsLoading(false);
      alert("Interface configuration updated successfully :)");
    } catch (error) {
      console.error("Error updating interface configuration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    router.push("/configurations/interfaceConfig");
  };

  const handleSaveNewPermission = async (
    newPermission: Omit<UserPermission, "ID">
  ) => {
    try {
      const response = await fetch(
        `/api/configurations/interfaceConfigs/${params.id}/permissions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPermission),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to add new permission");
      }

      const updatedPermissions = await response.json();
      setPermissions(updatedPermissions);
    } catch (error) {
      console.error("Error adding new permission:", error);
      // Handle error (e.g., show an error message to the user)
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <DetailsPageLayout
      header={
        interfaceConfig?.INTERFACEID
          ? interfaceConfig?.INTERFACEID
          : `Loading...`
      }
      isLoading={isLoading}
    >
      <form
        onSubmit={handleSubmit}
        className="mt-4 flex items-center justify-between gap-2 pt-2 text-[10px]"
      >
        <ul className=" grid grid-cols-[auto,1fr] gap-x-14 gap-y-0.5 w-full max-w-2xl">
          <label htmlFor="INTERFACEID" className="text-gray-500 ">
            INTERFACEID <span className="text-red-600 text-[11px]">*</span>
          </label>
          <input
            type="text"
            name="INTERFACEID"
            value={formInputs.INTERFACEID}
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
          <label htmlFor="TARGETSYSTEM" className="text-gray-500 ">
            TARGETSYSTEM
          </label>
          <input
            type="text"
            name="TARGETSYSTEM"
            value={formInputs.TARGETSYSTEM}
            onChange={handleInputChange}
            className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
          />
          <label htmlFor="DESTINATIONVALUE" className="text-gray-500 ">
            DESTINATIONVALUE
          </label>
          <input
            type="text"
            name="DESTINATIONVALUE"
            value={formInputs.DESTINATIONVALUE}
            onChange={handleInputChange}
            className="w-full border border-gray-300 h-6 pl-2 pr-2 py-2 text-[11px]"
          />
          <label htmlFor="DESTINATIONTYPE" className="text-gray-500 ">
            DESTINATIONTYPE
          </label>
          <input
            type="text"
            name="DESTINATIONTYPE"
            value={formInputs.DESTINATIONTYPE}
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
          <label htmlFor="messageProperties" className="text-gray-500 ">
            MESSAGEPROPERTIES
          </label>
          <textarea
            name="MESSAGEPROPERTIES"
            value={formInputs.MESSAGEPROPERTIES}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 resize-y min-h-[100px]"
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
          <label htmlFor="REPLAYABLE" className="text-gray-500">
            REPLAYABLE
          </label>
          <li>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                name="REPLAYABLE"
                checked={formInputs.REPLAYABLE}
                onChange={handleInputChange}
              />
              <span className="checkmark"></span>
              <span className="ml-6"></span>
            </label>
          </li>
          <li></li>
          <li className="flex space-x-3 mt-4">
            <SaveDetails />
            <CancelDetails onClick={handleCancel} />
          </li>
        </ul>
      </form>
      {/* <div className="flex w-full items-center justify-between pt-4">
        <h1 className="text-lg">
          <strong>Interface Permissions</strong>
        </h1>
      </div>
      <div className="flex w-full items-left">
        <ul onClick={() => setIsOpen(true)}>
          <h1 className="text-xs text-yellow-600 pr-3 hover:text-yellow-800">
            New Interface Permission
          </h1>
        </ul>
        <Modal
          isOpen={isOpen}
          onRequestClose={() => {
            setIsOpen(false);
            resetCheckboxes();
          }}
          style={customStyles}
        >
          <h1>
            <div className="flex justify-between items-center">
              <div className="text-xl">Viewing Content</div>
              <div
                onClick={() => {
                  setIsOpen(false);
                  resetCheckboxes();
                }}
                className="cursor-pointer"
              >
                <XMarkIcon className="h-5 w-5 text-red-500 hover:text-gray-700" />
              </div>
            </div>
            <div>
              <ul className="text-xs grid grid-cols-2 gap-y-2">
                <li className="text-gray-500 pt-3">User</li>
                <li className="pt-3">
                  <select
                    value={selectedUser}
                    onChange={handleSelectedUsersChange}
                    className="w-full p-1 border border-gray-600 rounded bg-white"
                  >
                    <option value="">Select a user</option>
                    {userNames.map((userName, index) => (
                      <option key={index} value={userName}>
                        {userName}
                      </option>
                    ))}
                  </select>
                </li>
                <li className="text-gray-500">VIEW</li>
                <li>
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={checkedView}
                      onChange={handleChangeView}
                    />
                    <span className="checkmark"></span>
                    <span className="ml-6"></span>
                  </label>
                </li>
                <li className="text-gray-500">DOWNLOAD</li>
                <li>
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={checkedDownload}
                      onChange={handleChangeDownload}
                    />
                    <span className="checkmark"></span>
                    <span className="ml-6"></span>
                  </label>
                </li>
                <li className="text-gray-500">REPLAY</li>
                <li>
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      checked={checkedReplay}
                      onChange={handleChangeReplay}
                    />
                    <span className="checkmark"></span>
                    <span className="ml-6"></span>
                  </label>
                </li>
              </ul>
              <div className="flex justify-center space-x-3 pt-2 mt-2 text-xs">
                <SaveDetails />
                <SaveNewDetails />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    resetCheckboxes();
                  }}
                  className="bg-white text-yellow-600 px-2 py-1 rounded hover:bg-gray-300 border border-gray-400"
                >
                  Cancel
                </button>
              </div>
            </div>
          </h1>
        </Modal>
        <h1 className="text-xs text-gray-400 hover:text-yellow-600">
          Delete Selected Interface Permissions
        </h1>
      </div> */}
      <div className="flex w-full items-center justify-between pt-4">
        <h1 className="text-lg">
          <strong>Interface Permissions</strong>
        </h1>
      </div>
      <div className="pb-8 pr-4">
        <PermissionsTable
          permissions={permissions}
          userNames={userNames}
          onSaveNewPermission={handleSaveNewPermission}
        />
      </div>
    </DetailsPageLayout>
  );
}
