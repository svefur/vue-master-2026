<script setup lang="ts">
import type { TaskWithProjectQuery } from '@/utils/supaQueries'
import { taskWithProjectQuery } from '@/utils/supaQueries'
import { columns } from '@/utils/tableColumns/tasksColumn'

usePageStore().pageData.title = 'My Tasks'

const tasks = ref<TaskWithProjectQuery | null>(null)
const getTasks = async () => {
	const { data, error } = await taskWithProjectQuery

	if (error) console.error('Error fetching tasks:', error)
	tasks.value = data
}

await getTasks()
</script>
<template>
	<DataTable v-if="tasks" :columns="columns" :data="tasks" />
</template>
<style scope></style>
