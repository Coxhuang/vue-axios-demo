import axios from 'axios' // 导入node_modules里的axios

axios.defaults.baseURL = "http://127.0.0.1:8000/"; // 后端接口 ip:port

export default axios // 导出axios

