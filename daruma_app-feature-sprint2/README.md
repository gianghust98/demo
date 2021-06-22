# Daruma Project Readme
## 環境
+ Xcode 10
+ node v10.10.0

## 不具合
+ [react native navigation](https://github.com/wix/react-native-navigation/pull/3851)あと、static option 等
+ [xcode10](https://github.com/facebook/react-native/issues/21168)

yarn install後のiosの書き出しのは下記のコマンドを実行
```
yarn xreset
```
<hr>

## 環境切り替え機能

### android
開発時 ローカル環境
```
npx react-native run-android --variant=devNoneDebug
```
配布用 ステージ環境
```
npx react-native run-android --variant=stgNoneRelease
```
ストア 本番環境
```
npx react-native run-android --variant=prodOrsoRelease
```

#### productFlavors

##### API接続先
+ dev  :.envを参照        開発環境
+ stg  :.env.stgを参照    ステージ環境
+ prod :.env.prodを参照   本番環境

##### 証明書
+ none :開発用証明書
+ orso :ORSOテスト用証明書

#### buildType
+ debug   :圧縮等なし
+ release :圧縮等あり


### ios
開発時 develop証明書 ローカル環境
```
npx react-native run-ios --configuration Debug
```
ストア 本番環境
```
npx react-native run-ios --configuration Release
```

配布用 AdHoc証明書 ステージ環境
```
npx 
react-native run-ios --configuration AdHocStaging
```
<hr>

#### scheme
+ Debug       :開発用環境   develop証明書
+ Release     :本番環境     ストア用証明書
+ AdHocDevelop  :開発用環境   AdHoc用証明書
+ AdHocStaging  :ステージ環境  AdHoc用証明書
+ AdHocProduct  :本番環境     AdHoc用証明書

<hr>

## CodePush

### App Center CLI をcode push するマシーンにインストール 基本CLI*
```
$ npm install -g appcenter-cli
```

### Code Push を実行
```
appcenter login
appcenter tokens list
appcenter tokens delete <machineName>

appcenter tokens create -d "VSTS Integration"
```


*iOS*
```
$ appcenter codepush release-react -a ORSO/SUKOYAKADARUMA-iOS -d Staging
$ appcenter codepush release-react -a ORSO/SUKOYAKADARUMA-iOS -d Production
```

*Android*
```
$ appcenter codepush release-react -a ORSO/SUKOYAKADARUMA-Android -d Staging
$ appcenter codepush release-react -a ORSO/SUKOYAKADARUMA-Android -d Production
```


<hr>

## 便利コマンド集
### yarn rreset
初期化コマンド。node_module初期化からpod installまで

### yarn xreset
xcode10の不具合対応コマンド。