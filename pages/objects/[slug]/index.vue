<template>
  <div class="items-center justify-center text-center text-xl">
    Objects under
    <div class="font-bold">{{ $route.params.slug }}</div>
  </div>

  <div class="flex flex-row items-center justify-center gap-10 my-5">
    <DataTable :data="contents.data.arrays" :columns="columns_objects" />
    <DataTable :data="contents.data.folders" :columns="columns_folders" :rowclick="rowClicked" />
  </div>
</template>

<script setup>
import { ArrowUpDown } from 'lucide-vue-next';
import { Button } from '~/components/ui/button';

const router = useRouter();
const route = useRoute();
const { data: contents } = await useFetch(`/api/object/${route.params.slug}`);
console.log(`contents are ${JSON.stringify(contents)}`);
const rowClicked = (row) => {
  // const value = row.target
  // Extracting the text content from the element
  // const prefixname = value.textContent.trim();
  const prefixname = row.Name;
  router.push(`${route.path}/prefix/${prefixname}`);
};

const columns_objects = [
  {
    accessorKey: "Key",
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Object Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('Key')),
  },
  {
    accessorKey: "LastModified",
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Last Modified', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('LastModified')),
  },
  {
    accessorKey: "Size",
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Object Size', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('Size')),
  },
];

const columns_folders = [
  {
    accessorKey: "Name",
    header: "Folder Name",
  },
];
</script>
