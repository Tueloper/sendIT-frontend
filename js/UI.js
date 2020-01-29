class UI {
	//printmessage to the page
	printMessage(message, className) {
		//div containing the message whether error or success
		const messageDiv = document.createElement('div');
		messageDiv.classList.add('alert', 'infor', 'text-center', className);
		messageDiv.setAttribute('role', 'alert');
		messageDiv.appendChild(document.createTextNode(message));
		//   const dismis = `
		//   <button type="button" class="close" data-dismiss="alert" aria-label="Close">
		//   <span aria-hidden="true">&times;</span>
		// </button>
		//   `;

		//   messageDiv.appendChild(dismis)

		//where it will be displayed
		const refMessage = document.querySelector('.display');
		refMessage.insertBefore(messageDiv, document.querySelector('.INFORMATION'));

		//set timerto remove the messge
		setTimeout(() => {
			document.querySelector('.alert').remove();
		}, 3000);
	}
}
