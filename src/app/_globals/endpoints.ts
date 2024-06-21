const ENDPOINTS: any = {
  users: {
    signIn: '/user/login',
    signUp: '/user/register',
    userInfo: '/user/user-info',
    logout: '/user/logout'
  },
  jobs:{
    jobFeeds:'/job/job-feeds ',
    jobFeedsUser:'/job/job-feeds-user',
  },
  cv:{
    postCV:'/cv/cv-form',
    getCV:'/cv/cv-form-filtered'
  }
};

export { ENDPOINTS };
