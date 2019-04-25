<template>
    <div class="animated fadeIn">
      <div>
  <!-- Using modifiers -->
   
</div>
        <div class="form-group">
              <b-button v-b-modal.modal-prevent class="btn btn-outline-success">New Role</b-button>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Role list</div>
            <div class="panel-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Display Name</th> 
                        <th>Created At</th> 

                        <th width="150">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="role, index in roles">
                        <td>{{ role.name }}</td>
                        <td>{{ role.display_name }}</td>
                        <td>{{ role.created_at }}</td>
                        <td>
                           <!--  <router-link :to="{name: 'editRole', params: {id: role.id}}" class="btn btn-info">
                                Edit
                            </router-link> -->
                            <a v-b-modal.modal-edit
                               class="btn btn-warning"
                               v-on:click="edit(role.id, index)">
                                <span class="icon-wrench"></span>
                            </a>
                            <a href="#"
                               class="btn btn-danger"
                               v-on:click="deleteEntry(role.id, index)">
                                <span class="icon-trash"></span>
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
        <b-form-input v-model="role.name" placeholder="Enter your name"></b-form-input><br>
         <b-form-input v-model="role.display_name" placeholder="Enter your dis play"></b-form-input>
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
        <b-form-input v-model="editRole.name" placeholder="Enter your name"></b-form-input><br>
         <b-form-input v-model="editRole.display_name" placeholder="Enter your dis play"></b-form-input>
      </form>
    </b-modal>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {

                roles: [],
                 role: {
                    name: '',
                    display_name: '',
                },
                editRole :{
                  
                }
            }
        },
        mounted() {
            console.log(this.$refs.modal);
              console.log(this.$refs.myModal)
             this.getVueItems();
        },
        methods: {

            getVueItems: function getVueItems()  {
              var app = this;
                axios.get('/role/roles')
                .then(function (resp) {
                    app.roles = resp.data;
                })
                .catch(function (resp) {
                    console.log(resp);
                    alert("Could not load roles");
                });
            },
            deleteEntry(id, index) {
                if (confirm("Do you really want to delete it?")) {
                    var app = this;
                    axios.delete('/role/roles/' + id)
                        .then(function (resp) {
                            app.roles.splice(index, 1);
                        })
                        .catch(function (resp) {
                            alert("Could not delete role");
                        });
                }
            },
            clearName() {
                    this.role.name = '';
                    this.role.display_name = '';

              },
            handleOk(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    if (!this.role.name) {
                      // alert('Please enter your name')
                        this.$toasted.error('Please enter your name',{
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
                 
                axios.post('/role/roles', {
                    name: this.role.name,
                    display_name: this.role.display_name,

                })
                .then(response => {

                this.$refs.modal.hide()
                console.log(response.data.id);
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
            handleOkEdit(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    if (!this.editRole.name) {
                      alert('Please enter your name')
                    } else {
                      this.handleSubmitEdit()
                    }
                  },  
            edit(id, index){
                

               let app = this;
          
            app.roleId = id;
            axios.get('/role/roles/' + id)
                .then(function (resp) {
                    app.editRole = resp.data;

                })
                .catch(function () {
                    alert("Could not load your editRole")
                });
            } ,
          handleSubmitEdit(){

                  event.preventDefault();
              // console.log(this.$refs.myModal);
             console.log(this.$refs['myModal'].hide());
            this.$refs['myModal'].hide();
                var newRole = this.editRole;
               
                axios.patch('/role/roles/' + this.roleId, newRole)

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