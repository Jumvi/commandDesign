import { create } from "zustand";

const useOrderStore = create((set) => ({
  commande: "",
  modeCommande: "",

  setCommande: (commande) => set({ commande }),
  setModeCommande: (modeCommande) => set({ modeCommande }),
}));

export default useOrderStore;
