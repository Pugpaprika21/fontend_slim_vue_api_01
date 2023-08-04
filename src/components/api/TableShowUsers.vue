<script>
import { ref } from "vue";
import axios from "axios";
import { RouterLink } from "vue-router";

export default {
  name: "TableShowUsers",
  data() {
    return {
      api: {
        url: "http://localhost:8080/",
        token: "bWVldGluZy5ibWE6bWVldGluZy5iaXpwb3RlbnRpYWw="
      },
      users: [],
      currentPage: 1,
      perPage: 10,
      searchText: "",
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.users.slice(start, end);
    },
    filteredUsers() {
      if (!this.searchText) return this.paginatedUsers;

      const searchTerm = this.searchText.toLowerCase();
      return this.paginatedUsers.filter((user) => {
        return (
          user.user_name.toLowerCase().includes(searchTerm) ||
          user.user_phone.toLowerCase().includes(searchTerm) ||
          user.user_email.toLowerCase().includes(searchTerm)
        );
      });
    },
  },
  methods: {
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    async getUsers() {
      const fetchUrl = `${this.api.url}getUsers`;
      const params = { params: { token: this.api.token } };
      const resp = await axios.get(fetchUrl, params);
      const userData = resp.data.data;

      if (resp.data.rows > 0) {
        this.users = userData;
        console.log(`resp`, resp);
        console.log(userData);
      }
    },
    getUserById(userId, actionStr) {
      if (actionStr == "edit") {
        this.$router.push(`/editUser/${userId}`);
      } else {
        console.log(userId, actionStr);
      }
    },
  },
  mounted() {
    this.getUsers();
  },
};
</script>

<template>
  <div class="container">
    <div class="row mt-4">
      <div class="col-6 col-md-8">
        <router-link to="/about" class="button btn-add-user"
          >เพิ่มผู้ใช้งาน</router-link
        >
      </div>
      <div class="col-6 col-md-4">
        <div class="form-group">
          <input
            type="text"
            v-model="searchText"
            class="form-control"
            placeholder="ค้นหา..."
          />
        </div>
      </div>
    </div>

    <table class="table table-bordered text-center caption-top mt-2">
      <thead class="thead-color">
        <tr>
          <td>#</td>
          <td>ชื่อ</td>
          <td>เบอร์</td>
          <td>email</td>
          <td>สถานะ</td>
          <td>จัดการ</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="user.user_id">
          <td>{{ (currentPage - 1) * perPage + index + 1 }}</td>
          <td>{{ user.user_name }}</td>
          <td>{{ user.user_phone }}</td>
          <td>{{ user.user_email }}</td>
          <td>{{ user.user_status == "Y" ? "ใช้งาน" : "ไม่ใช้งาน" }}</td>
          <td>
            <button
              type="button"
              class="btn btn-sm btn-primary"
              @click="getUserById(user.user_id, 'edit')"
            >
              เเก้ไข
            </button>
            &nbsp;
            <button
              type="button"
              class="btn btn-sm btn-danger"
              @click="getUserById(user.user_id, 'delete')"
            >
              ลบ
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <nav aria-label="Page navigation user-navigation">
      <ul class="pagination justify-content-end">
        <li class="page-item" v-if="currentPage > 1">
          <a class="page-link" @click="changePage(currentPage - 1)">Previous</a>
        </li>
        <li
          class="page-item"
          v-for="pageNumber in totalPages"
          :key="pageNumber"
          :class="{ active: pageNumber === currentPage }"
        >
          <a class="page-link" @click="changePage(pageNumber)">{{
            pageNumber
          }}</a>
        </li>
        <li class="page-item" v-if="currentPage < totalPages">
          <a class="page-link" @click="changePage(currentPage + 1)">Next</a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>

.thead-color td {
  background-color: #4caf66;
  color: white; 
}
.button {
  background-color: #574caf; /* Green */
  border: none;
  color: white;
  padding: 8px 10px 8px 10px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 13px;
  margin: 4px 2px;
  cursor: pointer;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.btn-add-user:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}
</style>