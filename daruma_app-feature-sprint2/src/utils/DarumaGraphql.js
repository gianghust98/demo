import { Platform } from 'react-native'
import { ApolloClient } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error'
import { InMemoryCache,defaultDataIdFromObject } from '@apollo/client/cache';
import { setContext } from '@apollo/client/link/context'
import { BatchHttpLink } from '@apollo/client/link/batch-http'
import DeviceInfo from 'react-native-device-info'


export default class DarumaGraphql {
  constructor(baseUrl, logoutFnc = null, versionUpFunc = null, maintenanceFunc = null) {
    const batchHttpLink = new BatchHttpLink({ uri: baseUrl })
    const errorLink = onError((graphQLErrors) => {
      if (graphQLErrors.response && graphQLErrors.response.errors) {
        switch (graphQLErrors.response.errors[0].code) {
          case 1001:
            // graphQLErrors.response.errors[0].canNotTry = true // Splashのreload防止
            // logoutFnc && logoutFnc(graphQLErrors)
            break
          default:
            break
        }
      }
    })

    const authLink = setContext((_, { headers }) => {
      let resHeaders = {
        ...headers,
        ...Platform.select({
          ios: {
            AppOs: 'Ios',
            AppVersion: `${DeviceInfo.getBuildNumber()}`,
            SystemVersion: DeviceInfo.getSystemVersion(),
            UniqueID: DeviceInfo.getUniqueId(),
          },
          android: {
            AppOs: 'Android',
            AppVersion: `${DeviceInfo.getBuildNumber()}`,
            SystemVersion: DeviceInfo.getSystemVersion(),
            UniqueID: DeviceInfo.getUniqueId(),
          },
        }),
      }

      if (this.accessToken) {//TODO
        resHeaders = {
          ...resHeaders,
          Authorization: `Bearer ${this.accessToken}`,
        }
      }
      if (this.userId) {
        resHeaders = {
          ...resHeaders,
          UserID: `${this.userId}`,
        }
      }
      return { headers: resHeaders }
    })

    const mainlink = authLink.concat(errorLink.concat(batchHttpLink))

    const defaultOptions = {
      watchQuery: {
        fetchPolicy: 'cache-and-network',
        errorPolicy: 'none',
      },
      query: {
        fetchPolicy: 'network-only',
        errorPolicy: 'none',
      },
      mutate: {
        // fetchPolicy: 'no-cache',
        errorPolicy: 'none',
      },
    }
    this.mainApolloClient = new ApolloClient({
      link: mainlink,
      cache: new InMemoryCache({ dataIdFromObject: object => defaultDataIdFromObject(object) }),//addTypename: false,
      // ssrMode: true,
      // ssrForceFetchDelay: 100,
      // connectToDevTools: true,
      // queryDeduplication: true,
      defaultOptions,
    })
  }
  setAuth(accessToken, userId){
    this.mainApolloClient.resetStore()
    this.accessToken = accessToken
    this.userId = userId
  }
  clearAuth(){
    this.mainApolloClient.resetStore()
    this.accessToken = null
    this.userId = null
  }
  get client() {
    return this.mainApolloClient
  }
}

export function pagingCursorInputFromOutput(cursors){
  return {cursors : cursors.map(cursor=>({col:cursor.col,value:cursor.value}))}
}

export function pagingUpdateQuery(parmeterName){
  return (previousResult, { fetchMoreResult }) => {
    if (!fetchMoreResult) { return previousResult; }
    const newList =  [...previousResult[parmeterName].list, ...fetchMoreResult[parmeterName].list]
    const newRes = Object.assign({}, previousResult)
    newRes[parmeterName].cursors = fetchMoreResult[parmeterName].cursors
    newRes[parmeterName].hasNext = fetchMoreResult[parmeterName].hasNext
    newRes[parmeterName].list = newList
    return newRes
  }
}

pagingCursorInputFromOutput
