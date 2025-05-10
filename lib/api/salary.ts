

export const submitSalary = async (data: any) => {
  const res = await fetch("http://localhost:5000/api/salaries", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!res.ok) {
    throw new Error("Failed to submit salary data")
  }

  return res.json()
}

