<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <form v-on:submit.prevent="reset()" novalidate="true">
              <div class="card-body">
               <h3 class="text-justify">
                  <b>Forgot Password</b>
                 <!--  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul> -->
                </h3><br>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="email" v-model="email" class="form-control" placeholder="Email">
                </div>
                  <p class="text-danger" v-if="errors.length">
                  <b>Please correct the following error(s):</b>
                  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul>
                </p>
                <div class="row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary px-4">Reset Now!</button>
                  </div>
                 
                </div>
              </div>
            </form>
          </div>
          <div class="card text-white py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
              
                <h3><i class="fa fa-check fa-lg mt-4 text-success"></i> <span class="text-success">Please Check Your Email !!</span></h3>

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
  name: 'resetpassword',
    data: function() {
    return {    
      email: null,
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

      if (!this.errors.length) {
        return true;
      }
      return false;
    },
    validEmail: function(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    reset() {
    axios.post('/password/create', {email: this.email})
               .then(response => {
                   console.log(response.data.result)
               })
               .catch(error => {
                   console.log(error)
               })
    },
  }
}
</script>
