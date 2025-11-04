export const isValidUrl = (url: string): boolean => {
    const urlRegex = /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i; 
    return urlRegex.test(url.trim());
};