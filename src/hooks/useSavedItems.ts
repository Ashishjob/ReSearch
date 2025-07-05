import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

type ItemType = "research" | "volunteer";

export function useSavedItems(type: ItemType) {
  const { user } = useAuth();
  const [savedIds, setSavedIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const fetchSaved = async () => {
      const { data, error } = await supabase
        .from("user_saved_items")
        .select("item_id")
        .eq("user_id", user.id)
        .eq("item_type", type);

      if (!error && data) {
        setSavedIds(data.map((row) => row.item_id));
      }
    };

    fetchSaved();
  }, [user, type]);

  const toggleSave = async (id: string) => {
    if (!user) return;

    const isCurrentlySaved = savedIds.includes(id);

    if (isCurrentlySaved) {
      await supabase
        .from("user_saved_items")
        .delete()
        .eq("user_id", user.id)
        .eq("item_id", id)
        .eq("item_type", type);
    } else {
      await supabase.from("user_saved_items").insert([
        {
          user_id: user.id,
          item_id: id,
          item_type: type,
        },
      ]);
    }

    setSavedIds((prev) =>
      isCurrentlySaved ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const isSaved = (id: string) => savedIds.includes(id);

  return { savedIds, toggleSave, isSaved };
}
