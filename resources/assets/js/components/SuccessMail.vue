<template>
    <div class="row">
        <div class="col-md-18" v-if="success">
            <h2>{{title}}</h2>
            <label>Email:{{email}}</label>
            <p>{{bodycontent}}</p>
        </div>
         
 
    </div>
</template>
<script>
    export default {
        data(){
            return{
                success:this.$route.params.success,
                title:'Send mail successfuly',
                email:this.$route.params.email,
                bodycontent:this.$route.params.email
            }
        }
    }
 
</script>
