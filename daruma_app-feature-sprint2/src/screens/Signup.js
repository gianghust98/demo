import React, {Component} from 'react';
import {
  Platform,
  Linking,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  Image,
  Alert
} from 'react-native';
import LineLogin from '@xmartlabs/react-native-line';
import {Navigation} from 'react-native-navigation';
import SInfo from 'react-native-sensitive-info';
import appleAuth, {
  AppleButton,
  AppleAuthError,
  AppleAuthRequestScope,
  AppleAuthRequestOperation,
} from '@invertase/react-native-apple-authentication';
import ButtonBar from '../components/ButtonBar';
import GraphqlView from '../components/GraphqlView';
import {caesar} from '../utils/caesar-crypt';

import {goHome, goToInitializing} from './navigation';
import Images from '../../res/img';
import {Theme, Colors} from '../styles';
import DarumaServer, {HOST} from '../utils/DarumaServer';
import moment, {setServerTime} from '../utils/moment';

import mutationLineLogin from '../api/mutationLineLogin';
import mutationLineRegister from '../api/mutationLineRegister';
import mutationAppleLogin from '../api/mutationAppleLogin';
import mutationAppleRegister from '../api/mutationAppleRegister';

const secret = 4;

type Props = {};
export default class Signup extends Component<Props> {
  static options(passProps) {
    return {
      topBar: {
        drawBehind: true,
        visible: false,
        animate: false,
      },
    };
  }
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      itemContent: {},
      checkTerm: false,
      checkPrivacyPolicy: false,
      isSignUp: true,
    };
  }

  renderCheckBox() {
    let checkTermImg = this.state.checkTerm
      ? Images.ic_check_able
      : Images.ic_check_none;
    let checkPrivacyPolicyImg = this.state.checkPrivacyPolicy
      ? Images.ic_check_able
      : Images.ic_check_none;
    return (
      <View style={styles.consentWrapper}>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => this.setState({checkTerm: !this.state.checkTerm})}>
            <Image source={checkTermImg} style={styles.checkbox} />
          </TouchableOpacity>
          <Text
            allowFontScaling={false}
            onPress={() =>
              Navigation.push(this.props.componentId, {
                component: {
                  name: `navigation.WebViewScreen`,
                  passProps: {useToken: true, url: `${HOST}/public/terms.html`},
                },
              })
            }
            style={styles.hyperlink}>
            利用規約
          </Text>
          <Text allowFontScaling={false} style={Theme.textBlack18}>
            に同意する
          </Text>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            onPress={() =>
              this.setState({
                checkPrivacyPolicy: !this.state.checkPrivacyPolicy,
              })
            }>
            <Image source={checkPrivacyPolicyImg} style={styles.checkbox} />
          </TouchableOpacity>
          <Text
            allowFontScaling={false}
            onPress={() =>
              Navigation.push(this.props.componentId, {
                component: {
                  name: `navigation.WebViewScreen`,
                  passProps: {
                    useToken: true,
                    url: `https://www.orso.jp/privacypolicy.html`,
                  },
                },
              })
            }
            style={styles.hyperlink}>
            プライバシーポリシー
          </Text>
          <Text allowFontScaling={false} style={Theme.textBlack18}>
            に同意する
          </Text>
        </View>
      </View>
    );
  }

  onAppleButtonPress = async () => {
    if (
      !this.state.isSignUp ||
      (this.state.checkTerm && this.state.checkPrivacyPolicy)
    ) {
      try {
        // user cancelled Apple Sign-in
        const appleAuthRequestResponse = await appleAuth.performRequest({
          requestedOperation: AppleAuthRequestOperation.LOGIN,
          requestedScopes: [
            AppleAuthRequestScope.EMAIL,
            AppleAuthRequestScope.FULL_NAME,
          ],
        });
        // console.log("appleAuthRequestResponse",appleAuthRequestResponse)
        // console.log("appleAuthRequestResponse.user",appleAuthRequestResponse.user)
        // console.log("appleAuthRequestResponse.identityToken",appleAuthRequestResponse.identityToken)
        let appleAuthT = JSON.stringify({
          appleUserId: appleAuthRequestResponse.user,
          identityToken: appleAuthRequestResponse.identityToken,
        });

        //appleAuth 暗号化
        appleAuthT = caesar(appleAuthT, secret);

        DarumaServer.graphq.client
          .mutate({
            mutation: this.state.isSignUp
              ? mutationAppleRegister
              : mutationAppleLogin,
            variables: {appleAuth: appleAuthT},
          })
          .then(async (res) => {
            const data /*:Mutation["lineLogin"]*/ = this.state.isSignUp
              ? res.data.appleRegister
              : res.data.appleLogin;
            setServerTime(moment(data.now));

            DarumaServer.graphq.setAuth(data.accessToken, data.user.id);
            // console.log("appleAuthRequestResponse.user 1",appleAuthRequestResponse.user)
            // console.log("appleAuthRequestResponse.identityToken 1",appleAuthRequestResponse.identityToken)
            await SInfo.setItem(
              'currentUserIdentifier',
              appleAuthRequestResponse.user,
              {},
            );
            await SInfo.setItem(
              'currentUserIdentityToken',
              appleAuthRequestResponse.identityToken,
              {},
            );
            goHome();
          })
          .catch(GraphqlView.errorAlertView)
          .catch(GraphqlView.errorCodeCheck)
          .catch(() => {
            // LineLogin.logout()
          });
      } catch (error) {
        console.log('error', error);
        if (error.code === AppleAuthError.CANCELED) {
        } else {
          // other unknown error
        }
      }
    }else{
      this.siginNonCheckAlert()
    }
  };

  sinup() {
    if (
      !this.state.isSignUp ||
      (this.state.checkTerm && this.state.checkPrivacyPolicy)
    ) {
      LineLogin.login()
        .then(async (user) => {
          const accessToken = await LineLogin.getCurrentAccessToken();
          const userProfile = await LineLogin.getProfile();
          // console.log("accessToken",accessToken)
          // console.log("userProfile",userProfile)

          // Check server user
          let lineAuth = JSON.stringify({
            lineUserId: userProfile.userID,
            accessToken: accessToken.access_token,
            refreshToken: null, //lineAuthInfo.refresh_token,
            expiresIn: null, //new Date(accessToken.expirationDate),
          });
          //lineAuth 暗号化
          lineAuth = caesar(lineAuth, secret);
          // this.setState({
          //   lineUserId: userProfile.userID,
          //   accessToken: accessToken.accessToken,
          //   lineAuth: lineAuth,
          // })
          // Login
          DarumaServer.graphq.client
            .mutate({
              mutation: this.state.isSignUp
                ? mutationLineRegister
                : mutationLineLogin,
              variables: {lineAuth},
            })
            .then((res) => {
              const data /*:Mutation["lineLogin"]*/ = this.state.isSignUp
                ? res.data.lineRegister
                : res.data.lineLogin;
              setServerTime(moment(data.now));

              DarumaServer.graphq.setAuth(data.accessToken, data.user.id);
              goHome();
            })
            .catch(GraphqlView.errorAlertView)
            .catch(GraphqlView.errorCodeCheck)
            .catch(() => {
              LineLogin.logout();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
      this.siginNonCheckAlert()
    }
  }
  siginNonCheckAlert(){
    this.state.checkTerm && this.state.checkPrivacyPolicy
    Alert.alert(
      "同意が必要です",
      "利用規約とプライバシーポリシーをお読みの上、●ボタンを押して同意してください。",
      [
        {
          text: 'OK',
          // onPress: () => {
          //   reject(error)
          //   GraphqlView.errorAlertShow = false
          // },
        },
      ],
      { cancelable: false },
    )
  }

  render() {
    const {isSignUp} = this.state;
    return (
      <SafeAreaView style={{flex: 1}}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
          bounces={false}>
          <Image source={Images.img_tilte} style={styles.img} />
          {isSignUp && (
            <View>
              <Text allowFontScaling={false} style={styles.textNote}>
                【既にアプリご利用中の方へ】
              </Text>
              <Text allowFontScaling={false} style={styles.textNoteDetail}>
                ログインより新規登録時に
              </Text>
              <Text
                allowFontScaling={false}
                style={[styles.textNoteDetail, {marginBottom: 5}]}>
                使用した方法で再ログインしてください。
              </Text>
            </View>
          )}
          <View style={{marginBottom: 20}}>
            <ButtonBar
              textLeft={'新規作成'}
              textRight={'ログイン'}
              isRight={!isSignUp}
              onPressLeft={() => this.setState({isSignUp: true})}
              onPressRight={() => this.setState({isSignUp: false})}
            />
          </View>

          {isSignUp && this.renderCheckBox()}

          {appleAuth.isSupported && appleAuth.isSignUpButtonSupported ? (
            <AppleButton
              buttonStyle={AppleButton.Style.BLACK}
              buttonType={AppleButton.Type.SIGN_IN}
              style={{
                ...styles.loginBtn,
                // ...(!isSignUp ||
                // (this.state.checkTerm && this.state.checkPrivacyPolicy)
                //   ? {}
                //   : {opacity: 0.8}),
              }}
              onPress={() => this.onAppleButtonPress()}
            />
          ) : null}

          {
           //!isSignUp ||
          // (this.state.checkTerm && this.state.checkPrivacyPolicy) ? (
            <TouchableOpacity onPress={() => this.sinup()}>
              <Image
                source={
                  isSignUp
                    ? Images.btn_lineregist_base
                    : Images.btn_linelogin_base
                }
                style={styles.loginBtn}
              />
            </TouchableOpacity>
          // ) : (
          //   <Image
          //     source={
          //       isSignUp
          //         ? Images.btn_lineregist_disable
          //         : Images.btn_linelogin_disable
          //     }
          //     style={styles.loginBtn}
          //   />
          // )
          }
          <Text allowFontScalling={false} style={styles.text}>
            ※アプリに入力したデータがLINEやAppleに送られたり、LINEやAppleのプロフィール情報などの個人情報に繋がる情報を取得することはありません。
            <Text
              allowFontScalling={false}
              style={[styles.text, {color: Colors.MANDY, fontWeight: 'bold'}]}>
              また、LINEアプリ上やApple認証でプロフィール情報へのアクセスを要求されますが、本アプリに情報を保存することはありません。
            </Text>
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  appleButton: {
    width: '100%',
    height: 45,
    shadowColor: '#555',
    shadowOpacity: 0.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    marginVertical: 15,
  },
  textNote: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
  textNoteDetail: {
    ...Theme.textBlack16,
    textAlign: 'center',
    lineHeight: 20,
  },
  text: {
    ...Theme.textBlack16,
    marginHorizontal: 20,
    lineHeight: 25,
    paddingTop: 10,
    paddingBottom: 10,
    ...Platform.select({
      ios: {fontFamily: 'Hiragino Sans'},
    }),
  },
  img: {
    marginTop: 20,
    alignSelf: 'center',
    resizeMode: 'contain',
    width: '90%',
  },
  consentWrapper: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  hyperlink: {
    color: Colors.LAPALMA,
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginRight: 3,
  },
  loginBtn: {
    marginBottom: 20,
    alignSelf: 'center',
    width: 200,
    height: 43,
  },
});
