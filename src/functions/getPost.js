export async function getUser() {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
//   console.log(data)
  const data = res.json()
  return data;
}
