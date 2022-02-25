const API_URL = "https://deadlinr.blakekjohnson.dev";

export const getUser = async (token) => {
  const route = API_URL + "/user/me";
  console.log(token);
  try {
    const result = await fetch(route, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      // body: JSON.stringify({
      //   token,
      // }),
    })
      .then(async (res) => {
        console.log(res.status);
        if (!res.ok) {
          return null;
        }
        let resultData = await res.json();
        return resultData;
        // console.log(res);
      })

      .catch((err) => {
        console.error(err);
      });

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

export const loginUser = async (login, password) => {
  const route = API_URL + "/user/login/";
  console.log(login, password);
  try {
    const result = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        login: login,
        password: password,
      }),
    })
      .then(async (res) => {
        console.log(res.status);
        if (!res.ok) {
          return null;
        }
        let resultData = await res.json();
        return resultData;
        // console.log(res);
      })

      .catch((err) => {
        console.error(err);
      });

    return result;
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
  console.log(firstName, lastName, email, username, password);
  try {
    const result = await fetch(route, {
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
      .then(async (res) => {
        console.log(res.status);
        if (!res.ok) {
          return null;
        }
        let resultData = await res.json();
        return resultData;
        // console.log(res);
      })

      .catch((err) => {
        console.error(err);
      });

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// export const searchForUser = async (query) => {
//   const route = API_URL + "/user/search";
//   // console.log(route);
//   try {
//     await fetch(route, {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ query }),
//     })
//       .then((response) => {
//         response.json();
//       })
//       .then((data) => {
//         return data;
//       });

//     // return data;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// };

export const searchForUser = async (query) => {
  const route = API_URL + "/user/search/";
  console.log(query);
  try {
    const result = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: query,
      }),
    })
      .then(async (res) => {
        console.log(res.status);
        if (!res.ok) {
          return null;
        }
        let resultData = await res.json();
        return resultData;
        // console.log(res);
      })

      .catch((err) => {
        console.error(err);
      });

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// Returns success if account deleted successfully, empty string otherwise

export const deleteAccount = async ({ token }) => {
  const route = API_URL + "/user/me";

  try {
    let result = await fetch(route, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        if (res.ok) {
          return "success";
        } else {
          return "";
        }
      })
      .catch((err) => {
        console.error(err);
        return "";
      });

    return result;
  } catch (err) {
    console.error(err);
    return err;
  }
};

// return the verification code if call made successfully, otherwise null

export const requestResetCode = async ({ email }) => {
  const route = API_URL + "/user/requestResetCode";

  try {
    let result = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
      }),
    }).then((res) => {
      if (res.ok) {
        return true;
      } else {
        return false;
      }
    });

    return result;
  } catch (err) {
    return false;
  }
};

// returns true if correct reset code, false otherwise

export const verifyResetCode = async ({ email, code }) => {
  const route = API_URL + "/user/validateCode";
  console.log(email, code);
  try {
    const result = await fetch(route, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        newResetCode: code,
      }),
    })
      .then((res) => {
        console.log(res.status);
        if (res.ok) {
          return true;
        } else {
          return false;
        }
      })
      .catch((err) => {
        console.error(err);
        return false;
      });

    return result;
  } catch (err) {
    console.error(err);
    return false;
  }
};
