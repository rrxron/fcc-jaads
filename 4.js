function telephoneCheck(str) {
  // create multiple patterns according to test case
  const p1 = /^(1\s*)?(\d{3}-\d{3}-\d{4})$/g
  const p2 = /^(1\s*)?(\(\d{3}\)\d{3}-\d{4})$/g
  const p3 = /^(1\s*)?(\(\d{3}\)\s\d{3}-\d{4})$/g
  const p4 = /^(1\s*)?(\d{3}\s\d{3}\s\d{4})$/g
  const p5 = /^(1\s*)?(\d{10})$/g
  let resulting = false
  // use optional chaining in determining matches
  if ((str.match(p1)?.length == 1) ||
     (str.match(p2)?.length == 1) || 
     (str.match(p3)?.length == 1) ||
     (str.match(p4)?.length == 1) ||
     (str.match(p5)?.length == 1)) {
    resulting = true
  }
  return resulting
}

telephoneCheck("555-555-5555");
