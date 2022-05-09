export const Constants = {
	WaitingListBarText: "Limited fall promotion: 90% OFF Full Stack Web Development. Use code FALL2022",
	loggedout:{
		MenuItems : [
			{
				title: 'Browse Courses',
				url: '/allcourses',
				cName: 'nav-links'
			},
			{
				title: 'Zaio For Business',
				url: '/business',
				cName: 'nav-links zfb'
			},
			{
				title: 'Sign In',
				url: '/login',
				cName: 'nav-links'
			},
			{
				title: 'Get Started',
				url: '/getstarted',
				cName: 'nav-links nav-signin'
			}]
		},
	loggedin:{
		MenuItems : [
			{
				title: 'Dashboard',
				url: '/dashboard',
				cName: 'nav-links'
			},
			
			{
				title: 'Signout',
				url: '/logout',
				cName: 'nav-links'
			}
		]
	}
}