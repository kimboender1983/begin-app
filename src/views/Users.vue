<template>
  <div class="users">
    <div class="q-pb-md">
      <q-btn
        tag="router-link"
        to="/users/add"
        label="Add"
        class="q-mr-md"
        align="right"
      />
      <q-btn
        label="Remove selected"
        @click="removeUsers"
        :disable="selected.length <= 0"
        ><q-badge :label="selected.length" class="q-ml-md"
      /></q-btn>
    </div>
    <q-table
      :data="users"
      :columns="columns"
      row-key="id"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
      :loading="loading"
    >
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-avatar>
            <img :src="props.row.avatar" />
          </q-avatar>
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { QTable, QAvatar, QBtnGroup } from 'quasar'
import { User } from '@/models/User'
import { ALL_USERS_QUERY } from '../graphql/users/ALL_USERS'
import { REMOVE_USERS_MUTATION } from '../graphql/users/REMOVE_USERS'

import gql from 'graphql-tag'

export default Vue.extend({
  name: 'Users',
  created() {
    this.getAllUsers()
  },
  data() {
    return {
      users: [] as User[],
      selected: [] as User[],
      columns: [
        {
          name: 'First name',
          required: true,
          label: 'First name',
          align: 'left',
          sortable: true,
          field: 'first_name',
        },
        {
          name: 'id',
          required: true,
          label: 'Last name',
          align: 'left',
          sortable: true,
          field: 'last_name',
        },
        {
          name: 'email',
          required: true,
          label: 'Email',
          align: 'left',
          sortable: true,
          field: 'email',
        },
        {
          name: 'active',
          required: true,
          label: 'Active',
          align: 'left',
          sortable: true,
          field: 'active',
        },
        {
          name: 'avatar',
          required: true,
          label: 'Avatar',
          align: 'right',
          sortable: true,
          field: 'avatar',
        },
      ],
    }
  },
  computed: {
    loading() {
      return this.$apollo.loading
    },
  },
  methods: {
    async getAllUsers() {
      try {
        const users = await this.$apollo.query({
          query: ALL_USERS_QUERY,
        })
        console.log('Get all users')
        this.users = users.data.users
      } catch (error) {
        console.log(error)
      }
    },
    getSelectedString(): string {
      return this.selected.length === 0
        ? ''
        : `${this.selected.length} record${
            this.selected.length > 1 ? 's' : ''
          } selected of ${this.users.length}`
    },
    async removeUsers() {
      const ids: string[] = this.selected.map((user) => user.id)

      try {
        const response = await this.$apollo.mutate({
          mutation: REMOVE_USERS_MUTATION,
          variables: { ids },
        })

        if (response.data.removeUsers.status)
          for (const [i, user] of this.users.entries()) {
            if (ids.includes(user.id)) this.users.splice(i, 1)
          }
        this.$q.notify({
          message: `Just removed ${this.selected.length} user${
            this.selected.length > 1 ? 's' : ''
          }`,
          color: 'info',
        })
        this.selected = []
      } catch (error) {
        console.log(error)
      }
    },
  },
})
</script>
