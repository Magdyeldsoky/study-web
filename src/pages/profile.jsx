import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/data/fakeAuth";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [province, setProvince] = useState("");
  const [altEmail, setAltEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    setUser(currentUser);
    setPhone(currentUser.phone || "");
    setCountry(currentUser.country || "");
    setProvince(currentUser.province || "");
    setAltEmail(currentUser.altEmail || "");
    setAvatar(currentUser.avatar || null);
  }, []);

  if (!user) return null;

  const getInitials = (firstName, lastName) => {
    return `${firstName?.[0] || ""}${lastName?.[0] || ""}`.toUpperCase();
  };

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = URL.createObjectURL(e.target.files[0]);
      setAvatar(file);
    }
  };

  const handleSave = () => {
    const updatedUser = {
      ...user,
      avatar,
      phone,
      country,
      province,
      altEmail,
    };
    updateUser(updatedUser);
    setUser(updatedUser);
    setEditMode(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col space-y-8">
      <div className="flex flex-col items-center space-y-4">
        <div className="relative w-28 h-28 rounded-full bg-primary flex items-center justify-center text-white text-4xl font-bold overflow-hidden cursor-pointer">
          {avatar ? (
            <img
              src={avatar}
              alt="Avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            getInitials(user.firstName, user.lastName)
          )}

          {editMode && (
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
          )}
        </div>

        <span className="text-xl font-semibold">Hi {user.firstName} 👋</span>

        <button
          onClick={() => setEditMode(!editMode)}
          className="text-sm text-primary hover:underline"
        >
          {editMode ? "Cancel Edit" : "Edit Profile"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            First Name
          </label>
          <input
            type="text"
            value={user.firstName}
            readOnly={!editMode}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, firstName: e.target.value }))
            }
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Last Name
          </label>
          <input
            type="text"
            value={user.lastName}
            readOnly={!editMode}
            onChange={(e) =>
              setUser((prev) => ({ ...prev, lastName: e.target.value }))
            }
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Username
          </label>
          <input
            type="text"
            value={user.username}
            readOnly
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            value={user.email}
            readOnly
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Alternate Email
          </label>
          <input
            type="email"
            value={altEmail}
            onChange={(e) => setAltEmail(e.target.value)}
            readOnly={!editMode}
            placeholder="Enter alternate email"
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            readOnly={!editMode}
            placeholder="Enter your phone number"
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          />
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!editMode}
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          >
            <option value="">Select your country</option>
            <option value="Egypt">Egypt</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
        </div>

        <div>
          <label className="block text-muted-foreground text-sm mb-1">
            Governorate
          </label>
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            disabled={!editMode}
            className="w-full bg-card border border-border rounded-md p-2 text-foreground sm:p-3"
          >
            <option value="">Select your governorate</option>
            <option value="Cairo">Cairo</option>
            <option value="Giza">Giza</option>
            <option value="Alexandria">Alexandria</option>
            <option value="Aswan">Aswan</option>
            <option value="Luxor">Luxor</option>
            <option value="Qalyubia">Qalyubia</option>
            <option value="Suez">Suez</option>
            <option value="Red Sea">Red Sea</option>
          </select>
        </div>
      </div>

      {editMode && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSave}
            className="bg-primary text-primary-foreground p-3 rounded-md hover:opacity-90 transition w-1/2"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
