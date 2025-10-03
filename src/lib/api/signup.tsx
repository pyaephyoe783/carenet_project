import { getADistrictsByRegion, getAllRegions } from "@/app/anonymous/client"
import { AddressResult } from "@/app/anonymous/common"
import { Address } from "cluster"
import { useState } from "react"

export async function signUp(formData: {
  email: string
  name: string

  password: string
  phone?: string
  address: string
  township: number
  profileImage?: File | null
}) {
  const data = new FormData()
  // const [regions, setRegions] = useState<AddressResult[]>([])
  // const [districts, setDistricts] = useState<AddressResult[]>([])
  // const [townships, setTownships] = useState<AddressResult[]>([])
  // const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  // const [selectedDistrict, setSelectedDistrict] = useState<number | null>(null)
  // const [selectedTownship, setSelectedTownship] = useState<number | null>(null)

  // 🔑 JSON Object (email, name, password, etc.) ကို Blob အဖြစ်ပြောင်းပြီး 'form' key ဖြင့် ထည့်ခြင်း
  const jsonBlob = new Blob([JSON.stringify({
    email: formData.email,
    name: formData.name,
    password: formData.password,
    phone: formData.phone,
    address: formData.address,
    township: formData.township
  })], { type: "application/json" })

  data.append("form", jsonBlob)

  if (formData.profileImage) {
    data.append("profileImage", formData.profileImage)
  }
  const res = await fetch("http://10.10.1.61:8080/anonymous/signup", {
    method: "POST",
    body: data, 
  })

  if (!res.ok) {
      const errorData = await res.json(); 
    throw new Error(errorData.message || "Signup failed due to server error.")
  }

  return await res.json()
}