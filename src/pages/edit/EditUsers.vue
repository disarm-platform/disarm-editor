<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="users_wp"
       @select="onchange"
      style="width: 100%"
    >
      <el-table-column
        property="username"
        fixed
        label="Name"
        width="100">
      </el-table-column>
      <el-table-column
        v-for="(permission) in permission_strings"
        v-bind:key="permission"
        :property="permission"
        :label="permission"
        with="500"
      >
        <template slot-scope="scope">
          <el-checkbox
          v-model="scope.row[scope.column.label]"
          @change="onchange(scope.row,scope.column)"
          />
        </template>
      </el-table-column>s
    </el-table>
  </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import config_schema_json_1 from "@locational/config-validation/build/module/config_schema.json";
    import {Permission, User} from "@/types";

    const users = [
        {
            _id: "1",
            name: "Sihle",
            username: "sm"
        },
        {
            _id: "2",
            name: "Thokozani",
            username: "tn"
        },
        {
            _id: "3",
            name: "Bob",
            username: "bob"
        }
    ]

    const permissions = [{
        _id:'0',
        user_id:"3",
        instance_id:"1",
        value:"write:irs_monitor"
    }] as Permission[];

    window.u=users;
    window.p=permissions;


    const applets = ["irs_monitor","irs_plan"]

window.applets = applets;

    export default Vue.extend({
        mounted() {
            const perms = this.permission_strings
            const result = users.map(u => {
                const user_permissions = perms.forEach(p => {
                    const exists_for_user = permissions.some(permission => permission.user_id === u._id && permission.value === p)
                        u[p] = exists_for_user
                });
                return u;
                })
            this.users_wp = result;
        },
        data() {
            return {
                users: users as User[],
                permissions:permissions as Permission[],
                applets:applets,
                users_wp:[]
            };
        },
        computed: {
            permission_strings() {
                return this.applets
                    .map((applet:string) => `write:${applet}`)
                    .concat(this.applets.map(applet => `read:${applet}`))
            }

        },
        methods: {
            handle_change(scope) {
                const {row, column} = scope
                if(this.checked(scope)){ //remove
                    const index = this.permissions
                        .findIndex(p => p.user_id === row._id && p.value === column.property)
                    this.permissions.splice(index,1)
                }else { //Add and if its a write add the read as well

                    this.permissions.push({user_id:row._id,value:column.property})
                    if(column.property.startsWith("write:")){
                        this.permissions.push({user_id:row._id,value:column.property.replace("write","read")})
                    }
                }
            },
            onchange(a,b,c){
                console.log(a,b,c)
                const index = this.users_wp.findIndex(u => u._id === a._id)
                this.$set(this.users_wp, index, a)
            },
            checked(scope){
                const {row, column} = scope

                return this.permissions
                    .some(p => p.user_id === row._id && p.value === column.property)
            }
        },
    });
</script>

<style lang='scss' scoped>

</style>
