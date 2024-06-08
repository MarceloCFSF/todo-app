<template>
  <v-container class="fill-height justify-center fluid">
    <v-row class="align-center justify-center">
      <v-col cols="12" sm="8" md="4" lg="4">
        <v-card>
          <v-card-title>Login</v-card-title>
          <v-card-text>
            <form @submit.prevent="submit">
              <div class="d-flex flex-column">
              <v-text-field 
                label="Email"
                name="email"
                v-model="email.value.value"
                :error-messages="email.errorMessage.value"
              />
              <v-text-field
                label="Senha"
                name="password"
                v-model="password.value.value"
                :error-messages="password.errorMessage.value"
                type="password"
              />
              <v-btn type="submit">
                Enviar
              </v-btn>
              </div>
            </form> 
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
  import router from "@/router";
import type { LoginData } from "@/services/auth.service";
  import { useAuthStore } from "@/stores/auth";
  import { useForm, useField } from "vee-validate";
  import * as yup from 'yup';

  const validationSchema = yup.object({
    email: yup.string().email().label('Email').required(),
    password: yup.string().label('Senha').required(),
  });

  const initialValues : LoginData = {
    email: '',
    password: ''
  }

  const {
    handleSubmit
  } = useForm({
    initialValues,
    validationSchema
  });

  const email = useField<string>('email');
  const password = useField<string>('password');

  const submit = handleSubmit(async values => {
    const response = await useAuthStore().login(values);
    if (response) router.push('/');
  })
</script>