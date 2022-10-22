document.addEventListener("DOMContentLoaded", () => {

	login();
	
});

async function login() {
	let button = document.getElementById("initButton");
	button.addEventListener("click", async () => {
		
		const login = document.getElementById("username").value;
		const password = document.getElementById("pass").value;
		const data = {
			login: login,
			password: password
		};
		await fetch("/check-user", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
		}).then(res => res.json())
		.then(data => {
			if (data.status == 200) {
				console.log("User logged in client");
				window.location.href = "/dashboard";
			} else {
				console.log("Wrong credentials client");
				alert("Wrong credentials!");
			}
		});
	});
}
