export interface BasicResponse<T1> {
    data: T1;
    message: string;
    humanMessage: string;
    status: number;
    success: boolean;
}

