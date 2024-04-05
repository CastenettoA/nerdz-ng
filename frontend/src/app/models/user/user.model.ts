import { UserInfo } from "./user-info.model";
import { UserPersonal } from "./user-personal.model";
import { UserContacts } from "./user.contacts";

export interface User  {
      contacts: UserContacts;
      info: UserInfo;
      personal: UserPersonal;
}