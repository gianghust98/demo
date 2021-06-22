import DarumaGraphql from './DarumaGraphql'
import Config from 'react-native-config'

// export const HOST = "http://osawa-mbp2.head.orso.local:3004"
// export const HOST = "http://mm-018.head.orso.local:3004"
export const HOST = Config.API_URL
console.log(HOST)
// const graphql = new DarumaGraphql("http://mm-018.head.orso.local:3004/graphql")
const graphql = new DarumaGraphql(HOST +"/graphql")
export default {
  graphq:graphql,
}