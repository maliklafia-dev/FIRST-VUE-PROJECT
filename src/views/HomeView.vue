<script setup> 
    import Hero from '@/components/Hero.vue';
    import HomeCard from '@/components/HomeCard.vue';
    import JobListing from '@/components/JobListings.vue';

</script>
<template>
    <Hero />
    <HomeCard/>
    <JobListing :limit="3", :showButton="true"/>
</template>