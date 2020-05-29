import { Platform } from 'react-native';

const {
  author: {
    name,
    email,
    url
  },
  repository: {
    url: repository
  },
  version
} = require('../../../package.json');

const codepush = {
  staging: Platform.select({
    ios: '<private>',
    android: '<private>'
  }),
  production: Platform.select({
    ios: '<private>',
    android: '<private>'
  })
};

const generalConfig = {
  author: { name, email, url },
  repository,
  version,
  codepush,
  url: {
    https: 'http://192.168.0.140:4000/',
    wss: 'ws://192.168.0.140:4000/graphql'
  }
  // url: {
  //   https: 'http://192.168.0.88:4000/',
  //   wss: 'ws://192.168.0.88:4000/graphql'
  // }
};

export default generalConfig;
