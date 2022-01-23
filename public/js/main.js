async function getUsers() {
	const data = await fetch('https://randomuser.me/api/');
	const json = await data.json();
	return json;
}