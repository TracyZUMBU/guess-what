const screenSize = {
  mobileS: "20em",
  mobileM: "23.4375em",
  mobileL: "26.5625em",
  tablet: "48em",
  laptop: "64em",
  laptopL: "90em",
  desktop: "160em"
}

export const device = {
  mobileS: `(min-width: ${screenSize.mobileS})`,
  mobileM: `(min-width: ${screenSize.mobileM})`,
  mobileL: `(min-width: ${screenSize.mobileL})`,
  tablet: `(min-width: ${screenSize.tablet})`,
  laptop: `(min-width: ${screenSize.laptop})`,
  laptopL: `(min-width: ${screenSize.laptopL})`,
  desktop: `(min-width: ${screenSize.desktop})`,
  desktopL: `(min-width: ${screenSize.desktop})`
}
