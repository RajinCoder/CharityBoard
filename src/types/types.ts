
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