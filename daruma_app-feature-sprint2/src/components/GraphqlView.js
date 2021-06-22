import React from 'react'
import { Linking, Platform, Alert, View } from 'react-native'
import PropTypes from 'prop-types'
import { Navigation } from 'react-native-navigation';
import Modal from 'react-native-modal';
import { goToInitializing, goToAuth } from '../screens/navigation'

export default class GraphqlView extends React.Component {
  // static setting
  static get defaultProps() {
    return {
      query: null,
      loadingView: true,
      forcedLoadingMode: false,
    }
  }
  static get propTypes() {
    return {
      query: PropTypes.object,
      loadingView: PropTypes.bool,
      forcedLoadingMode: PropTypes.bool,
    }
  }
  static errorTitle(error) {
    let title = null
    if (error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].title) title = `${error.graphQLErrors[0].title}` // \n(error code : ${error.graphQLErrors[0].code})
    if (error.addTitle && !title) title = error.addTitle
    if (!title) title = ''
    return title
  }
  static errorMessage(error) {
    let message = null
    if (error.graphQLErrors && error.graphQLErrors[0]) message = `${error.graphQLErrors[0].message}` // \n(error code : ${error.graphQLErrors[0].code})
    if (error.networkError && !message) message = '通信環境をご確認の上、再度お試しください。' // \n(${error.networkError.message})
    if (error.message && !message) message = error.message
    if (!message) message = '通信環境をご確認の上、再度お試しください。'
    return message
  }
  static errorAlertShow = false
  static errorAlertView(error) {
    console.log("errorAlertView",GraphqlView.errorAlertShow,error)
    const title = GraphqlView.errorTitle(error)
    const message = GraphqlView.errorMessage(error)

    return new Promise((resolve, reject) => {
      if (!GraphqlView.errorAlertShow) {
        GraphqlView.errorAlertShow = true
        Alert.alert(
          title,
          message,
          [
            {
              text: 'OK',
              onPress: () => {
                reject(error)
                GraphqlView.errorAlertShow = false
              },
            },
          ],
          { cancelable: false },
        )
      } else {
        console.log(error)
        reject(error)
      }
    })
  }

  static mutateLoadingView(mutate) {
    let overlayComponentId  = null
      Navigation.showOverlay({
        component: {
          name: 'navigation.LoadingOverlay',
          passProps: {
            toComponentId: (componentId) => overlayComponentId = componentId,
            isMutate: true
          },
          options: {
            layout: {
                  componentBackgroundColor: 'transparent',
                },
            overlay: {
              interceptTouchOutside: true
            }
          }
        }
      });

    return mutate
    .then(()=> overlayComponentId && Navigation.dismissOverlay(overlayComponentId).catch((error)=>{}))
    .catch((error)=>{
      overlayComponentId && Navigation.dismissOverlay(overlayComponentId).catch((error)=>{})
      return GraphqlView.errorAlertView(error)
    })
    .catch(this.errorCodeCheck)
  }

  static errorCodeCheck(error) {
    return new Promise((resolve, reject) => {
      const code = (error.graphQLErrors && error.graphQLErrors[0] && error.graphQLErrors[0].code) ? error.graphQLErrors[0].code :null
      if(code === 4003){
        Linking.openURL(Platform.OS==="android" ?
          "https://play.google.com/store/apps/details?id=com.sukoyakadaruma.liferecord" :
          "https://itunes.apple.com/jp/app/id1444709961")
      }else if(code === 4001){
        goToInitializing()
      }
      reject(error)
    })
  }


  
  constructor(props) {
    super(props)
    this.overlayFlg = false
    this.overlayComponentIds = []
    this.mounted = true
    console.log("ppp constructor")
  }

  toComponentId(componentId){
    // console.log("toComponentId",componentId)
    this.overlayComponentIds.push(componentId)
  }

  openOverLay(){
    if(!this.mounted || this.overlayFlg || this.overlayComponentIds.length > 0) return // || this.overlayFlg
    this.overlayFlg = true
    Navigation.showOverlay({
      component: {
        name: 'navigation.LoadingOverlay',
        passProps:{toComponentId:(componentId)=>{
          if(this.overlayFlg){
            this.toComponentId(componentId)
          }else{
            this.toComponentId(componentId)
            this.overlayComponentIds.map(overlayComponentId=>
              Navigation.dismissOverlay(overlayComponentId).catch((error)=>{}))
              this.overlayComponentIds = []
          }
        } },
        options: {
          layout: {
                componentBackgroundColor: 'transparent',
              },
          overlay: {
            interceptTouchOutside: true
          }
        }
      }
    });
  }
  componentWillReceiveProps(nextProps){
    if(
      (nextProps.forcedLoadingMode===true || this.props.query || nextProps.query ) &&
      (nextProps.forcedLoadingMode===true || (!this.props.query || this.props.query && !this.props.query.loading) && nextProps.query && nextProps.query.loading)){
        console.log("componentWillReceiveProps nextProps true")
        this.openOverLay()
    }else if(this.overlayFlg){
      console.log("componentWillReceiveProps nextProps false")
      this.overlayComponentIds.map(overlayComponentId=>
        Navigation.dismissOverlay(overlayComponentId).catch((error)=>{}))
        this.overlayComponentIds = []
        this.overlayFlg = false
    }
  }

  componentWillUnmount() {
    this.mounted = false
    if(this.overlayFlg){
      this.overlayComponentIds.map(overlayComponentId=>
        Navigation.dismissOverlay(overlayComponentId).catch((error)=>{}))
        this.overlayComponentIds = []
      // Navigation.dismissOverlay(this.overlayComponentIds).catch((error)=>{})
      // this.overlayComponentIds = null
      this.overlayFlg = false
    }
  }
  

  render() {
    return null
  }
}
