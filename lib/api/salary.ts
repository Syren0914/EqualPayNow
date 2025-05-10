export async function submitSalary(data:any ) {
  return fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/salaries`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  }).then(res => res.json())
}
