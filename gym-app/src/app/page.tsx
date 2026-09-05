import { GymConfig } from '@/types';
import fs from 'fs';
import path from 'path';
import { Phone, MapPin, CheckCircle2, Dumbbell, Mail } from 'lucide-react';

export const revalidate = 60; // ISR revalidate every 60s

export default async function Home() {
  const filePath = path.join(process.cwd(), 'data', 'gym-config.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const config: GymConfig = JSON.parse(fileContents);

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-red-500/30 font-sans">

      {/* Promo Banner */}
      {config.promotions.isActive && (
        <div className="bg-red-600 text-white text-center py-2 px-4 text-sm font-bold uppercase tracking-wider animate-pulse">
          {config.promotions.bannerText}
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Dumbbell className="text-red-500 h-8 w-8" />
            <span className="text-2xl font-black tracking-tighter uppercase">{config.brand.name}</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
             <a href="#classes" className="hover:text-red-500 transition-colors">DỊCH VỤ</a>
             <a href="#pricing" className="hover:text-red-500 transition-colors">BẢNG GIÁ</a>
             <a href="#contact" className="hover:text-red-500 transition-colors">LIÊN HỆ</a>
          </div>
          <a href={`tel:${config.brand.hotline.replace(/\./g, '')}`} className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-full font-bold transition-colors">
            <Phone size={16} />
            <span className="hidden sm:inline">{config.brand.hotline}</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
           <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-gray-950/80 to-transparent z-10" />
           <img
             src={config.hero.backgroundImage}
             alt="Hero background"
             className="w-full h-full object-cover object-center"
           />
        </div>

        <div className="container mx-auto px-4 relative z-20">
          <div className="max-w-2xl space-y-6">
            <span className="inline-block py-1 px-3 rounded-full bg-red-500/20 text-red-500 font-semibold text-sm border border-red-500/30">
               {config.brand.slogan}
            </span>
            <h1 className="text-5xl md:text-7xl font-black uppercase leading-tight tracking-tighter">
              {config.hero.title}
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              {config.hero.subtitle}
            </p>
            <div className="pt-4 flex gap-4">
              <a href="#contact" className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-transform hover:scale-105 inline-block">
                {config.hero.ctaText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Facilities/Classes Section */}
      <section id="classes" className="py-24 bg-gray-900">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-4xl font-black uppercase mb-4 text-white">Dịch vụ & Tiện ích</h2>
             <div className="w-24 h-1 bg-red-600 mx-auto rounded-full"></div>
           </div>

           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
             {config.classes.map((item, idx) => (
                <div key={idx} className="bg-gray-800 p-6 rounded-2xl border border-gray-700 hover:border-red-500/50 transition-colors group flex flex-col items-center text-center gap-4">
                   <div className="w-16 h-16 rounded-full bg-gray-700/50 group-hover:bg-red-500/20 flex items-center justify-center transition-colors">
                      <CheckCircle2 className="text-gray-400 group-hover:text-red-500 w-8 h-8 transition-colors" />
                   </div>
                   <h3 className="font-bold text-lg">{item}</h3>
                </div>
             ))}
           </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-gray-950">
        <div className="container mx-auto px-4">
           <div className="text-center max-w-2xl mx-auto mb-16">
             <h2 className="text-4xl font-black uppercase mb-4">Bảng Giá Luyện Tập</h2>
             <p className="text-gray-400 text-lg">Chọn gói tập phù hợp với mục tiêu của bạn.</p>
             <div className="w-24 h-1 bg-red-600 mx-auto rounded-full mt-6"></div>
           </div>

           <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {config.pricing.map((plan) => (
                 <div key={plan.id} className={`relative bg-gray-900 rounded-3xl p-8 border ${plan.tag === 'Best Seller' ? 'border-red-500' : 'border-gray-800'} flex flex-col`}>
                    {plan.tag && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                        {plan.tag}
                      </div>
                    )}

                    <div className="text-center mb-8">
                       <h3 className="text-2xl font-bold text-gray-300 mb-2">{plan.name}</h3>
                       <div className="flex items-center justify-center gap-2 mb-2">
                          <span className="text-gray-500 line-through text-lg">{new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(plan.originalPrice)}</span>
                       </div>
                       <div className="text-4xl font-black text-white">
                          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(plan.promoPrice)}
                       </div>
                    </div>

                    <div className="space-y-4 flex-1 mb-8">
                      {plan.features.map((feature, idx) => (
                         <div key={idx} className="flex items-start gap-3">
                           <CheckCircle2 className="text-red-500 w-5 h-5 shrink-0 mt-0.5" />
                           <span className="text-gray-300">{feature}</span>
                         </div>
                      ))}
                    </div>

                    <a href="#contact" className={`w-full py-4 rounded-xl font-bold text-center transition-colors ${plan.tag === 'Best Seller' ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-gray-800 hover:bg-gray-700 text-white'}`}>
                      CHỌN GÓI NÀY
                    </a>
                 </div>
              ))}
           </div>
        </div>
      </section>

      {/* Contact & Map Section */}
      <section id="contact" className="py-24 bg-gray-900">
         <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid md:grid-cols-2 gap-16">
               <div>
                  <h2 className="text-4xl font-black uppercase mb-8">Liên hệ với chúng tôi</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                       <div className="bg-gray-800 p-3 rounded-lg"><MapPin className="text-red-500" /></div>
                       <div>
                         <h4 className="font-bold text-lg mb-1">Địa chỉ</h4>
                         <p className="text-gray-400">{config.brand.address}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-gray-800 p-3 rounded-lg"><Phone className="text-red-500" /></div>
                       <div>
                         <h4 className="font-bold text-lg mb-1">Hotline / Zalo</h4>
                         <p className="text-gray-400">{config.brand.hotline} - {config.brand.zalo}</p>
                       </div>
                    </div>
                    <div className="flex items-start gap-4">
                       <div className="bg-gray-800 p-3 rounded-lg"><Mail className="text-red-500" /></div>
                       <div>
                         <h4 className="font-bold text-lg mb-1">Email</h4>
                         <p className="text-gray-400">{config.brand.email}</p>
                       </div>
                    </div>
                     <div className="flex items-start gap-4">
                       <div className="bg-gray-800 p-3 rounded-lg"><CheckCircle2 className="text-red-500" /></div>
                       <div>
                         <h4 className="font-bold text-lg mb-1">Giờ hoạt động</h4>
                         <p className="text-gray-400">{config.brand.openHours}</p>
                       </div>
                    </div>
                  </div>

                  <div className="mt-12 bg-gray-800 p-8 rounded-2xl border border-gray-700">
                    <h3 className="text-2xl font-bold mb-6">Đăng ký nhận tư vấn</h3>
                    <form className="space-y-4" action="">
                       <input type="text" placeholder="Họ và tên" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
                       <input type="tel" placeholder="Số điện thoại" required className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-red-500" />
                       <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg transition-colors">
                         GỬI THÔNG TIN
                       </button>
                    </form>
                  </div>
               </div>

               <div className="h-[600px] rounded-3xl overflow-hidden border border-gray-800">
                  <iframe
                    src={config.brand.mapEmbedUrl}
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>
            </div>
         </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 border-t border-gray-900 text-center">
         <p className="text-gray-500">© {new Date().getFullYear()} {config.brand.name}. All rights reserved.</p>
      </footer>
    </main>
  );
}
