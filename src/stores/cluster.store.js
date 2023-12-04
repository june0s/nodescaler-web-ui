import { defineStore } from "pinia";
import { fetchWrapper } from "@/helpers";
import { useAlertStore } from "@/stores";

const baseUrl = `${import.meta.env.VITE_API_URL}`;

export const useClusterStore = defineStore({
  id: "cluster",
  state: () => ({
    clusters: {},
    nodes: {},
  }),
  actions: {
    async getAll() {
      console.log("getAll call !");
      this.clusters = { loading: true };
      try {
        // cluster names list
        this.clusters = await fetchWrapper.get(`${baseUrl}/cluster/list`);

        console.log("clusters = " + this.clusters);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        this.clusters = { error };
        console.log(this.clusters);
        throw error;
      }
    },
    async getNodes(clusterName) {
      console.log(`get node ${clusterName} call !`);
      this.nodes = { loading: true };
      try {
        const cluster = await fetchWrapper.get(
          `${baseUrl}/cluster/${clusterName}`
        );
        this.nodes = cluster.nodes;

        console.log("cluster name = " + cluster.name);
        console.log(this.nodes);
      } catch (error) {
        const alertStore = useAlertStore();
        alertStore.error(error);
        this.nodes = { error };
        console.log(this.nodes);
        throw error;
      }
    },
  },
});
