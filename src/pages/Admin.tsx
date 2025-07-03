import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [opportunities, setOpportunities] = useState<Tables<"research_opportunities">[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partial<Tables<"research_opportunities">> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const checkAdmin = async () => {
    const { data: { user }, error } = await supabase.auth.getUser();

    if (error || !user || user.email !== "ashishjob104@gmail.com") {
      alert("You are not authorized to view this page.");
      navigate("/auth");
      return;
    }

    const { data } = await supabase
      .from("research_opportunities")
      .select("*")
      .order("updated_at", { ascending: false });

    if (data) setOpportunities(data);
    setLoading(false);
  };

  checkAdmin();
}, []);


  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      console.log("Current session:", data);
    });
    const fetchData = async () => {
      const { data } = await supabase
        .from("research_opportunities")
        .select("*")
        .order("updated_at", { ascending: false });
      if (data) setOpportunities(data);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!selected || !selected.id) return;
    const { error } = await supabase
      .from("research_opportunities")
      .update(selected)
      .eq("id", selected.id);
    if (!error) {
      setOpportunities((prev) =>
        prev.map((item) => (item.id === selected.id ? { ...item, ...selected } : item))
      );
      setIsDialogOpen(false);
    }
  };

  const handleCreate = async () => {
    if (!selected) return;

    const { data, error } = await supabase
      .from("research_opportunities")
      .insert([{
        title: selected.title || "",
        lab: selected.lab || "",
        professor: selected.professor || "",
        email: selected.email || "",
        description: selected.description || "",
        keywords: selected.keywords || [],
        category: selected.category || "general",
        duration: selected.duration || "",
        funding: selected.funding || "",
        requirements: selected.requirements || [],
        is_active: true,
        website: selected.website || "",
      }])
      .select();

    if (data && data[0]) {
      setOpportunities((prev) => [data[0], ...prev]);
      setIsDialogOpen(false);
    }

    if (error) {
      console.error("Create error:", error);
    }
  };

  const toggleActiveStatus = async (newStatus: boolean) => {
  if (!selected?.id) return;

  const { error } = await supabase
    .from("research_opportunities")
    .update({ is_active: newStatus })
    .eq("id", selected.id);

  if (error) {
    console.error("Supabase update error:", error);
    alert("Something went wrong updating the status.");
    return;
  }

  setOpportunities((prev) =>
    prev.map((item) =>
      item.id === selected.id ? { ...item, is_active: newStatus } : item
    )
  );
  setSelected((prev) =>
    prev ? { ...prev, is_active: newStatus } : prev
  );
  setIsDialogOpen(false);
};

  const filtered = opportunities.filter(
    (op) =>
      op.lab.toLowerCase().includes(search.toLowerCase()) ||
      op.professor.toLowerCase().includes(search.toLowerCase()) ||
      op.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">Admin - Research Opportunities</h1>
      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search by lab, professor, or title..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="ml-4"
          onClick={() => {
            setSelected({
              title: "",
              lab: "",
              professor: "",
              email: "",
              description: "",
              keywords: [],
              category: "general",
              duration: "",
              funding: "",
              requirements: [],
              is_active: true,
              website: "",
            });
            setIsDialogOpen(true);
          }}
        >
          + Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((op) => (
          <Card
            key={op.id}
            onClick={() => {
              setSelected({ ...op });
              setIsDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            <CardHeader>
              <CardTitle>{op.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{op.lab}</div>
              <div className="text-sm">{op.professor}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {op.keywords?.slice(0, 3).map((tag, i) => (
                  <Badge key={i} className="bg-blue-100 text-blue-700 text-xs">
                    {tag}
                  </Badge>
                ))}
                {op.keywords && op.keywords.length > 3 && (
                  <Badge className="text-xs">+{op.keywords.length - 3} more</Badge>
                )}
              </div>
              {!op.is_active && (
                <Badge className="mt-2 bg-red-200 text-gray-600">Inactive</Badge>
              )}
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-2">{op.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selected?.id ? "Edit Opportunity" : "Add New Opportunity"}</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="grid gap-4 py-4">
              <Label>Research Opportunity Title</Label>
              <Input value={selected.title || ""} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
              <Label>Lab or Research Program Name</Label>
              <Input value={selected.lab || ""} onChange={(e) => setSelected({ ...selected, lab: e.target.value })} />
              <Label>Professor</Label>
              <Input value={selected.professor || ""} onChange={(e) => setSelected({ ...selected, professor: e.target.value })} />
              <Label>Email</Label>
              <Input value={selected.email || ""} onChange={(e) => setSelected({ ...selected, email: e.target.value })} />
              <Label>Description</Label>
              <Textarea value={selected.description || ""} onChange={(e) => setSelected({ ...selected, description: e.target.value })} />
              <Label>Website</Label>
              <Input value={selected.website || ""} onChange={(e) => setSelected({ ...selected, website: e.target.value })} />
              <Label>Keywords (comma separated)</Label>
              <Input
                value={selected.keywords?.join(", ") || ""}
                onChange={(e) =>
                  setSelected({
                    ...selected,
                    keywords: e.target.value
                      .split(",")
                      .map((tag) => tag.trim())
                      .filter(Boolean),
                  })
                }
              />

              <div className="flex justify-end gap-2">
                {"id" in selected && (
                  <Button
                    variant={selected.is_active ? "destructive" : "default"}
                    className={selected.is_active ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700 text-white"}
                    onClick={() => toggleActiveStatus(!selected.is_active)}
                  >
                    {selected.is_active ? "Deactivate" : "Reactivate"}
                  </Button>
                )}

                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>

                <Button onClick={"id" in selected ? handleUpdate : handleCreate}>
                  {"id" in selected ? "Save Changes" : "Create"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
