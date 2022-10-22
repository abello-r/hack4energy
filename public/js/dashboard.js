document.addEventListener("DOMContentLoaded", () => {

	evaluate();

	// Company image change
	actual_company.addEventListener("change", () =>
	{
		if (actual_company.value == "0")
		{
			company.setAttribute("src", "srcs/Endesa.png");
		}
		else {
			company.setAttribute("src", "srcs/" + actual_company.selectedOptions[0].value + ".png")
		}
	})

});


async function evaluate() {
	let button = document.getElementById("evaluate");
	button.addEventListener("click", async () => {
		const usersMultiply = document.getElementById("amount-users").value;
		const actualCompany = document.getElementById("actual_company").value;
		const washingMachine = document.getElementById("washing-machine").value;
		const fridge = document.getElementById("fridge").value;
		const tv = document.getElementById("tv").value
		const air = document.getElementById("air").value;
		const heater = document.getElementById("heater").value;
		const thermo = document.getElementById("thermo").value;

		let dataBox = await fetch("/evaluate", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				usersMultiply,
				actualCompany,
				washingMachine,
				fridge,
				tv,
				air,
				heater,
				thermo
			})
		});
		if (dataBox.status == 200) {
			console.log("Success");
			let output = await dataBox.json();
			kwh = output[0];
			value = output[1];
			showOutput(kwh, value);
		}
	});
}

async function showOutput(kwh, value) {
	console.log(kwh, value);

	const amount_users = document.getElementById("amount-users").value;

	//let leftColumn = document.getElementById("leftColumn");
	//leftColumn.style.justifyContent = "flex-end";

	let world = document.getElementById("world");
	world.style.visibility = "hidden";
	world.style.display = "none";

	let kwhText = document.getElementById("kwh");
	let valueText = document.getElementById("value");
	let meterText = document.getElementById("meter");
	let recommendation = document.getElementById("recommendation");
	let recommendationImg = document.getElementById("recommendationImg");

	kwhText.innerHTML = `Consumo mensual de electricidad ${kwh}kWh`;
	valueText.innerHTML = `Valor de tu consumo mensual ${value}€`;

	if (document.getElementById("actual_company").value == "0") {
		recommendationImg.setAttribute("src", "srcs/world.gif");
	} else if (document.getElementById("actual_company").value == "Endesa") {
		recommendationImg.setAttribute("src", "srcs/rec-nat.png");
	}
	else if (document.getElementById("actual_company").value == "Iberdrola") {
		recommendationImg.setAttribute("src", "srcs/rec-end.png");
	}
	else if (document.getElementById("actual_company").value == "Naturgy") {
		recommendationImg.setAttribute("src", "srcs/rec-iber.png");
	}
	
	recommendationImg.style.display = "block";
	recommendationImg.style.visibility = "visible";

	if (amount_users == 1 && kwh > 170) {
		meterText.innerHTML = `Hackeando el contador...`;
		recommendation.innerHTML = `Te recomendamos:`;
	}
	else if (amount_users == 1 && kwh < 170) {
		meterText.innerHTML = `Felicidades, tu consumo es muy bajo`;
		recommendationImg.setAttribute("src", "srcs/world.gif");
	}
	else if (amount_users > 1 && kwh > 170) {
		meterText.innerHTML = `Hackeando el contador...`;
		recommendation.innerHTML = `Te recomendamos:`;
	}
	else if (amount_users > 1 && kwh < 170) {
		meterText.innerHTML = `Felicidades, tu consumo es muy bajo`;
		recommendationImg.setAttribute("src", "srcs/world.gif");
	}
	else if (kwh > 200) {
		meterText.innerHTML = `Hackeando el contador...`;
		recommendation.innerHTML = `Te recomendamos:`;
	}
}
