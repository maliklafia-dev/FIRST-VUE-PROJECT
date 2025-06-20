<script setup>
  import { RouterLink, useRoute } from 'vue-router';
  import { reactive, onMounted } from 'vue';
  import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
  import axios from 'axios';
  import BackButton from '@/components/BackButton.vue';
  import router  from '@/router';
  import { useToast } from 'vue-toastification';

  const route = useRoute();
  const jobId = route.params.id;

  const state = reactive({
    isLoading: true,
    job: {},
  });

  const toast = useToast();
  
  const deleteJob = async () => {
    if (confirm('Are you sure you want to delete this job?')) {
      try {
        await axios.delete(`/api/jobs/${jobId}`);
        toast.success('Job deleted successfully');
        router.push('/jobs');
      } catch (error) {
        toast.error('Failed to delete job');
        console.error('Failed to delete job:', error);
      }
    }
  };


  onMounted(async () => {
    try {
      const response = await axios.get(`/api/jobs/${jobId}`);
      if (!response.data) {
        throw new Error('Job not found');
      } 
      state.job = response.data;
    } catch (error) {
      console.error('Error fetching job details:', error);
    } finally {
      state.isLoading = false;
    }
  }
    
  );

</script>

<template>
  <!-- Show loading spinner while loading is true-->
    <BackButton/>
    <section  class="bg-green-50">

      <div v-if="state.isLoading" class="text-center text-gray-500 py-6">
      <PulseLoader />
      </div>

      <div v-else class="container m-auto py-10 px-6">
        <div class="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
          <main>
            <div
              class="bg-white p-6 rounded-lg shadow-md text-center md:text-left"
            >
              <div class="text-gray-500 mb-4">{{ state.job.type }}</div>
              <h1 class="text-3xl font-bold mb-4">{{state.job.title}}</h1>
              <div
                class="text-gray-500 mb-4 flex align-middle justify-center md:justify-start"
              >
                <i
                  class="fa-solid fa-location-dot text-lg text-orange-700 mr-2"
                ></i>
                <p class="text-orange-700">Boston, MA</p>
              </div>
            </div>

            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-green-800 text-lg font-bold mb-6">
                Job Description
              </h3>

              <p class="mb-4">
                {{state.job.description}}
              </p>

              <h3 class="text-green-800 text-lg font-bold mb-2">Salary</h3>

              <p class="mb-4">{{ state.job.salary }}</p>
            </div>
          </main>

          <!-- Sidebar -->
          <aside>
            <!-- Company Info -->
            <div class="bg-white p-6 rounded-lg shadow-md">
              <h3 class="text-xl font-bold mb-6">Company Info</h3>

              <h2 class="text-2xl">{{ state.job.company.name }}</h2>

              <p class="my-2">
                {{ state.job.company.description}}
              </p>

              <hr class="my-4" />

              <h3 class="text-xl">Contact Email:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">
                {{ state.job.company.contactEmail }}
              </p>

              <h3 class="text-xl">Contact Phone:</h3>

              <p class="my-2 bg-green-100 p-2 font-bold">{{ state.job.company.contactPhone }}</p>
            </div>

            <!-- Manage -->
            <div class="bg-white p-6 rounded-lg shadow-md mt-6">
              <h3 class="text-xl font-bold mb-6">Manage Job</h3>
              <RouterLink
                :to="`/jobs/edit/${state.job.id}`"
                class="bg-green-500 hover:bg-green-600 text-white text-center font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block"
                >Edit Job</RouterLink>
              <button
                class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline mt-4 block" @click="deleteJob">
                Delete Job
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
</template>