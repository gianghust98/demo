
import { Navigation } from 'react-native-navigation'
import { Colors } from '../styles';
import MyPage from './MyPage';

export const goToInitializing = () => Navigation.setRoot({
  root: {
    component: {
      name: 'navigation.Initializing'
    }
  },
});

export const goToAuth = () => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait']
    },
    topBar: {
      backButton: { 
        color: Colors.LAPALMA, 
        title: "",
        titleVisible: false, 
        showTitle: false, 
      }
    }
  });

  Navigation.setRoot({
    root: {
      stack: {
        id: 'Signup',
        children: [
          {
            component: {
              name: 'navigation.Signup',
              topBar: {
                visible: false,
              }
            }
          }
        ],
      }
    }
  })
} 

export const goHome = () => {
  Navigation.setDefaultOptions({
    layout: {
      orientation: ['portrait']
    },
    topBar: {
      visible: true,
      translucent: true,
      drawBehind: false,
      background: {
        color: 'white',
      },
      backButton: { 
        color: Colors.LAPALMA, 
        title: "",
        titleVisible: false, 
        showTitle: false, 
      }
    }
  });
  Navigation.setRoot({
    root: {
      stack: {
        id: 'Home',
        children: [
          {
            component: {
              name: 'navigation.Home',
            }
          }
        ],
      }
    }
  })
} 

export const showModalMyPage = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'navigation.MyPage',
        options: { modalPresentationStyle:"overFullScreen" }
      }
    }]
  }
})

export const showModalProfile = () => Navigation.showModal({
  stack: {
    children: [{
      component: {
        name: 'navigation.Profile',
        // options: {
        //   screenBackgroundColor: 'white',
        // },
        options: { modalPresentationStyle:"overFullScreen" }
      }
    }]
  }
})