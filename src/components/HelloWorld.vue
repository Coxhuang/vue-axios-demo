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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
