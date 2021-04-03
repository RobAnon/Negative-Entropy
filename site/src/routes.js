import List from './routes/List.svelte';
import PersonalGallery from './routes/PersonalGallery.svelte';
import Create from './routes/Create.svelte';
import About from './routes/About.svelte';
import Home from './routes/Home.svelte';
import Viewer from './routes/Viewer.svelte';
import PageNotExists from './routes/PageNotExists.svelte';

export default [
	{
		path: '/',
		component: Home
	},
	{
		path: '/mint',
		component: Create
	},
	{
		path: '/viewer/:id',
		component: Viewer
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/gallery',
		component: List
	},
	{
		path: '/gallery/:address',
		component: PersonalGallery
	},
	{
		path: '*',
		component: PageNotExists
	}
]