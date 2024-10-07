import React, { useState } from "react";
import { PencilIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";

interface Permission {
  ID: number;
  USER: number;
  userName: string;
  VIEW: boolean;
  DOWNLOAD: boolean;
  REPLAY: boolean;
}

interface PermissionsTableProps {
  permissions: Permission[];
  userNames: string[];
  onSaveNewPermission: (newPermission: Omit<Permission, "ID">) => void;
}

const PermissionsTable: React.FC<PermissionsTableProps> = ({
  permissions,
  userNames,
  onSaveNewPermission,
}) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newPermission, setNewPermission] = useState<Omit<Permission, "ID">>({
    USER: 0,
    userName: "",
    VIEW: false,
    DOWNLOAD: false,
    REPLAY: false,
  });

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      setSelectedRows(permissions.map((p) => p.ID));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectRow = (id: number) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleAddNew = () => {
    setIsAddingNew(true);
  };

  const handleCancelNew = () => {
    setIsAddingNew(false);
    setNewPermission({
      USER: 0,
      userName: "",
      VIEW: false,
      DOWNLOAD: false,
      REPLAY: false,
    });
  };

  const handleSaveNew = () => {
    onSaveNewPermission(newPermission);
    setIsAddingNew(false);
    setNewPermission({
      USER: 0,
      userName: "",
      VIEW: false,
      DOWNLOAD: false,
      REPLAY: false,
    });
  };

  const handleNewPermissionChange = (
    field: keyof Omit<Permission, "ID">,
    value: string | boolean
  ) => {
    setNewPermission((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className={isAddingNew ? "pb-40" : ""}>
      <div className="flex">
        <button
          onClick={handleAddNew}
          className="text-[10px] text-yellow-600 pr-3 pb-1 hover:text-yellow-800"
        >
          New Interface Permission
        </button>
        <h1
          className={`text-[10px] hover:text-yellow-600 ${
            selectedRows.length === 0 ? "text-gray-400" : "text-yellow-600"
          }`}
        >
          Delete Selected Interface Permissions
        </h1>
      </div>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 text-left font-medium text-gray-500 uppercase tracking-wider text-center align-middle">
              <label className="custom-checkbox inline-block">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                />
                <span className="checkmark"></span>
              </label>
            </th>
            <th className="py-3 text-left text-[12px] font-medium text-gray-500 uppercase">
              User
            </th>
            <th className="py-3 text-center text-[12px] font-medium text-gray-500 uppercase">
              View
            </th>
            <th className="py-3 text-center text-[12px] font-medium text-gray-500 uppercase">
              Download
            </th>
            <th className="py-3 text-center text-[12px] font-medium text-gray-500 uppercase">
              Replay
            </th>
          </tr>
        </thead>
        <tbody>
          {isAddingNew && (
            <tr>
              <td className="w-6 text-left text-[11px] font-medium text-gray-500 tracking-wider text-center align-middle border border-bottom-gray">
                <button
                  onClick={handleSaveNew}
                  className="text-green-600 hover:text-green-800 mr-2"
                >
                  <CheckIcon className="h-5 w-5" />
                </button>
                <button
                  onClick={handleCancelNew}
                  className="text-red-600 hover:text-red-800"
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </td>
              <td>
                <select
                  value={newPermission.userName}
                  onChange={(e) =>
                    handleNewPermissionChange("userName", e.target.value)
                  }
                  className="w-full p-1 border border-gray-300 rounded text-[11px]"
                >
                  <option value="">Select a user</option>
                  {userNames.map((userName, index) => (
                    <option key={index} value={userName}>
                      {userName}
                    </option>
                  ))}
                </select>
              </td>
              {["VIEW", "DOWNLOAD", "REPLAY"].map((field) => (
                <td
                  key={field}
                  className="px-6 pt-1 whitespace-nowrap items-center text-center"
                >
                  <label className="custom-checkbox">
                    <input
                      type="checkbox"
                      // checked={
                      //   newPermission[field as keyof typeof newPermission]
                      // }
                      onChange={(e) =>
                        handleNewPermissionChange(
                          field as keyof typeof newPermission,
                          e.target.checked
                        )
                      }
                    />
                    <span className="checkmark"></span>
                  </label>
                </td>
              ))}
            </tr>
          )}
          {permissions.map((permission) => (
            <tr key={permission.ID}>
              <td className="w-6 text-left text-[11px] font-medium text-gray-500 tracking-wider text-center align-middle border border-bottom-gray">
                <label className="custom-checkbox inline-block">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(permission.ID)}
                    onChange={() => handleSelectRow(permission.ID)}
                  />
                  <span className="checkmark"></span>
                </label>
              </td>
              <td className="px-6 py-4 whitespace-nowrap ">
                {permission.userName}
              </td>
              <td className="px-6 py-4 capitalize whitespace-nowrap">
                {permission.VIEW.toString()}
              </td>
              <td className="px-6 py-4 capitalize whitespace-nowrap">
                {permission.DOWNLOAD.toString()}
              </td>
              <td className="px-6 py-4 capitalize whitespace-nowrap">
                {permission.REPLAY.toString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PermissionsTable;
