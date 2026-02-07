import React, { useState, useEffect } from "react";
import { getCurrentUser, updateUser } from "@/data/fakeAuth";
import { FaCamera, FaUserEdit, FaCheckCircle, FaTimesCircle, FaUserGraduate, FaChalkboardTeacher } from "react-icons/fa";
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
        <div className="max-w-4xl mx-auto flex flex-col gap-10 pb-12 animate-in fade-in slide-in-from-bottom-4 duration-700 mt-10">

            <div className="relative flex flex-col items-center pt-6">
                <div className="group relative">
                    <div className={`w-36 h-36 rounded-[2.8rem] p-[4px] shadow-2xl transition-transform duration-500 group-hover:scale-105 bg-gradient-to-br ${user.role === 'teacher' ? 'from-primary to-blue-600' : 'from-orange-500 to-primary'}`}>
                        <div className="w-full h-full rounded-[2.7rem] bg-card flex items-center justify-center overflow-hidden border-4 border-background">
                            {avatar ? (
                                <img src={avatar} alt="Avatar" className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-5xl font-black text-primary/30">
                                    {getInitials(user.firstName, user.lastName)}
                                </span>
                            )}
                        </div>
                    </div>

                    {editMode && (
                        <label className="absolute bottom-1 right-1 bg-foreground text-background p-3 rounded-2xl cursor-pointer shadow-lg hover:scale-110 transition-all border-4 border-background z-20">
                            <FaCamera className="text-sm" />
                            <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
                        </label>
                    )}
                </div>

                <div className="text-center mt-6">
                    <div className="flex justify-center mb-3">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${user.role === 'teacher' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-orange-500/10 text-orange-500 border-orange-500/20'}`}>
                            {user.role === 'teacher' ? <FaChalkboardTeacher /> : <FaUserGraduate />}
                            {user.role}
                        </span>
                    </div>

                    <h1 className="text-4xl font-black tracking-tight text-foreground">
                        {user.firstName} {user.lastName}
                    </h1>
                    <p className="text-muted-foreground font-bold text-sm mt-1 opacity-60 italic">@{user.username}</p>
                </div>

                <div className="flex gap-3">
                    <Button
                        variant={editMode ? "outline" : "secondary"}
                        onClick={() => setEditMode(!editMode)}
                        className="mt-6 rounded-2xl px-8 h-12 font-black uppercase text-[11px] tracking-widest transition-all shadow-sm"
                    >
                        {editMode ? <><FaTimesCircle className="mr-2" /> Cancel</> : <><FaUserEdit className="mr-2 text-lg" /> Edit Profile</>}
                    </Button>
                </div>
            </div>

            <Card className="p-8 md:p-12 rounded-[3rem] bg-card/30 backdrop-blur-xl border-white/5 shadow-2xl relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-32 h-32 blur-[80px] -z-10 opacity-20 ${user.role === 'teacher' ? 'bg-primary' : 'bg-orange-500'}`} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">

                    {[
                        { label: "First Name", value: user.firstName, key: "firstName", readOnly: false },
                        { label: "Last Name", value: user.lastName, key: "lastName", readOnly: false },
                        { label: "Account Role", value: user.role.toUpperCase(), key: "role", readOnly: true },
                        { label: "Account ID", value: user.username, key: "username", readOnly: true },
                        { label: "Primary Email", value: user.email, key: "email", readOnly: true },
                        { label: "Secondary Email", value: altEmail, key: "altEmail", readOnly: false, type: "email", setter: setAltEmail },
                        { label: "Phone Connection", value: phone, key: "phone", readOnly: false, type: "tel", setter: setPhone },
                    ].map((field) => (
                        <div key={field.key} className="flex flex-col gap-2.5">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-black text-primary/60 ml-2">
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
                                className={`w-full bg-black/20 border border-border/40 rounded-2xl px-5 py-4 text-sm font-bold transition-all focus:border-primary/50 outline-none
                                ${field.readOnly ? "opacity-50 cursor-not-allowed bg-transparent border-dashed" : "hover:bg-black/30 focus:bg-card shadow-inner"}
                                ${editMode && !field.readOnly ? "border-primary/40 ring-4 ring-primary/5" : ""}`}
                                placeholder={`Set ${field.label.toLowerCase()}`}
                            />
                        </div>
                    ))}

                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-2.5">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-black text-primary/60 ml-2">Country</label>
                            <select
                                value={country}
                                disabled={!editMode}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-black/20 border border-border/40 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" className="bg-card">Select</option>
                                <option value="Egypt" className="bg-card">Egypt</option>
                                <option value="USA" className="bg-card">USA</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-2.5">
                            <label className="text-[10px] uppercase tracking-[0.25em] font-black text-primary/60 ml-2">Governorate</label>
                            <select
                                value={province}
                                disabled={!editMode}
                                onChange={(e) => setProvince(e.target.value)}
                                className="w-full bg-black/20 border border-border/40 rounded-2xl px-5 py-4 text-sm font-bold outline-none appearance-none cursor-pointer disabled:opacity-50"
                            >
                                <option value="" className="bg-card">Select</option>
                                <option value="Cairo" className="bg-card">Cairo</option>
                                <option value="Giza" className="bg-card">Giza</option>
                                <option value="Alexandria" className="bg-card">Alex</option>
                            </select>
                        </div>
                    </div>
                </div>

                {editMode && (
                    <div className="mt-14 flex justify-center">
                        <Button
                            onClick={handleSave}
                            className="w-full md:w-3/4 h-15 rounded-[1.5rem] font-black uppercase tracking-widest bg-primary text-primary-foreground shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all"
                        >
                            <FaCheckCircle className="mr-3 text-lg" /> Commit Profile Updates
                        </Button>
                    </div>
                )}
            </Card>

            <footer className="text-center">
                <p className="text-[9px] text-muted-foreground font-black uppercase tracking-[0.5em] opacity-40">
                    Tweakcn Cloud Identity Management v2.0
                </p>
            </footer>
        </div>
    );
};

export default ProfilePage;