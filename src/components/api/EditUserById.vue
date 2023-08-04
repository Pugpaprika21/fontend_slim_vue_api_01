<script>
export default {
  props: ["userId"], 
  data() {
    return {
    };
  },
  mounted() {
    console.log(this.userId);
  },
};

</script>

<template>
  <div class="edit">
    <h1>{{ userId }}</h1>
  </div>
</template>