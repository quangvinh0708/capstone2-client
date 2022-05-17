export const stringColors:
    | (
          | "primary"
          | "secondary"
          | "success"
          | "error"
          | "info"
          | "warning"
          | "inherit"
      )[]
    | undefined = [
    "primary",
    "secondary",
    "success",
    "error",
    "info",
    "warning",
];

export const convertColor = (str: string) => {
    switch (str) {
        case "secondary":
            return `#9C27B0`;
        case "success":
            return `#2E7D32`;
        case "error":
            return `#D32F2F`;
        case "info":
            return `#0288D1`;
        case "warning":
            return `#ED6C02`;
        default:
            return `#1976D2`;
    }
};

export const convertColorRGBA = (str: string) => {
    switch (str) {
        case "secondary":
            return `rgba(156, 39, 176, 0.5)`;
        case "success":
            return `#2E7D32`;
        case "error":
            return `#D32F2F`;
        case "info":
            return `#0288D1`;
        case "warning":
            return `#ED6C02`;
        default:
            return `#1976D2`;
    }
};

export const convertColorRGBAGradient = (str: string) => {
    switch (str) {
        case "secondary":
            return `linear-gradient(45deg, rgba(156, 39, 176, 0.5) 75%, rgba(156, 39, 176, 0.3) 25%)`;
        case "success":
            return `linear-gradient(45deg, rgba(46, 125, 50, 0.5) 75%, rgba(46, 125, 50, 0.3) 25%)`;
        case "error":
            return `linear-gradient(45deg, rgba(211, 47, 47, 0.5) 75%, rgba(211, 47, 47, 0.3) 25%)`;
        case "info":
            return `linear-gradient(45deg, rgba(2, 136, 209, 0.5) 75%, rgba(2, 136, 209, 0.3) 25%)`;
        case "warning":
            return `linear-gradient(45deg, rgba(237, 108, 2, 0.5) 75%, rgba(237, 108, 2, 0.3) 25%)`;
        default:
            return `linear-gradient(45deg, rgba(25, 118, 210, 0.5) 75%, rgba(25, 118, 210, 0.3) 25%)`;
    }
};

export const randomStringColor = () => {
    const randomNumber = Math.floor(Math.random() * stringColors.length);

    return stringColors[randomNumber];
};

export const randomStringMultiColor = (number: number) => {
    const results: any[] = [];
    while (results.length < number) {
        const randomNumber = Math.floor(Math.random() * stringColors.length);
        const stringColor = stringColors[randomNumber];
        if (!results.includes(stringColor)) results.push(stringColor);
    }

    return results;
};
