<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router' 

const username = ref('')
const password = ref('')
const showPassword = ref(false)
const router = useRouter()

function login() {
    console.log('Login with:', username.value, password.value)
    router.push({ name: 'home' })
}

function goToRegister() {
    router.push({ name: 'register' })
}
</script>

<template>
    <v-main class="d-flex align-center justify-center" style="min-height: 100%;">
        <v-card
            width="400"
            elevation="12"
            rounded="xl"
            class="pa-6"
        >
            <v-card-title class="text-h5 text-center mb-4">
                Login
            </v-card-title>

            <v-card-text>
                <v-text-field
                    v-model="email"
                    label="E-mail"
                    prepend-inner-icon="mdi-account"
                    variant="outlined"
                    density="comfortable"
                    class="mb-4"
                />
                
                <v-text-field
                    v-model="password"
                    :type="showPassword ? 'text' : 'password'"
                    label="Senha"
                    prepend-inner-icon="mdi-lock"
                    :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                    @click:append-inner="showPassword = !showPassword"
                    variant="outlined"
                    density="comfortable"
                    class="mb-2"
                />

                <div class="text-right mb-4">
                    <v-btn variant="text" size="small">
                        Esqueceu sua senha?
                    </v-btn>
                </div>

                <v-btn
                    block
                    color="primary"
                    size="large"
                    class="mb-4"
                    @click="login"
                >
                    Entrar
                </v-btn>
            </v-card-text>

            <v-divider />

            <v-card-actions class="justify-center mt-2">
                <span class="text-body-2">
                    Não possui uma conta?
                </span>
                <v-btn
                    variant="text"
                    color="primary"
                    @click="goToRegister"
                >
                    Crie aqui
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-main>
</template>