// Wakgames SDK 불러오기
import {WakGames} from '../src';

// WakGames 클래스 인스턴스 생성 + clientId/redirectUrl 지정
const wakgames = new WakGames({
  clientId: 'wakttu',
  redirectUrl: 'https://example.com/callback',
});

// getAuthorizeUrl 함수 호출
console.log('Authorize URL:', wakgames.oauth.getAuthorizeUrl());
