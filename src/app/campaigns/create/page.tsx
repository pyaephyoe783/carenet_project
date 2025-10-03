import CampaignCreateForm from './CampaignCreateForm';

// 💡 ဤ Page သည် Login ဝင်ထားမှသာ ဝင်ရောက်နိုင်သော Protected Route ဖြစ်သည်။
// 🔑 လိုအပ်ပါက Authentication Middleware သို့မဟုတ် Logic ကို နောက်မှ ထည့်သွင်းရပါမည်။

const CreateCampaignPage = () => {
  return (
    <main className="bg-gray-50 py-12">
        <CampaignCreateForm />
    </main>
  );
};

export default CreateCampaignPage;