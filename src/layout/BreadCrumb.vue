<script setup lang="ts">
import { onBeforeMount, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteLocationMatched } from 'vue-router'
import { dashboardRoute } from '@/router'
import { resolve } from 'pathe'

const route = useRoute()
const routeMatched = ref<RouteLocationMatched[]>([])
const props = withDefaults(defineProps<{
  withIcons?: boolean
}>(), {
  withIcons: false
})

onBeforeMount(() => refreshBreadCrumb())
watch(() => route.path, refreshBreadCrumb)

function refreshBreadCrumb() {
  routeMatched.value = route.matched.filter((item) => item.meta.breadcrumb !== false && !item.meta.hidden)
  if (routeMatched.value.length === 0) return
  if (routeMatched.value[0].path !== '/dashboard') {
    routeMatched.value.unshift(<RouteLocationMatched>{ ...dashboardRoute.children?.[0], path: resolve('/', dashboardRoute.children?.[0].path as string) })
  }
}
</script>

<template>
  <ElBreadcrumb>
    <ElBreadcrumbItem v-for="(route, index) in routeMatched" :key="route.path">
      <ElIcon v-if="props.withIcons && route.meta.icon">
        <SvgIcon v-if="typeof route.meta.icon === 'string'" :iconName="(route.meta.icon as string)"></SvgIcon>
        <component v-else :is="route.meta.icon"></component>
      </ElIcon>
      <RouterLink custom :to="route.path" v-slot="{ navigate, href }">
        <a v-if="index < routeMatched.length - 1" :href="href" @click="navigate">&nbsp;{{ route.meta.title }}</a>
        <span v-else>&nbsp;{{ route.meta.title }}</span>
      </RouterLink>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
