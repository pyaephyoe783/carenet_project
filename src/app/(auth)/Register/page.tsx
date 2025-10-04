"use client";

import React, { JSX, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { AddressResult, SignUpForm as SignUpFormType } from "@/app/anonymous/common";
import {
  getADistrictsByRegion,
  getAllRegions,
  getTownshipsByDistrict,
  signUpRequest,
} from "@/app/anonymous/client";

export default function SignUpForm(): JSX.Element {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [regions, setRegions] = useState<AddressResult[]>([]);
  const [districts, setDistricts] = useState<AddressResult[]>([]);
  const [townships, setTownships] = useState<AddressResult[]>([]);

  const [selectedRegion, setSelectedRegion] = useState<number | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null);
  const [selectedTownship, setSelectedTownship] = useState<number | null>(null);

  // Fetch regions
  const fetchRegions = useCallback(async () => {
    try {
      const result = await getAllRegions();
      setRegions(result ?? []);
    } catch (e) {
      console.error(e);
      setError("Failed to load regions.");
    }
  }, []);

  useEffect(() => {
    fetchRegions();
  }, [fetchRegions]);

  // Fetch districts
  useEffect(() => {
    if (selectedRegion === null) {
      setDistricts([]);
      setSelectedDistrict(null);
      setTownships([]);
      setSelectedTownship(null);
      return;
    }
    const fetchDistricts = async () => {
      try {
        const result = await getADistrictsByRegion(selectedRegion);
        setDistricts(result ?? []);
        setSelectedDistrict(null);
        setTownships([]);
        setSelectedTownship(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load districts.");
      }
    };
    fetchDistricts();
  }, [selectedRegion]);

  // Fetch townships
  useEffect(() => {
    if (selectedDistrict === null) {
      setTownships([]);
      setSelectedTownship(null);
      return;
    }
    const fetchTownships = async () => {
      try {
        const result = await getTownshipsByDistrict(selectedDistrict);
        setTownships(result ?? []);
        setSelectedTownship(null);
      } catch (e) {
        console.error(e);
        setError("Failed to load townships.");
      }
    };
    fetchTownships();
  }, [selectedDistrict]);

  // Handle submit
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsLoading(true);

    try {
      if (!selectedTownship) {
        setError("Please select a township.");
        setIsLoading(false);
        return;
      }

      const form: SignUpFormType = {
        email,
        name,
        password,
        address,
        township: selectedTownship,
        phone,
      };

      const response = await signUpRequest(form, profileImage);

      if (response?.status === 200) {
        setSuccess(true);
        setEmail("");
        setName("");
        setPassword("");
        setPhone("");
        setAddress("");
        setProfileImage(null);
        setSelectedRegion(null);
        setSelectedDistrict(null);
        setSelectedTownship(null);
        setDistricts([]);
        setTownships([]);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      setError((err as Error)?.message ?? "An unknown error occurred during signup.");
      setSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Create Your Account</h2>

      {error && <p className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</p>}
      {success && <p className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">Signup successful! You can now log in.</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone (Optional)" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Address" required className="w-full p-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select value={selectedRegion ?? ""} onChange={(e) => setSelectedRegion(Number(e.target.value) || null)} required className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500">
            <option value="" disabled>Select Region</option>
            {regions.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>

          <select value={selectedDistrict ?? ""} onChange={(e) => setSelectedDistrict(Number(e.target.value) || null)} required disabled={!selectedRegion} className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
            <option value="" disabled>Select District</option>
            {districts.map((d) => <option key={d.id} value={d.id}>{d.name}</option>)}
          </select>

          <select value={selectedTownship ?? ""} onChange={(e) => setSelectedTownship(Number(e.target.value) || null)} required disabled={!selectedDistrict} className="w-full p-3 border border-gray-300 bg-white rounded-lg focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100">
            <option value="" disabled>Select Township</option>
            {townships.map((t) => <option key={t.id} value={t.id}>{t.name}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image (Optional)</label>
          <input
            type="file"
            onChange={(e) => setProfileImage(e.target.files?.[0] ?? null)}
            className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        <button type="submit" disabled={isLoading} className="w-full p-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition disabled:bg-blue-400">
          {isLoading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">Log In</Link>
      </p>
    </div>
  );
}
