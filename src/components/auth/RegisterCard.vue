<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

const form = ref(null)
const isFormValid = ref(false)

// ROUTER
const router = useRouter()
const goBack = () => {
    router.push({ name: 'login' })
}

// VARIABLES
const company = ref('')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

// VALIDATION
const required = v => !!v || 'Campo obrigatório.'
const emailRule = v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido.'
const passwordRules = [
    v => !!v || 'Campo obrigatório',
    v => v.length >= 8 || 'Deve conter no mínimo 8 caracteres.',
    v => /[A-Z]/.test(v) || 'Deve conter pelo menos uma letra maiúscula.',
    v => /[^A-Za-z0-9]/.test(v) || 'Deve conter pelo menos um caracter especial.'
]

// CHECKMARK VALIDATION
const emailValid = computed(() => /.+@.+\..+/.test(email.value))
const passwordValid = computed(() =>
    password.value.length >= 8 &&
    /[A-Z]/.test(password.value) &&
    /[^A-Za-z0-9]/.test(password.value)
)

async function register() {
    const { valid } = await form.value.validate()

    if (!valid) return

    loading.value = true

    // SIMULATE API CALL
    setTimeout(() => {
        loading.value = false
        console.log('Registro: ', {
            company: company.value,
            email: email.value,
            password: password.value
        })
    }, 1500)
}
</script>

<template>
    <v-card
        width="420"
        elevation="10"
        rounded="xl"
        class="pa-6"
    >
        <v-card-title class="text-h5 text-center mb-4">
            Criar conta
        </v-card-title>

        <v-form ref="form" v-model="isFormValid" validate-on="blur">
            <v-text-field
                v-model="company"
                label="Nome da Empresa"
                variant="outlined"
                density="comfortable"
                :rules="[required]"
                class="mb-4"
            />

            <v-text-field 
                v-model="email"
                label="Email"
                variant="outlined"
                density="comfortable"
                :rules="[required, emailRule]"
                :append-inner-icon="emailValid ? 'mdi-check-circle' : ''"
                :color="emailValid ? 'success' : undefined"
                class="mb-4"
            />

            <v-text-field 
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                label="Senha"
                variant="outlined"
                density="comfortable"
                :rules="passwordRules"
                :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                :color="passwordValid ? 'success' : undefined"
                @click:append-inner="showPassword = !showPassword"
                class="mb-6"
            />

            <v-btn
                block
                color="primary"
                size="large"
                :loading="loading"
                :disabled="!isFormValid"
                @click="register"
            >
                Criar
            </v-btn>

            <v-btn
                class="mt-4"
                variant="text"
                @click="goBack"
            >
                ← Voltar
            </v-btn>
        </v-form>
    </v-card>
</template>