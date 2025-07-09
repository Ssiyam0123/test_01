export async function getAllUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = res.json();
  return data;
}
