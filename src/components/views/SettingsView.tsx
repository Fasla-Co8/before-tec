import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Settings,
  User,
  GraduationCap,
  Sliders,
  Volume2,
  Video,
  RotateCcw,
  CheckCircle2,
  Save,
  HelpCircle
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const { profile, updateProfile, resetAllData } = useApp();

  const [name, setName] = useState(profile.name);
  const [major, setMajor] = useState(profile.major);
  const [university, setUniversity] = useState(profile.university);
  const [academicYear, setAcademicYear] = useState(profile.academicYear);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name,
      major,
      university,
      academicYear
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="space-y-8 pb-14 max-w-4xl mx-auto">
      
      {/* 1. Header */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex items-center justify-between">
        <div className="space-y-1 text-right">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
            <Settings className="w-3.5 h-3.5" />
            <span>إعدادات الحساب وبيئة التدريب</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">
            الملف الأكاديمي والتفضيلات
          </h1>
          <p className="text-xs text-slate-500">
            تخصيص بياناتك كطالب في تكنولوجيا التعليم وضبط حساسية أجهزة الإدخال
          </p>
        </div>
      </div>

      {/* 2. Profile Form */}
      <form onSubmit={handleSave} className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <User className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            بيانات الطالب الأكاديمية
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5 text-right">
            <label className="text-xs font-semibold text-slate-700">اسم الطالب</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1.5 text-right">
            <label className="text-xs font-semibold text-slate-700">التخصص الأكاديمي</label>
            <input
              type="text"
              value={major}
              onChange={e => setMajor(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1.5 text-right">
            <label className="text-xs font-semibold text-slate-700">الكلية والجامعة</label>
            <input
              type="text"
              value={university}
              onChange={e => setUniversity(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              required
            />
          </div>

          <div className="space-y-1.5 text-right">
            <label className="text-xs font-semibold text-slate-700">الفرقة الدراسية</label>
            <input
              type="text"
              value={academicYear}
              onChange={e => setAcademicYear(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500"
              required
            />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          {savedSuccess ? (
            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              تم حفظ التعديلات بنجاح!
            </span>
          ) : (
            <span className="text-xs text-slate-400">
              تظهر هذه البيانات على تقارير العرض المطبوعة
            </span>
          )}

          <button
            type="submit"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-98 shadow-sm shadow-indigo-200 text-xs transition-all cursor-pointer"
          >
            <Save className="w-4 h-4" />
            <span>حفظ البيانات</span>
          </button>
        </div>
      </form>

      {/* 3. Audio & Camera Sensitivity Preferences */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
          <Sliders className="w-5 h-5 text-indigo-600" />
          <h3 className="text-base font-bold text-slate-900">
            تفضيلات الصوت والكاميرا
          </h3>
        </div>

        <div className="space-y-4 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div>
              <p className="font-bold text-slate-900">تنبيه بالاهتزاز/الصوت عند التسارع في الكلام</p>
              <p className="text-slate-500">يعطيك إشارة مرئية خفيفة إذا تجاوزت 155 كلمة بالدقيقة</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-50 border border-slate-200/60">
            <div>
              <p className="font-bold text-slate-900">تفعيل دليل التركيز البصري التلقائي</p>
              <p className="text-slate-500">عرض مربع إرشادي خفيف في مستوى الكاميرا لضبط التواصل البصري</p>
            </div>
            <input type="checkbox" defaultChecked className="w-4 h-4 text-indigo-600 rounded" />
          </div>
        </div>
      </div>

      {/* 4. Reset Demo Data */}
      <div className="bg-white rounded-2xl border border-rose-200 p-6 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1 text-right">
          <h4 className="text-sm font-bold text-rose-900">
            إعادة تعيين البيانات التجريبية
          </h4>
          <p className="text-xs text-slate-500">
            يعيد تهيئة جلسات التدريب وسجل النقاط لبيانات الطالب الافتراضية "أحمد محمد".
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            if (confirm('هل ترغب في إعادة ضبط البيانات التجريبية؟')) {
              resetAllData();
            }
          }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 transition-colors cursor-pointer shrink-0"
        >
          <RotateCcw className="w-4 h-4" />
          <span>استعادة الضبط الأولي</span>
        </button>
      </div>

    </div>
  );
};
