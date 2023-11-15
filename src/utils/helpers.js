export const characterLimit = (text, limit) => {
    if (typeof text === 'undefined') {
      return undefined;
    }
  
    return text.length > limit ? text.substr(0, limit - 1).trim() + '...' : text;
  };