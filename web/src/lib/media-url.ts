import { withLocalProxy } from "@/stores/use-config-store";

const EPHEMERAL_MEDIA_HOST = /(\.volces\.com|\.volcengine\.com)$/i;

export function isPublicHttpUrl(value?: string) {
    if (!value || !/^https?:\/\//i.test(value)) return "";
    try {
        const hostname = new URL(value).hostname;
        if (hostname === "localhost" || hostname === "127.0.0.1" || hostname === "0.0.0.0" || hostname === "[::1]") return "";
        return value;
    } catch {
        return "";
    }
}

export function isEphemeralMediaUrl(value?: string) {
    const url = isPublicHttpUrl(value);
    if (!url) return "";
    try {
        return EPHEMERAL_MEDIA_HOST.test(new URL(url).hostname) ? url : "";
    } catch {
        return "";
    }
}

export function isStablePublicUrl(value?: string) {
    const url = isPublicHttpUrl(value);
    return url && !isEphemeralMediaUrl(url) ? url : "";
}

export function sameOriginMediaUrl(value: string) {
    const ephemeral = isEphemeralMediaUrl(value);
    if (!ephemeral) return value;
    const parsed = new URL(ephemeral);
    return `/__tos/${parsed.hostname}${parsed.pathname}${parsed.search}`;
}

export function fetchableMediaUrl(value: string) {
    if (!value || value.startsWith("blob:") || value.startsWith("data:") || value.startsWith("/")) return value;
    const rewritten = sameOriginMediaUrl(value);
    if (rewritten !== value) return rewritten;
    return withLocalProxy(value);
}
