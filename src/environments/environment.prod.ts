import { KeycloakConfig } from "keycloak-js";

const keycloakConfig: KeycloakConfig = {
  url: 'http://192.168.76.240:8080/auth',
  realm: 'Dev',
  clientId: 'tma',
}

export const environment = {
  production: true,
  keycloakConfig,
};
