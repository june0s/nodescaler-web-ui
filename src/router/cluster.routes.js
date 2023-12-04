import { Layout, List } from "@/views/cluster";

export default {
  path: "/cluster",
  component: Layout,
  children: [{ path: "", component: List }],
};
