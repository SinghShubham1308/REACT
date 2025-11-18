import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Button } from "../ui/button";
import { Image } from "lucide-react";

declare global {
  interface Window {
    cloudinary: any;
  }
}

interface PersonalData {
  name: string;
  title: string;
  bio: string;
  email: string;
  phone: string;
  country: string;
  state: string;
  github: string;
  linkedin: string;
  profileImage: string;
  backgroundImage: string;
}

interface PersonalInfoEditorProps {
  data: PersonalData;
  onChange: (data: PersonalData) => void;
  contactOnly?: boolean;
}

export function PersonalInfoEditor({
  data,
  onChange,
  contactOnly,
}: PersonalInfoEditorProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  const [selectedCountry, setSelectedCountry] = useState(data?.country ?? "");

  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingStates, setLoadingStates] = useState(false);

  // Fetch countries on mount
  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/positions"
        );
        const result = await res.json();
        const countryList = result.data.map((c: any) => c.name);
        setCountries(countryList);

        // 6. Agar country pehle se selected hai, toh states bhi fetch karein
        if (selectedCountry) {
          fetchStates(selectedCountry);
        }
      } catch (error) {
        console.error("Error fetching countries:", error);
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  // Fetch states when a country is selected
  const fetchStates = async (country: string) => {
    if (!country) return;
    setLoadingStates(true);
    setStates([]); // Puraane states clear karein
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/states",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country }),
        }
      );
      const result = await res.json();
      if (result.data && result.data.states) {
        setStates(result.data.states.map((s: any) => s.name));
      } else {
        setStates([]); // States nahi mile (jaise Antarctica)
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
    } finally {
      setLoadingStates(false);
    }
  };

  const handleChange = (field: keyof PersonalData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  const handleCountryChange = (country: string) => {
    setSelectedCountry(country);
    onChange({ ...data, country, state: "" }); // State ko reset karein
    fetchStates(country);
  };

  const handleStateChange = (state: string) => {
    onChange({ ...data, state });
  };

  const handleImageUpload = (field: "profileImage" | "backgroundImage") => {
    const CLOUD_NAME = "dygflyukw";
    const UPLOAD_PRESET = "portfolio";

    if (!CLOUD_NAME || !UPLOAD_PRESET) {
      alert("Cloudinary credentials missing!");
      return;
    }

    const myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: CLOUD_NAME,
        uploadPreset: UPLOAD_PRESET,
        cropping: field === "profileImage",
        multiple: false,
      },
      (error: any, result: any) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          handleChange(field, result.info.secure_url);
        }
      }
    );

    myWidget.open();
  };

  if (contactOnly) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
          <CardDescription>Update your contact details</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={data.phone || ""}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
          </div>

          {/* Country Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={selectedCountry} onValueChange={handleCountryChange}>
              <SelectTrigger id="country">
                <SelectValue
                  placeholder={
                    loadingCountries ? "Loading countries..." : "Select country"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {countries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* State Dropdown */}
          <div className="space-y-2">
            <Label htmlFor="state">State/Province</Label>
            <Select
              value={data.state || ""}
              onValueChange={handleStateChange}
              disabled={loadingStates || states.length === 0}
            >
              <SelectTrigger id="state">
                <SelectValue
                  placeholder={
                    loadingStates
                      ? "Loading states..."
                      : states.length > 0
                      ? "Select state"
                      : "Select a country first"
                  }
                />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    );
  }

  // --- FULL PROFILE EDITOR (Yeh AdminPanel ke 'Personal' tab mein dikhega) ---
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Images</CardTitle>
          <CardDescription>
            Add your profile and background images
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Profile Picture</Label>
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={data.profileImage}
                alt="Profile Preview"
                className="w-24 h-24 rounded-full object-cover border-2"
                height="40px"
                width="40px"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleImageUpload("profileImage")}
              >
                <Image className="h-4 w-4 mr-2" />
                Upload Profile Picture
              </Button>
            </div>
          </div>

          {/* 3. BACKGROUND IMAGE UI UPDATE KIYA */}
          <div className="space-y-2">
            <Label>Background Banner</Label>
            <div className="flex items-center gap-4">
              <ImageWithFallback
                src={data.backgroundImage}
                alt="Banner Preview"
                className="w-48 h-24 rounded-md object-cover border-2"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => handleImageUpload("backgroundImage")}
              >
                <Image className="h-4 w-4 mr-2" />
                Upload Background Banner
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information </CardTitle>
          <CardDescription>Update your basic details</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={data.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="title">Title (e.g., Backend Developer)</Label>
            <Input
              id="title"
              value={data.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={data.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              rows={4}
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Social Links</CardTitle>
          <CardDescription>Add your social media profiles</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Social Links */}
          <div className="space-y-2">
            <Label htmlFor="github">GitHub URL</Label>
            <Input
              id="github"
              value={data.github}
              onChange={(e) => handleChange("github", e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="linkedin">LinkedIn URL</Label>
            <Input
              id="linkedin"
              value={data.linkedin}
              onChange={(e) => handleChange("linkedin", e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
