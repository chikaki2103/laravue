<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <form v-on:submit.prevent="login()" novalidate="true">
              <div class="card-body">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="email" v-model="email" class="form-control" placeholder="Email">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" v-model="password" class="form-control" placeholder="Password">
                </div>
                <p class="text-danger" v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
                <div class="row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary px-4">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button v-on:click="reset" type="button" class="btn btn-link px-0">Forgot password?</button>
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
  name: 'Login',
  data: function() {
    return {
      context: 'login context',
      email: null,
      password: null,
      errors: []
    };
  },
  methods: {
    checkForm: function() {
      this.errors = [];

      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

       if (!this.password) {
       this.errors.push('Password required.');
       } else if (!this.validPass(this.password)) {
         this.errors.push('Valid password required.');
       }

      if (!this.errors.length) {
        return true;
      }
      return false;
    },
    validPass: function(password){
     var pass=  /^[A-Za-z0-9]\w{3,15}$/;
     return pass.test(password);
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    login() {
      if (!this.checkForm()) {
        return false;
      }
      this.$auth.login({
          data: { email: this.email, password: this.password },
          redirect: {
            name: 'Dashboard'
          },
          fetchUser: true,
          
        })
        .then((res) => {
          // console.log('success ' + this.context);
          // var user = this.$auth.user(); 
          //  user = res.data.user;
          // console.log(res.data.user.roles[0].name);
          // console.log(this.$auth.user(res.data.user).roles);
          // console.log(this.$auth.check(res.data.user.roles.name));
          // ability.update(defineRulesFor(res.user));
          // ability.update(defineRulesFor(res.user));
        
          // ability.update(res.data.user.roles[0].name);
          // console.log(res.data.user)
          var user = res.data.user;
          localStorage.setItem("user",  JSON.stringify(user));
          var users = JSON.parse(localStorage.getItem("user"));
          // var userItem = JSON.parse(localStorage.getItem(item))
          // console.log(users);
          console.log(ability.rules);
          

        },(res) => {
          console.log('error ' + this.context);
          this.errors = res.data;
        });
    },
     reset() {
      this.$router.push('forgot-password');
    }
  }
}
</script>
