import { nanoid } from "nanoid";

export type PromptSource = {
    id: string;
    name: string;
    url: string;
    homepage: string;
    enabled: boolean;
    builtIn: boolean;
};

export const PROMPT_REGISTRY_HOMEPAGE = "https://github.com/yukkcat/image-prompts";

export function createPromptSource(source?: Partial<PromptSource>): PromptSource {
    return {
        id: source?.id?.trim() || nanoid(),
        name: source?.name?.trim() || "",
        url: source?.url?.trim() || "",
        homepage: source?.homepage?.trim() || "",
        enabled: source?.enabled ?? true,
        builtIn: source?.builtIn ?? false,
    };
}

// Built-in prompt sources are deliberately empty in this build: the seven upstream collections that
// shipped by default (Banana Prompt Quicker, DavidWu GPT Image 2, Freestylefly GPT Image 2,
// Awesome GPT Image, Awesome GPT-4o, YouMind GPT Image 2, YouMind Nano Banana Pro) were removed on
// request. The store rebuilds this list on every load, so entries must be re-added here to restore
// them; each one is `<name>` pointing at
// https://raw.githubusercontent.com/yukkcat/image-prompts/main/dist/sources/<id>.json with
// builtIn: true. Custom sources added from the UI are unaffected.
export const DEFAULT_PROMPT_SOURCES: PromptSource[] = [];
