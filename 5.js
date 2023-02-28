function checkCashRegister(price, cash, cid) {
  /* STEP 1:
     list all values for currencies
     divided between whole number and decimals */
  const currency_w = {
    "ONE": 1,
    "FIVE": 5,
    "TEN": 10,
    "TWENTY": 20,
    "ONE HUNDRED": 100  
  }
  const currency_d = {
    "PENNY": 0.01,
    "NICKEL": 0.05,
    "DIME": 0.1,
    "QUARTER": 0.25
  }

  /* STEP 2:
     distribute cid argument array elements */
  const 
    [
      penny, nickel, dime, quarter,
      one, five, ten, twenty, hundred
    ] = [...cid]

  /* STEP 3:
     group cid between whole number and decimals */
  const cid_w = [ hundred, twenty, ten, five, one ]
  const cid_d = [ quarter, dime, nickel, penny ]

  /* STEP 4:
     implement sorting according to denomination value */
  const sort_cid = (a,b) => {
    if (a.per_denom < b.per_denom) {
      return 1
    } else if (a.per_denom > b.per_denom) {
      return -1
    }
  }

  /* STEP 5:
     implement creation of new array to serve
     as the one to use in determining logic */
  const new_cid = (cid_x, currency) => (
    [...cid_x]
      .map(i=>(
        {
          label: i[0],
          cid: parseFloat(i[1].toFixed(2)),
          per_denom: currency[i[0]],
          stock: Math.ceil(i[1]/ currency[i[0]])
        }
      )).sort(sort_cid)
    )
  
  /* STEP 6:
     create cid objects for whole number and decimal
     then sort it according to value denomination */
  let cidV2_w = new_cid(cid_w, currency_w)
  let cidV2_d = new_cid(cid_d, currency_d)

  /* STEP 7:
     return change calculation per group
     return updated numeric change values */
  const retrieve_change = (cidV2, x) => {
    let return_x = []
    cidV2.forEach(i=>{
      if (i.per_denom <= x && x > 0) {
        let hasChange = false
        let stock_to_change = 0
        while (i.stock > 0 && x > 0) {
          if (x >= i.per_denom) {
            x = parseFloat((x - i.per_denom).toFixed(2))
            i.stock -= 1
            i.cid = parseFloat((i.stock * i.per_denom).toFixed(2))
            stock_to_change += 1
            hasChange = true
            if (x === 0 || i.stock === 0) {
              break
            }
          } else {
            break
          }
        }
        if (hasChange) {
          let item = []
          item.push(i.label)
          item.push(stock_to_change * i.per_denom)
          return_x.push(item)
        }
      }
    })
    return { returned: return_x, x_status: x }
  }

  /* STEP 8:
     update values and execute calculations */
  let change = cash - price
  let [w, d] = `${change.toFixed(2)}`.split(".")

  let w_p = retrieve_change(cidV2_w, w)
  let cid_w_ = w_p.returned
  w = w_p.x_status // update whole number status

  d *= 0.01 // convert to decimal value
  let d_p = retrieve_change(cidV2_d, d)
  let cid_d_ = d_p.returned
  d = d_p.x_status // update decimal status
  
  /* STEP 9:
     update the final values to determine result */
  let cidStatus = cidV2_w.concat(cidV2_d)  
  let finalReturn = cid_w_.concat(cid_d_)

  if (w > 0 || d > 0) {
    return { status: "INSUFFICIENT_FUNDS", change: []}
  }

  // check if we don't have denominations and all cid values are zero
  if (cidStatus.every(x=> x.stock === 0 && parseFloat(x.cid) === 0)) {
    if (w > 0 || d > 0) {
      return { status: "INSUFFICIENT_FUNDS", change: []}
    }
    return { status: "CLOSED", change: cid }
  }

  return { status: "OPEN", change: finalReturn }
}
