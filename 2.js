function convertToRoman(arg) {
  /* STEP 1: define limits
       3999 = 'MMMCMXCIX'
       4000 = MV̅
       5000 = V̅
  */
  let num = parseInt(arg)
  if (num < 1 || num > 4000) {
    return "ERROR, INVALID VALUE TO CONVERT"
  }
    
  /* STEP 2: separate input into proper places */  
  /* -  ones, tens, hundreds, thousands */
  function separate(inp) {
    /* - convert number->string->array then reverse it
       - use .map() pure function to iterate on array
       - loop through array and multiply it by 10s
       - reverse array again
       - frequent array reversing due to how arrays are
         handled in loops */
    let cntr = 1
    return [...`${inp}`]
              .reverse()
              .map(i=>{
                let newVal = i*cntr
                cntr *= 10
                return newVal
              })
              .reverse()
  }
  
  /* STEP 3: setup pattern and symbols */
  const RM = { 
    thou: { len: 4, dvsr: 1000, start: { sym: "M" } },
    hund: { len: 3, dvsr: 100, start: { sym: "C" }, mid: { sym: "D" }, next: { sym: "M" } },
    tens: { len: 2, dvsr: 10, start: { sym: "X" }, mid: { sym: "L" }, next: { sym: "C" } },
    ones: { len: 1, dvsr: 1, start: { sym: "I" }, mid: { sym: "V" }, next: { sym: "X" } }
  }
  Object.freeze(RM)
  
  /* STEP 4: apply symbols depending on pattern */
  function symb(inp) {
    function process(item, RM_obj) {
      let rangeGuide = item/RM_obj.dvsr
      switch(rangeGuide) {
        case 4:
          // start + mid
          return RM_obj.start.sym + RM_obj.mid.sym
        case 5:
          // mid
          return RM_obj.mid.sym
        case 9:
          // start + next
          return RM_obj.start.sym + RM_obj.next.sym
        default:
          if (rangeGuide >= 1 && rangeGuide <= 3) {
            // start
            return (RM_obj.start.sym).repeat(item/RM_obj.dvsr)
          } else if (rangeGuide >=6 && rangeGuide <= 8) {
            // mid + start
            return RM_obj.mid.sym + (RM_obj.start.sym).repeat((item/RM_obj.dvsr)-5)
          }
      }
    }
    return inp.map(i=>{
      switch (`${i}`.length) {
        case RM.thou.len:
          return (RM.thou.start.sym).repeat(i/RM.thou.dvsr)
        case RM.hund.len:
          return process(i, RM.hund)
        case RM.tens.len:
          return process(i, RM.tens)
        case RM.ones.len:
          return process(i, RM.ones)
      }
    })
  }
  
  // execute steps
  return symb(separate(num)).join("");
}

console.log(convertToRoman(0))    // ERROR, INVALID VALUE TO CONVERT
console.log(convertToRoman(2694)) // MMDCXCIV
console.log(convertToRoman(3999)) // MMMCMXCIX
console.log(convertToRoman(4002)) // ERROR, INVALID VALUE TO CONVERT
console.log(convertToRoman(15))   // XV
console.log(convertToRoman(6))    // VI
console.log(convertToRoman(36))   // XXXVI
