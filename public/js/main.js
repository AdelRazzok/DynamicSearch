const searchInput = document.querySelector('#search');
const searchResults = document.querySelector('.table-results');

let dataArray;

function orderList(data) {
	const orderedData = data.sort((a, b) => {
		if (a.name.last.toLowerCase() < b.name.last.toLowerCase()) return -1;
		if (a.name.last.toLowerCase() > b.name.last.toLowerCase()) return 1;
		return 0;
	})
	return orderedData;
}

function createUserList(usersList) {
	usersList.forEach(user => {
		const listItem = document.createElement('div');

		listItem.setAttribute('class', 'table-item');
		listItem.innerHTML = `
			<div class="container-img">
				<img src="${user.picture.medium}" alt="User picture">
				<p class="name">${user.name.last} ${user.name.first}</p>
			</div>
			<p class="email">${user.email}</p>
			<p class="phone">${user.phone}</p>
		`
		searchResults.appendChild(listItem);
	});
}

async function getUsers() {
	const res = await fetch('https://randomuser.me/api/?nat=fr&results=50');
	const { results } = await res.json();
	
	dataArray = orderList(results);
	createUserList(dataArray);
}

getUsers();

function filterData(e) {
	searchResults.innerHTML = '';

	const searchString = e.target.value.toLowerCase().replace(/\s/g, '');
	const filteredArr = dataArray.filter(el =>
		el.name.first.toLowerCase().includes(searchString) ||
		el.name.last.toLowerCase().includes(searchString) ||
		`${el.name.last + el.name.first}`.toLowerCase().replace(/\s/g, '').includes(searchString) ||
		`${el.name.first + el.name.last}`.toLowerCase().replace(/\s/g, '').includes(searchString)
	);

	createUserList(filteredArr);
}

searchInput.addEventListener('input', filterData);