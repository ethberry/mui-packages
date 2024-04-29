import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import type { RootState, AppDispatch } from "./store";

// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
