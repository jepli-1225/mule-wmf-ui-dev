export type InboundEvent = {
  TRANSACTIONID: string;
  INSTANCEID: string;
  INTERFACEID: string;
  BUSINESSEVENT: string;
  SOURCESYSTEM: string;
  TARGETSYSTEM: string;
  INBOUNDPROPERTIES: string;
  INBOUNDCONTENT: string | { type: string; data: number[] };
  DOMAINID: string;
  STATUS: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
};

export type ErrorEvent = {
  ERRORID: string;
  ERRORTITLE: string;
  ERRORDETAIL: string;
  ERRORCONTENT: string;
  STATUS: string;
  RELATEDINBOUNDINSTANCE: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
};

export type OutboundEvent = {
  TRANSACTIONID: string;
  BUSINESSEVENT: string;
  OUTBOUNDCONTENT: string;
  STATUS: string;
  INSTANCEID: string;
  INTERFACEID: string;
  TARGETSYSTEM: string;
  DOMAINID: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
};

export type Domains = {
  ID: number;
  DOMAINID: string;
  DOMAINDESCRIPTION: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
};

export type NotifConfig = {
  ID: number;
  INTERFACEID: string;
  BUSINESSEVENT: string;
  SOURCESYSTEM: string;
  DOMAINID: string;
  RECIPIENTTO: string;
  RECIPIENTCC: string;
  EMAILSUBJECT: string;
  EMAILTEMPLATE: string;
  TRIGGERCONDITION: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
  NOTIFICATIONKEY: string;
  DESCRIPTION: string;
};

export type InterfaceConfig = {
  ID: number;
  INTERFACEID: string;
  CREATEDBY: string;
  CREATEDON: string;
  UPDATEDBY: string;
  UPDATEDON: string;
  SOURCESYSTEM: string;
  DESTINATIONVALUE: string;
  DESTINATIONTYPE: string;
  BUSINESSEVENT: string;
  DESCRIPTION: string;
  DOMAINID: string;
  REPLAYABLE: boolean;
  TARGETSYSTEM: string;
  MESSAGEPROPERTIES: string;
};

export type InterfacePermissions = {
  ID: number;
  INTERFACECONFIG: number;
  USER: number;
  VIEW: boolean;
  DOWNLOAD: boolean;
  REPLAY: boolean;
};

export type User = {
  userName: string;
  userID: string;
};

export type DomainList = string;
