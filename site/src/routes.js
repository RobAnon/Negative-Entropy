import List from './routes/List.svelte';
import PersonalGallery from './routes/PersonalGallery.svelte';
import Create from './routes/Create.svelte';
import About from './routes/About.svelte';
import Home from './routes/Home.svelte';
import Viewer from './routes/Viewer.svelte';
import PageNotExists from './routes/PageNotExists.svelte';
import Privacy from '/routes/Privacy.svelte';

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
		path: '/mint/:seed',
		component: Create,
	},
	{
		path: '/viewer/:id/:origin',
		component: Viewer,
		dynamic: true
	},
	{
		path: '/viewer/:id',
		component: Viewer,
		dynamic: true
	},
	{
		path: '/about',
		component: About
	},
	{
		path: '/gallery/:id',
		component: List
	},
	{
		path: '/gallery/',
		component: List
	},
	{
		path: '/personal-gallery/:id',
		component: PersonalGallery,
		dynamic: true
	},
	{
		path: '/privacy',
		component: Privacy
	},
	{
		path: '*',
		component: PageNotExists
	}
]