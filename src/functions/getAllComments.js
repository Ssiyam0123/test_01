export default async function getAllComments() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);
  const data = res.json();

  return data;
}
