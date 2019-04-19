<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <form v-on:submit.prevent="login()" novalidate="true">
              <div class="card-body">
                <h1>New Password</h1>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary px-4">Accept</button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'FormMail',
    data: function(response) {
      axios.get('/password/find')
       .then(response => {
           console.log(response.data)
       })
       .catch(error => {
           console.log(error)
       })
    return {    
      email: null,
      errors: [],
      activedisplay: 'none'
    };
  },
 

}
</script>
