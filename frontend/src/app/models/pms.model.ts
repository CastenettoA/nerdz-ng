export interface Pm {
      from: {
        id: number;
        owner: unknown;
        name: string;
        username: string;
        website: string;
        image: string;
        closed: boolean;
        type: string;
        board: string;
    },
      lastMessage: string;
      time: string;
      timestamp: number;
      to: {
        id: number;
        owner: unknown;
        name: string;
        username: string;
        website: string;
        image: string;
        closed: boolean;
        type: string;
        board: string;
    },
      toRead: boolean;
  }