<script setup lang="ts">
import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import type { Tables } from '../../../database/types'

const projects = ref<Tables<'projects'>[] | null>(null)
;(async () => {
	const { data, error } = await supabase.from('projects').select()

	if (error) console.error('Error fetching projects:', error)

	projects.value = data
	console.log('Projects: ', projects.value)
})()
</script>
<template>
	<h1>Project page</h1>
	<RouterLink to="/">Go to Home</RouterLink>
	<ul>
		<li v-for="project in projects" :key="project.id">
			<RouterLink :to="{ name: '/projects/[id]', params: { id: project.slug } }">
				{{ project.name }}
			</RouterLink>
		</li>
	</ul>
</template>
<style scope></style>
