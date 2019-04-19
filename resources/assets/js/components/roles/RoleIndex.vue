<template>
    <div>
      <div>
  <!-- Using modifiers -->
   
</div>
        <div class="form-group">
              <b-button v-b-modal.modal-prevent>Launch demo modal</b-button>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">Role list</div>
            <div class="panel-body">
                <table class="table table-bordered table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Power</th> 
                        <th>Created At</th> 

                        <th width="100">&nbsp;</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="role, index in roles">
                        <td>{{ role.name }}</td>
                        <td>{{ role.power }}</td>
                        <td>{{ role.created_at }}</td>
                        <td>
                            <router-link :to="{name: 'editRole', params: {id: role.id}}" class="btn btn-info">
                                Edit
                            </router-link>
                            <a href="#"
                               class="btn btn-danger"
                               v-on:click="deleteEntry(role.id, index)">
                                Delete
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
        <b-form-input v-model="role.name" placeholder="Enter your name"></b-form-input>
         <b-form-input v-model="role.power" placeholder="Enter your name"></b-form-input>
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
                    power: '',
                }
            }
        },
        mounted() {
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
                    this.role.power = '';

              },
                 handleOk(bvModalEvt) {
                    // Prevent modal from closing
                    bvModalEvt.preventDefault()
                    if (!this.role.name) {
                      alert('Please enter your name')
                    } else {
                      this.handleSubmit()
                    }
                  },  
             handleSubmit() {
                 
                axios.post('/role/roles', {
                    name: this.role.name,
                    power: this.role.power,

                })
                    .then(response => {
                      // this.role.id = response.data.id; 
                     console.log(response.data.id);
                       this.roles.push({ name: this.role.name, power: this.role.power})
                        // vm.$set(vm.roles, 'name', this.role.name)
                        var app = this;
                        axios.get('/role/roles')
                        .then(function (resp) {
                            app.roles = resp.data;
                        })
                        .catch(function (resp) {
                            console.log(resp);
                            alert("Could not load roles");
                        });

                    })
                    .catch(error => {
                        this.errors = [];
                        if (error.response.data.errors.title) {
                            this.errors.push(error.response.data.errors.title[0]);
                        }

                        if (error.response.data.errors.description) {
                            this.errors.push(error.response.data.errors.description[0]);
                        }
                    });
                 
              },
              
          
        }
    }
</script>