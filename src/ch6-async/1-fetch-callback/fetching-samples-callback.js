// Entry Point
export const isWebsiteAlive = (callback) => {
  fetch("https://example.com")
    .then(throwOnInvalidResponse)
    .then((resp) => resp.text())
    .then((text) => processFetchSuccess(text, callback))
    .catch((err) => processFetchError(err, callback));
};

export const throwOnInvalidResponse = (resp) => {
  if (!resp.ok) {
    throw Error(resp.statusText);
  }
  return resp;
};

// Entry Point
export const processFetchSuccess = (text, callback) => {
  if (text.includes("Example Domain")) {
    callback({ success: true, status: "ok" });
  } else {
    callback({ success: false, status: "missing text" });
  }
};

// Entry Point
export const processFetchError = (err, callback) => {
  callback({ success: false, status: err });
};
