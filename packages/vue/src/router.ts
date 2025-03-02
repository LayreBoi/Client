import type { RouteRecordRaw } from "vue-router";
import { createRouter, createWebHashHistory } from "vue-router";

export type FancyRouteRecord = RouteRecordRaw & { icon?: string };

export const routes: (FancyRouteRecord & { children?: FancyRouteRecord[] })[] = [
	{
		path: "/auth",
		name: "auth",
		component: () => import("./views/Auth/Auth.vue"),
		children: [
			{
				path: "login",
				name: "login",
				component: () => import("./views/Auth/Login.vue"),
			},
			{
				path: "signup",
				name: "signup",
				component: () => import("./views/Auth/Signup.vue"),
			},
		],
	},
	{
		path: "/dashboard",
		name: "dashboard",
		component: () => import("./views/Dashboard/Dashboard.vue"),
		children: [
			{
				path: "machines",
				name: "machines",
				icon: "nas",
				component: () => import("./views/Dashboard/MachinesView.vue"),
			},
			{
				path: "machine/:uuid",
				name: "machine",
				component: () => import("./views/Dashboard/MachineView.vue"),
			},
			{
				path: "settings",
				name: "settings",
				icon: "settings",
				component: () => import("./views/Dashboard/SettingsView.vue"),
			},
			{
				path: "profile/:uuid?",
				name: "profile",
				icon: "user",
				component: () => import("./views/Dashboard/ProfileView.vue"),
			},
		],
	},
];

const router = createRouter({
	routes,
	history: createWebHashHistory(),
});

router.beforeEach((to, from, next) => {
	if (localStorage.getItem("token") && (to.fullPath === "/"))
		return next({ name: "machines" });

	if (localStorage.getItem("token") === "undefined" && (to.name !== "login" && to.name !== "signup"))
		return next({ name: "login" });

	next();
});
export default router;
