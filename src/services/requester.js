const request = async (method, url, data) => {
  const options = {};

  if (method != "GET") {
    options.method = method;
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);
  }
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    options.headers["X-Authorization"] = user.accessToken;
  }
  try {
    const request = await fetch(url, options);

    if (!request.ok) {
      if (request.status == '403') {
        localStorage.removeItem("user");
      }
      const error = await fetch(url, options);
      throw new Error(error.message);
    }
    if (request.status == "204") {
      return request;
    } else {
      return await request.json();
    }
  } catch (error) {
    alert(error.message);
    throw error;
  }
};

const get = request.bind(null, "GET");
const post = request.bind(null, "POST");
const push = request.bind(null, "PUSH");
const del = request.bind(null, "DELETE");

export { get, post, push, del as delete };
