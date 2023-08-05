<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  data() {
    return {
      userId: 0,
      api: {
        url: "http://localhost:8080/",
        token: "",
      },
      user: {
        userId: 0,
        username: "",
        useremail: "",
      },
    };
  },
  mounted() {
    this.userId = this.$route.query.userId;
    this.api.token = this.$route.query.token;

    this.editUser();
  },
  methods: {
    async editUser() {
      const fetchUrl = `${this.api.url}editUser/${this.userId}`;
      const params = { params: { token: this.api.token } };
      const resp = await axios.get(fetchUrl, params);

      if (resp.data.rows > 0) {
        const userData = resp.data.data[0];

        this.user.userId = userData.user_id;
        this.user.username = userData.user_name;
        this.user.useremail = userData.user_email;
      }
    },
    async updateUser(event) {
      event.preventDefault();
      //const url = `http://localhost/project-php/service/update_user.php?userId=${this.userId}`;
      const url = `${this.api.url}updateUser/${this.userId}`;
      const params = {
        params: {
          token: this.api.token,
          user: {
            user_name: this.user.username,
            user_email: this.user.useremail,
          },
        },
      };
      const config = {
        headers: {
          "Access-Control-Allow-Methods": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Origin": "*",
          "Content-Type": "application/json",
          "Content-Type": "multipart/form-data",
        },
      };

      const resp = await axios.get(url, params, config);
      if (resp.data.rows > 0) {
        const dataUpdate = resp.data.data[0];
        this.$router.push("/");
        console.log(dataUpdate);
      }
    },
  },
  // setup() {
  //   const user_name = ref();
  //   onMounted(() => {
  //     user_name.value = "sssss";
  //     console.log(user_name.value);
  //   });
  // },
};
</script>

<template>
  <div class="container" id="edit">
    <div class="container">
      <div class="row mt-4">
        <div class="col-6 col-md-4">
          <!--  -->
          <form @submit="updateUser">
            <p>เเก้ไขข้อมูล</p>
            <div class="input-group mb-3">
              <span class="input-group-text" id="user-username">ชื่อ</span>
              <input type="text" class="form-control" v-model="user.username" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="user-useremail">email</span>
              <input
                type="text"
                class="form-control"
                v-model="user.useremail"
              />
            </div>
            <div class="btn-update">
              <button type="submit" class="btn btn-success btn-sm w-100">
                เเก้ไข
              </button>
            </div>
          </form>
          <!--  -->
        </div>
        <div class="col-6 col-md-8"></div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>