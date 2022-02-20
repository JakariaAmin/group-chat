import User from "@/data/interface/User";
import {ChatStatus} from "@/data/enum/ChatStatus";

/**
 * Chat:
 */
export default interface Chat {
    readonly id: number;
    message?: string;
    timestamp?: string;

    status?: ChatStatus;

    user?: User;
}
