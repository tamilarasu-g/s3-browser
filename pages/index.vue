<script setup>
import { useToast } from '@/components/ui/toast/use-toast'

const router = useRouter()

const { toast } = useToast()

const { data: buckets } = await useFetch('/api/buckets')
const bucketrowClicked = (row) => {
  const value = row.target
  // Extracting the text content from the element
  const name = value.textContent.trim();
  // console.log(typeof (value));
  router.push({ path: `/objects/${name}` })
  // router.push({name:'object-slug', params: {slug: `${name}`}})
}

const columns = [
  {
    accessorKey: "Name",
    header: "Bucket Name",
  },
  {
    accessorKey: "CreationDate",
    header: "Created At"
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
    <DataTable :columns="columns" :data="buckets" @click="bucketrowClicked" />
  </div>

</template>