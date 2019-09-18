# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

@[toc]
# Vue axios


## #0 GitHub

[https://github.com/Coxhuang/vue-axios-demo
](https://github.com/Coxhuang/vue-axios-demo
)

## #1 需求

- 点击一个按钮,前端向后端发送http请求数据,后端返回数据给前端


## #2 环境

### #2.1 安装axios


```
npm install --save axios vue-axios
```


### 2.2 配置


```
import axios from 'axios'
import VueAxios from 'vue-axios'
Vue.use(VueAxios,axios);
axios.defaults.baseURL = "http://127.0.0.1:8000/"; // 后端接口的地址 
```

## #3 开始

### #3.1 最简单的Demo

> 前端向后端发送一个get请求

- HelloWorld.vue


```
<template>
	<div @click="btnClick()">点击</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {}
	},
	methods:{
        btnClick:function(){
            this.axios.get('/api/user/list-user/').then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
                console.log(error)
            })
        },
	},
}
</script>

```


- 界面

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190918230837925.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NveGh1YW5n,size_16,color_FFFFFF,t_70)

---

- 后端

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190918230912311.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NveGh1YW5n,size_16,color_FFFFFF,t_70)


本文使用的后端框架是Python的Django框架, 需要注意的是,后端接口需要配置跨域问题,如果不配置跨域,会出现以下情况:

![20190914211619-image.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0NveGh1YW5nL3lvc29yby9tYXN0ZXIvMjAxOTA5MTQyMTE2MTktaW1hZ2UucG5n?x-oss-process=image/format,png)

后端返回的请求状态码仍然是200, 但是前段就是拿不到数据

Django解决跨域如下: 

- settings.py

```
...

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',  # 跨域,必须放在这个位置,不能放在'django.middleware.common.CommonMiddleware'后面 
    'django.middleware.common.CommonMiddleware',
    ...
]

...

CORS_ALLOW_CREDENTIALS = True
CORS_ORIGIN_ALLOW_ALL = True
CORS_ORIGIN_WHITELIST = (
    '*',
)

CORS_ALLOW_METHODS = (
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
    # 'VIEW',
)

CORS_ALLOW_HEADERS = (
    'XMLHttpRequest',
    'X_FILENAME',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'User-agent',
    'x-csrftoken',
    'x-requested-with',
    'token',
)
...
```

---


### #3.1 POST请求


- HelloWorld.vue


```
<template>
	<div>
		<div @click="btnClick()">点击</div>
		<div @click="btnClick2()">POST点击</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {}
	},
	methods:{
        btnClick:function(){
            this.axios.get('/api/user/list-user/').then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
                console.log(error)
            })
        },
        btnClick2:function(){
            this.axios.post('/api/user/create-user/',{
                "username" : "cox2",
                "password" : "cox123456",
            }).then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
               console.log(error.response.status)
            })
        },
	},
}
</script>

```

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190918230945159.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0NveGh1YW5n,size_16,color_FFFFFF,t_70)
---


## #4 模块化处理

- 将axios的相关配置放进一个文件
- 将所有用的路由接口放进一个文件


### #4.1 axios.js

> 新建 src/utils/axios.js


```
import axios from 'axios' // 导入node_modules里的axios 

axios.defaults.baseURL = "http://127.0.0.1:8000/"; // 后端接口 ip:port 

export default axios // 导出axios 
```


### #4.2 api.js

> 新建 src/api/api.js和src/api/index.js

- index.js

```
import api_all from './api'

export default {
    api_all
}
```

- api.js

```
import axios from '@/utils/axios' // 导入axios 

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

export default api_all // 导出 api_all 
```

### #4.3 开始使用


- main.js

```
...
import axios from "./api/"; // 导入axios 
Vue.prototype.$api = axios; // 挂载到原型链上, 在vue组件里面可以通过this拿到

// 使用统一化管理,将以下代码注释掉
// import axios from 'axios'
// import VueAxios from 'vue-axios'
// Vue.use(VueAxios,axios);
// axios.defaults.baseURL = "http://127.0.0.1:8000/";
...
```

- HelloWorld.vue


```
<template>
	<div>
		<div @click="btnClick()">点击</div>
		<div @click="btnClick2()">POST点击</div>
		<div @click="btnClick3()">api点击</div>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	data () {
		return {}
	},
	methods:{
        btnClick:function(){
            // this.axios.get('/api/user/list-user/').then((response)=>{
            //     console.log(response.data)
            // }).catch((error)=>{
            //     console.log(error)
            // })
        },
        btnClick2:function(){
            // this.axios.post(
            //     '/api/user/create-user/',
	        //     {
		    //         "username" : "cox2",
		    //         "password" : "cox123456",
	        //     }
            // ).then((response)=>{
            //     console.log(response.data)
            // }).catch((error)=>{
            //     console.log(error.response.status)
            // })
        },
        btnClick3:function(){
            this.$api.api_all.get_user_list().then((response)=>{
                console.log(response.data)
            }).catch((error)=>{
                console.log(error.response.status)
            })
        },
	},
}
</script>
...
```
![20190918225302-image.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL0NveGh1YW5nL3lvc29yby9tYXN0ZXIvMjAxOTA5MTgyMjUzMDItaW1hZ2UucG5n?x-oss-process=image/format,png)
---




