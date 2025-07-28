export interface ApiRequestProps {
  url: string;
  token?: string;
}

export interface GetDataProps extends ApiRequestProps {
  // Prevent empty interface ESLint warning
  _?: unknown;
}

export interface PostDataProps extends ApiRequestProps {
  body: Record<string, unknown>;
}

export interface PatchDataProps extends PostDataProps {
  // Prevent empty interface ESLint warning
  _?: unknown;
}

export interface DeleteDataProps extends ApiRequestProps {
  // Prevent empty interface ESLint warning
  _?: unknown;
}

export interface FormDataProps extends ApiRequestProps {
  body: FormData;
}
