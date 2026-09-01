import acImage from "@/assets/hero-cooling.jpg";
import washerImage from "@/assets/washer.jpg";
import fridgeImage from "@/assets/fridge.jpg";
import microwaveImage from "@/assets/microwave.jpg";
import purifierImage from "@/assets/purifier.jpg";
import vacuumImage from "@/assets/vacuum.jpg";
import coolerImage from "@/assets/cooler.jpg";

export type Category =
  | "Air Conditioners"
  | "Refrigerators"
  | "Washing Machines"
  | "Microwaves"
  | "Air Coolers"
  | "Fans"
  | "Geysers"
  | "Water Purifiers"
  | "Vacuum Cleaners"
  | "Kitchen Appliances"
  | "Dishwashers"
  | "Small Appliances";

export type Product = {
  id: string;
  brand: string;
  name: string;
  category: Category;
  price: number;
  mrp: number;
  discount: number;
  rating: number;
  ratingCount: number;
  image: string;
  description: string;
  highlights: string[];
  capacity: string;
  energyRating: string;
  warranty: string;
  inStock: boolean;
  deliveryDate: string;
  tags: string[];
};

type ProductSeed = Omit<
  Product,
  "id" | "image" | "description" | "highlights" | "inStock" | "deliveryDate" | "tags"
> & {
  image: string;
  tags: string[];
};

const imageByCategory: Record<Category, string> = {
  "Air Conditioners": acImage,
  Refrigerators: fridgeImage,
  "Washing Machines": washerImage,
  Microwaves: microwaveImage,
  "Air Coolers": coolerImage,
  Fans: coolerImage,
  Geysers: purifierImage,
  "Water Purifiers": purifierImage,
  "Vacuum Cleaners": vacuumImage,
  "Kitchen Appliances": microwaveImage,
  Dishwashers: washerImage,
  "Small Appliances": microwaveImage,
};

const names: Record<Category, string[]> = {
  "Air Conditioners": [
    "1.5 Ton 5-Star Inverter Split AC",
    "1 Ton 3-Star Window AC",
    "1.5 Ton Convertible Inverter AC",
    "2 Ton Smart Inverter Split AC",
  ],
  Refrigerators: [
    "340 L Double Door Frost Free Refrigerator",
    "215 L Single Door Direct Cool Refrigerator",
    "610 L Side-by-Side Smart Refrigerator",
    "185 L 5-Star Inverter Refrigerator",
  ],
  "Washing Machines": [
    "8 Kg Fully Automatic Front Load Washer",
    "7 Kg Fully Automatic Top Load Washer",
    "9 Kg AI EcoBubble Front Load Washer",
    "7.5 Kg Semi Automatic Twin Tub Washer",
  ],
  Microwaves: [
    "28 L Convection Microwave Oven",
    "20 L Solo Microwave Oven",
    "32 L Grill Microwave Oven",
    "25 L Air Fry Convection Microwave",
  ],
  "Air Coolers": [
    "55 L Personal Air Cooler",
    "70 L Desert Air Cooler",
    "40 L Tower Air Cooler",
    "90 L Inverter Desert Cooler",
  ],
  Fans: [
    "1200 mm BLDC Ceiling Fan",
    "400 mm High Speed Pedestal Fan",
    "48 inch Smart Ceiling Fan",
    "300 mm Table Fan with Remote",
  ],
  Geysers: [
    "25 L 5-Star Storage Water Heater",
    "15 L Vertical Storage Geyser",
    "10 L Instant Water Heater",
    "25 L Smart Wi-Fi Geyser",
  ],
  "Water Purifiers": [
    "8 L RO + UV + UF Water Purifier",
    "7 L RO + UV Copper Purifier",
    "10 L RO + UV Mineraliser",
    "6 L UV + UF Wall Mount Purifier",
  ],
  "Vacuum Cleaners": [
    "Cordless Stick Vacuum Cleaner",
    "Wet & Dry Robotic Vacuum",
    "1600 W Bagless Vacuum Cleaner",
    "Handheld Car Vacuum Cleaner",
  ],
  "Kitchen Appliances": [
    "1200 W Mixer Grinder with 3 Jars",
    "25 L OTG with Convection",
    "4 Burner Glass Cooktop",
    "Digital Air Fryer 5.5 L",
  ],
  Dishwashers: [
    "14 Place Settings Fully Integrated Dishwasher",
    "13 Place Settings Freestanding Dishwasher",
    "12 Place Settings Half Load Dishwasher",
    "8 Place Settings Compact Dishwasher",
  ],
  "Small Appliances": [
    "1.8 L Digital Kettle",
    "750 W Pop-up Toaster",
    "Coffee Maker with Milk Frother",
    "4 Slice Sandwich Maker",
  ],
};

const brands = [
  "LG",
  "Samsung",
  "Whirlpool",
  "IFB",
  "Bosch",
  "Haier",
  "Godrej",
  "Voltas",
  "Blue Star",
  "Panasonic",
];
const prices = [29990, 18490, 41990, 12290, 8490, 13990, 22990, 6990, 15990, 9490, 38990, 27490];

const seeds: ProductSeed[] = Object.entries(names).flatMap(
  ([category, categoryNames], categoryIndex) =>
    categoryNames.map((name, index) => {
      const categoryValue = category as Category;
      const price = prices[(categoryIndex * 3 + index) % prices.length] ?? 14990;
      const discount = 12 + ((categoryIndex + index * 5) % 25);
      const brand = brands[(categoryIndex + index * 2) % brands.length] ?? "LG";
      return {
        brand,
        name,
        category: categoryValue,
        price,
        mrp: Math.round(price / (1 - discount / 100)),
        discount,
        rating: Number((4.1 + ((categoryIndex + index) % 8) / 10).toFixed(1)),
        ratingCount: 184 + categoryIndex * 137 + index * 251,
        image: imageByCategory[categoryValue],
        capacity:
          name.match(/\d+(?:\.\d+)?\s?(?:Kg|L|Ton|mm|inch)/)?.[0] ??
          (categoryValue === "Air Conditioners" ? "1.5 Ton" : "Standard"),
        energyRating: `${3 + ((categoryIndex + index) % 3)} Star`,
        warranty:
          categoryValue === "Refrigerators"
            ? "10 year compressor"
            : `${1 + ((categoryIndex + index) % 3)} year warranty`,
        tags: [brand, categoryValue, name],
      };
    }),
);

export const products: Product[] = seeds.map((seed, index) => ({
  ...seed,
  id: `ap-${index + 1}`,
  description: `Thoughtfully designed ${seed.category.toLowerCase()} with dependable performance, easy controls and a finish that fits beautifully into modern Indian homes.`,
  highlights: [
    "Energy-conscious everyday performance",
    "Easy doorstep installation",
    "Designed for Indian homes",
  ],
  inStock: index % 9 !== 0,
  deliveryDate: index % 4 === 0 ? "Tomorrow" : "2–4 days",
}));

export const categories: { name: Category; count: number; image: string; tone: "cool" | "warm" }[] =
  [
    { name: "Air Conditioners", count: 34, image: acImage, tone: "cool" },
    { name: "Refrigerators", count: 28, image: fridgeImage, tone: "cool" },
    { name: "Washing Machines", count: 31, image: washerImage, tone: "cool" },
    { name: "Microwaves", count: 24, image: microwaveImage, tone: "warm" },
    { name: "Air Coolers", count: 18, image: coolerImage, tone: "cool" },
    { name: "Water Purifiers", count: 22, image: purifierImage, tone: "cool" },
    { name: "Vacuum Cleaners", count: 16, image: vacuumImage, tone: "cool" },
    { name: "Kitchen Appliances", count: 39, image: microwaveImage, tone: "warm" },
    { name: "Dishwashers", count: 14, image: washerImage, tone: "cool" },
  ];

export const getProduct = (id: string) => products.find((product) => product.id === id);
export const formatPrice = (price: number) => `₹${price.toLocaleString("en-IN")}`;
