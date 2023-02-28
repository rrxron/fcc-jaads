function rot13(str) {
  const SHIFT_COUNT_TO_RIGHT = 13
  const ASCII_LOWEST = 65 // A
  const ASCII_HIGHEST = 90 // Z
  const SPECIAL_CHAR_CODES = { 33: "!", 46: ".", 63: "?" }
  
  // use .freeze() to prevent mutability of SPECIAL_CHAR_CODES object
  Object.freeze(SPECIAL_CHAR_CODES)
  
  // split words using spaces and iterate
  return str.split(" ").map(i=>{
    let buildStr = []
    const process = [...i]
    // iterate each letter per word
    process.forEach(j=>{
      // retrieve character code of that letter
      const charCode = j.charCodeAt(0)
      // ignore if within special character codes (according to test case)
      if (Object.keys(SPECIAL_CHAR_CODES).includes(`${charCode}`)) {
        buildStr.push(String.fromCharCode(charCode))
        return // return is equivalent of continue in a for loop
      }
      // determine returning back to 65 (A) if beyond 90 (Z)
      const shifted = charCode + SHIFT_COUNT_TO_RIGHT
      if (shifted > ASCII_HIGHEST) {
        buildStr.push(String.fromCharCode((ASCII_LOWEST + ((shifted - ASCII_HIGHEST)-1))))
      } else {
        buildStr.push(String.fromCharCode(shifted))
      }
    })
    return buildStr.join("") // join letters
  }).join(" ") // join words
}

rot13("SERR PBQR PNZC")
rot13("SERR CVMMN!")
rot13("SERR YBIR?")
rot13("GUR DHVPX OEBJA SBK WHZCF BIRE GUR YNML QBT.")   
