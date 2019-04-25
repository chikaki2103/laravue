<template>
<div class="app flex-row align-items-center">
 <div class="container">
   <div class="row justify-content-center">
     <div class="col-md-8">
       <div class="card-group mb-0">
         <div class="card p-4">
           <form v-on:submit.prevent="sendEmail()" novalidate="true">
             <div class="card-body">
               <h1>Recover Password</h1>
               <p class="text-muted">Enter your email</p>
               <div class="input-group mb-3">
                 <span class="input-group-addon"><i class="icon-user"></i></span>
                 <input type="email" v-model="email" class="form-control" placeholder="Email">
               </div>
               <p class="text-danger" v-if="errors.length">
                 <b>Please correct the following error(s):</b>
                 <ul>
                   <li v-for='error in errors'>{{ error }}</li>
                 </ul>
               </p>
               <div class="row">
                 <div class="col-6">
                   <button type="submit" class="btn btn-primary px-4">Send Email</button>
                 </div>
               </div>
             </div>
           </form>
         </div>
         <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
           <div class="card-body text-center">
             <div>
               <h2>Sign up</h2>
               <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
               <button type="button" class="btn btn-primary active mt-3">Register Now!</button>
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>
</div>
</template>

<script>
export default {
name: 'ForgotPassword',
data: function() {
    return {
    context: 'login context',
    email: null,
    errors: []
    };
},
methods: 
  {
    checkForm: function() {
    this.errors = [];

    if (!this.email) {
      this.errors.push('Email required.');
    } else if (!this.validEmail(this.email)) {
      this.errors.push('Valid email required.');
    }
    if (!this.errors.length) {
      return true;
    }
    return false;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    sendEmail() {
    if (!this.checkForm()) {
      return false;
    }
    axios.post('/password/create', {email: this.email})
      .then(response => {
        if(this.email){
         this.$toasted.success('Check Your Mail Pls!!!',{
            theme: 'toasted-primary', 
            iconPack: 'fontawesome',
            icon: 'check',
            position: 'top-right',
            duration: 5000
        })
        }
      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
