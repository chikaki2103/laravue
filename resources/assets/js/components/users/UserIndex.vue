<template>

    <div class="wrapper">
        <div class="animated fadeIn">
            <div class="row">
                <div class="col-12">
                    <b-card header="Role Lists">
                        <div class="form-group">
                            <b-button v-b-modal.modal-prevent variant="primary">
                                <i class="fa fa-plus" aria-hidden="true"></i> Add new User
                            </b-button>
                        </div>
                        <div class="panel panel-default">
                            <div class="panel-body" id="role-table">
                                <v-server-table url="/user/users" :columns="columns" :data="users" :options="options" ref="table">
                                    <div slot="uri" slot-scope="props">
                                        <a id="btn-edit" v-b-modal.modal-edit class="btn btn-warning" v-on:click="edit(props.row.id, props.row.index)" title="Edit Role">
                                            <i class="fa fa-pencil" aria-hidden="true"></i>
                                        </a>
                                        <a id="btn-delete" class="btn btn-danger" v-on:click="deleteEntry(props.row.id, props.row.index)" title="Delete Role">
                                            <i class="fa fa-times" aria-hidden="true"></i>
                                        </a>
                                    </div>
                                </v-server-table>
                            </div>
                        </div>
                        <b-modal id="modal-prevent" ref="modal" title="Submit new user" @ok="handleOk" @shown="clearName">
                            <form @submit.stop.prevent="handleSubmit">
                                <!-- <b-form-input v-model="role.name" placeholder="Enter your name"></b-form-input>
                <b-form-input v-model="role.display_name" placeholder="Enter your dis play"></b-form-input>-->
                                <b-form-group label="Enter user:">
                                    <b-form-input v-model="user.name" type="text" required placeholder="Please enter role"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Enter display name:">
                                    <b-form-input v-model="user.email" type="text" placeholder="Please enter display name"></b-form-input>
                                </b-form-group>
                                 <b-form-group label="Enter display name:">
                                    <b-form-input v-model="user.password" type="text" placeholder="Please enter display name"></b-form-input>
                                </b-form-group>
                            </form>
                        </b-modal>
                        <b-modal id="modal-edit" ref="myModal" title="Edit user" @ok="handleOkEdit" @shown="clearName">
                            <form @submit.stop.prevent="handleSubmitEdit" @focus.native="handleSubmitEdit()">
                                <!-- <b-form-input v-model="editRole.name" placeholder="Enter role:"></b-form-input>
                <b-form-input v-model="editRole.display_name" placeholder="Enter Display Name:"></b-form-input>-->
                                <b-form-group label="Enter user:">
                                    <b-form-input v-model="editUser.name" type="text" required placeholder="Please enter user"></b-form-input>
                                </b-form-group>
                                <b-form-group label="Enter display name:">
                                    <b-form-input v-model="editUser.email" type="text" placeholder="Please enter display name"></b-form-input>
                                </b-form-group>
                            </form>
                        </b-modal>
                    </b-card>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
// Vue.use(VueTables.ClientTable);
export default {
    data: function() {
        return {
            users: [],
            user: {
                name: "",
                email: "",
                password:"",
                created_at: "",
            },
            editUser: {},
            columns: ["id", "name", "email", "created_at", "uri"],
            options: {
                headings: {
                    name: "Name",
                    code: "Email Name",
                    created_at: "created_at",
                    uri: "Action"
                },
                sortIcon: {
                    base: "fa fa-sort",
                    up: "fa fa-sort-desc",
                    down: "fa fa-sort-asc"
                },
                sortable: ["id", "name", "email", "created_at"],
                filterable: ["id", "name", "email", "created_at"],
                orderBy: { ascending: true },
                orderBy: { column: "id" }
            }
        };
    },
    mounted() {},
    methods: {
        getVueItems: function getVueItems() {
            var app = this;
            axios
                .get("/user/users")
                .then(function(resp) {
                    app.user = resp.data;

                })
                .catch(function(resp) {
                    console.log(resp);
                    alert("Could not load user");
                });
        },
        deleteEntry(id, index) {
          
             this.$swal("Are you sure? You won't be able to revert this!", {
                buttons: {
                    cancel: {
                        text: "Cancel",
                        value: null,
                        visible: true,
                        className: "",
                        closeModal: true,
                        icon: "warning"
                    },
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "",
                        closeModal: true
                    }
                }
            }).then(confirmed => {
                if (confirmed) {
                  // console.log(ability.can('delete'));
                  if (ability.can('delete','all')) {
                    axios
                        .delete("/user/users/" + id)
                        .then(response => {
                          console.log(ability.rules)
                            this.$refs.table.getData();
                            this.$swal("Poof! Your user has been deleted!", {
                                icon: "success"
                            });
                        })
                        .catch(error => {
                            if (error.response) {
                                this.$notify({
                                    group: "foo",
                                    title: "ERROR!!!",
                                    text: "error while delete",
                                    type: "error"
                                });
                            }
                        });
                  }else {
                    swal("Cancelled", "Don't Have Permission!", "error");
                  }
                    
                } else {
                    swal("Cancelled", "Your User has not been deleted !", "error");
                }
            });
         
           
        },
        clearName() {
            this.user.name = "";
            this.user.email = "";
        },
        handleOk(bvModalEvt) {
            // Prevent modal from closing
            bvModalEvt.preventDefault();
            if (!this.user.name) {

            } else {
                this.handleSubmit();
            }
        },
        handleSubmit() {
            axios
                .post("/user/users", {
                    name: this.user.name,
                    email: this.user.email
                })
                .then(response => {
                    this.$refs.modal.hide();
                    console.log(response.data.id);
                    // console.log(this.getVueItems());
                    // this.getVueItems();
                    this.$refs.table.getData();

                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status) {
                            console.log('DUPLICATE NAME')
                            this.$toasted.error('Trùng tên', {
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
            bvModalEvt.preventDefault();
            if (!this.editUser.name) {

            } else {
                this.handleSubmitEdit();
            }
        },
        edit(id, index) {
            let app = this;

            app.userId = id;
            axios
                .get("/user/users/" + id)
                .then(function(resp) {
                    app.editUser = resp.data;
                })
                .catch(function() {
                    // alert("Could not load your editRole");

                });
        },
        handleSubmitEdit() {
            event.preventDefault();
            // console.log(this.$refs.myModal);
            // console.log(this.$refs["myModal"].hide());
            this.$refs["myModal"].hide();
            var newUser = this.editUser;
            axios
                .patch("/user/users/" + this.userId, newUser)
                .then(response => {
                    this.$refs.myModal.hide();
                    this.$refs.table.getData();
                    this.$notify({
                        group: "foo",
                        title: "Success!!!",
                        text: "Edit Permission success!",
                        type: "success"
                    });
                })
                .catch(error => {
                    if (error.response) {
                        if (error.response.status) {

                        }
                    }
                });
        }
    }
};
</script>
<style>
tr td:nth-child(1) {
    width: 10%;
}

tr td:nth-child(2) {
    width: 30%;
}

tr td:nth-child(3) {
    width: 30%;
}

tr td:nth-child(4) {
    width: 15%;
}

tr td:nth-child(5) {
    width: 15%;
}

#btn-edit {
    border-radius: 5px;
    color: floralwhite;
    font-size: 15px;
}

#btn-delete {
    border-radius: 5px;
    color: white;
    font-size: 15px;
}

legend {
    font-size: 20px;
}

.modal-dialog {
    margin-top: 80px;
}
.VueTables__search-field label{
    display : none;
}
</style>