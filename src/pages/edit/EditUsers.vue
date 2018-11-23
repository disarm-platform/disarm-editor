<template>
  <div>
    <el-table
      ref="multipleTable"
      :data="users"
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
            @change="handle_change(scope)"
            :checked="checked(scope)"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import config_schema_json_1 from "@locational/config-validation/build/module/config_schema.json";

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

    export default Vue.extend({
        mounted() {
        },
        data() {
            return {
                users: users as Uaser[],
                permissions:[]
            };
        },
        computed: {
            applets() {
                return Object.keys(config_schema_json_1.definitions.TApplets.properties);
            },
            permission_strings() {
                return this.applets
                    .map(applet => `read:${applet}`)
                    .concat(this.applets.map(applet => `write:${applet}`))
            },

        },
        methods: {
            handle_change(scope) {
                const {row, column} = scope
                if(this.checked(scope)){ //remove
                    const index = this.permissions
                        .findIndex(p => p.user_id === row._id && p.value === column.property)
                    this.permissions.splice(index,1)
                }else { //Add
                    this.permissions.push({user_id:row._id,value:column.property})
                }
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
