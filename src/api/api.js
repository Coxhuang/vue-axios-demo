import axios from '@/utils/axios'

const api_all = {
    // 获取所有用户列表
    get_user_list(token) {
        return axios({
            url: '/api/user/list-user/',
            method: 'GET',
            // data: {
            //     token: token
            // },
        })
    }
};

export default api_all
