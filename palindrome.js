const regEx = /[\W_]/g;

const validPalindrome = (str) => {
  const word = str.toLowerCase().replace(regEx, '');
  const reversed = word.split('').reverse().join('');
  
  return word === reversed; 
}

const res = validPalindrome("not a palindrome");
console.log(res);