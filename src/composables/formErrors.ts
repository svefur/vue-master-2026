import type { LoginForm } from '@/types/AuthForm'
import { AuthError } from '@supabase/supabase-js'

type FormErrors<T> = {
	[K in keyof T]: string[]
}

export const useFormErrors = () => {
	const serverError = ref('')
	const realTimeErrors = ref<FormErrors<LoginForm>>()

	const handleServerError = (error: AuthError) => {
		serverError.value = error.message === 'Invalid login credentials' ? 'Icorect email or password' : error.message
	}

	const handleLoginForm = async (formData: LoginForm) => {
		realTimeErrors.value = {
			email: [],
			password: [],
		}

		const { validateEmail, validatePasword } = await import('@/utils/formValidation')

		const emailErrors = validateEmail(formData.email)
		if (emailErrors.length) realTimeErrors.value.email = emailErrors

		const passwordErrors = validatePasword(formData.password)
		if (passwordErrors.length) realTimeErrors.value.password = passwordErrors

		if (!passwordErrors.includes('@')) realTimeErrors.value.password.push('Password must contain @ character')
	}

	return {
		serverError,
		handleServerError,
		realTimeErrors,
		handleLoginForm,
	}
}
