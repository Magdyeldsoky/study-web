import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/data/fakeAuth";
import { FaCamera, FaUserEdit, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
        const updatedUser = { ...user, avatar, phone, country, province, altEmail };
        updateUser(updatedUser);
        setUser(updatedUser);
        setEditMode(false);
    };

    return (
        <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">

            {/* Header Section / Profile Hero */}
            <div className="relative flex flex-col items-center pt-6">
                <div className="group relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-gradient-to-br from-primary to-primary/60 p-[3px] shadow-2xl transition-transform duration-500 group-hover:scale-105">
                        <div className="w-full h-full rounded-[2.4rem] bg-card flex items-center justify-center overflow-hidden">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-4xl font-black text-primary/80">
                    {getInitials(user.firstName, user.lastName)}
                </span>
                            )}
                        </div>
                    </div>

                    {editMode && (
                        <label className="absolute bottom-1 right-1 bg-foreground text-background p-2.5 rounded-2xl cursor-pointer shadow-lg hover:scale-110 transition-all border-4 border-background">
                            <FaCamera className="text-sm" />
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </label>
                    )}
                </div>

                <div className="text-center mt-6">
                    <h1 className="text-3xl font-black tracking-tight">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-muted-foreground font-medium text-sm mt-1">@{user.username}</p>
                </div>

                <Button
                    variant={editMode ? "outline" : "secondary"}
                    onClick={() => setEditMode(!editMode)}
                    className="mt-6 rounded-full px-6 font-bold transition-all"
                >
                    {editMode ? <><FaTimesCircle className="mr-2" /> Cancel</> : <><FaUserEdit className="mr-2" /> Edit Profile</>}
                </Button>
            </div>

            {/* Details Grid */}
            <Card className="p-8 md:p-10 rounded-[2.5rem] bg-card/40 backdrop-blur-md border-border/40 shadow-none">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                    {[
                        { label: "First Name", value: user.firstName, key: "firstName", readOnly: false },
                        { label: "Last Name", value: user.lastName, key: "lastName", readOnly: false },
                        { label: "Username", value: user.username, key: "username", readOnly: true },
                        { label: "Email Address", value: user.email, key: "email", readOnly: true },
                        { label: "Alternate Email", value: altEmail, key: "altEmail", readOnly: false, type: "email", setter: setAltEmail },
                        { label: "Phone Number", value: phone, key: "phone", readOnly: false, type: "tel", setter: setPhone },
                    ].map((field) => (
                        <div key={field.key} className="flex flex-col gap-2">
                            <label className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70 ml-1">
                                {field.label}
                            </label>
                            <input
                                type={field.type || "text"}
                                value={field.value}
                                readOnly={field.readOnly || !editMode}
                                onChange={(e) => {
                                    if (field.setter) field.setter(e.target.value);
                                    else setUser(prev => ({ ...prev, [field.key]: e.target.value }));
                                }}
                                className={`w-full bg-muted/20 border border-border/40 rounded-2xl px-4 py-3 text-sm font-medium transition-all focus:ring-2 focus:ring-primary/20 outline-none
                  ${field.readOnly ? "opacity-60 cursor-not-allowed bg-transparent" : "hover:bg-muted/30 focus:bg-card"}
                  ${editMode && !field.readOnly ? "border-primary/30" : ""}`}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    {/* Country Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70 ml-1">Country</label>
                        <select
                            value={country}
                            disabled={!editMode}
                            onChange={(e) => setCountry(e.target.value)}
                            className="w-full bg-muted/20 border border-border/40 rounded-2xl px-4 py-3 text-sm font-medium transition-all outline-none disabled:opacity-60 appearance-none cursor-pointer"
                        >
                            <option value="">Select Country</option>
                            <option value="Egypt">Egypt</option>
                            <option value="USA">USA</option>
                            <option value="UK">UK</option>
                        </select>
                    </div>

                    {/* Governorate Selection */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[10px] uppercase tracking-[0.2em] font-black text-muted-foreground/70 ml-1">Governorate</label>
                        <select
                            value={province}
                            disabled={!editMode}
                            onChange={(e) => setProvince(e.target.value)}
                            className="w-full bg-muted/20 border border-border/40 rounded-2xl px-4 py-3 text-sm font-medium transition-all outline-none disabled:opacity-60 appearance-none cursor-pointer"
                        >
                            <option value="">Select Governorate</option>
                            <option value="Cairo">Cairo</option>
                            <option value="Giza">Giza</option>
                            <option value="Alexandria">Alexandria</option>
                        </select>
                    </div>
                </div>

                {/* Save Button */}
                {editMode && (
                    <div className="mt-12 flex justify-center">
                        <Button
                            onClick={handleSave}
                            className="w-full md:w-1/2 h-12 rounded-2xl font-bold bg-primary shadow-lg shadow-primary/20 hover:scale-[1.02] transition-transform"
                        >
                            <FaCheckCircle className="mr-2" /> Save Profile Changes
                        </Button>
                    </div>
                )}
            </Card>

            {/* Footer Note */}
            <p className="text-center text-[10px] text-muted-foreground font-medium uppercase tracking-widest">
                Your data is encrypted and secure
            </p>
        </div>
    );
};

export default ProfilePage;