"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { authStore, userEmail } from "@/store/auth-result.store";
import { getAllCategories } from "@/app/anonymous/admin/admin";
import { CategoryResult, AddressResult } from "@/app/anonymous/common";
import { getAllRegions, getADistrictsByRegion, getTownshipsByDistrict } from "@/app/anonymous/client";
import { securedClient } from "@/app/file";

interface CreateCampaignForm {
  title: string;
  shortDescription: string;
  content: string;
  goalAmount: number;
  durationInDays: number;
  isOrganization: boolean;
  organizationName?: string;
  address: string;
  phone: string;
  email: string;
  eventType: "URGENT" | "NORMAL";
  categoryIds: number[];
  photos: FileList;
}

export default function CampaignCreateForm() {
  const { register, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<CreateCampaignForm>();
  
  const [categories, setCategories] = useState<CategoryResult[]>([]);
  const [regions, setRegions] = useState<AddressResult[]>([]);
  const [districts, setDistricts] = useState<AddressResult[]>([]);
  const [townships, setTownships] = useState<AddressResult[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedTownship, setSelectedTownship] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isOrganization = watch("isOrganization");

  // Load categories
  const fetchCategories = useCallback(async () => {
    try {
      const result = await getAllCategories();
      setCategories(result || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load categories.");
    }
  }, []);

  // Load regions
  const fetchRegions = useCallback(async () => {
    try {
      const result = await getAllRegions();
      setRegions(result || []);
    } catch (e) {
      console.error(e);
      setError("Failed to load regions.");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    fetchRegions();
  }, [fetchCategories, fetchRegions]);

  // Load districts
  useEffect(() => {
    if (!selectedRegion) {
      setDistricts([]);
      setSelectedDistrict(null);
      setTownships([]);
      setSelectedTownship(null);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const result = await getADistrictsByRegion(selectedRegion);
        setDistricts(result || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load districts.");
      }
    };
    fetchDistricts();
  }, [selectedRegion]);

  // Load townships
  useEffect(() => {
    if (!selectedDistrict) {
      setTownships([]);
      setSelectedTownship(null);
      return;
    }
    const fetchTownships = async () => {
      try {
        const result = await getTownshipsByDistrict(selectedDistrict);
        setTownships(result || []);
      } catch (e) {
        console.error(e);
        setError("Failed to load townships.");
      }
    };
    fetchTownships();
  }, [selectedDistrict]);

  // Submit
  const onSubmit = async (data: CreateCampaignForm) => {
    if (!selectedTownship) {
      alert("Please select a township.");
      return;
    }

    try {
      const formData = new FormData();

      const campaignJson = {
        title: data.title,
        shortDescription: data.shortDescription,
        content: data.content,
        goalAmount: data.goalAmount,
        currentAmount: 0,
        durationInDays: data.durationInDays,
        isOrganization: data.isOrganization,
        organizationName: data.isOrganization ? data.organizationName : "",
        address: data.address,
        phone: data.phone,
        email: data.email || userEmail(),
        township: selectedTownship,
        categoryIdList: data.categoryIds,
        eventType: data.eventType,
      };

      formData.append("form", new Blob([JSON.stringify(campaignJson)], { type: "application/json" }));

      if (data.photos && data.photos.length > 0) {
        Array.from(data.photos).forEach(file => formData.append("files", file));
      }

      const result = await securedClient().post("/member/campaign", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("✅ Campaign created successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to create campaign.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create New Campaign</h2>

      {error && <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Basic Info */}
        <input type="text" placeholder="Title" {...register("title", { required: true })} className="w-full p-3 border rounded-lg" />
        <input type="text" placeholder="Short Description" {...register("shortDescription", { required: true })} className="w-full p-3 border rounded-lg" />
        <textarea placeholder="Content" rows={4} {...register("content", { required: true })} className="w-full p-3 border rounded-lg" />

        {/* Goal + Duration */}
        <div className="grid grid-cols-2 gap-4">
          <input type="number" placeholder="Goal Amount" {...register("goalAmount", { required: true, valueAsNumber: true })} className="w-full p-3 border rounded-lg" />
          <input type="number" placeholder="Duration (Days)" {...register("durationInDays", { required: true, valueAsNumber: true })} className="w-full p-3 border rounded-lg" />
        </div>

        {/* Type of Campaign */}
        <div className="flex items-center gap-3">
          <input type="checkbox" {...register("isOrganization")} id="isOrg" />
          <label htmlFor="isOrg" className="text-gray-700">Is this an Organization Campaign?</label>
        </div>

        {isOrganization && (
          <input type="text" placeholder="Organization Name" {...register("organizationName", { required: true })} className="w-full p-3 border rounded-lg" />
        )}

        {/* Contact Info */}
        <input type="text" placeholder="Address" {...register("address", { required: true })} className="w-full p-3 border rounded-lg" />
        <input type="tel" placeholder="Phone" {...register("phone", { required: true })} className="w-full p-3 border rounded-lg" />
        <input type="email" placeholder="Email" {...register("email", { required: true })} className="w-full p-3 border rounded-lg" />

        {/* Region → District → Township */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={selectedRegion ?? ""} onChange={e => setSelectedRegion(Number(e.target.value) || null)} required className="w-full p-3 border rounded-lg">
            <option value="">Select Region</option>
            {regions.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>

          <select value={selectedDistrict ?? ""} onChange={e => setSelectedDistrict(Number(e.target.value) || null)} required disabled={!selectedRegion} className="w-full p-3 border rounded-lg disabled:bg-gray-100">
            <option value="">Select District</option>
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <select value={selectedTownship ?? ""} onChange={e => setSelectedTownship(Number(e.target.value) || null)} required disabled={!selectedDistrict} className="w-full p-3 border rounded-lg disabled:bg-gray-100">
            <option value="">Select Township</option>
            {townships.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        {/* Categories */}
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Categories</label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {categories.map(cat => (
              <label key={cat.id} className="flex items-center gap-2">
                <input type="checkbox" value={cat.id} {...register("categoryIds", { required: true })} />
                <span>{cat.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Event Type */}
        <select {...register("eventType", { required: true })} className="w-full p-3 border rounded-lg">
          <option value="NORMAL">Normal</option>
          <option value="URGENT">Urgent</option>
        </select>

        {/* Photos */}
        <div>
          <label className="block mb-1">Upload Photos</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register("photos", { required: true })}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          <p className="text-sm text-gray-500 mt-1">You can select multiple images at once (Ctrl+Click or Shift+Click).</p>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full p-3 bg-purple-600 text-white rounded-lg">
          {isSubmitting ? "Submitting..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
}
