import User from "@/data/interface/User";
import {ChatStatus} from "@/data/enum/ChatStatus";

/**
 * Chat:
 */
export default interface Chat {
    readonly id: string;
    message?: string;
    timestamp?: string;

    status?: ChatStatus;

    user?: User;
}
