<template>
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">{{title}}</div>
                    <div class="panel-body">
                        <form action="" method="post" v-on:submit.prevent="onSubmit">
 
                             <div class="form-group">
                                <label for="email">Email address</label>
                                <input type="email" class="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" v-model="info.email">
                              </div>
                              <div class="form-group">
                                <label for="content">Body content</label>
                                <textarea type="password" class="form-control" id="bodycontent" placeholder="Body content" v-model="info.bodycontent" ></textarea>
                              </div>
                              
                              <button type="submit" class="btn btn-primary">Send mail</button>
                              
                        </form>
                        <!--  <button class="btn btn-primary" v-on:click="thongtin()">Send mail</button> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script>
    export default {
       data(){
          return{
            title:'Form Mail',
            info:{},
            success:false
          }
       },
       methods:{
            onSubmit(){
                this.axios.post('http://localhost:8000/email/form',
                    {email:this.info.email,bodycontent:this.info.bodycontent})
                  .then(response => {
                    console.log(response);
                      this.success = response.data.success;
                      if(this.success){
                        this.$router.push({name:'SuccessMail',
                            params:{
                                success:this.success,
                                email:this.info.email,
                                bodycontent:this.info.bodycontent
                            }
                        });
                      }
                  })
                  .catch(error => {
                    console.log(error)
                    this.success = false
                  });
                   
            }
 
 
       }
    }
</script>
