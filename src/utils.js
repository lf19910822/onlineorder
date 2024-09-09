export const login = (credentials) => {
  const loginUrl = `/login?username=${credentials.username}&password=${credentials.password}`; // 前面自动加上package.json里的proxy

  // fetch will return something called a Promise
  return fetch(loginUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to log in");
    }
  }); // returns a promise，后续可以继续加.then(()=>{})，也可以加.catch，只要是promise就可以，finally加在最后
};    // 一个.catch可以接住最先出错的.then()  ，后续不执行

export const signup = (data) => {
  const signupUrl = "/signup";

  return fetch(signupUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // convert a JavaScript object (data) into a JSON string representation.
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to sign up");
    }
  });
};

export const getMenus = (restId) => {                               // GET方法不用加method, headers之类
  return fetch(`/restaurant/${restId}/menu`).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get menus");
    }

    return response.json(); // reads the response body and parses it as JSON, returns a promise that resolves with the result of parsing the body text as JSON
  });
};

/*
    
    What's the difference between JSON and JS Object?
    JSON - string, but it has the format of a obj i.e. {key: value}
    - key: must be double quoted
    
    JS Object - Object {key: value}
    - key: double quoted?
    
    */

export const getRestaurants = () => {
  return fetch("/restaurants/menu").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get restaurants");
    }

    return response.json();                 // 如果成功，返回结果，只有fetch才能 return response.json();
  });
};

export const getCart = () => {
  return fetch("/cart").then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to get shopping cart data");
    }

    return response.json();
  });
};

export const checkout = () => {
  return fetch("/cart/checkout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to checkout");
    }
  });
};

export const addItemToCart = (itemId) => {
  const payload = {                             // 作前端后端的mapping，函数名不一定全部一样
    menu_id: itemId,
  };

  return fetch(`/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  }).then((response) => {
    if (response.status < 200 || response.status >= 300) {
      throw Error("Fail to add menu item to shopping cart");
    }
  });
};
