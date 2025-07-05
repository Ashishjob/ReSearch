import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tables } from "@/integrations/supabase/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ResearchOpportunity {
  id?: string;
  title: string;
  lab: string;
  professor: string;
  email: string;
  description: string;
  keywords?: string[];
  category?: string;
  duration?: string;
  funding?: string;
  requirements?: string[];
  is_active?: boolean;
  website?: string;
}

interface PublicSubmission {
  id: string;
  title: string;
  lab: string;
  professor: string;
  email: string;
  description: string;
  keywords?: string[];
  category?: string;
  duration?: string;
  funding?: string;
  requirements?: string[];
  is_active?: boolean;
  website?: string;
}

export default function ResearchTab() {
  const [opportunities, setOpportunities] = useState<ResearchOpportunity[]>([]);
  const [submissions, setSubmissions] = useState<PublicSubmission[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partial<ResearchOpportunity> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("research_opportunities").select("*").order("updated_at", { ascending: false });
      if (data) setOpportunities(data);

      const { data: pending } = await supabase
        .from("public_submissions")
        .select("*")
        .eq("type", "research")
        .order("submitted_at", { ascending: false });

      if (pending) {
        setSubmissions(
          pending.map((d: any) => ({
            id: d.id,
            category: d.category ?? "",
            description: d.description ?? "",
            duration: d.duration ?? "",
            email: d.email ?? d.contact_email ?? "",
            lab: d.lab ?? "",
            professor: d.professor ?? "",
            title: d.title ?? "",
            keywords: d.keywords ?? "",
            requirements: d.requirements ?? "",
            website: d.website ?? d.study_link ?? "",
            submitted_at: d.submitted_at,
            type: d.type,
          }))
        );
      }
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!selected?.id) return;
    const { error } = await supabase.from("research_opportunities").update(selected).eq("id", selected.id);
    if (!error) {
      setOpportunities((prev) => prev.map((item) => (item.id === selected.id ? { ...item, ...selected } : item)));
      setIsDialogOpen(false);
    }
  };

  const handleCreate = async () => {
    if (!selected) return;
    const { category = "", description = "", duration = "", email = "", lab = "", professor = "", title = "", ...rest } = selected as Tables<"research_opportunities">;
    const { data, error } = await supabase
      .from("research_opportunities")
      .insert([{ category, description, duration, email, lab, professor, title, is_active: true, ...rest }])
      .select();
    if (data) setOpportunities((prev) => [data[0], ...prev]);
    if (!error) setIsDialogOpen(false);
  };

  const toggleActiveStatus = async (newStatus: boolean) => {
    if (!selected?.id) return;
    const { error } = await supabase.from("research_opportunities").update({ is_active: newStatus }).eq("id", selected.id);
    if (!error) {
      setOpportunities((prev) => prev.map((item) => item.id === selected.id ? { ...item, is_active: newStatus } : item));
      setSelected((prev) => prev ? { ...prev, is_active: newStatus } : prev);
      setIsDialogOpen(false);
    }
  };

  const handleAccept = async (s: any) => {
    const { data: inserted, error: insertError } = await supabase.from("research_opportunities").insert({
      category: s.category,
      description: s.description,
      duration: s.duration,
      email: s.email,
      lab: s.lab,
      professor: s.professor,
      title: s.title,
      keywords: Array.isArray(s.keywords)
      ? s.keywords
      : typeof s.keywords === "string"
        ? s.keywords.split(",").map((k: string) => k.trim())
        : [],
      requirements: Array.isArray(s.requirements)
        ? s.requirements
        : typeof s.requirements === "string"
          ? s.requirements.split(",").map((r: string) => r.trim())
          : [],
      website: s.website,
      is_active: true,
    }).select();

    if (!insertError && inserted?.length) {
      await supabase.from("public_submissions").delete().eq("id", String(s.id));
      setSubmissions((prev) => prev.filter((p) => p.id !== s.id));
      setOpportunities((prev) => [inserted[0], ...prev]);
    }
  };

  const handleReject = async (s: PublicSubmission) => {
    const { error } = await supabase.from("public_submissions").delete().eq("id", String(s.id));
    if (!error) setSubmissions((prev) => prev.filter((p) => p.id !== s.id));
  };

  const filtered = opportunities.filter((op) =>
    op.lab.toLowerCase().includes(search.toLowerCase()) ||
    op.professor.toLowerCase().includes(search.toLowerCase()) ||
    op.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-4">Admin - Research Opportunities</h1>

    {(submissions.length !== 0) && (
      <div>
      <h2 className="text-xl font-bold mb-2">Pending Submissions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {submissions.map((s) => (
          <Card key={s.id} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{s.lab}</div>
              <div className="text-sm">{s.professor}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-2">{s.description}</p>
              <div className="flex justify-end gap-2 mt-2">
                <Button variant="destructive" onClick={() => handleReject(s)}>Reject</Button>
                <Button onClick={() => handleAccept(s)}>Accept</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      </div>
    )}

      <div className="flex justify-between mt-4 mb-4">
        <Input placeholder="Search by lab or professor..." value={search} onChange={(e) => setSearch(e.target.value)} />
        <Button className="ml-4" onClick={() => { setSelected({}); setIsDialogOpen(true); }}>+ Add</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((op) => (
          <Card key={op.id} onClick={() => { setSelected(op); setIsDialogOpen(true); }} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{op.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{op.lab}</div>
              <div className="text-sm">{op.professor}</div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-2">{op.description}</p>
              {!op.is_active && <Badge className="mt-2 bg-red-200 text-gray-600">Inactive</Badge>}
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{selected?.id ? "Edit" : "New"}</DialogTitle></DialogHeader>
          {selected && (
            <div className="grid gap-4 py-4">
              <Label>Title</Label>
              <Input value={selected.title || ""} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
              <Label>Lab</Label>
              <Input value={selected.lab || ""} onChange={(e) => setSelected({ ...selected, lab: e.target.value })} />
              <Label>Professor</Label>
              <Input value={selected.professor || ""} onChange={(e) => setSelected({ ...selected, professor: e.target.value })} />
              <Label>Email</Label>
              <Input value={selected.email || ""} onChange={(e) => setSelected({ ...selected, email: e.target.value })} />
              <Label>Description</Label>
              <Textarea value={selected.description || ""} onChange={(e) => setSelected({ ...selected, description: e.target.value })} />
              <div className="flex justify-end gap-2">
                {"id" in selected && (
                  <Button variant={selected.is_active ? "destructive" : "default"} onClick={() => toggleActiveStatus(!selected.is_active)}>
                    {selected.is_active ? "Deactivate" : "Reactivate"}
                  </Button>
                )}
                <DialogClose asChild><Button variant="secondary">Cancel</Button></DialogClose>
                <Button onClick={"id" in selected ? handleUpdate : handleCreate}>{"id" in selected ? "Save" : "Create"}</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
