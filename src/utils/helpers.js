export const characterLimit = (text, limit) => {
    if (typeof text === 'undefined') {
      return undefined;
    }
  
    return text.length > limit ? text.substr(0, limit - 1).trim() + '...' : text;
  };

  export const generateUniqueId = () => {
    let id = "";
    let letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    id += letters.charAt(Math.floor(Math.random() * letters.length));
    id += letters.charAt(Math.floor(Math.random() * letters.length));
    id += String(Math.random()).slice(2, 6);
    return id;
  }