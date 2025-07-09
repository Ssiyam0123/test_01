export async function getSingleUser(id) {
  const res = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
  const data = res.json();

  return data;
}
