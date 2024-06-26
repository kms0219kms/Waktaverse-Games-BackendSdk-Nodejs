export interface IAuthorize {
  csrfState: string;
  codeVerifier: string;
  codeChallenge: string;
  url: string;
}
