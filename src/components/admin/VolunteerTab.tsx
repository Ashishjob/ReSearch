import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
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

interface VolunteerStudy {
  id?: string;
  title: string;
  department: string;
  description?: string;
  location?: string;
  compensation_type?: string;
  compensation_details?: string;
  eligibility_criteria?: string;
  duration?: string;
  study_link?: string;
  contact_email?: string;
}

interface PublicSubmission extends VolunteerStudy {
  id: string;
  type: string;
  submitted_at?: string;
}

export default function VolunteerTab() {
  const [studies, setStudies] = useState<VolunteerStudy[]>([]);
  const [pendingSubmissions, setPendingSubmissions] = useState<PublicSubmission[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Partial<VolunteerStudy> | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase
        .from("volunteer_studies")
        .select("*")
        .order("updated_at", { ascending: false });
      if (data) setStudies(data);

      const { data: pending } = await supabase
        .from("public_submissions")
        .select("*")
        .eq("type", "volunteer")
        .order("submitted_at", { ascending: false });

      if (pending) setPendingSubmissions(pending as PublicSubmission[]);
    };
    fetchData();
  }, []);

  const handleUpdate = async () => {
    if (!selected?.id) return;
    const { error } = await supabase
      .from("volunteer_studies")
      .update(selected)
      .eq("id", selected.id);
    if (!error) {
      setStudies((prev) =>
        prev.map((item) => (item.id === selected.id ? { ...item, ...selected } : item))
      );
      setIsDialogOpen(false);
    }
  };

  const handleCreate = async () => {
    if (!selected) return;
    const { data, error } = await supabase
      .from("volunteer_studies")
      .insert([selected as VolunteerStudy])
      .select();
    if (data && data[0]) {
      setStudies((prev) => [data[0], ...prev]);
      setIsDialogOpen(false);
    }
    if (error) console.error("Create error:", error);
  };

  const handleAccept = async (s: PublicSubmission) => {
    const insertPayload: VolunteerStudy = {
      title: s.title,
      department: s.department,
      description: s.description,
      location: s.location,
      compensation_type: s.compensation_type,
      compensation_details: s.compensation_details,
      eligibility_criteria: s.eligibility_criteria,
      duration: s.duration,
      study_link: s.study_link,
      contact_email: s.contact_email,
    };

    const { error: insertError, data: inserted } = await supabase
      .from("volunteer_studies")
      .insert([insertPayload])
      .select();

    if (!insertError && inserted?.length) {
      const { error: deleteError } = await supabase
        .from("public_submissions")
        .delete()
        .eq("id", s.id);

      if (!deleteError) {
        setPendingSubmissions((prev) => prev.filter((p) => p.id !== s.id));
        setStudies((prev) => [inserted[0], ...prev]);
      }
    } else {
      console.error("Insert Error:", insertError);
    }
  };

  const handleReject = async (s: PublicSubmission) => {
    const { error } = await supabase.from("public_submissions").delete().eq("id", s.id);
    if (!error) setPendingSubmissions((prev) => prev.filter((p) => p.id !== s.id));
  };

  const filtered = studies.filter((s) =>
    s.title.toLowerCase().includes(search.toLowerCase()) ||
    s.department?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="">
      <h1 className="text-2xl font-semibold mb-4">Admin - Volunteer Studies</h1>

      {pendingSubmissions.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-bold mb-2">Pending Submissions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pendingSubmissions.map((s) => (
              <Card key={s.id} className="cursor-pointer">
                <CardHeader>
                  <CardTitle>{s.title}</CardTitle>
                  <div className="text-sm text-muted-foreground">{s.department}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm line-clamp-2">{s.description}</p>
                  <div className="flex justify-end gap-2 mt-2">
                    <Button variant="destructive" onClick={() => handleReject(s)}>
                      Reject
                    </Button>
                    <Button onClick={() => handleAccept(s)}>Accept</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <Input
          placeholder="Search by title or department..."
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          className="ml-4"
          onClick={() => {
            setSelected({
              title: "",
              department: "",
              description: "",
              location: "",
              compensation_type: "",
              compensation_details: "",
              eligibility_criteria: "",
              duration: "",
              study_link: "",
              contact_email: "",
            });
            setIsDialogOpen(true);
          }}
        >
          + Add New
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <Card
            key={s.id}
            onClick={() => {
              setSelected({ ...s });
              setIsDialogOpen(true);
            }}
            className="cursor-pointer"
          >
            <CardHeader>
              <CardTitle>{s.title}</CardTitle>
              <div className="text-sm text-muted-foreground">{s.department}</div>
              <div className="mt-2 flex flex-wrap gap-1">
                {s.compensation_type && (
                  <Badge className="bg-green-100 text-green-700 text-xs">
                    {s.compensation_type}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm line-clamp-2">{s.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>{selected?.id ? "Edit Study" : "Add New Study"}</DialogTitle>
          </DialogHeader>

          {selected && (
            <div className="grid gap-4 py-4">
              <Label>Study Title</Label>
              <Input value={selected.title || ""} onChange={(e) => setSelected({ ...selected, title: e.target.value })} />
              <Label>Department / Lab</Label>
              <Input value={selected.department || ""} onChange={(e) => setSelected({ ...selected, department: e.target.value })} />
              <Label>Description</Label>
              <Textarea value={selected.description || ""} onChange={(e) => setSelected({ ...selected, description: e.target.value })} />
              <Label>Compensation Type</Label>
              <Input value={selected.compensation_type || ""} onChange={(e) => setSelected({ ...selected, compensation_type: e.target.value })} />
              <Label>Compensation Details</Label>
              <Input value={selected.compensation_details || ""} onChange={(e) => setSelected({ ...selected, compensation_details: e.target.value })} />
              <Label>Location</Label>
              <Input value={selected.location || ""} onChange={(e) => setSelected({ ...selected, location: e.target.value })} />
              <Label>Eligibility Criteria</Label>
              <Textarea value={selected.eligibility_criteria || ""} onChange={(e) => setSelected({ ...selected, eligibility_criteria: e.target.value })} />
              <Label>Duration</Label>
              <Input value={selected.duration || ""} onChange={(e) => setSelected({ ...selected, duration: e.target.value })} />
              <Label>Study Link</Label>
              <Input value={selected.study_link || ""} onChange={(e) => setSelected({ ...selected, study_link: e.target.value })} />
              <Label>Contact Email</Label>
              <Input value={selected.contact_email || ""} onChange={(e) => setSelected({ ...selected, contact_email: e.target.value })} />

              <div className="flex justify-end gap-2">
                <DialogClose asChild>
                  <Button variant="secondary">Cancel</Button>
                </DialogClose>
                <Button onClick={selected.id ? handleUpdate : handleCreate}>
                  {selected.id ? "Save Changes" : "Create"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
