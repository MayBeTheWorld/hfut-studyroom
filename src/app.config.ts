export default {
  pages: [
    'pages/index/index',
    'pages/seatselect/seatselect',
    'pages/user/user',
    'pages/user/history/history',
    'pages/user/help/help',
    'pages/user/about/about',
    'pages/login/login',
    'pages/admin/adminIndex/adminIndex',
    'pages/admin/adminLogin/adminLogin'
  ],
  window: {
    backgroundTextStyle: 'light',
    backgroundColor: '#F6F7F9',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#bfbfbf',
    selectedColor: '#000000',
    backgroundColor: 'white',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: './static/home.png',
        selectedIconPath: './static/home-fill.png'
      },
      {
        pagePath: 'pages/user/user',
        text: '我的',
        iconPath: './static/person.png',
        selectedIconPath: './static/person-fill.png'
      }
    ]
  },
  debug: false,
  navigateToMiniProgramAppIdList: ['wx8abaf00ee8c3202e']
}
