let clickUpgrades = [
  {
    name: 'broken rake',
    price: 10,
    quantity: 0,
    multiplier: 1
  },
  {
    name: 'rusty shovel',
    price: 150,
    quantity: 0,
    multiplier: 2
  }
];

let automaticUpgrades = [
  {
    name: 'birth child',
    price: 60,
    quantity: 0,
    multiplier: -10
  },
  {
    name: 'old donkey',
    price: 1000,
    quantity: 0,
    multiplier: 100
  },
  {
    name: 'toddler',
    price: 1000,
    quantity: 0,
    multiplier: 20
  }
];

// NOTE Here are the Global Variables
let storeElem = document.getElementById('store')
let userUpgrades = document.getElementById('userUpgrades')
let dustTotal = 10000000;
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
  console.log(dustTotal)
  updateDust()
}

function collectAutoUpgrades() {
  let addedDust = 0;
  automaticUpgrades.forEach(autoUpgrade => {
    if (autoUpgrade.quantity > 0) {
      dustTotal += autoUpgrade.quantity * autoUpgrade.multiplier;
      addedDust += autoUpgrade.quantity * autoUpgrade.multiplier
    }
    autoDust = addedDust;
  })
  console.log(dustTotal)
  console.log('Automatic Dust Collection')
  updateDust()
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
}

function updateUpgrades(boughtUpgrade) {
  console.log(`Bought upgrade: ${boughtUpgrade}`)
  clickUpgrades.forEach(upgrade => {
    if (upgrade.name == boughtUpgrade && upgrade.quantity > 0) {
      let tempUpgrade = ``
      tempUpgrade = `<div class="purchased-upgrades text-center ">${upgrade.name}
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
  storeElem.innerHTML = `<div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('broken rake')" id="brokenRake">
            <h3>Broken Rake</h3>
            <p id="rakePrice">Price: ${clickUpgrades[0].price}</p>            
          </div>
          <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('rusty shovel')" id="rustyShovel">
            <h3>Rusty Shovel</h3>
            <p id="rustyShovelPrice">Price: ${clickUpgrades[1].price}</p>            
          </div>
          <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('birth child')" id="birthChild">
            <h3>Birth Child</h3>
            <p id="birthChildPrice">Price: ${automaticUpgrades[0].price}</p>            
          </div>
          <div class="col-3 unpurchased-upgrades p-2" onclick="buyUpgrade('old donkey')" id="oldDonkey">
            <h3>Old Donkey</h3>
            <p id="oldDonkeyPrice">Price: ${automaticUpgrades[1].price}</p>            
          </div>
           <div class="col-6 unpurchased-upgrades p-2" onclick="grabDrink('drink')" id="grabDrink">
            <h3>Drink</h3>
            <p>Price: 10</p>
          </div>
          <div class="col-6 unpurchased-upgrades p-2" onclick="growChild('toddler')" id="toddler">
            <h3>Feed a Child</h3>
            <p>Price: 100</p>
          </div>`
}


function buyUpgrade(boughtUpgrade) {
  clickUpgrades.find(upgrade => {
    if (boughtUpgrade == upgrade.name && dustTotal >= upgrade.price) {
      upgrade.quantity++
      dustTotal -= upgrade.price
      upgrade.price += 50;
      updateUpgrades(boughtUpgrade)
      updateStore()
      updateDust()
      console.log(dustTotal, `You bought a ${boughtUpgrade}`)
    } else if (boughtUpgrade !== upgrade.name) {
      return
    } else {
      window.alert("You Don't Have the Dust!")
    }
  })
  automaticUpgrades.find(upgrade => {
    if (boughtUpgrade == upgrade.name && dustTotal >= upgrade.price) {
      upgrade.quantity++
      dustTotal -= upgrade.price
      upgrade.price += 100;
      updateUpgrades(boughtUpgrade)
      updateStore()
      updateDust()
      console.log(dustTotal, `You bought a ${boughtUpgrade}`)
    } else if (boughtUpgrade !== upgrade.name) {
      return
    } else {
      window.alert("You Don't Have the Dust!")
    }
  })
}

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
  if (automaticUpgrades[0].quantity > 0)
    automaticUpgrades[0].quantity--
  automaticUpgrades[2].quantity++
  updateUpgrades(boughtUpgrade)
  updateDust()
}

// function updateStore(upgradeBought) {
//   clickUpgrades.find(upgrade => upgrade.name == upgradeBought)
//   console.log(`${upgradeBought}`)
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