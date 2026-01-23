import api from ".";
import type { RegisterEmailParams, ResetEmailParams } from "@/types/api/userRouterTypes";

export const registerEmail = async (params: RegisterEmailParams) => {
    try{
        const response = await api.post("/user/register", params);
        return response.data;
    }
    catch(error){
        console.error(error);
        throw error;
    }
};
export const resetEmail = async (params: ResetEmailParams) => {
    try{
        const response = await api.delete("/user", { data: params });
        return response.data;
    }
    catch(error){
        console.error(error);
        throw error;
    }
};