'use client'

import { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { getAllCategories } from '@/app/anonymous/admin/admin';
import { CategoryResult } from '@/app/anonymous/common';
import { authStore } from '@/store/auth-result.store';

// 📌 Backend ကို ပို့မယ့် Form Data Model
interface CreateCampaignForm {
  title: string;
  description: string;
  goalAmount: number;
  durationDays: number;
  type: 'Organization' | 'Personal';
  category: number;
  organizationName?: string;
  contactOrganization?: string;
  photos: FileList;
}

const CampaignCreateForm = () => {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<CreateCampaignForm>();

  // 🔑 API က ဆွဲလိုက်မယ့် Category State
  const [categories, setCategories] = useState<CategoryResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getAllCategories();
      setCategories(result || []);
      console.log("Authentication   llll"+authStore.getState().isAuthenticated);
      console.log("Fetched Categories:", result);
    } catch (e) {
      console.error(e);
      setError("Failed to load categories.");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // 🔑 Campaign Type
  const campaignType = watch('type', 'Personal');

  // 📌 Form Submission Logic
  const onSubmit = async (data: CreateCampaignForm) => {
    console.log("Form Data:", data);
    alert('Campaign Creation Data Ready! Check Console.');
    // 💡 အမှန်တကယ် API သို့ပို့မယ်ဆိုရင် FormData သုံးပြီး file တွေပါပို့ဖို့လိုမယ်
  };

  return (
    <div className="max-w-3xl mx-auto my-12 p-8 bg-white shadow-2xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Start a New Campaign</h2>
      <p className="text-center text-gray-600 mb-8">Tell your story and raise funds for your chosen cause.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

        {/* 1. Category Select */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
          <select
            {...register('category', { required: 'Campaign category is required.' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="">-- Choose a Category --</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-sm text-red-500 mt-1">{errors.category.message}</p>}
          {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
        </div>

        {/* 2. Campaign Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Type</label>
          <select
            {...register('type', { required: 'Campaign type is required.' })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          >
            <option value="Personal">Personal</option>
            <option value="Organization">Organization</option>
          </select>
        </div>

        {/* 3. Conditional Fields */}
        {campaignType === 'Organization' && (
          <div className="space-y-6 border border-dashed border-gray-300 p-4 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700">Organization Details</h3>

            <input
              type="text"
              placeholder="Organization Name"
              {...register('organizationName', { required: 'Organization name is required for this type.' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.organizationName && <p className="text-sm text-red-500 mt-1">{errors.organizationName.message}</p>}

            <input
              type="text"
              placeholder="Organization Contact (Phone/Email)"
              {...register('contactOrganization', { required: 'Contact is required.' })}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
            />
            {errors.contactOrganization && <p className="text-sm text-red-500 mt-1">{errors.contactOrganization.message}</p>}
          </div>
        )}

        {/* 4. Core Fields */}
        <input
          type="text"
          placeholder="Campaign Title"
          {...register('title', { required: 'Title is required.' })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />

        <textarea
          rows={4}
          placeholder="Detailed Description of your Campaign"
          {...register('description', { required: 'Description is required.' })}
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
        />

        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            step="1000"
            placeholder="Goal Amount (e.g., 50000)"
            {...register('goalAmount', { required: 'Goal amount is required.', valueAsNumber: true, min: 1000 })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
          <input
            type="number"
            placeholder="Duration (Days)"
            {...register('durationDays', { required: 'Duration is required.', valueAsNumber: true, min: 1 })}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* 5. Photo Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Campaign Photo (Max 5)</label>
          <input
            type="file"
            accept="image/*"
            multiple
            {...register('photos', { required: 'At least one photo is required.' })}
            className="w-full file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
          />
          {errors.photos && <p className="text-sm text-red-500 mt-1">{errors.photos.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full p-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition duration-150 disabled:bg-purple-400"
        >
          {isSubmitting ? "Submitting..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CampaignCreateForm;