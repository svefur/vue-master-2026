<script setup lang="ts"></script>

<template>
	<AuthLayout>
		<RouterView v-slot="{ Component, route }">
			<Suspense v-if="Component" timeout="0">
				<Component :is="Component" :key="route.name"></Component>
				<template #fallback>
					<span class="text-gray-500">Loading...</span>
				</template>
			</Suspense>
		</RouterView>
	</AuthLayout>
</template>
