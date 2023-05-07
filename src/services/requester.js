const request = async (method, url, data) => {
  const options = {
  headers:{},
  };
  
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    const token = user.accessToken;
    options.headers["X-Authorization"] = token;
  }
  if (method != "GET") {
    options.method = method;
    options.headers = {
      "Content-Type": "application/json",
    };
    options.body = JSON.stringify(data);

  }

  try {
    const request = await fetch(url, options);
    if (!request.ok) {
      if (request.status == 403) {
        localStorage.removeItem("user");
      } 
        const error = await request.json();
        throw new Error(error.message);
      
    }
    if (request.status == 204) {
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
const put = request.bind(null, "PUT");

export { get, post, push, put, del as delete };
