export const fetchAbstract = async <T>(
  urlPart: string,
  method: string,
  body?: T,
) => {
  const response = await fetch(
    `${await import.meta.env.VITE_BE_URL}${urlPart}/`,
    {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt") ?? ""}`,
      },
      body: JSON.stringify(body),
    },
  );

  if (!response.ok) {
    throw new Error(await response.text());
  }

  try {
    return await response.json();
  } catch (error) {
    console.log(error);
    return {};
  }
};
