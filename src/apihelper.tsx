// const token = () => localStorage.getItem("token");

const url = import.meta.env.VITE_API_URL;

export const get = (path: string) => {
  return fetch(`${url}/${path}`, {
    method: "GET",
  });
};

export const post = (path: string, body: any) => execute("POST", path, body);

const execute = (method: string, path: string, body: any, param?: string) => {
  const p = param ? `/${param}` : "";
  return fetch(`${url}/${path}${p}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
};
