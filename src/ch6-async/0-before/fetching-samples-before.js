export const isWebsiteAliveWithCallback = (callback) => {
  const website = "https://example.com/";
  fetch(website)
    .then((response) => {
      if (!response.ok) {
        // How can we simulate this network issue?
        throw Error(response.statusText);
      }
      return response;
    })
    .then((response) => response.text())
    .then((text) => {
      console.log(text);
      if (text.includes("Example Domain")) {
        callback({ success: true, status: "ok" });
      } else {
        // How can we test this path?
        callback({ success: false, status: "text missing" });
      }
    })
    .catch((error) => {
      // How can we test this exit point?
      callback({ success: false, status: error });
    });
};

export const isWebsiteAliveWithAsyncAwait = async () => {
  try {
    const resp = await fetch("https://example.com/");
    if (!resp.ok) {
      // How can we simulate a non-ok response?
      throw resp.statusText;
    }
    const text = await resp.text();
    const included = text.includes("Example Domain");
    if (included) {
      return { success: true, status: "ok" };
    }
    // How can we simulate different website content?
    throw "text missing";
  } catch (error) {
    return { success: false, status: error };
  }
};
