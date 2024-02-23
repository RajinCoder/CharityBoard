
/**
 * Creating interfaces to easily accept the json data
 */

export interface listing {
    listingId: number;
    created_at: string;
    name: string;
    address: string;
    contact: string;
    saved: boolean;
    tags: { needs: string[] };
    user_id: string;
  }

  export interface orginization {
    org_uuid: string;
    orgname: string;
    contact: string;
    address: string;
    email: string;
    missionStatement: string;
  }

  export interface SignUpFormData {
    email: string;
    password: string;
  }

  export interface OrgFormData {
    email: string;
    password: string;
    organizationName: string;
    address: string;
    phoneNumber: string;
  }