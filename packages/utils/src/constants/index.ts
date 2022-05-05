export const REG: Record<string, RegExp> = {
  // 密码输入校验正则，弱密码校验8-16位，数字+字母组合，也可输入规定的特殊字符
  password: /^(?=.*[0-9].*)(?=.*[a-zA-Z].*)(?![`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]*$)[0-9A-Za-z`~!@#$%^&*()_\-+=<>?:"{}|,.\\/;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘'，。、]{8,16}$/g,
  // 身份证号校验规则
  id: /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/g,
  // 手机号校验规则
  phone: /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
  // email校验规则
  email: /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/
};

export const APPID: Record<string, string> = {
  // 基础服务 Paas
  paas: '6774a3c0f3cb11e98d67005056a0e686',
  // 产筛 tower
  tower: '5d74c913a06e4436aa1a44792d58ec91',
  // 新筛 acme
  acme: '3859b4f75fc61',
  // 质控 analyse
  analyse: '54570c8755324eecafc36af913696d6e',
  // 出防 chufang
  chufang: ''
};

// 日期格式
export const TIME_FORMAT: string = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT: string = 'YYYY-MM-DD';
export const MONTH_FORMAT: string = 'YYYY-MM';
export const YEAR_FORMAT: string = 'YYYY';

// 操作
export const CREATE: string = 'CREATE';
export const UPDATE: string = 'UPDATE';
export const DEL: string = 'DEL';
export const QUERY: string = 'QUERY';

// 环境
export const DEV: string = 'development';
export const TEST: string = 'test';
export const PROD: string = 'production';

// userToken
export const USER_TOKEN = 'user_token';
