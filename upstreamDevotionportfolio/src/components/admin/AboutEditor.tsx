import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";

interface AboutEditorProps {
  data: any;
  onChange: (data: any) => void;
}

export function AboutEditor({ data, onChange }: AboutEditorProps) {
  const handleDescriptionChange = (value: string) => {
    onChange({ ...data, description: value });
  };

  const handleFeatureChange = (index: number, field: string, value: string) => {
    const newFeatures = [...data.features];
    newFeatures[index] = { ...newFeatures[index], [field]: value };
    onChange({ ...data, features: newFeatures });
  };

  const addFeature = () => {
    onChange({
      ...data,
      features: [...data.features, { title: "", description: "" }],
    });
  };

  const removeFeature = (index: number) => {
    const newFeatures = data.features.filter((_: any, i: number) => i !== index);
    onChange({ ...data, features: newFeatures });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>About Section</CardTitle>
          <CardDescription>Update your about description</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Features</CardTitle>
          <CardDescription>Highlight your key strengths</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {data.features.map((feature: any, index: number) => (
            <div key={index} className="p-4 border rounded-lg space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Feature {index + 1}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={feature.title}
                  onChange={(e) => handleFeatureChange(index, "title", e.target.value)}
                  placeholder="Feature title"
                />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea
                  value={feature.description}
                  onChange={(e) => handleFeatureChange(index, "description", e.target.value)}
                  placeholder="Feature description"
                  rows={2}
                />
              </div>
            </div>
          ))}
          <Button onClick={addFeature} variant="outline" className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Feature
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
