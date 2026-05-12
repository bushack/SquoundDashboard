
export type SafeResult<T> = 
    | {success: true, data: T}
    | {success: false, error: unknown};