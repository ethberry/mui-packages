import { FieldValues, ResolverOptions, ResolverResult } from "react-hook-form";
import { AnyObjectSchema, lazy } from "yup";

type Options<T extends AnyObjectSchema | ReturnType<typeof lazy<any, any>>> = Parameters<T["validate"]>[1];

export type Resolver = <T extends AnyObjectSchema | ReturnType<typeof lazy<any>>>(
  schema: T,
  schemaOptions?: Options<T>,
  factoryOptions?: { mode?: "async" | "sync"; rawValues?: boolean },
) => <TFieldValues extends FieldValues, TContext>(
  values: TFieldValues,
  context: TContext | undefined,
  options: ResolverOptions<TFieldValues>,
) => Promise<ResolverResult<TFieldValues>>;
