'use client';

import { useState } from 'react';
import { GymConfig } from '@/types';
import defaultConfig from '../../../data/gym-config.json';
import { Save, LogIn, Plus, Trash2 } from 'lucide-react';

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [config, setConfig] = useState<GymConfig>(defaultConfig as GymConfig);
  const [activeTab, setActiveTab] = useState('brand');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password) {
      setIsAuthenticated(true);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    setMessage(null);

    try {
      const response = await fetch('/api/update-config', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, config }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ type: 'success', text: 'Cập nhật thành công!' });
      } else {
        setMessage({ type: 'error', text: data.error || 'Cập nhật thất bại' });
      }
    } catch (_) {
      setMessage({ type: 'error', text: 'Có lỗi xảy ra, vui lòng thử lại' });
    } finally {
      setIsLoading(false);
      setTimeout(() => setMessage(null), 3000);
    }
  };

  const updateBrand = (key: keyof GymConfig['brand'], value: string) => {
    setConfig({ ...config, brand: { ...config.brand, [key]: value } });
  };

  const updateHero = (key: keyof GymConfig['hero'], value: string) => {
    setConfig({ ...config, hero: { ...config.hero, [key]: value } });
  };

  const updatePromotion = (key: keyof GymConfig['promotions'], value: unknown) => {
    setConfig({ ...config, promotions: { ...config.promotions, [key]: value } });
  };

  const handlePricingChange = (index: number, key: string, value: unknown) => {
    const newPricing = [...config.pricing];
    newPricing[index] = { ...newPricing[index], [key]: value };
    setConfig({ ...config, pricing: newPricing });
  };

  const handlePricingFeatureChange = (planIndex: number, featureIndex: number, value: string) => {
    const newPricing = [...config.pricing];
    newPricing[planIndex].features[featureIndex] = value;
    setConfig({ ...config, pricing: newPricing });
  };

  const addPricingFeature = (planIndex: number) => {
     const newPricing = [...config.pricing];
     newPricing[planIndex].features.push('');
     setConfig({ ...config, pricing: newPricing });
  };

  const removePricingFeature = (planIndex: number, featureIndex: number) => {
     const newPricing = [...config.pricing];
     newPricing[planIndex].features.splice(featureIndex, 1);
     setConfig({ ...config, pricing: newPricing });
  };

  const handleClassChange = (index: number, value: string) => {
      const newClasses = [...config.classes];
      newClasses[index] = value;
      setConfig({ ...config, classes: newClasses });
  }

  const addClass = () => {
      setConfig({ ...config, classes: [...config.classes, ''] });
  }

  const removeClass = (index: number) => {
      const newClasses = [...config.classes];
      newClasses.splice(index, 1);
      setConfig({ ...config, classes: newClasses });
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'brand':
        return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-bold mb-4">Thông tin chung & Liên hệ</h2>
            {Object.entries(config.brand).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateBrand(key as keyof GymConfig['brand'], e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        );
      case 'hero':
        return (
          <div className="space-y-4 text-black">
             <h2 className="text-xl font-bold mb-4">Cấu hình Hero</h2>
             {Object.entries(config.hero).map(([key, value]) => (
              <div key={key}>
                <label className="block text-sm font-medium text-gray-700 capitalize mb-1">{key}</label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => updateHero(key as keyof GymConfig['hero'], e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>
            ))}
          </div>
        );
      case 'pricing':
        return (
          <div className="space-y-8 text-black">
            <h2 className="text-xl font-bold mb-4">Quản lý Bảng giá</h2>
            {config.pricing.map((plan, planIndex) => (
              <div key={plan.id} className="border border-gray-200 p-6 rounded-lg bg-gray-50">
                <h3 className="font-bold mb-4 text-lg">Gói tập: {plan.name}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên gói</label>
                    <input type="text" value={plan.name} onChange={(e) => handlePricingChange(planIndex, 'name', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                   <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tag (VD: Best Seller)</label>
                    <input type="text" value={plan.tag} onChange={(e) => handlePricingChange(planIndex, 'tag', e.target.value)} className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá gốc</label>
                    <input type="number" value={plan.originalPrice} onChange={(e) => handlePricingChange(planIndex, 'originalPrice', Number(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Giá khuyến mãi</label>
                    <input type="number" value={plan.promoPrice} onChange={(e) => handlePricingChange(planIndex, 'promoPrice', Number(e.target.value))} className="w-full border border-gray-300 rounded px-3 py-2" />
                  </div>
                </div>

                <div>
                   <label className="block text-sm font-medium text-gray-700 mb-2">Quyền lợi</label>
                   <div className="space-y-2">
                     {plan.features.map((feature, featureIndex) => (
                       <div key={featureIndex} className="flex gap-2">
                          <input type="text" value={feature} onChange={(e) => handlePricingFeatureChange(planIndex, featureIndex, e.target.value)} className="flex-1 border border-gray-300 rounded px-3 py-2" />
                          <button onClick={() => removePricingFeature(planIndex, featureIndex)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                       </div>
                     ))}
                   </div>
                   <button onClick={() => addPricingFeature(planIndex)} className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"><Plus size={16}/> Thêm quyền lợi</button>
                </div>
              </div>
            ))}
          </div>
        );
      case 'classes':
         return (
          <div className="space-y-4 text-black">
            <h2 className="text-xl font-bold mb-4">Các dịch vụ / Tiện ích</h2>
             <div className="space-y-2">
                {config.classes.map((cls, index) => (
                  <div key={index} className="flex gap-2">
                    <input type="text" value={cls} onChange={(e) => handleClassChange(index, e.target.value)} className="flex-1 border border-gray-300 rounded px-3 py-2" />
                    <button onClick={() => removeClass(index)} className="text-red-500 hover:bg-red-50 p-2 rounded"><Trash2 size={18} /></button>
                  </div>
                ))}
             </div>
             <button onClick={addClass} className="mt-2 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"><Plus size={16}/> Thêm dịch vụ/tiện ích</button>
          </div>
         );
      case 'promotions':
        return (
          <div className="space-y-4 text-black">
             <h2 className="text-xl font-bold mb-4">Cấu hình Khuyến mãi</h2>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kích hoạt banner khuyến mãi</label>
                <input
                  type="checkbox"
                  checked={config.promotions.isActive}
                  onChange={(e) => updatePromotion('isActive', e.target.checked)}
                  className="w-5 h-5"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung banner</label>
                <textarea
                  value={config.promotions.bannerText}
                  onChange={(e) => updatePromotion('bannerText', e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 min-h-[100px]"
                />
             </div>
          </div>
        );
      default:
        return null;
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-lg shadow-xl w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">Admin Login</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-400 mb-2">Master Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-700 text-white border border-gray-600 rounded px-4 py-2 focus:outline-none focus:border-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center justify-center gap-2"
            >
              <LogIn size={20} />
              Login
            </button>
          </div>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: 'brand', label: 'Thông tin chung' },
    { id: 'hero', label: 'Hero Banner' },
    { id: 'pricing', label: 'Bảng giá' },
    { id: 'classes', label: 'Tiện ích' },
    { id: 'promotions', label: 'Khuyến mãi' }
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <Save size={20} />
            {isLoading ? 'Saving...' : 'Save & Publish'}
          </button>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden flex min-h-[600px]">
          <div className="w-64 bg-gray-50 border-r border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-6 py-4 border-b border-gray-200 transition-colors ${
                  activeTab === tab.id ? 'bg-white border-l-4 border-l-red-600 font-bold text-gray-900' : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
             {renderTabContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
