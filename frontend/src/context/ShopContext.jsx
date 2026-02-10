import { createContext, useState, useEffect } from "react";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const currency = "kr"

  useEffect(() => {
    const fetchProducts = async () => {
      // Mock data TA BORT SEN
      const mockData = [
        {
            product_id: 1,
            name: "Fender Stratocaster 1700",
            price: 35000,
            description: "En ikonisk gitarr med vintage-karaktär och perfekt sustain.",
            category_name: "Guitars",
            stock: 2,
            image: "stratocaster.jpg"
        },
        {
            product_id: 2,
            name: "Gibson Les Paul Standard",
            price: 24900,
            description: "Klassiskt rock-sound med mahognykropp och humbuckers.",
            category_name: "Guitars",
            stock: 5,
            image: "lespaul.jpg"
        },
        {
            product_id: 3,
            name: "Marshall JCM800 Amp",
            price: 18500,
            description: "Förstärkaren som definierade hårdrockens sound under 80-talet.",
            category_name: "Amplifiers",
            stock: 3,
            image: "marshall_jcm.jpg"
        },
        {
            product_id: 4,
            name: "Boss DS-1 Distortion",
            price: 899,
            description: "En av världens mest sålda effektpedaler.",
            category_name: "Accessories",
            stock: 15,
            image: "boss_ds1.jpg"
        },
        {
            product_id: 5,
            name: "Ibanez RG550",
            price: 11200,
            description: "Snabb hals och perfekt för tekniskt spelande.",
            category_name: "Guitars",
            stock: 0,
            image: "ibanez_rg.jpg"
        },
        {
            product_id: 6,
            name: "Taylor 214ce Acoustic",
            price: 14500,
            description: "Akustisk gitarr med kristallklart ljud och inbyggd elektronik.",
            category_name: "Guitars",
            stock: 4,
            image: "taylor_acoustic.jpg"
        },
        {
            product_id: 7,
            name: "Vox AC30 Combo",
            price: 12900,
            description: "Brittiskt sound med varm rör-karaktär.",
            category_name: "Amplifiers",
            stock: 2,
            image: "vox_ac30.jpg"
        },
        {
            product_id: 8,
            name: "Ernie Ball Slinky Strings",
            price: 99,
            description: "De mest populära gitarrsträngarna för elgitarr.",
            category_name: "Accessories",
            stock: 50,
            image: "strings.jpg"
        },
        {
            product_id: 9,
            name: "Martin D-28",
            price: 32000,
            description: "Standardmodellen för professionella akustiska gitarrister.",
            category_name: "Guitars",
            stock: 1,
            image: "martin_d28.jpg"
        },
        {
            product_id: 10,
            name: "Fender Mustang Micro",
            price: 1295,
            description: "Smidig hörlursförstärkare för tyst övning var som helst.",
            category_name: "Accessories",
            stock: 10,
            image: "mustang_micro.jpg"
        }
      ];

      setProducts(mockData);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const contextValue = { products, loading, currency };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};