<script>
export default {
  data() {
    return {};
  },
  mounted() {
    const userId = this.$route.query.userId;

    this.$swal
      .fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`,
      })
      .then((result) => {
        if (result.isConfirmed) {
          this.$swal.fire("Saved!", "", "success");
        } else if (result.isDenied) {
          this.$swal.fire("Changes are not saved", "", "info");
        }
      });
  },
};
</script>

<template>
  <div class="container" id="delete">delete id: {{ $route.query.userId }}</div>
</template>

<style scoped>
</style>