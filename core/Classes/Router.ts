type Route = {
	path: string;
	component: () => Promise<any>;
	method?: string;
	params?: Record<string, any>;
};
