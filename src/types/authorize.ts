export interface IAuthorizeUrl {
  csrfState: string;
  codeVerifier: string;
  codeChallenge: string;
  url: string;
}
