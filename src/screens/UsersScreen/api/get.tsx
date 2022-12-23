const url = "https://jsonplaceholder.typicode.com/users";

export const getUsers = async () => {
  try {
    const response = await fetch(url);
    const body = await response.json();
    return body;
  } catch (error) {
    throw error;
  }
};
