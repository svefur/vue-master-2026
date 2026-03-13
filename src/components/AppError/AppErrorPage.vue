<script setup lang="ts">
const router = useRouter()
const errorStore = useErrorStore()

const error = ref(errorStore.activeError)

const message = ref('')
const customCode = ref(0)
const details = ref('')
const code = ref('')
const hint = ref('')
const statusCode = ref(0)

const ErrorTemplate = import.meta.env.DEV ? defineAsyncComponent(() => import('./AppErrorDevSection.vue')) : defineAsyncComponent(() => import('./AppErrorProdSection.vue'))

if (error.value && !('code' in error.value)) {
	message.value = error.value.message || 'An error occurred'
	customCode.value = error.value.customCode ?? 0
}

if (error.value && 'code' in error.value) {
	message.value = error.value.message
	details.value = error.value.details
	code.value = error.value.code
	hint.value = error.value.hint
	statusCode.value = error.value.statusCode ?? 0
}

router.afterEach(() => {
	errorStore.clearError()
})
</script>

<template>
	<section class="error">
		<component :is="ErrorTemplate" :customCode="customCode" :statusCode="statusCode" :message="message" :hint="hint" :details="details" :code="code" />
	</section>
</template>
<style lang="postcss" scoped>
@import '../../style.css';
.error {
	@apply mx-auto flex justify-center items-center flex-1 p-10 text-center -mt-20 min-h-[90vh] max-w-2xl;
}

:deep(.error__icon) {
	@apply text-3xl text-destructive;
}

:deep(.error__code) {
	@apply font-extrabold text-3xl text-secondary;
}

:deep(.error__msg) {
	@apply text-xl font-extrabold text-primary;
}

:deep(.error-footer) {
	@apply flex flex-col items-center justify-center gap-5 mt-6 font-light;
}

:deep(.error-footer__text) {
	@apply text-lg text-muted-foreground;
}

:deep(p) {
	@apply my-2;
}
</style>
