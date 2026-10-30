import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Check, X, Tag, Truck, ShieldCheck, ArrowRight, HelpCircle, Mail, Copy, Send, ExternalLink } from 'lucide-react';
import merchData from '../data/merchandise.json';

export default function MerchSection() {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSpec, setSelectedSpec] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [storeInfo, setStoreInfo] = useState('');
  const [note, setNote] = useState('');
  const [orderSuccess, setOrderSuccess] = useState(null);
  const [copied, setCopied] = useState(false);

  const openOrderModal = (product) => {
    setSelectedProduct(product);
    setSelectedSpec(product.specs[0] || '標準款');
    setQuantity(1);
    setOrderSuccess(null);
    setCopied(false);
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !storeInfo) return;

    const orderId = 'UF-' + Math.floor(100000 + Math.random() * 900000);
    const totalAmount = selectedProduct.price * quantity;

    // Generate formatted email content
    const emailSubject = `【宇宙流・周邊預購】單號 ${orderId} - ${name} (${selectedProduct.name})`;
    const emailBody = `您好 Roger，

我想要登記預購《宇宙流》官方周邊，以下為我的完整訂單資訊：

━━━━━━━━━━━━━━━━━━━━
【訂購商品明細】
■ 預購單號：${orderId}
■ 商品名稱：${selectedProduct.name}
■ 款式規格：${selectedSpec}
■ 訂購數量：${quantity}
■ 應付總額：NT$ ${totalAmount}

【取件人與收件門市】
■ 訂購人姓名：${name}
■ 聯絡手機：${phone}
■ 聯絡信箱：${email || '無填寫'}
■ 7-11 或全家 取貨門市：${storeInfo}
■ 備註留言：${note || '無'}
━━━━━━━━━━━━━━━━━━━━

謝謝 Roger，期待收到質感好物！`;

    const mailtoLink = `mailto:universe.flow2021@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=universe.flow2021@gmail.com&su=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    const newOrder = {
      orderId,
      productName: selectedProduct.name,
      spec: selectedSpec,
      quantity,
      unitPrice: selectedProduct.price,
      totalAmount,
      customer: {
        name,
        phone,
        email,
        storeInfo,
        note
      },
      emailSubject,
      emailBody,
      mailtoLink,
      gmailWebLink,
      createdAt: new Date().toISOString()
    };

    // Save to local storage for backup
    const existing = JSON.parse(localStorage.getItem('universe_flow_orders') || '[]');
    localStorage.setItem('universe_flow_orders', JSON.stringify([newOrder, ...existing]));

    setOrderSuccess(newOrder);

    // Trigger email client directly
    try {
      window.location.href = mailtoLink;
    } catch (err) {
      console.log('Mail client trigger notice:', err);
    }
  };

  const handleCopyEmail = () => {
    if (!orderSuccess) return;
    navigator.clipboard.writeText(orderSuccess.emailBody);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const resetForm = () => {
    setSelectedProduct(null);
    setOrderSuccess(null);
    setName('');
    setPhone('');
    setEmail('');
    setStoreInfo('');
    setNote('');
  };

  return (
    <section id="merch" className="py-16 md:py-24 border-t border-slate-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/60 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>宇宙選品・限定周邊</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              陪伴自我覺察的生活物件
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-2">
              採「登記預購制」，統計數量後統一製作出貨，讓有溫度的質感物件走入你的日常
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-900/60 px-4 py-2.5 rounded-xl border border-slate-800 self-start md:self-auto">
            <Truck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>登記完成後，將於出貨日前以 Email/簡訊通知超商取件</span>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {merchData.map((item) => (
            <div
              key={item.id}
              className="group bg-[#0d1222]/90 hover:bg-[#11172a] border border-slate-800/80 hover:border-amber-500/40 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-square w-full overflow-hidden bg-slate-900">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[11px] font-bold shadow-md">
                      {item.badge}
                    </div>
                  )}
                  <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-[11px] font-medium text-amber-300 border border-amber-500/30">
                    {item.status}
                  </div>
                </div>

                {/* Details */}
                <div className="p-5">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-amber-300 transition-colors line-clamp-2 mb-2">
                    {item.name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed mb-4">
                    {item.description}
                  </p>

                  <div className="space-y-1 mb-4 text-[11px] text-slate-500">
                    {item.details.map((d, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Price & Action */}
              <div className="p-5 pt-0 border-t border-slate-800/60 mt-auto">
                <div className="flex items-baseline justify-between mb-3 pt-3">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold text-amber-400 font-mono">
                      NT$ {item.price}
                    </span>
                    <span className="text-xs text-slate-500 line-through font-mono">
                      NT$ {item.originalPrice}
                    </span>
                  </div>
                  <span className="text-[11px] text-emerald-400 font-medium">
                    限量登記
                  </span>
                </div>

                <button
                  onClick={() => openOrderModal(item)}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:to-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-600/20 active:scale-95 transition-all"
                >
                  <Tag className="w-3.5 h-3.5" />
                  填寫預購登記表
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pre-Order Registration Modal */}
        {selectedProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-[#0e1324] border border-amber-500/40 rounded-2xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl animate-in fade-in duration-200">
              {/* Header */}
              <div className="p-5 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-100">周邊預購登記 (Email 直接發送)</h3>
                    <p className="text-xs text-slate-400">填寫後自動整理並發送 Email 至 Roger 信箱</p>
                  </div>
                </div>
                <button
                  onClick={resetForm}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {orderSuccess ? (
                /* Order Success View */
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="text-center space-y-2">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 mx-auto flex items-center justify-center shadow-lg">
                      <Mail className="w-7 h-7" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-100">預購信件已產生！請點擊發送</h4>
                    <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                      已將您的姓名、手機、超商取貨門市與品項整理成正式信件，直接發送至 Roger 官方信箱：
                      <span className="block font-mono text-sky-300 font-semibold mt-1">universe.flow2021@gmail.com</span>
                    </p>
                  </div>

                  {/* 3 Action Buttons for 100% Guaranteed Delivery */}
                  <div className="space-y-2.5 pt-1">
                    {/* Primary Button 1: Web Gmail */}
                    <a
                      href={orderSuccess.gmailWebLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-rose-600/25 active:scale-95 transition-all"
                    >
                      <ExternalLink className="w-4 h-4 shrink-0" />
                      <span>使用 Gmail 網頁版直接發送（免安裝軟體）</span>
                    </a>

                    {/* Button 2: Native Mail App / Phone */}
                    <a
                      href={orderSuccess.mailtoLink}
                      className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-amber-500/25 active:scale-95 transition-all"
                    >
                      <Mail className="w-4 h-4 shrink-0" />
                      <span>使用手機 / 電腦預設郵件軟體（Apple Mail / Outlook）</span>
                    </a>

                    {/* Button 3: One-click Copy */}
                    <button
                      type="button"
                      onClick={handleCopyEmail}
                      className={`w-full py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                        copied
                          ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300 font-bold'
                          : 'bg-slate-900/80 hover:bg-slate-800 border-slate-700 text-slate-300'
                      }`}
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-400" />
                          <span>已複製完整訂購信件！可直接貼在任何信箱發送</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-slate-400" />
                          <span>一鍵複製完整訂購信件文字</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Order Summary & Email Body Preview */}
                  <div className="bg-[#090d19] border border-slate-800 rounded-xl p-4 text-left text-xs space-y-2 text-slate-300">
                    <div className="flex justify-between border-b border-slate-800 pb-2">
                      <span className="text-slate-400">登記單號</span>
                      <span className="font-mono font-bold text-sky-400">{orderSuccess.orderId}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">商品項目</span>
                      <span className="text-right text-slate-200">{orderSuccess.productName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">規格 / 數量</span>
                      <span className="text-slate-200">{orderSuccess.spec} × {orderSuccess.quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">應付金額</span>
                      <span className="font-bold text-amber-400 font-mono">NT$ {orderSuccess.totalAmount}</span>
                    </div>
                    <div className="flex justify-between border-t border-slate-800/80 pt-2">
                      <span className="text-slate-400">取貨超商</span>
                      <span className="text-slate-200">{orderSuccess.customer.storeInfo}</span>
                    </div>
                  </div>

                  {/* Close button */}
                  <button
                    onClick={resetForm}
                    className="w-full py-2.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 font-medium text-xs transition-colors"
                  >
                    關閉視窗
                  </button>
                </div>
              ) : (
                /* Order Form */
                <form onSubmit={handleOrderSubmit} className="p-6 space-y-4 text-xs">
                  {/* Selected Item Summary */}
                  <div className="flex items-center gap-3 p-3 bg-[#090d19] rounded-xl border border-slate-800">
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-14 h-14 object-cover rounded-lg shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-100 text-xs truncate">
                        {selectedProduct.name}
                      </h4>
                      <div className="text-amber-400 font-mono font-bold mt-0.5">
                        NT$ {selectedProduct.price}
                      </div>
                    </div>
                  </div>

                  {/* Spec picker */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">款式 / 規格</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.specs.map((spec) => (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => setSelectedSpec(spec)}
                          className={`px-3 py-1.5 rounded-lg border transition-all text-xs ${
                            selectedSpec === spec
                              ? 'bg-amber-500/20 border-amber-500 text-amber-300 font-semibold'
                              : 'bg-slate-900 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          {spec}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity */}
                  <div>
                    <label className="block text-slate-300 font-medium mb-1.5">登記數量</label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center"
                      >
                        -
                      </button>
                      <span className="font-mono text-sm text-slate-100 w-8 text-center">{quantity}</span>
                      <button
                        type="button"
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-sm font-bold flex items-center justify-center"
                      >
                        +
                      </button>
                      <span className="text-slate-400 ml-auto font-mono">
                        小計：<strong className="text-amber-400 text-sm">NT$ {selectedProduct.price * quantity}</strong>
                      </span>
                    </div>
                  </div>

                  <hr className="border-slate-800" />

                  {/* Customer Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">收件人姓名 *</label>
                      <input
                        type="text"
                        required
                        placeholder="請填真實姓名"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="block text-slate-300 font-medium mb-1">手機號碼 *</label>
                      <input
                        type="tel"
                        required
                        placeholder="09xx-xxx-xxx"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">Email 信箱（出貨進度通知）</label>
                    <input
                      type="email"
                      placeholder="example@mail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">
                      7-11 或全家 取貨門市（店名與店號）*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="例：7-11 敦南門市 (店號 123456)"
                      value={storeInfo}
                      onChange={(e) => setStoreInfo(e.target.value)}
                      className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 font-medium mb-1">備註說明（選填）</label>
                    <input
                      type="text"
                      placeholder="其他想告訴 Roger 的話..."
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="w-full px-3 py-2 bg-[#090d19] border border-slate-700 rounded-lg text-slate-200 text-xs focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-extrabold text-sm shadow-xl shadow-amber-500/25 transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <Send className="w-4 h-4" />
                      填寫完成，立即發送 Email 預購需求
                    </button>
                    <p className="text-[11px] text-center text-slate-400 mt-2 leading-relaxed">
                      ✉️ 送出後將自動將您的登記明細整理成 Email 寄送至 Roger 官方信箱（<span className="text-amber-300 font-mono">universe.flow2021@gmail.com</span>），無需立即付款。
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
