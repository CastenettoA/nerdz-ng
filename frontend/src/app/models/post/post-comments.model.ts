export interface PostComment {
        canDelete: boolean;
        canEdit: boolean;
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
        hcid: number;
        hpid: number;
        lang: string;
        message: string;
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
      }
}