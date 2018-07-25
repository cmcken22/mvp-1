const okta = require("@okta/okta-sdk-nodejs");
const ExpressOIDC = require("@okta/oidc-middleware").ExpressOIDC;

const oktaConfig = {
  orgUrl: "https://dev-957770.oktapreview.com",
  token: "00gKB-8YkyZHSZMcZjE4R10056NKaa711JaaWLsFFp",
  client_id: "0oafsjya9l6hoK9Oq0h7",
  client_secret: "JZ_nYdOvoUDKAL7aWPeolQv3OoIA0X0l2Nnj_SpH",
  redirect_uri: "http://localhost:3000/users/callback",
  // redirect_uri: "http://localhost:3000/authorization-code/callback",
}

// Define an Okta client so any user management tasks can be performed
const oktaClient = new okta.Client({
  orgUrl: oktaConfig.orgUrl,
  token: oktaConfig.token
});

// Define the OpenID Connect client
const oidc = new ExpressOIDC({
  issuer: oktaConfig.orgUrl + "/oauth2/default",
  client_id: oktaConfig.client_id,
  client_secret: oktaConfig.client_secret,
  redirect_uri: oktaConfig.redirect_uri,
  scope: "openid profile",
  response_type: "code",
  routes: {
    login: {
      path: "/users/login"
    },
    callback: {
      path: "/users/callback",
      defaultRedirect: "/users/callback"
    }
  }
});

// echo -n "0oafsjya9l6hoK9Oq0h7:JZ_nYdOvoUDKAL7aWPeolQv3OoIA0X0l2Nnj_SpH" | openssl base64 -base64


// curl --request POST \
//   --url https://dev-957770.oktapreview.com/oauth2/default/v1/token \
//   --header 'accept: application/json' \
//   --header 'authorization: Basic MG9hZnNqeWE5bDZob0s5T3EwaDc6SlpfbllkT3ZvVURLQUw3YVdQZW9sUXYzT29JQTBYMGwyTm5qX1NwSA==' \
//   --header 'content-type: application/x-www-form-urlencoded' \
//   --data 'grant_type=authorization_code&redirect_uri=http%3A%2F%2Flocalhost%3A3000&code=MVzRq3P_ZxVy8wIwF9i2&state=651bd9bb-434c-4a5a-94ff-29ff01ff665e'



// curl -i -v https://dev-957770.oktapreview.com/oauth2/default/v1/authorize?client_id=0oafsjya9l6hoK9Oq0h7&response_type=code&scope=openid&redirect_uri=http%3A%2F%2Flocalhost%3A3000&state=state-296bc9a0-a2a2-4a57-be1a-d0e2fd9bb601

module.exports = { oidc, oktaClient, oktaConfig };