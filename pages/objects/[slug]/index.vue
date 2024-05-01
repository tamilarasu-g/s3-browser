<template>

  <div class="items-center justify-center text-center text-xl">
    Objects under <div class="font-bold">{{ $route.params.slug }}</div>
  </div>

  <div class="flex flex-row items-center justify-center gap-10 my-5">
    <DataTable :data="contents.data.arrays" :columns="columns_objects"/>
    <DataTable :data="contents.data.folders" :columns="columns_folders" :rowclick="rowClicked"/>
  </div>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const { data: contents } = await useFetch(`/api/object/${route.params.slug}`)
// console.log(`contents are ${JSON.stringify(contents)}`)
const rowClicked = (row) => {
  const value = row.target
  // Extracting the text content from the element
  // const prefixname = value.textContent.trim();
  const prefixname = row.Name
  router.push(`${route.path}/prefix/${prefixname}`)
}

const columns_objects = [
  {
    accessorKey: 'Key',
    header: 'Object Name',
  },
  {
    accessorKey: 'LastModified',
    header: 'Last Modified'
  },
  {
    accessorKey: 'Size',
    header: 'Object Size'
  }
]

const columns_folders = [
  {
    accessorKey: 'Name',
    header: 'Folder Name'
  }
]

</script>