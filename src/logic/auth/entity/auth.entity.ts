// phone_number VARCHAR(50) NOT NULL,
// email VARCHAR(50) UNIQUE,
// username VARCHAR(50),
// phone_number_verified BOOLEAN NOT NULL DEFAULT false,
// email_verified BOOLEAN NOT NULL DEFAULT false,
// mfa_id VARCHAR(50),
// password VARCHAR(50),
// createdAt DATE,
// updatedAt DATE

import PartialInstantiable from "@core/utils/partial-instant";

export class BaseEntity<T> extends PartialInstantiable<T> {
    id: string;
    created_at: Date;
    updated_at: Date;
  }
  
export class User extends BaseEntity<User> {
     email: string;
     phone_number: string;
     firstName: string;
     lastName: string;
     username: string;
     password: string
}

export interface Login{ 
  email: string,
  password: string
}