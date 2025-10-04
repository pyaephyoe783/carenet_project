// import Link from 'next/link';
// import { BookOpen, Drill, Droplet, Globe, Heart, Palette, PawPrint, Pill, Ribbon, Shield, ShieldAlert, Tent, TrendingUp, Users, Utensils, Wheat, Zap } from 'lucide-react';
// import Home from '@/app/page';



// const CategorySelector = () => {
//   return (
//     <div className="container mx-auto px-4 py-12">
//         <div className="text-center mb-10">
//             <h2 className="text-3xl font-bold text-gray-800">
//                 Choose a Cause to Support
//             </h2>
//             <p className="text-gray-600 mt-2">
//                 Start your journey by selecting one of our core campaign categories.
//             </p>
//         </div>
        
//         {/* Category Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {CATEGORY_DATA.map((category) => {
//                 const Icon = category.icon;
                
//                 // 🔑 အရေးကြီး: ဤတွင် မှန်ကန်သော Filter Route ကို အသုံးပြုထားသည်
//                 const linkHref = `/campaigns/category/${category.name.toLowerCase()}`;
                
//                 return (
//                     <Link 
//                         key={category.name} 
//                         href={linkHref}
//                         className="block p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.03] transition-all duration-300 border-t-4 border-transparent hover:border-blue-500 group text-center"
//                     >
//                         <div className={`w-14 h-14 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:bg-opacity-90`}>
//                             <Icon size={28} />
//                         </div>
//                         <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-blue-600">
//                             {category.name}
//                         </h3>
//                         <p className="text-gray-600 text-sm">
//                             {category.description}
//                         </p>
//                     </Link>
//                 );
//             })}
//         </div>
//     </div>
//   );
// };

// export default CategorySelector;