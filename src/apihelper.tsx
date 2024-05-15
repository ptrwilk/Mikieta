// const token = () => localStorage.getItem("token");

const url = import.meta.env.VITE_API_URL;

export const get = (path: string, convert?: (item: any) => any) => {
  return fetch(`${url}/${path}`, {
    method: "GET",
  }).then(async (response) => {
    const res = await response.json();

    if (isArray(res) && convert) {
      const array = res as any[];
      const newArray: any[] = [];

      array.forEach((item) => {
        newArray.push(convert(item));
      });

      return newArray;
    } else if (convert) {
      return convert(res);
    }

    return res;
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

function isArray(value: any) {
  return value instanceof Array;
}
