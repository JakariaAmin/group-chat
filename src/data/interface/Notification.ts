/**
 * Notification:
 */
import Chat from "@/data/interface/Chat";

export default interface Notification {
    readonly to: string;
    readonly notification?: {
        readonly title: string;
        readonly body: string;
        readonly sound: boolean;
        readonly priority: string;
    };
    readonly data: {
        readonly to: string,
        readonly chat?: Chat,
        readonly from?: string,
    };
}
