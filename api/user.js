const API_URL = "https://deadlinr.blakekjohnson.dev";

export const deleteAccount = async (uid) => {
  const route = API_URL + "/user/delete/" + uid;
  // console.log(route);
  try {
    await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    return "success";
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUser = async (login, password) => {
  const route = API_URL + "/user/login/";
  // console.log(route);
  try {
    await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: { login, password },
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });

    // return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const createUser = async (
  firstName,
  lastName,
  email,
  username,
  password
) => {
  const route = API_URL + "/user/";
  // console.log(route);
  try {
    await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        username: username,
        password: password,
      }),
    })
      .then((data) => {
        // console.log(data);
        return data.json();
      })
      .then((res) => {
        console.log(res);
      });
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const searchUser = async (query) => {
  const route = API_URL + "/user/search";
  // console.log(route);
  try {
    await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    })
      .then((response) => {
        response.json();
      })
      .then((data) => {
        return data;
      });

    // return data;
  } catch (err) {
    console.error(err);
    return err;
  }
};
