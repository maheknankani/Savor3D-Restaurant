export const FOOD_CATEGORIES = [
  { id: 'all', label: 'All Creations' },
  { id: 'burgers', label: '3D Burgers' },
  { id: 'pizza', label: 'Wood-Fired Pizza' },
  { id: 'pasta', label: 'Artisanal Pasta' },
  { id: 'sandwiches', label: 'Artisan Sandwiches' },
  { id: 'donuts', label: 'Glazed Donuts' },
  { id: 'fries', label: 'Truffle Fries & Sides' },
  { id: 'coffee', label: '24K Coffee & Espresso' },
  { id: 'desserts', label: 'Lava Desserts' },
  { id: 'drinks', label: 'Ember Drinks' },
];

export const FOOD_ITEMS = [
  {
    id: 'savor-prime-burger',
    name: 'Savor Wagyu Prime 3D',
    category: 'burgers',
    modelType: 'burger',
    price: 24.99,
    rating: 4.98,
    reviewsCount: 342,
    calories: 820,
    prepTime: '12 min',
    spiceLevel: 1,
    badge: 'Chef Signature',
    description: 'Triple-seared Japanese A5 Wagyu patty with 24K gold dust, smoked truffle cheddar, & caramelized onion jam.',
    longDescription: 'Engineered for absolute culinary perfection. Our flagship Wagyu Prime burger features hand-selected A5 Kobe beef, aged sharp white cheddar melted over oakwood flames, crispy double-smoked bacon, hand-cut heirloom tomatoes, and crisp butter lettuce served on a toasted artisanal brioche bun brushed with white truffle butter.',
    tags: ['A5 Wagyu', 'Truffle Butter', 'Gold Leaf', 'Bestseller'],
    ingredients: [
      { name: 'Toasted Brioche Bun', desc: 'Artisanal brioche baked daily with French cultured butter and toasted sesame seeds.', color: '#E5A93C' },
      { name: 'A5 Wagyu Beef Patty', desc: 'Flame-seared 100% Japanese Kobe Wagyu seasoned with smoked sea salt.', color: '#5A2D28' },
      { name: 'Aged Cheddar Melt', desc: 'Dripping double-aged Wisconsin white cheddar cheese.', color: '#FFB800' },
      { name: 'Crispy Smoked Bacon', desc: 'Applewood smoked thick-cut bacon strips.', color: '#A03820' },
      { name: 'Butter Lettuce & Heirloom Tomato', desc: 'Hydroponic farm-fresh crisp greens and vine-ripened tomatoes.', color: '#2E8B57' },
    ],
    customAddons: [
      { id: 'extra-patty', name: 'Double Wagyu Patty', price: 8.50 },
      { id: 'extra-cheese', name: 'Truffle Cheese Drizzle', price: 3.00 },
      { id: 'avocado', name: 'Fresh Hass Avocado', price: 2.50 },
    ]
  },
  {
    id: 'artisan-wagyu-club',
    name: 'Artisan Wagyu Club Sandwich',
    category: 'sandwiches',
    modelType: 'sandwich',
    price: 21.50,
    rating: 4.96,
    reviewsCount: 265,
    calories: 740,
    prepTime: '10 min',
    spiceLevel: 0,
    badge: 'New Creation',
    description: 'Toasted sourdough, sliced Wagyu sirloin, melted Swiss, applewood bacon, & house truffle aioli.',
    longDescription: 'Triple-decker artisan sandwich made with wood-fired sourdough toast, slow-roasted Wagyu sirloin steak, melted Swiss gruyère cheese, thick-cut applewood bacon, crisp romaine, and vine-ripened tomatoes drizzled with black truffle mayonnaise.',
    tags: ['Wagyu Sirloin', 'Sourdough', 'Swiss Gruyère', 'Triple Decker'],
    ingredients: [
      { name: 'Wood-Fired Sourdough', desc: 'Toasted sourdough with garlic butter.', color: '#D88A28' },
      { name: 'Roasted Wagyu Sirloin', desc: 'Thinly sliced medium-rare Kobe sirloin.', color: '#D98880' },
      { name: 'Swiss Gruyère Melt', desc: 'Aged melted Swiss cheese.', color: '#FFD000' },
      { name: 'Applewood Bacon & Greens', desc: 'Crispy bacon and crisp romaine.', color: '#2E8B57' }
    ],
    customAddons: [
      { id: 'extra-sirloin', name: 'Extra Wagyu Sirloin Portion', price: 6.00 },
      { id: 'truffle-mayo', name: 'Extra Truffle Aioli Dip', price: 2.00 }
    ]
  },
  {
    id: '24k-berry-glazed-donut',
    name: '24K Wild Berry Glazed Donut',
    category: 'donuts',
    modelType: 'donut',
    price: 9.50,
    rating: 4.99,
    reviewsCount: 380,
    calories: 380,
    prepTime: '5 min',
    spiceLevel: 0,
    badge: 'Chef Favorite',
    description: 'Brioche donut ring dipped in wild raspberry glaze, rainbow sugar crystals, & 24K gold sparkles.',
    longDescription: 'Hand-crafted brioche donut proofed for 18 hours, fried to a light airy fluff, dipped in organic wild raspberry glaze, sprinkled with rainbow sugar crystals, and finished with 24K edible gold dust.',
    tags: ['Wild Raspberry', 'Brioche Donut', '24K Gold', 'Fresh Baked'],
    ingredients: [
      { name: '18h Proofed Brioche Ring', desc: 'Golden fluffy brioche donut base.', color: '#E5A758' },
      { name: 'Wild Raspberry Glaze', desc: 'Organic raspberry puree glaze.', color: '#FF4D8D' },
      { name: 'Rainbow Crystals & Gold Dust', desc: 'Artisanal sprinkles with 24K gold.', color: '#FFC72C' }
    ],
    customAddons: [
      { id: 'extra-glaze', name: 'Extra Raspberry Glaze Drizzle', price: 1.50 },
      { id: 'gelato-scoop', name: 'Side Scoop Vanilla Gelato', price: 3.00 }
    ]
  },
  {
    id: 'truffle-parmesan-fries',
    name: '24K Truffle Parmesan Fries',
    category: 'fries',
    modelType: 'fries',
    price: 14.50,
    rating: 4.96,
    reviewsCount: 278,
    calories: 520,
    prepTime: '8 min',
    spiceLevel: 0,
    badge: 'Must Have Side',
    description: 'Triple-cooked Idaho potatoes tossed in white truffle oil, 24-month Parmigiano-Reggiano, & gold salt.',
    longDescription: 'The ultimate luxury side dish. Hand-cut organic Idaho Russet potatoes double-fried to golden perfection, tossed with cold-pressed Italian white truffle oil, generous shavings of 24-month Parmigiano-Reggiano cheese, fresh rosemary sprigs, and edible 24K gold sea salt.',
    tags: ['White Truffle', 'Hand-Cut', '24K Gold Salt', 'Crispy'],
    ingredients: [
      { name: 'Triple-Cooked Idaho Potatoes', desc: 'Soaked and double-fried crispy potato batons.', color: '#F5B041' },
      { name: 'White Truffle Oil', desc: 'Imported Italian white truffle oil infusion.', color: '#FFF8E7' },
      { name: 'Parmigiano-Reggiano', desc: 'Aged 24 months and grated fresh.', color: '#FFFFFF' },
      { name: 'Fresh Rosemary & Gold Salt', desc: 'Aromatic herbs with edible 24K gold flakes.', color: '#27AE60' }
    ],
    customAddons: [
      { id: 'truffle-aioli', name: 'House Truffle Garlic Aioli Dip', price: 2.50 },
      { id: 'melted-cheese', name: 'Melted Smoked Gouda Sauce', price: 3.00 }
    ]
  },
  {
    id: 'gold-latte-art-coffee',
    name: '24K Gold Velvet Latte',
    category: 'coffee',
    modelType: 'coffee',
    price: 11.50,
    rating: 4.97,
    reviewsCount: 310,
    calories: 210,
    prepTime: '5 min',
    spiceLevel: 0,
    badge: 'Artisanal Brew',
    description: 'Double shot Ethiopian Yirgacheffe espresso, steamed oat milk cloud, & 24K gold leaf rosette art.',
    longDescription: 'A heavenly coffee experience. Freshly pulled double ristretto shot from single-origin Ethiopian Yirgacheffe coffee beans, combined with micro-foamed oat milk, Madagascar vanilla bean syrup, and crowned with hand-drawn 24K edible gold leaf rosette latte art.',
    tags: ['Ethiopian Single Origin', 'Oat Milk Cloud', '24K Gold Art', 'Organic'],
    ingredients: [
      { name: 'Double Ristretto Espresso', desc: 'Single-origin Ethiopian Yirgacheffe beans with notes of jasmine and blueberry.', color: '#2C1609' },
      { name: 'Micro-Foamed Oat Milk', desc: 'Silky smooth barista oat milk steamed to 150°F.', color: '#FFF8E7' },
      { name: '24K Gold Leaf Rosette', desc: 'Hand-crafted gold leaf art embellishment.', color: '#D4AC0D' }
    ],
    customAddons: [
      { id: 'extra-shot', name: 'Extra Ristretto Espresso Shot', price: 2.00 },
      { id: 'vanilla-syrup', name: 'Bourbon Vanilla Bean Syrup', price: 1.50 }
    ]
  },
  {
    id: 'spicy-lobster-tagliatelle',
    name: 'Spicy Maine Lobster Tagliatelle',
    category: 'pasta',
    modelType: 'pasta',
    price: 32.00,
    rating: 4.98,
    reviewsCount: 185,
    calories: 810,
    prepTime: '16 min',
    spiceLevel: 2,
    badge: 'Seafood Special',
    description: 'Hand-rolled egg ribbons, butter-poached Maine lobster tail, Calabrian chili, & saffron bisque.',
    longDescription: 'Freshly rolled egg tagliatelle tossed with butter-poached Maine lobster tail meat, blistered cherry tomatoes, Calabrian chili paste, and a rich saffron cognac reduction finished with fresh parsley.',
    tags: ['Maine Lobster', 'Calabrian Chili', 'Saffron Bisque', 'Handmade'],
    ingredients: [
      { name: 'Fresh Tagliatelle', desc: 'Hand-spun egg ribbons.', color: '#F6D55C' },
      { name: 'Maine Lobster Tail', desc: 'Butter-poached fresh lobster meat.', color: '#E63946' },
      { name: 'Saffron Calabrian Reduction', desc: 'Spicy aromatic saffron cream.', color: '#FF7700' }
    ],
    customAddons: [
      { id: 'extra-lobster', name: 'Extra Lobster Tail Portion', price: 12.00 }
    ]
  },
  {
    id: 'truffle-neapolitan-pizza',
    name: 'Truffle & Pepperoni Wheel',
    category: 'pizza',
    modelType: 'pizza',
    price: 28.50,
    rating: 4.95,
    reviewsCount: 289,
    calories: 1150,
    prepTime: '15 min',
    spiceLevel: 2,
    badge: 'Wood-Fired',
    description: '72-hour fermented sourdough crust, buffalo mozzarella, artisan pepperoni cups & fresh basil leaves.',
    longDescription: 'Baked in our 900°F Naples volcanic stone oven. Features hand-stretched organic dough fermented for 72 hours, rich San Marzano tomato sauce, double-cream buffalo mozzarella, crispy cupping pepperoni, and aromatic sweet Italian basil drizzled with spicy hot honey.',
    tags: ['San Marzano', '72h Sourdough', 'Hot Honey', 'Artisan'],
    ingredients: [
      { name: '72h Fermented Crust', desc: 'Puffed leopard-spotted crust made from Italian Tipo 00 flour.', color: '#D49B4B' },
      { name: 'San Marzano Sauce', desc: 'Crushed volcanic San Marzano tomatoes and extra virgin olive oil.', color: '#C82323' },
      { name: 'Buffalo Mozzarella', desc: 'Fresh creamy Mozzarella di Bufala melted to perfection.', color: '#FAFAFA' },
      { name: 'Cupping Pepperoni', desc: 'Crispy spicy pepperoni cups holding savory natural oils.', color: '#8B1E0F' },
      { name: 'Sweet Basil & Hot Honey', desc: 'Organic basil leaves infused with hot chili honey drip.', color: '#38A169' }
    ],
    customAddons: [
      { id: 'stuffed-crust', name: 'Cheesy Garlic Stuffed Crust', price: 4.00 },
      { id: 'hot-honey', name: 'Extra Hot Honey Drizzle', price: 1.50 },
      { id: 'burrata', name: 'Fresh Burrata Crown', price: 5.00 }
    ]
  },
  {
    id: 'gold-chocolate-lava-dome',
    name: '24K Gold Chocolate Lava Sphere',
    category: 'desserts',
    modelType: 'dessert',
    price: 19.50,
    rating: 4.99,
    reviewsCount: 410,
    calories: 640,
    prepTime: '10 min',
    spiceLevel: 0,
    badge: 'Showstopper',
    description: 'Valrhona milk chocolate dome filled with molten hazelnut praline, gold dust, & bourbon vanilla bean gelato.',
    longDescription: 'The ultimate dessert spectacle. A hand-molded Valrhona milk chocolate shell dusted with edible 24K gold leaf. Melted at your table with warm salted caramel ganache to reveal a core of molten chocolate lava and artisanal Madagascar vanilla bean gelato.',
    tags: ['Valrhona Milk Chocolate', 'Molten Core', '24K Gold', 'Vanilla Gelato'],
    ingredients: [
      { name: 'Valrhona Chocolate Dome', desc: 'Rich warm milk chocolate sphere.', color: '#7A422B' },
      { name: 'Molten Hazelnut Core', desc: 'Warm gooey hazelnut chocolate ganache.', color: '#5C301E' },
      { name: 'Bourbon Vanilla Gelato', desc: 'Velvety ice cream infused with real Madagascar vanilla pod.', color: '#FFFEEA' },
      { name: 'Fresh Raspberries & Gold Dust', desc: 'Tart wild berries dusted with 24K edible gold flakes.', color: '#E63946' }
    ],
    customAddons: [
      { id: 'extra-gelato', name: 'Extra Scoop Vanilla Gelato', price: 3.50 },
      { id: 'espresso-shot', name: 'Double Espresso Drizzle', price: 2.50 }
    ]
  },
  {
    id: 'galaxy-ember-cocktail',
    name: 'Galaxy Ember Elixir',
    category: 'drinks',
    modelType: 'drink',
    price: 16.00,
    rating: 4.89,
    reviewsCount: 178,
    calories: 190,
    prepTime: '5 min',
    spiceLevel: 0,
    badge: 'Signature Elixir',
    description: 'Infused butterfly pea botanical spirit, smoked rosemary, citrus cloud, & crystal ice spheres.',
    longDescription: 'A hypnotic sensory beverage. Crafted with indigo butterfly pea flower gin, tart passionfruit liqueur, fresh yuzu juice, and dry-ice smoked rosemary. Color shifts from deep violet to warm ember orange as citrus syrup is poured.',
    tags: ['Color-Changing', 'Smoked Rosemary', 'Botanical', 'Craft Cocktail'],
    ingredients: [
      { name: 'Indigo Botanical Spirit', desc: 'Natural butterfly pea flower infused gin.', color: '#4A00E0' },
      { name: 'Citrus Yuzu Cordial', desc: 'Tart Japanese yuzu and passionfruit syrup.', color: '#FFD700' },
      { name: 'Crystal Ice Spheres', desc: 'Slow-melting hand-carved directional ice.', color: '#E0F7FA' },
      { name: 'Smoked Rosemary Sprig', desc: 'Torched aromatic rosemary sprig emitting herbal mist.', color: '#2D5A27' }
    ],
    customAddons: [
      { id: 'dry-ice-effect', name: 'Tabletop Dry Ice Smoke Effect', price: 2.00 },
      { id: 'extra-shot', name: 'Extra Botanical Spirit Shot', price: 4.50 }
    ]
  }
];

export const PROCESS_STEPS = [
  {
    number: '01',
    title: '100% Organic Sourcing',
    subtitle: 'From Michelin-Grade Farms',
    desc: 'We source Japanese A5 Kobe beef, volcanic San Marzano tomatoes, and Umbrian truffles directly from certified organic family farms.',
    icon: 'Leaf'
  },
  {
    number: '02',
    title: '3D Flavor Mapping',
    subtitle: 'Precision Molecular Balance',
    desc: 'Our culinary R&D team uses 3D texture and temperature mapping to balance fat ratios, acidity, and umami depth for maximum sensation.',
    icon: 'Boxes'
  },
  {
    number: '03',
    title: 'Wood-Fired & Flame Sear',
    subtitle: '900°F Artisanal Cooking',
    desc: 'Every pizza is stone-baked in 900°F Naples volcanic ovens, while burgers undergo oakwood flame-searing to lock in rich savory juices.',
    icon: 'Flame'
  },
  {
    number: '04',
    title: 'Thermal-Preserved Delivery',
    subtitle: 'Oven-Fresh at Your Door',
    desc: 'Specialized smart thermal containers maintain precise 165°F humidity and heat so your food arrives in pristine dining-room quality.',
    icon: 'Truck'
  }
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Elena Rostova',
    role: 'Food & Wine Critic',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'Savor 3D isn’t just a restaurant; it’s an immersive digital and culinary masterpiece. The Wagyu Prime burger literally melts in your mouth, and inspecting the 3D model beforehand was so futuristic!',
    dish: 'Savor Wagyu Prime 3D'
  },
  {
    id: 2,
    name: 'Marcus Vance',
    role: 'Tech Executive & Foodie',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The web interactive experience blew me away. Being able to rotate dishes in 3D and see individual floating ingredients before ordering is brilliant. The Truffle Pizza is world-class.',
    dish: 'Truffle & Pepperoni Wheel'
  },
  {
    id: 3,
    name: 'Sophia Chen',
    role: 'Pastry Chef & Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=200',
    rating: 5,
    comment: 'The 24K Gold Lava Dome is the single best dessert experience in the city. The chocolate sphere melting in front of your eyes live is unbelievable!',
    dish: '24K Gold Chocolate Lava Sphere'
  }
];
