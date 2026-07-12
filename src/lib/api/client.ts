// Requests are same-origin: this app's own next.config.ts rewrites /api/*
// server-side to the real backend, so the browser only ever talks to this
// origin and the admin session cookie is first-party here. No base URL is
// needed client-side.

export type ApiErrorPayload = {
  code: string;
  message: string;
  fields?: Record<string, string>;
};

/** Thrown for any non-2xx response, or when the request can't reach the API. */
export class ApiError extends Error {
  status: number;
  code: string;
  fields?: Record<string, string>;

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message);
    this.status = status;
    this.code = payload.code;
    this.fields = payload.fields;
  }
}

type Envelope<T> = {
  data?: T;
  error?: ApiErrorPayload;
  meta?: Record<string, unknown>;
};

export async function apiRequest<T>(
  path: string,
  init?: RequestInit,
): Promise<{ data: T; meta?: Record<string, unknown> }> {
  let res: Response;
  try {
    res = await fetch(path, {
      ...init,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...init?.headers,
      },
    });
  } catch {
    throw new ApiError(0, {
      code: "network_error",
      message: "Could not reach the server. Please check your connection and try again.",
    });
  }

  const body: Envelope<T> | null = await res.json().catch(() => null);

  if (!res.ok) {
    throw new ApiError(
      res.status,
      body?.error ?? {
        code: "unknown_error",
        message: "Something went wrong. Please try again.",
      },
    );
  }

  return { data: body?.data as T, meta: body?.meta };
}
