import {DEFAULT_HOST} from '../common/constants';
import type {RequestInstance} from '../common/request';

import {createRandomKey} from '../common/utils/random';
import {generateCodeChallenge} from '../common/utils/sha';
import {IAuthorize} from '../types/authorize';

import type {operations, paths} from '../types/api'; // generated by openapi-typescript

/**
 * OAuth API
 * @description 로그인과 관련된 API 기능을 제공합니다.
 */
export const oauth = (
  _request: RequestInstance,
  clientId: string,
  redirectUrl: string
): {
  authorize: () => IAuthorize;

  token: (
    query: operations['OAuthController_getToken']['parameters']['query']
  ) => ReturnType<typeof _request.POST>;

  refresh: (Authorization: string) => ReturnType<typeof _request.GET>;
} => {
  return {
    /**
     * OAuth 인증
     * @description OAuth 인증을 수행합니다.
     */
    authorize: () => {
      const csrfState = createRandomKey(16);
      const codeVerifier = createRandomKey(128);
      const codeChallenge = generateCodeChallenge(codeVerifier);

      const queryParams: operations['OAuthController_authorize']['parameters']['query'] =
        {
          responseType: 'code',
          clientId,
          callbackUri: redirectUrl,
          state: csrfState,
          challengeMethod: 'S256',
          challenge: codeChallenge,
        };

      return {
        csrfState,
        codeVerifier,
        codeChallenge,
        url: `${DEFAULT_HOST}/oauth/authorize?${new URLSearchParams(
          queryParams
        ).toString()}`,
      } as IAuthorize;
    },

    /**
     * OAuth 토큰 발급
     * @description OAuth 토큰을 발급합니다.
     */
    token: (
      query: paths['/api/oauth/token']['post']['parameters']['query']
    ) => {
      return _request.POST('/api/oauth/token', {params: {query}});
    },

    /**
     * OAuth 토큰 갱신
     * @description OAuth Refresh 토큰을 사용하여 OAuth 토큰을 갱신합니다.
     *
     * @param {string} Authorization - JWT Refresh 토큰 값입니다. 이미 Bearer가 Prefix로 붙어있어, 토큰값을 바로 넣으시면 됩니다.
     */
    refresh: (Authorization: string) => {
      return _request.GET('/api/oauth/refresh', {
        headers: {
          Authorization: `Bearer ${Authorization}`,
        },
      });
    },
  };
};
