import type { FishType } from "./components/Fish/Fish";

export const FISH_SIZE_ORDER: FishType[] = ['xs', 's', 'm', 'l', 'xl'];

export const FISH_SIZE_MAP: Record<FishType, number> = {
    xs: 10,
    s: 20,
    m: 30,
    l: 40,
    xl: 50
}