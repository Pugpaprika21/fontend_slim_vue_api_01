<script>
import axios from "axios";

export default {
  data() {
    return {
      api: {
        url: "http://localhost:8080/",
        token: "bWVldGluZy5ibWE6bWVldGluZy5iaXpwb3RlbnRpYWw=",
      },
      user: {
        user_name: "",
        user_pass: "",
        user_phone: "",
        user_email: "",
      },
    };
  },
  mounted() {},
  methods: {
    async createUser() {
      const url = `${this.api.url}createUser`;
      const user = {
        user_name: this.user.user_name,
        user_pass: this.user.user_pass,
        user_phone: this.user.user_phone,
        user_email: this.user.user_email,
      };
      const params = { params: { token: this.api.token, user: user } };
      const resp = await axios.post(url, null, { params });
      if (resp.data.rows > 0) {
        this.$router.push('/');
      }

    },
  },
};
</script>

<template>
  <div class="container" id="create">
    <div class="container">
      <div class="row mt-4">
        <div class="col-6 col-md-4">
          <!--  -->
          <form @submit.prevent="createUser">
            <p>สร้างข้อมูลผู้ใช้งาน</p>
            <div class="input-group mb-3">
              <span class="input-group-text" id="user-user_name">ชื่อ</span>
              <input
                type="text"
                class="form-control"
                v-model="user.user_name"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="user-user_pass">รหัสผ่าน</span>
              <input
                type="text"
                class="form-control"
                v-model="user.user_pass"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="user-user_phone"
                >เบอร์โทร</span
              >
              <input
                type="text"
                class="form-control"
                v-model="user.user_phone"
              />
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text" id="user-user_email">email</span>
              <input
                type="text"
                class="form-control"
                v-model="user.user_email"
              />
            </div>
            <div class="btn-update">
              <button type="submit" class="btn btn-success btn-sm w-100">
                บันทึก
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