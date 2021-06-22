import Config from 'react-native-config'
import { authorize, refresh, revoke } from 'react-native-app-auth';

const config = {
  clientId: Config.FITBIT_CLIENT_ID,
  clientSecret: Config.FITBIT_CLIENT_SECRET,
  redirectUrl: Config.FITBIT_REDIRECT_URL, //note: path is required
  scopes: ['activity', 'sleep'],
  tokenEndpointAuthMethod:"client_secret_basic",
  autoState:true,
  state:null,
  autoNonce:true,
  nonce:null,
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
    tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
    revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
  },
  additionalParameters:{
    prompt:"consent" //"login consent"
  },

  useNonce:true,
  usePKCE:true,
}

// const config = {
//   clientId: Config.FITBIT_CLIENT_ID,
//   clientSecret: Config.FITBIT_CLIENT_SECRET,
//   redirectUrl: Config.FITBIT_REDIRECT_URL, //note: path is required
//   scopes: ['activity', 'sleep'],
//   serviceConfiguration: {
//     authorizationEndpoint: 'https://www.fitbit.com/oauth2/authorize',
//     tokenEndpoint: 'https://api.fitbit.com/oauth2/token',
//     revocationEndpoint: 'https://api.fitbit.com/oauth2/revoke'
//   },
//   additionalParameters:{
//     prompt:"consent" //"login consent"
//   }
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