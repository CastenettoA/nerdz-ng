import { UserInfo } from "../user/user-info.model";

export interface Post {
    bookmarkers: number;
    canBookmark: boolean;
    canComment: boolean;
    canDelete: boolean;
    canEdit: boolean;
    canLurk: boolean;
    closed: boolean;
    comments: number;
    from: UserInfo;
    hpid: number;
    lang: string;
    lurkers: number;
    message: string;
    news: boolean;
    pid: number;
    rate: number;
    revisions: number;
    time: string;
    timestamp: number;
    to: UserInfo;
    type: string;
    url: string;
   }