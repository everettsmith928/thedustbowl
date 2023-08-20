let clickUpgrades = [
  {
    name: 'Broken Rake',
    price: 10,
    quantity: 0,
    multiplier: 1
  },
  {
    name: 'Rusty Shovel',
    price: 150,
    quantity: 0,
    multiplier: 2
  },
  {
    name: 'Plow',
    price: 500,
    quantity: 0,
    multiplier: 3
  }
];

let automaticUpgrades = [
  {
    name: 'Birth Child',
    price: 60,
    quantity: 0,
    multiplier: -10
  },
  {
    name: 'Old Donkey',
    price: 1000,
    quantity: 0,
    multiplier: 100
  },
  {
    name: 'Toddler',
    price: 1000,
    quantity: 0,
    multiplier: 20
  }
];

let badges = [
  {
    title: 'Peasant',
    dust: 100
  },
  {
    title: 'Farmer',
    dust: 1000
  },
]

// NOTE Here are the Global Variables
let storeElem = document.getElementById('store')
let userUpgrades = document.getElementById('userUpgrades')
let lifetimeDust = 0;
let dustTotal = 1000000;
let autoDust = 0;
let clickModify = 0;
let collectionInterval = 3000
updateDust()
updateStore()

function mine() {
  let clickTotal = 0;
  clickUpgrades.forEach(upgrade => {
    if (upgrade.quantity > 0) {
      clickTotal += upgrade.quantity * upgrade.multiplier;
    }
  })
  dustTotal += clickTotal + 1;
  lifetimeDust += clickTotal + 1;
  console.log(dustTotal)
  updateStore()
  updateDust()
}

function collectAutoUpgrades() {
  let addedDust = 0;
  automaticUpgrades.forEach(autoUpgrade => {
    if (autoUpgrade.quantity > 0) {
      //addedDust = autoUpgrade.quantity * autoUpgrade.multiplier
      dustTotal += autoUpgrade.quantity * autoUpgrade.multiplier;
      addedDust += autoUpgrade.quantity * autoUpgrade.multiplier;
      if (addedDust > 0) {
        lifetimeDust += addedDust
      }
    }
    autoDust = addedDust;
  })
  console.log(dustTotal)
  console.log('Automatic Dust Collection')
  updateDust()
  updateStore()
}

function calculateAutoDust() {

  let addedDust = 0
  automaticUpgrades.forEach(autoUpgrade => {
    if (autoUpgrade.quantity > 0 && autoUpgrade.multiplier > 0) {
      addedDust += autoUpgrade.quantity * autoUpgrade.multiplier
    } else if (autoUpgrade.multiplier < 0) {
      addedDust += autoUpgrade.quantity * autoUpgrade.multiplier
    }
    autoDust = addedDust;
  })

}

setInterval(collectAutoUpgrades, collectionInterval)

function updateDust() {
  clickModify = 0
  if (dustTotal <= 0) {
    dustTotal = 0
  }
  clickUpgrades.forEach(upgrade => {
    if (upgrade.quantity > 0) {
      clickModify += upgrade.quantity * upgrade.multiplier;
    }

  })

  calculateAutoDust()

  let dustTotalElem = document.getElementById("dirtTotal")
  dustTotalElem.innerText = `Total Dust: ${dustTotal}`
  let dustAutoElem = document.getElementById("autoDust")
  dustAutoElem.innerText = `Automatic Dust: ${autoDust}`
  let clickTotalElem = document.getElementById("clickTotal")
  clickTotalElem.innerText = `Extra Dust per Click: +${clickModify}`
  let lifetimeDustElem = document.getElementById("lifetimeDust")
  lifetimeDustElem.innerText = `Lifetime Dust: ${lifetimeDust}`
}

function updateUpgrades(boughtUpgrade) {
  console.log(`Bought upgrade: ${boughtUpgrade}`)
  clickUpgrades.forEach(upgrade => {
    if (upgrade.name == boughtUpgrade && upgrade.quantity > 0) {
      let tempUpgrade = ``
      tempUpgrade = `<div class="purchased-upgrades text-center">${upgrade.name}
        </div>`
      userUpgrades.innerHTML += tempUpgrade
    }
  })
  automaticUpgrades.forEach(upgrade => {
    if (upgrade.name == boughtUpgrade && upgrade.quantity > 0) {
      let tempUpgrade = ``
      tempUpgrade = `<div class="purchased-upgrades text-center">${upgrade.name}
        </div>`
      userUpgrades.innerHTML += tempUpgrade
    }
  })
}

function updateStore() {
  //For upgrade array storeElem.innerHTML += ...
  let str = ''
  let disabled = ''
  //console.log(storeElem.innerHTML)
  clickUpgrades.forEach(upgrade => {
    if (dustTotal < upgrade.price) { disabled = 'disabled' } else { disabled = '' }
    str += `<button class="col-4 unpurchased-upgrades p-2" onclick="buyUpgrade('${upgrade.name}', 1)" ${disabled}>
            <h3>${upgrade.name}</h3>
            <p>Price: ${upgrade.price}</p>            
          </button>`
  })
  automaticUpgrades.forEach(upgrade => {
    if (dustTotal < upgrade.price) { disabled = 'disabled' } else { disabled = '' }
    str += `<button class="col-4 unpurchased-upgrades p-2" onclick="buyUpgrade('${upgrade.name}', 2)" ${disabled}>
            <h3>${upgrade.name}</h3>
            <p>Price: ${upgrade.price}</p>            
          </button>`
  })
  storeElem.innerHTML = str
  console.log(storeElem.innerHTML)
}

// storeElem.innerHTML =
//   `
//         <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('rusty shovel')" id="rustyShovel">
//           <h3>Rusty Shovel</h3>
//           <p id="rustyShovelPrice">Price: ${boughtUpgrade.price}</p>            
//         </div>
//         <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('birth child')" id="birthChild">
//           <h3>Birth Child</h3>
//           <p id="birthChildPrice">Price: ${boughtUpgrade.price}</p>            
//         </div>
//         <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('old donkey')" id="oldDonkey">
//           <h3>Old Donkey</h3>
//           <p id="oldDonkeyPrice">Price: ${boughtUpgrade.price}</p>            
//         </div>
//          <div class="col-6 unpurchased-upgrades p-2" onclick="grabDrink('drink')" id="grabDrink">
//           <h3>Drink</h3>
//           <p>Price: 10</p>
//         </div>
//         <div class="col-6 unpurchased-upgrades p-2" onclick="growChild('toddler')" id="toddler">
//           <h3>Feed a Child</h3>
//           <p>Price: 100</p>
//         </div>`


// NOTE old buy upgrade Function

// function buyUpgrade(boughtUpgrade) {
//   clickUpgrades.find(upgrade => {
//     if (boughtUpgrade == upgrade.name && dustTotal >= upgrade.price) {
//       upgrade.quantity++
//       dustTotal -= upgrade.price
//       upgrade.price += 50;
//       updateUpgrades(boughtUpgrade)
//       updateStore()
//       updateDust()
//       console.log(dustTotal, `You bought a ${boughtUpgrade} `)
//     } else if (boughtUpgrade !== upgrade.name) {
//       return
//     } else {
//       window.alert("You Don't Have the Dust!")
//     }
//   })
//   automaticUpgrades.find(upgrade => {
//     if (boughtUpgrade == upgrade.name && dustTotal >= upgrade.price) {
//       upgrade.quantity++
//       dustTotal -= upgrade.price
//       upgrade.price += 100;
//       updateUpgrades(boughtUpgrade)
//       updateStore()
//       updateDust()
//       console.log(dustTotal, `You bought a ${boughtUpgrade} `)
//     } else if (boughtUpgrade !== upgrade.name) {
//       return
//     } else {
//       window.alert("You Don't Have the Dust!")
//     }
//   })
// }

function grabDrink(boughtUpgrade) {
  if (dustTotal >= 10) {
    dustTotal -= 10
    automaticUpgrades[0].quantity++
    console.log('Oops you had a kid!')
    window.alert('You had a little too much fun..')
    updateDust()
    buyUpgrade(boughtUpgrade)
  } else {
    window.alert("You Don't Have the Dust!")
  }


}

function growChild(boughtUpgrade) {
  if (automaticUpgrades[0].quantity > 0 && dustTotal >= automaticUpgrades[2].price) {
    automaticUpgrades[0].quantity--
    automaticUpgrades[2].quantity++
    updateUpgrades(boughtUpgrade)
    updateDust()
  } else {
    window.alert("You don't have the Dust!")
  }
}

// refactored Buy Function
function buyUpgrade(boughtUpgrade, x) {
  let upgrade
  if (x == 1) {
    upgrade = findUpgrade(boughtUpgrade)
  } else {
    upgrade = findAutoUpgrade(boughtUpgrade)
  }

  if (dustTotal >= upgrade.price) {
    upgrade.quantity++
    dustTotal -= upgrade.price
    upgrade.price = Math.ceil(upgrade.price * 1.05)
    if (x == 2) {
      autoDust += upgrade.multiplier
    }
    updateUpgrades(boughtUpgrade)
    updateStore()
    updateDust()
  } else {
    window.alert(`You don't have the dust! You have : ${dustTotal} and you need : ${upgrade.price}`)
  }
}

function findUpgrade(boughtUpgrade) {
  return clickUpgrades.find((upgrade) => upgrade.name == boughtUpgrade)
}

function findAutoUpgrade(boughtUpgrade) {
  return automaticUpgrades.find((upgrade) => upgrade.name == boughtUpgrade)
}
//Bought upgrade
//Pass name -> Grab object from array, set as variable, compare variable to dust and modify dust amounts/alert if not enough -> Switch statement for each object -> Update DOM

// function updateStore(upgradeBought) {
//   clickUpgrades.find(upgrade => upgrade.name == upgradeBought)
//   console.log(`${ upgradeBought } `)
// }

// function buyRake() {
//   if (dustTotal >= clickUpgrades[0].price) {
//     let upgrade = clickUpgrades[0]
//     upgrade.quantity++
//     dustTotal -= upgrade.price
//     upgrade.price += 1000
//   } else {
//     window.alert('Farm more dust!')
//   }
//   console.log(clickUpgrades, 'bought rake')
//   updateDust()
// }