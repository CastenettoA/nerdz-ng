export interface Lurk {
  counter: number;
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
  hpid: number;
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