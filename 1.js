function palindrome(str) {
  /* STEP: 1 prepare string */
  /* - retrieve valid strings using regex
     - convert array to string then lowercase it */
  const cleanedString = 
    str
      .match(/[a-z0-9*]/ig)
      .join("")
      .toLowerCase()
  
  /* STEP 2: reverse string to determine if palindrome*/
  /* - separate string into array
     - reverse it
     - use .map() pure function to iterate items
     - convert array to string */
  const reversedString =
    strings =>
      [...strings]
        .reverse()
        .map(i=>i)
        .join("")
        
  /* STEP 3: type equality to check both strings */
  /* - use reversedString function to reverse
       the initially cleaned string */
  return cleanedString === reversedString(cleanedString)
}

palindrome("eye");
