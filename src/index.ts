import {DEFAULT_HOST} from './common/constants';
import createRequestInstance, {type RequestInstance} from './common/request';

// Import all API functions
import {oauth} from './lib/oauth'; // OAuth 관련 API
import {gameLink} from './lib/game-link'; // 게임 연동 관련 API

/**
 * Waktaverse Games - Backend SDK Class.
 *
 * @param {string} host - Host URL.
 * @default host = "https://waktaverse.games"
 *
 * @example
 * const wakgames = new WakGames({
 *  clientId: 'wakttu',
 *  redirectUrl: 'https://example.com/callback',
 * })
 */
export class WakGames {
  host: string;
  clientId: string;
  redirectUrl: string;

  public declare oauth: ReturnType<typeof oauth>;
  public declare gameLink: ReturnType<typeof gameLink>;
  private declare _request: RequestInstance;

  constructor(options: {host?: string; clientId: string; redirectUrl: string}) {
    this.host = options.host || DEFAULT_HOST;
    this.clientId = options.clientId;
    this.redirectUrl = options.redirectUrl;
    this._request = createRequestInstance(this.host);

    this._init();
  }

  private _init() {
    // init all API functions
    this.oauth = oauth(
      this._request,
      this.host,
      this.clientId,
      this.redirectUrl
    );

    this.gameLink = gameLink(this._request);
  }
}
