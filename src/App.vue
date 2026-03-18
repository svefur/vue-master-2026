<script setup lang="ts">
const errorStore = useErrorStore()

onErrorCaptured((error) => {
	errorStore.setError({ error })
	return false
})
onMounted(async () => {
	useAuthStore().trackAuthChanges()
})
</script>

<template>
	<AuthLayout>
		<AppErrorPage v-if="errorStore.activeError" />
		<RouterView v-else v-slot="{ Component, route }">
			<Suspense v-if="Component" timeout="0">
				<Component :is="Component" :key="route.name"></Component>
				<template #fallback>
					<span class="text-gray-500">Loading...</span>
				</template>
			</Suspense>
		</RouterView>
	</AuthLayout>
</template>
