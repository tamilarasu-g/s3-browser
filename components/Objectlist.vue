<script setup>
import { ArrowUpDown, FolderPlus } from 'lucide-vue-next'
import { FileUp } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Button from './ui/button/Button.vue'
const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const props = defineProps(['objects', 'folders', 'currentpath'])
const name = route.params.name
const rowClicked = (row) => {
  // const value = row.target
  // Extracting the text content from the element
  // const prefix = value.textContent.trim();
  const prefix = row.Name
  const currentRoute = route.path // Construct full path
  // console.log(`current route is ${currentRoute}/${prefix}`);
  // console.log(route.matched)
  router.push(`${currentRoute}/${prefix}`);
  // router.push()
  // Navigate to the nested route
  // const path = `${route.path}/${name}`
  // router.push({ path: `/object/${route.params.name}/${name}`})
  // console.log(`new path is ${newPath}`)
}

// Columns for the Data Table
const columns_objects = [
  {
    accessorKey: 'Name',
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Object Name', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('Name')),
  },
  {
    accessorKey: 'LastModified',
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Last Modified', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'lowercase' }, row.getValue('LastModified')),
  },
  {
    accessorKey: 'Size',
    header: ({ column }) => {
            return h(Button, {
                variant: 'ghost',
                onClick: () => column.toggleSorting(column.getIsSorted() === 'asc'),
            }, () => ['Object Size', h(ArrowUpDown, { class: 'ml-2 h-4 w-4' })])
        },
        cell: ({ row }) => h('div', { class: 'uppercase' }, row.getValue('Size')),
  }
]

const columns_folders = [
  {
    accessorKey: 'Name',
    header: 'Folder Name'
  }
]

const createToast = () => {
  toast({
        description: 'Your message has been sent.'
      })
}

const folderName = ref("")
const createFolder = async () => {
  const response = await useFetch('/api/createFolder', {
    method: 'post',
    body: { folderName: `${folderName.value}/`, prefix: `${(props.currentpath).substring((props.currentpath).indexOf("/") + 1)}/`, bucketName: `${(props.currentpath).split("/")[0]}` }
  })
  folderName.value = ''
  // console.log(typeof(response.data.value.$metadata.httpStatusCode));
  createToast()
  const response_status_code = response.data.value.$metadata.httpStatusCode
  if (response_status_code === 200) {
    console.log('folder created')
    refreshNuxtData()
  }
}

</script>

<template>

  <div class="text-xl my-2 items-center text-center justify-center">
    <h2>
      Objects under {{ currentpath }}
    </h2>
  </div>

  <div class="flex flex-row items-center justify-center gap-10 my-2">
    <Dialog>
      <DialogTrigger as-child>
        <Button class="gap-2">
          <FolderPlus />Create Folder
        </Button>
      </DialogTrigger>
      <DialogContent class="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Folder</DialogTitle>
          <DialogDescription>
            Create Folder under {{ currentpath }}
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-4 items-center gap-4">
            <Label for="folderName" class="text-right">
              Folder Name
            </Label>
            <Input id="folderName" :value="folderName" class="col-span-3" v-model="folderName" />
          </div>
        </div>
        <DialogFooter>
          <DialogClose>
            <Toaster />
            <Button @click="createFolder">
              Create
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>

    <Button class="gap-2">
      <FileUp /> Upload Files
    </Button>

  </div>

  <div class="flex flex-row items-center justify-center">
    <DataTable :data="props.objects" :columns="columns_objects" />
    <DataTable class="ml-6" :data="props.folders" :columns="columns_folders" :rowclick="rowClicked">
    </DataTable>
  </div>

</template>
