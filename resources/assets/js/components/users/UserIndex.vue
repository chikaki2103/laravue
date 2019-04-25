<template>
  <div class="animated fadeIn">
    <div>
      <!-- Using modifiers -->

    </div>
    <div class="form-group">
      <b-button v-b-modal.modal-prevent class="btn btn-success"><span class="icon-user-follow"></span></b-button>
    </div>

    <div class="panel panel-default">
      <div class="panel-heading">User list</div>
      <div class="panel-body">
        <table class="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th> 
              <th>Created At</th> 

              <th width="150">&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user, index in users">
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.created_at }}</td>
              <td>
                           <!--  <router-link :to="{name: 'editUser', params: {id: role.id}}" class="btn btn-info">
                                Edit
                              </router-link> -->
                              <a v-b-modal.modal-edit
                              class="btn btn-warning"
                              v-on:click="edit(user.id, index)">
                              <span class="icon-pencil"></span>
                            </a>
                            <a href="#"
                            class="btn btn-danger"
                            v-on:click="deleteEntry(user.id, index)">
                            <span class="icon-user-unfollow"></span>
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>


              <b-modal
              id="modal-prevent"
              ref="modal"
              title="Submit your name"
              @ok="handleOk"
              @shown="clearName"
              >
              <form @submit.stop.prevent="handleSubmit">
                <b-form-input v-model="user.name" placeholder="Enter your name"></b-form-input><br>
                <b-form-input v-model="user.email" placeholder="Enter your Email" type="email"></b-form-input><br>
                <b-form-input v-model="user.password" placeholder="Enter your password" type="password"></b-form-input>
              </form>
            </b-modal>

            <b-modal
            id="modal-edit"
            ref="myModal"
            title="Submit your name"
            @ok="handleOkEdit"
            @shown="clearName"
            >
            <form @submit.stop.prevent="handleSubmitEdit" @focus.native="handleSubmitEdit()">
              <b-form-input v-model="editUser.name" placeholder="Enter your name"></b-form-input><br>
              <b-form-input v-model="editUser.email" placeholder="Enter your Email"></b-form-input>
            </form>
          </b-modal>
        </div>
      </template>

      <script>
      export default {
        data: function () {
          return {

            users: [],
            user: {
              name: '',
              email: '',
              password:'',
            },
            editUser :{

            }
          }
        },
        mounted() {
            // console.log(this.$refs.modal);
            //   console.log(this.$refs.myModal)
            this.getVueItems();
          },
          methods: {

            getVueItems: function getVueItems()  {
              var app = this;
              axios.get('/user/users')
              .then(function (resp) {
                app.users = resp.data;
              })
              .catch(function (resp) {
                console.log(resp);
                alert("Could not load users");
              });
            },
            deleteEntry(id, index) {
              if (confirm("Do you really want to delete it?")) {
                var app = this;
                axios.delete('/user/users/' + id)
                .then(function (resp) {

                  app.users.splice(index, 1);

                              // this.$toasted.error('Please enter your name',{
                              //       theme: 'toasted-primary', 
                              //       iconPack: 'fontawesome',
                              //       icon: 'check',
                              //       position: 'top-right',
                              //       duration: 5000
                              //   });

                            })
                .catch(function (resp) {
                  alert("Could not delete user");
                });
              }
            },
            clearName() {
              this.user.name = '';
              this.user.email = '';
            },
            handleOk(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    if (!this.user.name) {
                      this.$toasted.error('Please enter your name',{
                        theme: 'toasted-primary', 
                        iconPack: 'fontawesome',
                        icon: 'check',
                        position: 'top-right',
                        duration: 5000
                      })
                    }
                    else if(!this.user.email){


                      this.$toasted.error('Please enter your Email',{
                        theme: 'toasted-primary', 
                        iconPack: 'fontawesome',
                        icon: 'check',
                        position: 'top-right',
                        duration: 5000
                      })

                    } else if(!this.validEmail(this.user.email)){

                      this.$toasted.error('Something wrong with your email!!',{
                        theme: 'toasted-primary', 
                        iconPack: 'fontawesome',
                        icon: 'check',
                        position: 'top-right',
                        duration: 5000
                      })

                    }   else if(!this.user.password){


                      this.$toasted.error('Please enter your password',{
                        theme: 'toasted-primary', 
                        iconPack: 'fontawesome',
                        icon: 'check',
                        position: 'top-right',
                        duration: 5000
                      })

                    } else {
                      this.handleSubmit()
                    }
                  },  
                  handleSubmit() {

                    axios.post('/user/users', {
                      name: this.user.name,
                      email: this.user.email,
                      password: this.user.password,
                    })
                    .then(response => {

                      this.$refs.modal.hide()
                      // console.log(response.data.id);
                 // console.log(this.getVueItems());
                 this.getVueItems();

               })
                    .catch(error => {
                     if (error.response) {
                       if (error.response.status) {
                        console.log('DUPLICATE NAME')
                        this.$toasted.error('Trùng tên nha',{
                          theme: 'toasted-primary', 
                          iconPack: 'fontawesome',
                          icon: 'check',
                          position: 'top-right',
                          duration: 5000
                        })
                      }               
                    } 

                  });

                  },

                  validEmail: function(email) {
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    return re.test(email);
                  },
                  handleOkEdit(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    if (!this.editUser.name) {
                      alert('Please enter your name')
                    } else {
                      this.handleSubmitEdit()
                    }
                  },  
                  edit(id, index){


                   let app = this;

                   app.roleId = id;
                   axios.get('/user/users/' + id)
                   .then(function (resp) {
                    app.editUser = resp.data;

                  })
                   .catch(function () {
                    alert("Could not load your editUser")
                  });
                 } ,
                 handleSubmitEdit(){

                  event.preventDefault();
              // console.log(this.$refs.myModal);
              console.log(this.$refs['myModal'].hide());
              this.$refs['myModal'].hide();
              var newRole = this.editUser;

              axios.patch('/user/users/' + this.roleId, newRole)

              .then(response => {

                this.$refs.myModal.hide()
                console.log(response.data.id);
                 // console.log(this.getVueItems());
                 this.getVueItems();
               })
              .catch(error => {
               if (error.response) {
                 if (error.response.status) {
                  console.log('DUPLICATE NAME')
                }


              } 

            });
            }
          }
        }
        </script>