import {TUser} from "~/types/user.types";

export type TRequest = {
    url: string;
    method?: "GET" | "POST" | "PUT" | "DELETE";
    data?: any;
    params?: any;
    headers?: any;
    responseType?: "json" | "blob";
    user: TUser;
    timeout?: number;
}