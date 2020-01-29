var mybutton = document.getElementById('myBtn');

// When the user scrolls down 20px from the top of the document, show the button
// window.onscroll = function() {
// 	scrollFunction();
// };

// function scrollFunction() {
// 	if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 20) {
// 		mybutton.style.display = 'block';
// 	} else {
// 		mybutton.style.display = 'none';
// 	}
// }

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
}

//To load template for header and footer
const header = document.querySelector('#header'),
	footer = document.querySelector('#footer'),
	userDashboardHeader = document.querySelector('#userDashboardHeader'),
	userDashboardfooter = document.querySelector('#userDashboardfooter'),
	adminDashboardHeader = document.querySelector('#adminDashboardHeader');
let argUrl = window.location.pathname;

document.addEventListener('DOMContentLoaded', loadDoc);
function loadDoc() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'template/user-dashboard-header.html', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			userDashboardHeader.innerHTML = this.responseText;
			switch (argUrl) {
				case '/dashboard.html':
					userDashboardHeader.querySelector('#dashboard').classList.add('active');
					break;
				case '/profile.html':
					userDashboardHeader.querySelector('#profile').classList.add('active');
					break;
				case '/place-order.html':
					userDashboardHeader.querySelector('#placeOrder').classList.add('active');
					break;
				case '/edit.html':
					userDashboardHeader.querySelector('#edit').classList.add('active');
					break;
				case '/parcel-detail.html':
					userDashboardHeader.querySelector('#parcelDetail').classList.add('active');
					break;

				default:
					break;
			}
		}
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'template/user-dashboard-footer.html', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			userDashboardfooter.innerHTML = this.responseText;
		}
	};
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', 'template/admin-dashboard-header.html', true);
	xhttp.send();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			adminDashboardHeader.innerHTML = this.responseText;
			switch (argUrl) {
				case '/admin-dashboard.html':
					adminDashboardHeader.querySelector('#adminDashboard').classList.add('active');
					break;
				case '/admin-profile.html':
					adminDashboardHeader.querySelector('#adminProfile').classList.add('active');
					break;
				case '/a-vieworder.html':
					adminDashboardHeader.querySelector('#viewOrder').classList.add('active');
					break;
				case '/admin-edit-profile.html':
					adminDashboardHeader.querySelector('#adminEditProfile').classList.add('active');
					break;
				case '/client.html':
					adminDashboardHeader.querySelector('#client').classList.add('active');
					break;

				default:
					break;
			}
		}
	};
}

// window.onload = function() {
// 	var chart = new CanvasJS.Chart('chartContainer', {
// 		theme: 'light1', // "light2", "dark1", "dark2"
// 		animationEnabled: false, // change to true
// 		title: {
// 			text: ''
// 		},
// 		data: [
// 			{
// 				// Change type to "bar", "area", "spline", "pie",etc.
// 				type: 'column',
// 				dataPoints: [
// 					{ label: 'Jan', y: 15 },
// 					{ label: 'Feb', y: 20 },
// 					{ label: 'March', y: 25 },
// 					{ label: 'April', y: 30 },
// 					{ label: 'May', y: 28 }
// 				]
// 			}
// 		]
// 	});
// 	chart.render();
// };
