<script setup>
import { useToast } from '@/components/ui/toast/use-toast'
import { ArrowUpDown, ChevronDown } from 'lucide-vue-next'
import { Button } from '~/components/ui/button';
const router = useRouter()

const { toast } = useToast()

const { data: buckets } = await useFetch('/api/buckets')
const bucketrowClicked = (row) => {
  // const value = row.target
  // console.log(row.Name);
  const name = row.Name
  // Extracting the text content from the element
  // const name = value.textContent.trim();
  // console.log(typeof (value));
  router.push({ path: `/objects/${name}` })
  // router.push({name:'object-slug', params: {slug: `${name}`}})
}

const columns = [
  {
    accessorKey: "Name",
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Bucket Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('Name')),
  },
  {
    accessorKey: "CreationDate",
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Created At', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('CreationDate')),
  }
]

</script>

<template>
  <div class="my-4 text-center text-xl">
    Buckets
  </div>
  <Toaster/>
  <Button
  
    variant="outline" @click="() => {
      console.log(toast({
        description: 'Your message has been sent.',
      }))
    }"
  >
    Show Toast
  </Button>

  <div class="container py-10 mx-auto">
    <DataTable :columns="columns" :data="buckets" :rowclick="bucketrowClicked" />
  </div>

</template>