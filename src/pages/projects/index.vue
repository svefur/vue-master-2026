<script setup lang="ts">
import type { ProjectsQuery } from '@/utils/supaQueries'
import { projectsQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/projectsColumn'

usePageStore().pageData.title = 'Projects'

const projects = ref<ProjectsQuery | null>(null)

const getProjects = async () => {
	const { data, error, status } = await projectsQuery

	if (error) useErrorStore().setError({ error: error, customCode: status })

	projects.value = data
}

await getProjects()
</script>
<template>
	<DataTable v-if="projects" :columns="columns" :data="projects" />
</template>
<style scope></style>
