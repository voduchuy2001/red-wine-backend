export const generateAvatar = (string = process.env.APP_NAME, size) => {
    const name = string.charAt(0).toUpperCase();
    return `https://ui-avatars.com/api/?name=${name}&size=${size}&background=800000&color=ffffff&bold=true`;
};
