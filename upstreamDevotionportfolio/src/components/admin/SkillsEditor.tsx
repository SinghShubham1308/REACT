import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Plus, Trash2 } from "lucide-react";
import { Slider } from "../ui/slider";

interface SkillsEditorProps {
  data: any[];
  onChange: (data: any[]) => void;
}

export function SkillsEditor({ data, onChange }: SkillsEditorProps) {
  const handleCategoryChange = (categoryIndex: number, value: string) => {
    const newData = [...data];
    newData[categoryIndex] = { ...newData[categoryIndex], category: value };
    onChange(newData);
  };

  const handleSkillChange = (categoryIndex: number, skillIndex: number, field: string, value: any) => {
    const newData = [...data];
    const newSkills = [...newData[categoryIndex].skills];
    newSkills[skillIndex] = { ...newSkills[skillIndex], [field]: value };
    newData[categoryIndex] = { ...newData[categoryIndex], skills: newSkills };
    onChange(newData);
  };

  const addCategory = () => {
    onChange([...data, { category: "New Category", skills: [] }]);
  };

  const removeCategory = (categoryIndex: number) => {
    onChange(data.filter((_, i) => i !== categoryIndex));
  };

  const addSkill = (categoryIndex: number) => {
    const newData = [...data];
    newData[categoryIndex].skills.push({ name: "", level: 50 });
    onChange(newData);
  };

  const removeSkill = (categoryIndex: number, skillIndex: number) => {
    const newData = [...data];
    newData[categoryIndex].skills = newData[categoryIndex].skills.filter(
      (_: any, i: number) => i !== skillIndex
    );
    onChange(newData);
  };

  return (
    <div className="space-y-6">
      {data.map((category, categoryIndex) => (
        <Card key={categoryIndex}>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="space-y-1 grow mr-4">
                <Input
                  value={category.category}
                  onChange={(e) => handleCategoryChange(categoryIndex, e.target.value)}
                  className="text-lg font-semibold"
                />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeCategory(categoryIndex)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {category.skills.map((skill: any, skillIndex: number) => (
              <div key={skillIndex} className="p-4 border rounded-lg space-y-3">
                <div className="flex items-center justify-between gap-4">
                  <div className="grow space-y-2">
                    <Label>Skill Name</Label>
                    <Input
                      value={skill.name}
                      onChange={(e) =>
                        handleSkillChange(categoryIndex, skillIndex, "name", e.target.value)
                      }
                      placeholder="Skill name"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSkill(categoryIndex, skillIndex)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Proficiency Level</Label>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Slider
                    value={[skill.level]}
                    onValueChange={(values) =>
                      handleSkillChange(categoryIndex, skillIndex, "level", values[0])
                    }
                    max={100}
                    step={5}
                  />
                </div>
              </div>
            ))}
            <Button
              onClick={() => addSkill(categoryIndex)}
              variant="outline"
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Skill
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addCategory} variant="outline" className="w-full" size="lg">
        <Plus className="h-4 w-4 mr-2" />
        Add Category
      </Button>
    </div>
  );
}
