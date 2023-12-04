<template>
  <h1>Node List</h1>
  <table class="table table-striped">
    <thead>
      <tr>
        <th style="width: 15%">Name</th>
        <th style="width: 15%">IP</th>
        <th style="width: 15%">Status</th>
        <th style="width: 15%">CPU (Usage)</th>
        <th style="width: 15%">Mem (Usage)</th>
        <th style="width: 15%">Pod</th>
        <th style="width: 10%">Scale Y/N</th>
      </tr>
    </thead>
    <tbody>
      <template v-if="nodes.length > 0">
        <!-- key: 가상 dom 기법, 변경사항만 반영하려고. unique 한 값을 설정. -->
        <tr v-for="node in nodes" :key="node.name">
          <td>{{ node.name }}</td>
          <td>{{ node.ip }}</td>
          <td>{{ node.status }}</td>
          <td>{{ node.cpuTotal }} ({{ node.cpuUsage }})</td>
          <td>{{ node.memTotal }} ({{ node.memUsage }})</td>
          <td>{{ node.podCnt }}</td>
          <td>{{ node.scaleYn }}</td>
        </tr>
      </template>
      <tr v-if="nodes.loading">
        <td colspan="4" class="text-center">
          <span class="spinner-border spinner-border-lg align-center"></span>
        </td>
      </tr>
      <tr v-if="nodes.error">
        <td colspan="4">
          <div class="text-danger">
            Error loading clusters: {{ nodes.error }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useClusterStore } from "@/stores";

const clusterStore = useClusterStore();
const { nodes } = storeToRefs(clusterStore);

onMounted(() => {
  console.log("cluster>List.vue onMounted()");
  fetchData();
});

const fetchData = () => {
  clusterStore.getNodes("cubectl");
};
</script>
