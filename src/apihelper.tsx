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

const execute = (
  method: string,
  path: string,
  body: any,
  convert?: (item: any) => any
) => {
  var isFormData = body instanceof FormData;

  return fetch(`${url}/${path}`, {
    method: method,
    headers: isFormData
      ? undefined
      : {
          "Content-Type": "application/json",
        },
    body: isFormData ? body : JSON.stringify(body),
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

function isArray(value: any) {
  return value instanceof Array;
}
