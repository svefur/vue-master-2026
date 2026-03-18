import type { CustomError, ExtendedPostgrestError } from '@/types/Error'
import type { PostgrestError } from '@supabase/supabase-js'

export const useErrorStore = defineStore('error-store', () => {
	const activeError = ref<CustomError | null | ExtendedPostgrestError>(null)
	const isCustomError = ref(false)

	const setError = ({ error, customCode }: { error: string | PostgrestError | Error; customCode?: number }) => {
		if (typeof error === 'string') {
			isCustomError.value = true
		}

		if (typeof error === 'string' || error instanceof Error) {
			activeError.value = typeof error === 'string' ? new Error(error) : error
			activeError.value.customCode = customCode || 500
			return
		}

		activeError.value = error
		activeError.value.statusCode = customCode ?? 500
	}

	const clearError = () => {
		isCustomError.value = false
		activeError.value = null
	}
	return {
		activeError,
		setError,
		isCustomError,
		clearError,
	}
})

if (import.meta.hot) {
	import.meta.hot.accept(acceptHMRUpdate(useErrorStore, import.meta.hot))
}
