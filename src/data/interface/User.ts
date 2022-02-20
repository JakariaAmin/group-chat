import Chat from "@/data/interface/Chat";

/**
 * User:
 */
export default interface User {
    readonly id: string;
    name?: string;
    phoneNumber?: string;
    avatar?: string;
    chats?: Chat[];
    isActive?: boolean;
}
