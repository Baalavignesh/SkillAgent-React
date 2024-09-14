let SetAccessToken = (userData: any) => {
  localStorage.setItem("userinfo", JSON.stringify(userData));
};

let removeAccessToken = () => {
  localStorage.clear();
};

let checkAccessToken = () => {
  let data = localStorage.getItem("userinfo");
  return data ? true : false;
};

let getAccessToken = () => {
  let data = localStorage.getItem("userinfo");
  return data ? JSON.parse(data).accesstoken : null;
}

let fetchLocalData = () => {
  let data = localStorage.getItem("userinfo");
  return data ? JSON.parse(data) : null;
};

export {
  SetAccessToken,
  removeAccessToken,
  checkAccessToken,
  fetchLocalData,
  getAccessToken
};
