// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
// import { useEffect, useState } from "react";
// import { deleteBanner } from "@/features/banners/services/delete-banner";
// import { getAdminBanners } from "@/features/banners/services/get-admin-banners";
// import type { Banner } from "@/features/banners/types/banner.type";
// import { getAccessToken } from "@/lib/auth-storage";

// export default function AdminBannersPage() {
//   const [banners, setBanners] = useState<Banner[]>([]);

//   async function loadBanners() {
//     const token = getAccessToken();
//     if (!token) return;

//     const response = await getAdminBanners(token);
//     setBanners(response);
//   }

//   useEffect(() => {
//     void loadBanners();
//   }, []);

//   async function handleDelete(banner: Banner) {
//     const confirmed = window.confirm(
//       `Deseja excluir o banner "${banner.title}"?`
//     );
//     if (!confirmed) return;

//     const token = getAccessToken();
//     if (!token) return;

//     await deleteBanner({
//       token,
//       id: banner.id,
//     });

//     await loadBanners();
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-start justify-between gap-4">
//         <div>
//           <h1 className="mm-page-title">Banners</h1>
//           <p className="mm-page-subtitle">Gerencie os banners do site</p>
//         </div>

//         <Link href="/admin/banners/new" className="mm-btn-primary gap-2">
//           <Plus className="h-4 w-4" />
//           Novo Banner
//         </Link>
//       </div>

//       <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
//         {banners.map((banner) => (
//           <article key={banner.id} className="mm-card overflow-hidden">
//             <div className="relative aspect-video bg-(--mm-surface-2)">
//               {banner.imageUrl ? (
//                 <Image
//                   src={banner.imageUrl}
//                   alt={banner.title}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 1280px) 50vw, 33vw"
//                 />
//               ) : null}

//               <span
//                 className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
//                   banner.isActive
//                     ? "bg-(--mm-primary) text-(--mm-primary-foreground)"
//                     : "bg-(--mm-surface) text-(--mm-text-soft)"
//                 }`}
//               >
//                 {banner.isActive ? (
//                   <>
//                     <Eye className="h-3 w-3" />
//                     Ativo
//                   </>
//                 ) : (
//                   <>
//                     <EyeOff className="h-3 w-3" />
//                     Inativo
//                   </>
//                 )}
//               </span>
//             </div>

//             <div className="flex items-start justify-between gap-4 p-4">
//               <div>
//                 <p className="font-semibold">{banner.title}</p>
//                 <p className="mt-1 text-sm text-(--mm-text-soft)">
//                   Ordem: {banner.sortOrder}
//                 </p>
//               </div>

//               <div className="flex items-center gap-3">
//                 <Link
//                   href={`/admin/banners/${banner.id}`}
//                   className="text-(--mm-text) transition hover:text-(--mm-primary)"
//                 >
//                   <Pencil className="h-4 w-4" />
//                 </Link>

//                 <button
//                   type="button"
//                   onClick={() => void handleDelete(banner)}
//                   className="text-(--mm-danger) transition hover:opacity-80"
//                 >
//                   <Trash2 className="h-4 w-4" />
//                 </button>
//               </div>
//             </div>
//           </article>
//         ))}

//         {banners.length === 0 ? (
//           <div className="mm-card col-span-full p-10 text-center text-(--mm-text-soft)">
//             Nenhum banner encontrado.
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }
    