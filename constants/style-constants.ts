import { px, colors, elevation, sizes, fonts, fontSizesEmMajorThird, elementSizes } from "./constants";

export const debug = {
  "background-color": "rgba(0, 0, 0, 0.1)",
  "border": "1px solid white",
}

export const rowStyle = {
  "display": "flex",
  "flex-direction": "row",
  "width": "50%",
  "justify-content": "space-between",
}



// text 
export const baseFontStyleProps = {
  "font-family": fonts.headerFont,
  "font-size": fontSizesEmMajorThird.base,
  "color": colors.grayVeryDark,
  "font-weight": `${fonts.weightRegular}`,
  "text-align": "left",
}

// headlines
export const h1StyleProps = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.large,
  "margin-top": px(sizes.fine),
  "margin-bottom": px(sizes.little),
}
export const h2StyleProps = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.big,
  "margin-top": px(sizes.thin),
  "margin-bottom": px(sizes.fine),
}
export const h3StyleProps = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.medium,
  "margin-top": px(sizes.thin),
  "margin-bottom": px(sizes.fine),
}
export const h4StyleProps = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.base,
  "margin-top": px(sizes.thin),
  "margin-bottom": px(sizes.fine),
}


export const labelMicro = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.micro,
};

export const labelMicroAccented = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.micro,
  "font-weight": `${fonts.weightSemiBold}`
};

export const labelSmall = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.small,
};
export const labelSmallAccented = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.small,
  "font-weight": `${fonts.weightSemiBold}`,
};


export const labelSmallEmphasized = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.small,
  "font-weight": `${fonts.weightBold}`,
};


export const labelBase = {
  ...baseFontStyleProps,
};

export const labelBaseAccented = {
  ...baseFontStyleProps,
  "font-weight": `${fonts.weightSemiBold}`,
};

export const labelBaseEmphasized = {
  ...baseFontStyleProps,
  "font-weight": `${fonts.weightBold}`,
};

export const labelMedium = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.medium,
};

export const labelMediumAccented = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.medium,
  "font-weight": `${fonts.weightSemiBold}`,
};

export const labelMediumEmphasized = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.medium,
};


export const labelBigAccented = {
  ...baseFontStyleProps,
  "font-size": fontSizesEmMajorThird.big,
  "font-weight": `${fonts.weightSemiBold}`,
};




export const widgetStyle = {
  "box-shadow": elevation.dp1,
}


export const inputUnderlined = {
  "font-size": fontSizesEmMajorThird.base,
  "border-radius": 0,
  "background-color": colors.white,
  "border": "none",
  "border-bottom": `${px(sizes.hair)} solid ${colors.primary}`,
}

export const inputLogin = {
  "font-size": fontSizesEmMajorThird.small,
  "border-radius": px(elementSizes.inputHeight / 2),
  "background-color": colors.white,
  "border": `${px(sizes.hair)} solid ${colors.grayMedium}`,
}

export const buttonSmall = {
  ...labelMicro,
  "height": px(elementSizes.buttonHeightSmall),
  "padding": `0 ${px(sizes.small)}`,
  "border-radius": px(elementSizes.buttonHeightSmall / 2),
}
export const buttonMedium = {
  ...labelSmall,
  "height": px(elementSizes.buttonHeightMedium),
  "padding": `0 ${px(sizes.junior)}`,
  "border-radius": px(elementSizes.buttonHeightMedium / 2),
}
export const buttonBig = {
  ...labelBase,
  "height": px(elementSizes.buttonHeightBig),
  "padding": `0 ${px(sizes.compact)}`,
  "border-radius": px(elementSizes.buttonHeightBig / 2)
}