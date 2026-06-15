const indianFoods = [
  {
    "name": "Roti / Chapati",
    "aliases": [
      "chapati",
      "phulka",
      "roti",
      "wheat roti"
    ],
    "calories": 104,
    "protein": 3.1,
    "carbs": 18.4,
    "fat": 2.4,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 40,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "flatbread",
      "naan",
      "tortilla"
    ]
  },
  {
    "name": "Plain Paratha",
    "aliases": [
      "parantha",
      "plain paratha",
      "tawa paratha"
    ],
    "calories": 200,
    "protein": 4.5,
    "carbs": 28.0,
    "fat": 8.5,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "flatbread",
      "pancake"
    ]
  },
  {
    "name": "Aloo Paratha",
    "aliases": [
      "potato paratha",
      "aloo parantha"
    ],
    "calories": 260,
    "protein": 5.5,
    "carbs": 38.0,
    "fat": 9.5,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 110,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "flatbread",
      "stuffed bread"
    ]
  },
  {
    "name": "Gobi Paratha",
    "aliases": [
      "cauliflower paratha",
      "gobi parantha"
    ],
    "calories": 240,
    "protein": 5.8,
    "carbs": 35.0,
    "fat": 8.5,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 105,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "flatbread",
      "stuffed bread"
    ]
  },
  {
    "name": "White Rice",
    "aliases": [
      "steamed rice",
      "plain rice",
      "chawal",
      "cooked rice"
    ],
    "calories": 130,
    "protein": 2.7,
    "carbs": 28.2,
    "fat": 0.3,
    "fiber": 0.4,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "white rice",
      "steamed rice",
      "cooked rice"
    ]
  },
  {
    "name": "Brown Rice",
    "aliases": [
      "whole grain rice",
      "brown chawal"
    ],
    "calories": 130,
    "protein": 2.8,
    "carbs": 27.5,
    "fat": 0.5,
    "fiber": 1.1,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "brown rice"
    ]
  },
  {
    "name": "Biryani",
    "aliases": [
      "chicken biryani",
      "veg biryani",
      "mutton biryani",
      "hyderabadi biryani"
    ],
    "calories": 290,
    "protein": 10.0,
    "carbs": 42.0,
    "fat": 9.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 200,
    "category": "grains",
    "coreMLLabels": [
      "biryani",
      "rice",
      "pilaf",
      "fried rice"
    ]
  },
  {
    "name": "Moong Dal",
    "aliases": [
      "yellow dal",
      "moong daal",
      "mung dal",
      "moong"
    ],
    "calories": 105,
    "protein": 7.0,
    "carbs": 17.0,
    "fat": 0.6,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "lentil soup",
      "dal",
      "beans"
    ]
  },
  {
    "name": "Masoor Dal",
    "aliases": [
      "red lentil dal",
      "masoor daal",
      "red dal"
    ],
    "calories": 110,
    "protein": 8.0,
    "carbs": 18.0,
    "fat": 0.4,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "lentil soup",
      "dal"
    ]
  },
  {
    "name": "Chana Dal",
    "aliases": [
      "split chickpea dal",
      "chana daal",
      "bengal gram dal"
    ],
    "calories": 165,
    "protein": 8.8,
    "carbs": 26.0,
    "fat": 3.0,
    "fiber": 5.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "lentil soup",
      "dal",
      "curry"
    ]
  },
  {
    "name": "Toor Dal",
    "aliases": [
      "arhar dal",
      "toor daal",
      "pigeon pea dal",
      "tuvar dal"
    ],
    "calories": 115,
    "protein": 7.5,
    "carbs": 18.5,
    "fat": 0.8,
    "fiber": 3.8,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "dal",
      "lentil soup"
    ]
  },
  {
    "name": "Aloo Gobi",
    "aliases": [
      "potato cauliflower sabzi",
      "aloo gobi sabzi"
    ],
    "calories": 120,
    "protein": 3.2,
    "carbs": 18.0,
    "fat": 4.5,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "vegetables",
    "coreMLLabels": [
      "curry",
      "vegetable curry",
      "cauliflower",
      "stew"
    ]
  },
  {
    "name": "Palak Paneer",
    "aliases": [
      "spinach paneer",
      "palak panir",
      "saag paneer"
    ],
    "calories": 195,
    "protein": 9.5,
    "carbs": 8.0,
    "fat": 14.0,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "curry",
      "spinach",
      "green curry",
      "paneer"
    ]
  },
  {
    "name": "Bhindi Sabzi",
    "aliases": [
      "okra curry",
      "ladies finger sabzi",
      "bhindi masala",
      "okra stir fry"
    ],
    "calories": 85,
    "protein": 2.5,
    "carbs": 12.0,
    "fat": 3.0,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "vegetables",
    "coreMLLabels": [
      "curry",
      "vegetable",
      "okra",
      "stir fry"
    ]
  },
  {
    "name": "Paneer Butter Masala",
    "aliases": [
      "paneer makhani",
      "butter paneer",
      "paneer tikka masala"
    ],
    "calories": 280,
    "protein": 11.0,
    "carbs": 12.0,
    "fat": 21.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "curry",
      "indian curry",
      "paneer",
      "butter chicken"
    ]
  },
  {
    "name": "Idli",
    "aliases": [
      "idly",
      "plain idli",
      "steamed idli",
      "rice cake"
    ],
    "calories": 58,
    "protein": 1.9,
    "carbs": 11.5,
    "fat": 0.4,
    "fiber": 0.5,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "dumpling",
      "rice cake",
      "cake"
    ]
  },
  {
    "name": "Plain Dosa",
    "aliases": [
      "dosa",
      "plain dosai",
      "crispy dosa"
    ],
    "calories": 133,
    "protein": 3.8,
    "carbs": 25.0,
    "fat": 2.3,
    "fiber": 0.8,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 90,
    "category": "grains",
    "coreMLLabels": [
      "crepe",
      "pancake",
      "flatbread",
      "dosa"
    ]
  },
  {
    "name": "Masala Dosa",
    "aliases": [
      "dosa masala",
      "potato dosa",
      "masala dosai"
    ],
    "calories": 210,
    "protein": 5.5,
    "carbs": 35.0,
    "fat": 5.5,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "crepe",
      "pancake",
      "dosa",
      "flatbread"
    ]
  },
  {
    "name": "Sambar",
    "aliases": [
      "sambhar",
      "south indian sambar",
      "lentil vegetable stew"
    ],
    "calories": 75,
    "protein": 4.0,
    "carbs": 12.0,
    "fat": 1.5,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "stew",
      "lentil soup",
      "curry"
    ]
  },
  {
    "name": "Upma",
    "aliases": [
      "rava upma",
      "sooji upma",
      "semolina upma"
    ],
    "calories": 175,
    "protein": 4.5,
    "carbs": 30.0,
    "fat": 4.0,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "porridge",
      "grain dish",
      "breakfast"
    ]
  },
  {
    "name": "Poha",
    "aliases": [
      "flattened rice",
      "chivda",
      "kanda poha",
      "aloo poha"
    ],
    "calories": 165,
    "protein": 3.5,
    "carbs": 32.0,
    "fat": 3.0,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice flakes",
      "grain",
      "breakfast dish"
    ]
  },
  {
    "name": "Rajma",
    "aliases": [
      "kidney bean curry",
      "rajma masala",
      "red kidney beans"
    ],
    "calories": 170,
    "protein": 8.5,
    "carbs": 27.0,
    "fat": 3.5,
    "fiber": 6.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "beans",
      "curry",
      "kidney beans",
      "bean stew"
    ]
  },
  {
    "name": "Chole",
    "aliases": [
      "chana masala",
      "chickpea curry",
      "chhole",
      "punjabi chole"
    ],
    "calories": 180,
    "protein": 9.0,
    "carbs": 28.0,
    "fat": 4.0,
    "fiber": 7.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "chickpeas",
      "curry",
      "beans",
      "stew"
    ]
  },
  {
    "name": "Khichdi",
    "aliases": [
      "khichri",
      "rice lentil porridge",
      "moong khichdi"
    ],
    "calories": 155,
    "protein": 5.5,
    "carbs": 28.0,
    "fat": 2.5,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "porridge",
      "grain",
      "lentil rice"
    ]
  },
  {
    "name": "White Bread",
    "aliases": [
      "bread slice",
      "sandwich bread",
      "toasted bread"
    ],
    "calories": 70,
    "protein": 2.7,
    "carbs": 13.0,
    "fat": 1.0,
    "fiber": 0.6,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "toast",
      "sandwich"
    ]
  },
  {
    "name": "Whole Wheat Bread",
    "aliases": [
      "brown bread",
      "whole grain bread",
      "atta bread"
    ],
    "calories": 65,
    "protein": 3.0,
    "carbs": 12.0,
    "fat": 1.0,
    "fiber": 1.5,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "toast",
      "whole wheat bread"
    ]
  },
  {
    "name": "Boiled Egg",
    "aliases": [
      "hard boiled egg",
      "egg",
      "anda boiled"
    ],
    "calories": 78,
    "protein": 6.3,
    "carbs": 0.6,
    "fat": 5.3,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "protein",
    "coreMLLabels": [
      "egg",
      "boiled egg",
      "hard boiled egg"
    ]
  },
  {
    "name": "Fried Egg",
    "aliases": [
      "sunny side up",
      "fried anda",
      "egg fry"
    ],
    "calories": 90,
    "protein": 6.3,
    "carbs": 0.4,
    "fat": 6.8,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 55,
    "category": "protein",
    "coreMLLabels": [
      "egg",
      "fried egg",
      "sunny side up"
    ]
  },
  {
    "name": "Scrambled Eggs",
    "aliases": [
      "egg bhurji",
      "scrambled anda",
      "egg scramble"
    ],
    "calories": 170,
    "protein": 11.0,
    "carbs": 2.0,
    "fat": 12.5,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 100,
    "category": "protein",
    "coreMLLabels": [
      "scrambled eggs",
      "egg",
      "omelette"
    ]
  },
  {
    "name": "Mango",
    "aliases": [
      "aam",
      "raw mango",
      "ripe mango",
      "alphonso mango"
    ],
    "calories": 60,
    "protein": 0.8,
    "carbs": 15.0,
    "fat": 0.4,
    "fiber": 1.6,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 165,
    "category": "fruits",
    "coreMLLabels": [
      "mango",
      "fruit",
      "tropical fruit"
    ]
  },
  {
    "name": "Banana",
    "aliases": [
      "kela",
      "plantain",
      "ripe banana"
    ],
    "calories": 89,
    "protein": 1.1,
    "carbs": 23.0,
    "fat": 0.3,
    "fiber": 2.6,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 118,
    "category": "fruits",
    "coreMLLabels": [
      "banana",
      "fruit"
    ]
  },
  {
    "name": "Apple",
    "aliases": [
      "seb",
      "red apple",
      "green apple"
    ],
    "calories": 52,
    "protein": 0.3,
    "carbs": 14.0,
    "fat": 0.2,
    "fiber": 2.4,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "fruits",
    "coreMLLabels": [
      "apple",
      "fruit",
      "red apple"
    ]
  },
  {
    "name": "Guava",
    "aliases": [
      "amrood",
      "peru"
    ],
    "calories": 68,
    "protein": 2.6,
    "carbs": 14.0,
    "fat": 1.0,
    "fiber": 5.4,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "fruits",
    "coreMLLabels": [
      "guava",
      "fruit",
      "tropical fruit"
    ]
  },
  {
    "name": "Papaya",
    "aliases": [
      "papita",
      "ripe papaya"
    ],
    "calories": 43,
    "protein": 0.5,
    "carbs": 11.0,
    "fat": 0.3,
    "fiber": 1.7,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 145,
    "category": "fruits",
    "coreMLLabels": [
      "papaya",
      "fruit",
      "tropical fruit"
    ]
  },
  {
    "name": "Orange",
    "aliases": [
      "narangi",
      "santra",
      "malta"
    ],
    "calories": 47,
    "protein": 0.9,
    "carbs": 12.0,
    "fat": 0.1,
    "fiber": 2.4,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 130,
    "category": "fruits",
    "coreMLLabels": [
      "orange",
      "fruit",
      "citrus"
    ]
  },
  {
    "name": "Samosa",
    "aliases": [
      "veg samosa",
      "aloo samosa",
      "fried samosa"
    ],
    "calories": 150,
    "protein": 3.5,
    "carbs": 18.0,
    "fat": 7.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 70,
    "category": "snacks",
    "coreMLLabels": [
      "samosa",
      "dumpling",
      "pastry",
      "fried food"
    ]
  },
  {
    "name": "Vada",
    "aliases": [
      "medu vada",
      "urad dal vada",
      "dahi vada"
    ],
    "calories": 100,
    "protein": 4.0,
    "carbs": 13.0,
    "fat": 3.5,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 45,
    "category": "snacks",
    "coreMLLabels": [
      "donut",
      "fritter",
      "fried food"
    ]
  },
  {
    "name": "Dhokla",
    "aliases": [
      "khaman dhokla",
      "gujarati dhokla",
      "steamed dhokla"
    ],
    "calories": 90,
    "protein": 4.5,
    "carbs": 14.0,
    "fat": 1.5,
    "fiber": 1.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 80,
    "category": "snacks",
    "coreMLLabels": [
      "cake",
      "sponge cake",
      "steamed food"
    ]
  },
  {
    "name": "Chai",
    "aliases": [
      "masala chai",
      "tea",
      "milk tea",
      "indian tea"
    ],
    "calories": 55,
    "protein": 2.0,
    "carbs": 7.0,
    "fat": 2.0,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 150,
    "category": "beverages",
    "coreMLLabels": [
      "tea",
      "hot drink",
      "beverage",
      "coffee"
    ]
  },
  {
    "name": "Lassi",
    "aliases": [
      "sweet lassi",
      "plain lassi",
      "punjabi lassi"
    ],
    "calories": 120,
    "protein": 4.5,
    "carbs": 16.0,
    "fat": 3.5,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 250,
    "category": "beverages",
    "coreMLLabels": [
      "smoothie",
      "milkshake",
      "drink",
      "yogurt drink"
    ]
  },
  {
    "name": "Buttermilk",
    "aliases": [
      "chaas",
      "chaach",
      "mattha",
      "spiced buttermilk"
    ],
    "calories": 40,
    "protein": 3.0,
    "carbs": 5.0,
    "fat": 1.0,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 250,
    "category": "beverages",
    "coreMLLabels": [
      "buttermilk",
      "drink",
      "milk drink"
    ]
  },
  {
    "name": "Gulab Jamun",
    "aliases": [
      "gulabjamun",
      "khoya gulab jamun",
      "mithai"
    ],
    "calories": 150,
    "protein": 3.0,
    "carbs": 23.0,
    "fat": 5.5,
    "fiber": 0.2,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "sweets",
    "coreMLLabels": [
      "donut",
      "dessert",
      "sweet",
      "cake"
    ]
  },
  {
    "name": "Besan Ladoo",
    "aliases": [
      "laddu",
      "besan laddoo",
      "gram flour ladoo"
    ],
    "calories": 170,
    "protein": 3.5,
    "carbs": 22.0,
    "fat": 8.0,
    "fiber": 0.8,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "sweets",
    "coreMLLabels": [
      "dessert",
      "sweet ball",
      "candy"
    ]
  },
  {
    "name": "Barfi",
    "aliases": [
      "burfi",
      "milk barfi",
      "plain barfi",
      "khoya barfi"
    ],
    "calories": 145,
    "protein": 4.0,
    "carbs": 18.0,
    "fat": 6.5,
    "fiber": 0.2,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 40,
    "category": "sweets",
    "coreMLLabels": [
      "candy",
      "sweet",
      "dessert",
      "fudge"
    ]
  },
  {
    "name": "Puri",
    "aliases": [
      "poori",
      "fried puri",
      "deep fried bread"
    ],
    "calories": 130,
    "protein": 2.5,
    "carbs": 16.0,
    "fat": 6.5,
    "fiber": 0.8,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 60,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "fried bread",
      "flatbread",
      "donut"
    ]
  },
  {
    "name": "Curd / Dahi",
    "aliases": [
      "yogurt",
      "plain curd",
      "dahi",
      "set curd"
    ],
    "calories": 60,
    "protein": 3.5,
    "carbs": 6.0,
    "fat": 2.5,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "yogurt",
      "dairy",
      "pudding"
    ]
  },
  {
    "name": "Paneer",
    "aliases": [
      "cottage cheese",
      "fresh paneer",
      "homemade paneer"
    ],
    "calories": 265,
    "protein": 18.0,
    "carbs": 3.5,
    "fat": 20.0,
    "fiber": 0.0,
    "defaultServing": 50,
    "servingUnit": "g",
    "servingGrams": 50,
    "category": "dairy",
    "coreMLLabels": [
      "cheese",
      "cottage cheese",
      "tofu"
    ]
  },
  {
    "name": "Chicken Curry",
    "aliases": [
      "murgh curry",
      "chicken gravy",
      "desi chicken curry"
    ],
    "calories": 220,
    "protein": 20.0,
    "carbs": 6.0,
    "fat": 13.0,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "curry",
      "chicken curry",
      "meat curry"
    ]
  },
  {
    "name": "Fish Curry",
    "aliases": [
      "machli curry",
      "fish gravy",
      "coastal fish curry"
    ],
    "calories": 180,
    "protein": 18.0,
    "carbs": 5.0,
    "fat": 10.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "fish curry",
      "curry",
      "fish stew"
    ]
  },
  {
    "name": "Aloo Curry",
    "aliases": [
      "potato curry",
      "aloo sabzi",
      "dum aloo"
    ],
    "calories": 115,
    "protein": 2.5,
    "carbs": 20.0,
    "fat": 3.5,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "vegetables",
    "coreMLLabels": [
      "potato curry",
      "curry",
      "stew"
    ]
  },
  {
    "name": "Mixed Vegetable Curry",
    "aliases": [
      "sabzi",
      "mix veg",
      "mixed veg curry",
      "seasonal vegetables"
    ],
    "calories": 95,
    "protein": 3.0,
    "carbs": 14.0,
    "fat": 3.5,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "vegetables",
    "coreMLLabels": [
      "vegetable curry",
      "curry",
      "stew",
      "mixed vegetables"
    ]
  },
  {
    "name": "Matar Paneer",
    "aliases": [
      "peas paneer",
      "mutter paneer"
    ],
    "calories": 210,
    "protein": 10.0,
    "carbs": 12.0,
    "fat": 14.0,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "curry",
      "paneer curry",
      "green curry"
    ]
  },
  {
    "name": "Dal Tadka",
    "aliases": [
      "tadka dal",
      "tempered dal",
      "yellow dal fry"
    ],
    "calories": 130,
    "protein": 7.5,
    "carbs": 18.0,
    "fat": 4.0,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "soup",
      "dal",
      "lentil soup",
      "curry"
    ]
  },
  {
    "name": "Dal Makhani",
    "aliases": [
      "maa ki dal",
      "kali dal",
      "black dal makhani"
    ],
    "calories": 190,
    "protein": 9.0,
    "carbs": 22.0,
    "fat": 8.0,
    "fiber": 5.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "dal",
      "lentil curry",
      "beans",
      "curry"
    ]
  },
  {
    "name": "Pav Bhaji",
    "aliases": [
      "pao bhaji",
      "mumbai pav bhaji",
      "masala pav bhaji"
    ],
    "calories": 300,
    "protein": 8.0,
    "carbs": 45.0,
    "fat": 10.0,
    "fiber": 5.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 200,
    "category": "snacks",
    "coreMLLabels": [
      "burger",
      "sandwich",
      "bread",
      "street food"
    ]
  },
  {
    "name": "Misal Pav",
    "aliases": [
      "misal",
      "sprouted lentil curry with bread"
    ],
    "calories": 280,
    "protein": 10.0,
    "carbs": 42.0,
    "fat": 7.5,
    "fiber": 6.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 200,
    "category": "snacks",
    "coreMLLabels": [
      "curry",
      "bread",
      "stew",
      "sandwich"
    ]
  },
  {
    "name": "Vada Pav",
    "aliases": [
      "batata vada pav",
      "mumbai vada pav"
    ],
    "calories": 290,
    "protein": 7.0,
    "carbs": 42.0,
    "fat": 10.0,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 160,
    "category": "snacks",
    "coreMLLabels": [
      "burger",
      "sandwich",
      "bread",
      "street food"
    ]
  },
  {
    "name": "Chicken Tikka",
    "aliases": [
      "tandoori chicken tikka",
      "grilled chicken tikka"
    ],
    "calories": 190,
    "protein": 25.0,
    "carbs": 4.0,
    "fat": 8.5,
    "fiber": 0.5,
    "defaultServing": 4,
    "servingUnit": "piece",
    "servingGrams": 120,
    "category": "protein",
    "coreMLLabels": [
      "chicken",
      "grilled chicken",
      "kebab",
      "tandoori"
    ]
  },
  {
    "name": "Tandoori Roti",
    "aliases": [
      "tandoor roti",
      "oven roti",
      "naan roti"
    ],
    "calories": 120,
    "protein": 4.5,
    "carbs": 22.0,
    "fat": 1.5,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 50,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "naan",
      "flatbread"
    ]
  },
  {
    "name": "Naan",
    "aliases": [
      "butter naan",
      "plain naan",
      "garlic naan",
      "leavened bread"
    ],
    "calories": 260,
    "protein": 8.0,
    "carbs": 42.0,
    "fat": 7.0,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 90,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "naan",
      "flatbread",
      "pita"
    ]
  },
  {
    "name": "Halwa",
    "aliases": [
      "sooji halwa",
      "gajar halwa",
      "carrot halwa",
      "semolina halwa"
    ],
    "calories": 220,
    "protein": 3.5,
    "carbs": 30.0,
    "fat": 10.0,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 100,
    "category": "sweets",
    "coreMLLabels": [
      "pudding",
      "dessert",
      "sweet",
      "cake"
    ]
  },
  {
    "name": "Kheer",
    "aliases": [
      "rice kheer",
      "payasam",
      "rice pudding",
      "milk kheer"
    ],
    "calories": 175,
    "protein": 5.0,
    "carbs": 28.0,
    "fat": 5.0,
    "fiber": 0.3,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "sweets",
    "coreMLLabels": [
      "pudding",
      "rice pudding",
      "dessert",
      "sweet"
    ]
  },
  {
    "name": "Raita",
    "aliases": [
      "boondi raita",
      "cucumber raita",
      "vegetable raita"
    ],
    "calories": 65,
    "protein": 3.5,
    "carbs": 8.0,
    "fat": 2.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "yogurt",
      "dip",
      "sauce",
      "raita"
    ]
  },
  {
    "name": "Chutney",
    "aliases": [
      "mint chutney",
      "coriander chutney",
      "green chutney",
      "coconut chutney"
    ],
    "calories": 25,
    "protein": 0.8,
    "carbs": 4.0,
    "fat": 0.5,
    "fiber": 1.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 30,
    "category": "condiments",
    "coreMLLabels": [
      "sauce",
      "dip",
      "condiment"
    ]
  },
  {
    "name": "Pickle",
    "aliases": [
      "achaar",
      "mango pickle",
      "lime pickle"
    ],
    "calories": 20,
    "protein": 0.3,
    "carbs": 2.5,
    "fat": 1.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 15,
    "category": "condiments",
    "coreMLLabels": [
      "pickle",
      "condiment"
    ]
  },
  {
    "name": "Puri Bhaji",
    "aliases": [
      "poori aloo",
      "puri with potato"
    ],
    "calories": 260,
    "protein": 5.0,
    "carbs": 36.0,
    "fat": 10.0,
    "fiber": 3.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "fried bread",
      "curry",
      "street food"
    ]
  },
  {
    "name": "Milk",
    "aliases": [
      "cow milk",
      "full fat milk",
      "toned milk",
      "doodh"
    ],
    "calories": 67,
    "protein": 3.4,
    "carbs": 5.0,
    "fat": 3.9,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 200,
    "category": "dairy",
    "coreMLLabels": [
      "milk",
      "dairy",
      "drink"
    ]
  },
  {
    "name": "Oats",
    "aliases": [
      "rolled oats",
      "oatmeal",
      "porridge oats",
      "quaker oats"
    ],
    "calories": 155,
    "protein": 5.5,
    "carbs": 27.0,
    "fat": 2.5,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "porridge",
      "oatmeal",
      "cereal",
      "breakfast"
    ]
  },
  {
    "name": "Cornflakes",
    "aliases": [
      "corn flakes",
      "breakfast cereal",
      "kelloggs cornflakes"
    ],
    "calories": 135,
    "protein": 2.8,
    "carbs": 30.0,
    "fat": 0.5,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 40,
    "category": "grains",
    "coreMLLabels": [
      "cereal",
      "cornflakes",
      "breakfast"
    ]
  },
  {
    "name": "Peanuts",
    "aliases": [
      "groundnuts",
      "moongphali",
      "roasted peanuts"
    ],
    "calories": 280,
    "protein": 13.0,
    "carbs": 10.0,
    "fat": 22.0,
    "fiber": 3.5,
    "defaultServing": 30,
    "servingUnit": "g",
    "servingGrams": 30,
    "category": "snacks",
    "coreMLLabels": [
      "nuts",
      "peanuts",
      "legumes"
    ]
  },
  {
    "name": "Almonds",
    "aliases": [
      "badam",
      "whole almonds",
      "soaked almonds"
    ],
    "calories": 170,
    "protein": 6.0,
    "carbs": 6.0,
    "fat": 15.0,
    "fiber": 3.5,
    "defaultServing": 20,
    "servingUnit": "g",
    "servingGrams": 20,
    "category": "snacks",
    "coreMLLabels": [
      "nuts",
      "almonds",
      "seeds"
    ]
  },
  {
    "name": "Cashews",
    "aliases": [
      "kaju",
      "whole cashews",
      "roasted cashews"
    ],
    "calories": 160,
    "protein": 5.0,
    "carbs": 9.0,
    "fat": 12.0,
    "fiber": 1.0,
    "defaultServing": 20,
    "servingUnit": "g",
    "servingGrams": 20,
    "category": "snacks",
    "coreMLLabels": [
      "nuts",
      "cashews"
    ]
  },
  {
    "name": "Chikki",
    "aliases": [
      "peanut brittle",
      "gur chikki",
      "peanut chikki",
      "groundnut bar"
    ],
    "calories": 175,
    "protein": 5.0,
    "carbs": 20.0,
    "fat": 9.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 40,
    "category": "sweets",
    "coreMLLabels": [
      "candy bar",
      "snack bar",
      "brittle"
    ]
  },
  {
    "name": "Kulfi",
    "aliases": [
      "malai kulfi",
      "pista kulfi",
      "mango kulfi",
      "Indian ice cream"
    ],
    "calories": 140,
    "protein": 4.0,
    "carbs": 18.0,
    "fat": 6.0,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 70,
    "category": "sweets",
    "coreMLLabels": [
      "ice cream",
      "frozen dessert",
      "popsicle"
    ]
  },
  {
    "name": "Jalebi",
    "aliases": [
      "jilipi",
      "fresh jalebi",
      "crispy jalebi"
    ],
    "calories": 175,
    "protein": 2.0,
    "carbs": 30.0,
    "fat": 6.5,
    "fiber": 0.3,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 60,
    "category": "sweets",
    "coreMLLabels": [
      "pretzel",
      "sweet",
      "dessert",
      "fried dough"
    ]
  },
  {
    "name": "Pani Puri",
    "aliases": [
      "golgappa",
      "puchka",
      "water puri",
      "gol gappa"
    ],
    "calories": 80,
    "protein": 2.0,
    "carbs": 14.0,
    "fat": 2.0,
    "fiber": 1.0,
    "defaultServing": 6,
    "servingUnit": "piece",
    "servingGrams": 60,
    "category": "snacks",
    "coreMLLabels": [
      "fried food",
      "snack",
      "street food",
      "puff"
    ]
  },
  {
    "name": "Bhel Puri",
    "aliases": [
      "bhelpuri",
      "mumbai bhel",
      "chaat bhel"
    ],
    "calories": 150,
    "protein": 4.5,
    "carbs": 26.0,
    "fat": 4.0,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 120,
    "category": "snacks",
    "coreMLLabels": [
      "salad",
      "snack",
      "street food",
      "chaat"
    ]
  },
  {
    "name": "Sev",
    "aliases": [
      "nylon sev",
      "ratlami sev",
      "besan sev"
    ],
    "calories": 220,
    "protein": 7.5,
    "carbs": 26.0,
    "fat": 10.0,
    "fiber": 2.0,
    "defaultServing": 30,
    "servingUnit": "g",
    "servingGrams": 30,
    "category": "snacks",
    "coreMLLabels": [
      "noodles",
      "snack",
      "fried food"
    ]
  },
  {
    "name": "Murukku",
    "aliases": [
      "chakli",
      "chakri",
      "rice murukku"
    ],
    "calories": 200,
    "protein": 4.0,
    "carbs": 28.0,
    "fat": 8.5,
    "fiber": 1.5,
    "defaultServing": 30,
    "servingUnit": "g",
    "servingGrams": 30,
    "category": "snacks",
    "coreMLLabels": [
      "cracker",
      "snack",
      "pretzel"
    ]
  },
  {
    "name": "Namkeen Mix",
    "aliases": [
      "mixture",
      "chivda mix",
      "bombay mix",
      "farsan"
    ],
    "calories": 210,
    "protein": 5.0,
    "carbs": 26.0,
    "fat": 10.0,
    "fiber": 2.0,
    "defaultServing": 30,
    "servingUnit": "g",
    "servingGrams": 30,
    "category": "snacks",
    "coreMLLabels": [
      "snack mix",
      "trail mix",
      "chips"
    ]
  },
  {
    "name": "Aloo Tikki",
    "aliases": [
      "potato patty",
      "aloo chaat",
      "tikki"
    ],
    "calories": 130,
    "protein": 3.5,
    "carbs": 20.0,
    "fat": 4.5,
    "fiber": 2.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "snacks",
    "coreMLLabels": [
      "patty",
      "potato cake",
      "burger",
      "fried food"
    ]
  },
  {
    "name": "Pakoda",
    "aliases": [
      "pakora",
      "vegetable pakoda",
      "bhajiya",
      "onion bhaji"
    ],
    "calories": 115,
    "protein": 3.0,
    "carbs": 14.0,
    "fat": 5.5,
    "fiber": 1.5,
    "defaultServing": 3,
    "servingUnit": "piece",
    "servingGrams": 60,
    "category": "snacks",
    "coreMLLabels": [
      "fritter",
      "fried food",
      "onion rings",
      "tempura"
    ]
  },
  {
    "name": "Rava Idli",
    "aliases": [
      "semolina idli",
      "sooji idli",
      "instant idli"
    ],
    "calories": 80,
    "protein": 2.5,
    "carbs": 14.0,
    "fat": 1.5,
    "fiber": 0.8,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "cake",
      "bread",
      "dumpling"
    ]
  },
  {
    "name": "Uttapam",
    "aliases": [
      "uthappam",
      "vegetable uttapam",
      "thick dosa"
    ],
    "calories": 175,
    "protein": 5.0,
    "carbs": 30.0,
    "fat": 4.0,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 130,
    "category": "grains",
    "coreMLLabels": [
      "pancake",
      "flatbread",
      "pizza"
    ]
  },
  {
    "name": "Appam",
    "aliases": [
      "hoppers",
      "Kerala appam",
      "rice appam"
    ],
    "calories": 120,
    "protein": 2.5,
    "carbs": 23.0,
    "fat": 2.0,
    "fiber": 0.5,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "grains",
    "coreMLLabels": [
      "pancake",
      "crepe",
      "bread"
    ]
  },
  {
    "name": "Puttu",
    "aliases": [
      "kerala puttu",
      "rice puttu",
      "kadala puttu"
    ],
    "calories": 220,
    "protein": 4.0,
    "carbs": 45.0,
    "fat": 2.0,
    "fiber": 1.5,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "cake",
      "rice cake",
      "steamed food"
    ]
  },
  {
    "name": "Fish Fry",
    "aliases": [
      "fried fish",
      "fish tawa fry",
      "masala fish fry"
    ],
    "calories": 230,
    "protein": 22.0,
    "carbs": 6.0,
    "fat": 13.0,
    "fiber": 0.3,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "protein",
    "coreMLLabels": [
      "fish",
      "fried fish",
      "seafood"
    ]
  },
  {
    "name": "Egg Curry",
    "aliases": [
      "anda curry",
      "egg masala",
      "boiled egg curry"
    ],
    "calories": 195,
    "protein": 11.0,
    "carbs": 6.0,
    "fat": 14.0,
    "fiber": 1.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "curry",
      "egg curry",
      "stew"
    ]
  },
  {
    "name": "Mutton Curry",
    "aliases": [
      "gosht curry",
      "lamb curry",
      "keema",
      "mutton gravy"
    ],
    "calories": 265,
    "protein": 23.0,
    "carbs": 5.0,
    "fat": 17.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "meat curry",
      "curry",
      "stew",
      "lamb"
    ]
  },
  {
    "name": "Prawns / Shrimp Curry",
    "aliases": [
      "jhinga curry",
      "prawn masala",
      "shrimp curry",
      "kolambi"
    ],
    "calories": 175,
    "protein": 18.0,
    "carbs": 6.0,
    "fat": 9.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "seafood curry",
      "shrimp",
      "curry"
    ]
  },
  {
    "name": "Butter Chicken",
    "aliases": [
      "murgh makhani",
      "chicken makhani",
      "butter murgh"
    ],
    "calories": 250,
    "protein": 20.0,
    "carbs": 8.0,
    "fat": 16.0,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "protein",
    "coreMLLabels": [
      "chicken curry",
      "curry",
      "orange curry"
    ]
  },
  {
    "name": "Chana Masala",
    "aliases": [
      "pindi chole",
      "chick pea masala",
      "kabuli chana"
    ],
    "calories": 180,
    "protein": 9.5,
    "carbs": 27.0,
    "fat": 4.5,
    "fiber": 7.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "lentils",
    "coreMLLabels": [
      "chickpeas",
      "curry",
      "beans",
      "stew"
    ]
  },
  {
    "name": "Bisi Bele Bath",
    "aliases": [
      "bisi bele bhat",
      "Karnataka rice dish",
      "lentil rice"
    ],
    "calories": 175,
    "protein": 6.5,
    "carbs": 30.0,
    "fat": 4.0,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 200,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "dal rice",
      "porridge"
    ]
  },
  {
    "name": "Kadhi",
    "aliases": [
      "kadhi pakoda",
      "punjabi kadhi",
      "Gujarat kadhi",
      "buttermilk curry"
    ],
    "calories": 115,
    "protein": 4.5,
    "carbs": 12.0,
    "fat": 5.5,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "dairy",
    "coreMLLabels": [
      "soup",
      "curry",
      "yellow soup"
    ]
  },
  {
    "name": "Kofta Curry",
    "aliases": [
      "malai kofta",
      "vegetable kofta",
      "lauki kofta"
    ],
    "calories": 240,
    "protein": 8.0,
    "carbs": 16.0,
    "fat": 17.0,
    "fiber": 2.0,
    "defaultServing": 3,
    "servingUnit": "piece",
    "servingGrams": 150,
    "category": "vegetables",
    "coreMLLabels": [
      "meatballs",
      "curry",
      "kofta",
      "stew"
    ]
  },
  {
    "name": "Lemon Rice",
    "aliases": [
      "chitranna",
      "nimmakaya annam",
      "nimbu chawal"
    ],
    "calories": 145,
    "protein": 3.0,
    "carbs": 28.0,
    "fat": 3.0,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "fried rice",
      "yellow rice"
    ]
  },
  {
    "name": "Curd Rice",
    "aliases": [
      "thayir sadam",
      "dahi chawal",
      "yogurt rice"
    ],
    "calories": 135,
    "protein": 4.0,
    "carbs": 24.0,
    "fat": 3.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "white rice",
      "yogurt"
    ]
  },
  {
    "name": "Pesarattu",
    "aliases": [
      "moong dal dosa",
      "green moong dosa"
    ],
    "calories": 120,
    "protein": 7.0,
    "carbs": 18.0,
    "fat": 2.0,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "crepe",
      "pancake",
      "flatbread"
    ]
  },
  {
    "name": "Beetroot",
    "aliases": [
      "chukandar",
      "red beet"
    ],
    "calories": 43,
    "protein": 1.6,
    "carbs": 10.0,
    "fat": 0.2,
    "fiber": 2.8,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 100,
    "category": "vegetables",
    "coreMLLabels": [
      "beetroot",
      "vegetable"
    ]
  },
  {
    "name": "Spinach",
    "aliases": [
      "palak",
      "spinach leaves",
      "baby spinach"
    ],
    "calories": 23,
    "protein": 2.9,
    "carbs": 3.6,
    "fat": 0.4,
    "fiber": 2.2,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 100,
    "category": "vegetables",
    "coreMLLabels": [
      "salad",
      "greens",
      "vegetable",
      "spinach"
    ]
  },
  {
    "name": "Carrot",
    "aliases": [
      "gajar",
      "raw carrot"
    ],
    "calories": 41,
    "protein": 0.9,
    "carbs": 10.0,
    "fat": 0.2,
    "fiber": 2.8,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 80,
    "category": "vegetables",
    "coreMLLabels": [
      "carrot",
      "vegetable"
    ]
  },
  {
    "name": "Cucumber",
    "aliases": [
      "kheera",
      "kakdi",
      "raw cucumber"
    ],
    "calories": 16,
    "protein": 0.7,
    "carbs": 3.6,
    "fat": 0.1,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "vegetables",
    "coreMLLabels": [
      "cucumber",
      "vegetable",
      "salad"
    ]
  },
  {
    "name": "Tomato",
    "aliases": [
      "tamatar",
      "raw tomato",
      "cherry tomato"
    ],
    "calories": 18,
    "protein": 0.9,
    "carbs": 3.9,
    "fat": 0.2,
    "fiber": 1.2,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "vegetables",
    "coreMLLabels": [
      "tomato",
      "vegetable"
    ]
  },
  {
    "name": "Coconut Chutney",
    "aliases": [
      "narial chutney",
      "thengai chutney"
    ],
    "calories": 80,
    "protein": 1.5,
    "carbs": 5.0,
    "fat": 6.0,
    "fiber": 2.0,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 50,
    "category": "condiments",
    "coreMLLabels": [
      "sauce",
      "dip",
      "condiment"
    ]
  },
  {
    "name": "Ghee",
    "aliases": [
      "clarified butter",
      "desi ghee"
    ],
    "calories": 135,
    "protein": 0.0,
    "carbs": 0.0,
    "fat": 15.0,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 15,
    "category": "condiments",
    "coreMLLabels": [
      "butter",
      "oil",
      "fat"
    ]
  },
  {
    "name": "Mustard Oil",
    "aliases": [
      "sarson ka tel",
      "mustard cooking oil"
    ],
    "calories": 124,
    "protein": 0.0,
    "carbs": 0.0,
    "fat": 14.0,
    "fiber": 0.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 14,
    "category": "condiments",
    "coreMLLabels": [
      "oil",
      "cooking oil"
    ]
  },
  {
    "name": "Coconut Water",
    "aliases": [
      "nariyal pani",
      "tender coconut water"
    ],
    "calories": 19,
    "protein": 0.7,
    "carbs": 3.7,
    "fat": 0.2,
    "fiber": 1.1,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 240,
    "category": "beverages",
    "coreMLLabels": [
      "drink",
      "juice",
      "beverage"
    ]
  },
  {
    "name": "Mango Shake",
    "aliases": [
      "mango milkshake",
      "aam shake"
    ],
    "calories": 180,
    "protein": 4.5,
    "carbs": 32.0,
    "fat": 4.0,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 250,
    "category": "beverages",
    "coreMLLabels": [
      "smoothie",
      "milkshake",
      "drink"
    ]
  },
  {
    "name": "Nimbu Pani",
    "aliases": [
      "lemonade",
      "shikanjvi",
      "lemon water",
      "lime soda"
    ],
    "calories": 30,
    "protein": 0.2,
    "carbs": 8.0,
    "fat": 0.0,
    "fiber": 0.1,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 250,
    "category": "beverages",
    "coreMLLabels": [
      "lemonade",
      "drink",
      "juice"
    ]
  },
  {
    "name": "Jeera Rice",
    "aliases": [
      "cumin rice",
      "zeera rice"
    ],
    "calories": 145,
    "protein": 3.0,
    "carbs": 28.5,
    "fat": 3.0,
    "fiber": 0.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "fried rice",
      "pilaf"
    ]
  },
  {
    "name": "Pulao / Pilaf",
    "aliases": [
      "vegetable pulao",
      "veg pulao",
      "dum pulao"
    ],
    "calories": 160,
    "protein": 4.0,
    "carbs": 30.0,
    "fat": 4.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "rice",
      "pilaf",
      "fried rice"
    ]
  },
  {
    "name": "Sattu Drink",
    "aliases": [
      "sattu sharbat",
      "roasted gram drink"
    ],
    "calories": 120,
    "protein": 7.0,
    "carbs": 20.0,
    "fat": 1.5,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "glass",
    "servingGrams": 250,
    "category": "beverages",
    "coreMLLabels": [
      "drink",
      "smoothie",
      "shake"
    ]
  },
  {
    "name": "Besan Cheela",
    "aliases": [
      "gram flour pancake",
      "chilla",
      "besan chilla"
    ],
    "calories": 145,
    "protein": 7.5,
    "carbs": 18.0,
    "fat": 4.5,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 90,
    "category": "grains",
    "coreMLLabels": [
      "pancake",
      "crepe",
      "flatbread"
    ]
  },
  {
    "name": "Daliya",
    "aliases": [
      "broken wheat porridge",
      "dalia",
      "cracked wheat",
      "lapsi"
    ],
    "calories": 130,
    "protein": 4.5,
    "carbs": 25.0,
    "fat": 1.5,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "porridge",
      "oatmeal",
      "cereal"
    ]
  },
  {
    "name": "Sprouts",
    "aliases": [
      "sprouted moong",
      "bean sprouts",
      "mixed sprouts salad"
    ],
    "calories": 62,
    "protein": 4.5,
    "carbs": 9.0,
    "fat": 0.4,
    "fiber": 2.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 100,
    "category": "protein",
    "coreMLLabels": [
      "salad",
      "sprouts",
      "beans"
    ]
  },
  {
    "name": "Tender Coconut",
    "aliases": [
      "green coconut",
      "nariyal"
    ],
    "calories": 45,
    "protein": 1.7,
    "carbs": 9.0,
    "fat": 0.5,
    "fiber": 2.7,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 100,
    "category": "fruits",
    "coreMLLabels": [
      "coconut",
      "fruit"
    ]
  },
  {
    "name": "Watermelon",
    "aliases": [
      "tarbuz",
      "red watermelon"
    ],
    "calories": 30,
    "protein": 0.6,
    "carbs": 7.6,
    "fat": 0.2,
    "fiber": 0.4,
    "defaultServing": 2,
    "servingUnit": "piece",
    "servingGrams": 300,
    "category": "fruits",
    "coreMLLabels": [
      "watermelon",
      "fruit",
      "melon"
    ]
  },
  {
    "name": "Grapes",
    "aliases": [
      "angoor",
      "black grapes",
      "green grapes"
    ],
    "calories": 67,
    "protein": 0.6,
    "carbs": 17.0,
    "fat": 0.4,
    "fiber": 0.9,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 150,
    "category": "fruits",
    "coreMLLabels": [
      "grapes",
      "fruit"
    ]
  },
  {
    "name": "Pomegranate",
    "aliases": [
      "anar",
      "pomegranate seeds"
    ],
    "calories": 83,
    "protein": 1.7,
    "carbs": 19.0,
    "fat": 1.2,
    "fiber": 4.0,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 174,
    "category": "fruits",
    "coreMLLabels": [
      "pomegranate",
      "fruit"
    ]
  },
  {
    "name": "Jackfruit",
    "aliases": [
      "kathal",
      "raw jackfruit",
      "ripe jackfruit"
    ],
    "calories": 95,
    "protein": 1.7,
    "carbs": 23.0,
    "fat": 0.6,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 165,
    "category": "fruits",
    "coreMLLabels": [
      "jackfruit",
      "fruit",
      "tropical fruit"
    ]
  },
  {
    "name": "Palak Soup",
    "aliases": [
      "spinach soup",
      "cream of spinach"
    ],
    "calories": 70,
    "protein": 3.5,
    "carbs": 8.0,
    "fat": 3.0,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 200,
    "category": "vegetables",
    "coreMLLabels": [
      "soup",
      "green soup",
      "cream soup"
    ]
  },
  {
    "name": "Tomato Soup",
    "aliases": [
      "fresh tomato soup",
      "cream of tomato"
    ],
    "calories": 65,
    "protein": 2.0,
    "carbs": 10.0,
    "fat": 2.0,
    "fiber": 1.5,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 200,
    "category": "vegetables",
    "coreMLLabels": [
      "tomato soup",
      "soup",
      "red soup"
    ]
  },
  {
    "name": "Sweet Potato",
    "aliases": [
      "shakarkand",
      "baked sweet potato",
      "boiled sweet potato"
    ],
    "calories": 86,
    "protein": 1.6,
    "carbs": 20.0,
    "fat": 0.1,
    "fiber": 3.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 130,
    "category": "vegetables",
    "coreMLLabels": [
      "sweet potato",
      "potato",
      "vegetable"
    ]
  },
  {
    "name": "Corn on the Cob",
    "aliases": [
      "bhutta",
      "roasted corn",
      "boiled corn",
      "makka"
    ],
    "calories": 123,
    "protein": 4.0,
    "carbs": 27.0,
    "fat": 1.5,
    "fiber": 2.8,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 200,
    "category": "vegetables",
    "coreMLLabels": [
      "corn",
      "corn on the cob",
      "vegetable"
    ]
  },
  {
    "name": "Pineapple",
    "aliases": [
      "ananas",
      "fresh pineapple",
      "pineapple chunks"
    ],
    "calories": 50,
    "protein": 0.5,
    "carbs": 13.0,
    "fat": 0.1,
    "fiber": 1.4,
    "defaultServing": 1,
    "servingUnit": "cup",
    "servingGrams": 165,
    "category": "fruits",
    "coreMLLabels": [
      "pineapple",
      "fruit",
      "tropical fruit"
    ]
  },
  {
    "name": "Sabudana Khichdi",
    "aliases": [
      "sago khichdi",
      "tapioca khichdi"
    ],
    "calories": 245,
    "protein": 4.0,
    "carbs": 42.0,
    "fat": 7.5,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "katori",
    "servingGrams": 150,
    "category": "grains",
    "coreMLLabels": [
      "tapioca",
      "pudding",
      "grain dish"
    ]
  },
  {
    "name": "Methi Paratha",
    "aliases": [
      "fenugreek paratha",
      "methi thepla",
      "thepla"
    ],
    "calories": 195,
    "protein": 5.0,
    "carbs": 28.0,
    "fat": 7.0,
    "fiber": 3.5,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 80,
    "category": "grains",
    "coreMLLabels": [
      "flatbread",
      "bread",
      "pancake"
    ]
  },
  {
    "name": "Rava Dosa",
    "aliases": [
      "sooji dosa",
      "semolina dosa",
      "crispy rava dosa"
    ],
    "calories": 145,
    "protein": 4.0,
    "carbs": 26.0,
    "fat": 3.5,
    "fiber": 1.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 90,
    "category": "grains",
    "coreMLLabels": [
      "crepe",
      "pancake",
      "flatbread"
    ]
  },
  {
    "name": "Chhole Bhature",
    "aliases": [
      "chole bhature",
      "bhatura",
      "fried bread with chickpeas"
    ],
    "calories": 490,
    "protein": 14.0,
    "carbs": 68.0,
    "fat": 19.0,
    "fiber": 7.0,
    "defaultServing": 1,
    "servingUnit": "piece",
    "servingGrams": 250,
    "category": "grains",
    "coreMLLabels": [
      "bread",
      "fried bread",
      "curry",
      "street food"
    ]
  },
  {
    "name": "Paneer Paratha",
    "aliases": [
      "cottage cheese paratha",
      "panir paratha"
    ],
    "calories": 280,
    "protein": 9.5,
    "carbs": 32.0,
    "fat": 13.0,
    "fiber": 2.5,
    "defaultServing": 1,
    "servingUnit": "roti",
    "servingGrams": 120,
    "category": "grains",
    "coreMLLabels": [
      "flatbread",
      "bread",
      "stuffed bread"
    ]
  }
];

export default indianFoods;
