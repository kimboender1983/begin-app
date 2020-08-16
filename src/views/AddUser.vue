<template>
  <div class="add-user">
    <q-form
      ref="addUserForm"
      @submit="createUser"
      @reset="onReset"
      class="q-gutter-md"
    >
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-input
            filled
            v-model="form.first_name"
            label="First name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
        <div class="col-6 q-pl-md">
          <q-input
            filled
            v-model="form.last_name"
            label="Last name *"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-6 q-pr-md">
          <q-input
            filled
            v-model="form.email"
            label="Email address *"
            lazy-rules
            type="email"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:prepend> <q-icon name="email" /> </template
          ></q-input>
        </div>
        <div class="col-6 q-pl-md">
          <q-input
            filled
            v-model="form.avatar"
            label="Avatar *"
            lazy-rules
            type="url"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
          >
            <template v-slot:prepend>
              <q-icon name="portrait" />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <q-btn type="submit" label="Save"> </q-btn>
        </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import gql from 'graphql-tag'
import { Notify } from 'quasar'
import { User } from '@/models/User'
import { ALL_USERS_QUERY } from '../graphql/users/ALL_USERS'
import { CREATE_USER_MUTATION } from '../graphql/users/CREATE_USER'

export default Vue.extend({
  name: 'AddUsers',
  data() {
    return {
      mounted: false,
      form: {
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        active: true,
      } as User,
    }
  },
  methods: {
    async getAllUsers() {
      const users = await this.$apollo.query({
        query: ALL_USERS_QUERY,
      })
    },
    async createUser() {
      const { first_name, last_name, email, avatar, active } = this.form

      try {
        const createdUser = await this.$apollo.mutate({
          mutation: CREATE_USER_MUTATION,
          variables: {
            first_name,
            last_name,
            email,
            avatar,
            active,
          },
        })
        this.onReset()
        this.$q.notify({
          message: `Succefully created ${first_name} ${last_name}`,
          color: 'positive',
        })
      } catch (error) {}
    },
    onReset() {
      this.form = {
        first_name: '',
        last_name: '',
        email: '',
        avatar: '',
        active: true,
      } as User
    },
  },
})
</script>
