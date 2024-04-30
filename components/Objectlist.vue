<script setup>
import { FolderPlus } from 'lucide-vue-next'
import { FileUp } from 'lucide-vue-next'
import { useToast } from '@/components/ui/toast/use-toast'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
const router = useRouter()
const route = useRoute()
const { toast } = useToast()
const props = defineProps(['objects', 'folders', 'currentpath'])
const name = route.params.name
const rowClicked = (row) => {
  const value = row.target
  // Extracting the text content from the element
  const prefix = value.textContent.trim();
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
    header: 'Object Name'
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
  const response_status_code = response.data.value.$metadata.httpStatusCode
  if (response_status_code === 200) {
    console.log('folder created')
    refreshNuxtData()
    createToast()
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
          <!-- <Toaster /> -->
          <DialogClose>
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
    <DataTable class="ml-6" :data="props.folders" :columns="columns_folders" @click="rowClicked">
    </DataTable>
  </div>

  <!-- <Dialog v-model:visible="visible" modal header="Create Folder" :style="{ width: '25rem' }">
    <span class="p-text-secondary block mb-5">Create a folder under {{ currentpath }}</span>
    <div class="flex items-center gap-3 mb-3">
      <label for="folderName" class="font-semibold w-6rem">Folder Name</label>
      <InputText id="folderName" class="flex-auto" autocomplete="off" v-model="folderName"/>
    </div>
    <div class="flex justify-content-end gap-2">
      <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
      <Button type="button" label="Save" @click="createFolder"></Button>
    </div>
  </Dialog> -->




</template>
