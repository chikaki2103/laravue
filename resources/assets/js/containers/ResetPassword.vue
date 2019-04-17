<template>
<div class="app flex-row align-items-center">
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card-group mb-0">
          <div class="card p-4">
            <form novalidate="true">
              <div class="card-body">
               <h3 class="text-justify">
                  <b>Forgot Password</b>
                 <!--  <ul>
                    <li v-for="error in errors">{{ error }}</li>
                  </ul> -->
                </h3><br>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="email" class="form-control" placeholder="Email">
                </div>
                
               <!--  <div class="row">
                  <div class="col-6">
                    <button type="submit" class="btn btn-primary px-4">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button v-on:click="reset" type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div>
                </div> -->
              </div>
            </form>
          </div>
          <div class="card text-white bg-primary py-5 d-md-down-none" style="width:44%">
            <div class="card-body text-center">
              <div>
                <button type="button" class="btn btn-primary active mt-3">Reset Now!</button>
                <p>Check Your Email</p>

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
 
}
</script>
