const APP_CONFIG = {
  make_targets: {
    win32: [ "squirrel"],
    darwin: [ "zip", "dmg"],
    linux: [ "deb", "rpm"],
  },
  "electronWinstallerConfig": {},
  "electronInstallerDMG": {},
  "electronInstallerDebian": {},
  "electronInstallerRedhat": {},
  "github_repository": {},
  "windowsStoreConfig": {}
}

module.exports = APP_CONFIG;