import Config from 'react-native-config'
import { authorize, refresh, revoke } from 'react-native-app-auth';

const config = {
  clientId: Config.OMRON_CLIENT_ID,
  clientSecret: Config.OMRON_CLIENT_SECRET,
  redirectUrl: Config.OMRON_REDIRECT_URL,
  scopes: ['openid'],
  tokenEndpointAuthMethod:"client_secret_post",
  autoState:false,
  state:Config.OMRON_TOKEN_STATE,
  autoNonce:false,
  nonce:null,
  useNonce:false,
  usePKCE:false,
  serviceConfiguration: {
    authorizationEndpoint: Config.OMRON_AUTH_URL,
    tokenEndpoint: Config.OMRON_TOKEN_URL,
    revocationEndpoint: Config.OMRON_TOKEN_URL,
  },
}

// const config = {
//   clientId: Config.OMRON_CLIENT_ID,
//   clientSecret: Config.OMRON_CLIENT_SECRET,
//   redirectUrl: Config.OMRON_REDIRECT_URL,
//   scopes: ['openid'],
//   clientAuthMethod: "post",
//   useNonce:false,
//   usePKCE:false,
//   serviceConfiguration: {
//     authorizationEndpoint: Config.OMRON_AUTH_URL,
//     tokenEndpoint: Config.OMRON_TOKEN_URL,
//     revocationEndpoint: Config.OMRON_TOKEN_URL,
//   },
//   // additionalParameters:{
//   //   prompt:"consent" //"login consent"
//   // }
// };

export default async () => {
  // Log in to get an authentication token
  return await authorize(config);
  // const refreshedState = await refresh(config, {
  //   refreshToken: authState.refreshToken,
  // });

  // // Revoke token
  // const result = await revoke(config, {
  //   tokenToRevoke: refreshedState.refreshToken
  // });
  // console.log(result);
}

export async function revokeToken(token){
  const result = await revoke(config, {tokenToRevoke: token});
  return result
}