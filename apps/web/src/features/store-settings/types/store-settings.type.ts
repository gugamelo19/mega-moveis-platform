export type StoreSettings = {
  id: string;
  storeName: string;
  whatsappNumber: string;
  contactEmail: string | null;
  phoneNumber: string | null;
  addressLine: string | null;
  city: string | null;
  state: string | null;
  zipCode: string | null;
  aboutTitle: string | null;
  aboutText: string | null;
  facebookUrl: string | null;
  instagramUrl: string | null;
  logoUrl: string | null;
  createdAt: string;
  updatedAt: string;
};

export const defaultStoreSettings: StoreSettings = {
  id: "default-store",
  storeName: "Mega Moveis",
  whatsappNumber: "5591993337027",
  contactEmail: "megamoveisanapu@hotmail.com",
  phoneNumber: "(91) 99333-7027",
  addressLine: "Av. Getulio Vargas, 63, Novo Progresso",
  city: "Serrinha",
  state: "BA",
  zipCode: "48700-000",
  aboutTitle: "Mega Moveis e Eletro",
  aboutText:
    "Ha mais de 10 anos transformando casas em lares com moveis, eletros e atendimento proximo.",
  facebookUrl: null,
  instagramUrl: "https://www.instagram.com/megamoveisserrinha.ba/",
  logoUrl: null,
  createdAt: "",
  updatedAt: "",
};
