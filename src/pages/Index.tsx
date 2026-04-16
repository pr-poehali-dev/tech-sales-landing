import { useState } from "react";
import Icon from "@/components/ui/icon";

const IMG_HEADPHONES = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/e22ce77a-320c-4eb4-8356-efd049c4c01c.jpg";
const IMG_LAPTOP     = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/76b222af-a86b-4438-b19e-9bb4a921b088.jpg";
const IMG_PHONE      = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/990ab29b-28bb-41c2-a177-b78b7031d78b.jpg";
const IMG_TABLET     = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/d5d9cfc1-845b-4d81-8e79-d3bb2293fd26.jpg";
const IMG_MOUSE      = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/a2435849-77a8-48f5-b4f5-23f715945a98.jpg";
const IMG_MONITOR    = "https://cdn.poehali.dev/projects/f47cf333-e36c-451b-9f5c-3e5bfbadb8ab/files/a879a069-e841-4ef9-8d3c-8efa44a8f3ac.jpg";

const products = [
  {
    id: 1,
    name: "Sony WH-1000XM5",
    category: "Наушники",
    price: 29990,
    rating: 4.9,
    reviews: 312,
    img: IMG_HEADPHONES,
    specs: { "Тип": "Накладные, BT", "АКБ": "30 ч", "ANC": "Есть", "Вес": "250 г" },
  },
  {
    id: 2,
    name: "Apple MacBook Air M3",
    category: "Ноутбуки",
    price: 129990,
    rating: 4.8,
    reviews: 218,
    img: IMG_LAPTOP,
    specs: { "Дисплей": "13.6\" Liquid Retina", "Процессор": "Apple M3", "ОЗУ": "8 GB", "SSD": "256 GB" },
  },
  {
    id: 3,
    name: "Samsung Galaxy S24",
    category: "Смартфоны",
    price: 74990,
    rating: 4.7,
    reviews: 489,
    img: IMG_PHONE,
    specs: { "Дисплей": "6.2\" AMOLED", "Процессор": "Snapdragon 8 Gen 3", "ОЗУ": "8 GB", "АКБ": "4000 mAh" },
  },
  {
    id: 4,
    name: "iPad Pro 12.9\" M4",
    category: "Планшеты",
    price: 99990,
    rating: 4.9,
    reviews: 156,
    img: IMG_TABLET,
    specs: { "Дисплей": "12.9\" Mini-LED", "Процессор": "Apple M4", "ОЗУ": "8 GB", "Камера": "12 Мп" },
  },
  {
    id: 5,
    name: "Logitech MX Master 3S",
    category: "Аксессуары",
    price: 8990,
    rating: 4.8,
    reviews: 743,
    img: IMG_MOUSE,
    specs: { "Тип": "Беспроводная", "ДПИ": "8000", "АКБ": "70 дн.", "Кнопки": "7" },
  },
  {
    id: 6,
    name: "LG UltraWide 34\"",
    category: "Мониторы",
    price: 49990,
    rating: 4.6,
    reviews: 94,
    img: IMG_MONITOR,
    specs: { "Дисплей": "34\" IPS", "Разрешение": "3440×1440", "Герцовка": "144 Гц", "HDR": "HDR10" },
  },
];

const reviews = [
  { id: 1, name: "Алексей К.", text: "Отличный сайт — нашёл нужный ноутбук за 5 минут благодаря сравнению. Доставили быстро, всё совпало с описанием.", rating: 5, product: "MacBook Air M3" },
  { id: 2, name: "Марина Л.", text: "Функция сравнения просто спасение. Долго выбирала наушники между тремя моделями — всё наглядно и понятно.", rating: 5, product: "Sony WH-1000XM5" },
  { id: 3, name: "Дмитрий В.", text: "Чистый дизайн, удобная навигация. Заказал монитор — пришёл в идеальном состоянии. Рекомендую.", rating: 5, product: "LG UltraWide 34\"" },
];

const NAV = ["Главная", "Каталог", "Отзывы", "Контакты"];

const Index = () => {
  const [activeSection, setActiveSection] = useState("Главная");
  const [compareIds, setCompareIds] = useState<number[]>([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleCompare = (id: number) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  };

  const compareProducts = products.filter((p) => compareIds.includes(p.id));
  const allSpecKeys = compareProducts.length > 0
    ? Array.from(new Set(compareProducts.flatMap((p) => Object.keys(p.specs))))
    : [];

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-mono text-sm font-medium tracking-widest uppercase text-foreground">
            Tech<span className="text-[hsl(var(--accent))]">Store</span>
          </span>
          <div className="hidden md:flex items-center gap-8">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-sm font-medium transition-colors duration-200 ${
                  activeSection === item
                    ? "text-[hsl(var(--accent))]"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            {compareIds.length > 0 && (
              <button
                onClick={() => setCompareOpen(true)}
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-white text-sm font-medium rounded transition-opacity hover:opacity-90"
              >
                <Icon name="GitCompare" size={15} />
                Сравнить ({compareIds.length})
              </button>
            )}
            <button
              className="md:hidden text-foreground"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name={menuOpen ? "X" : "Menu"} size={22} />
            </button>
          </div>
        </div>
        {menuOpen && (
          <div className="md:hidden border-t border-border bg-background px-6 py-4 flex flex-col gap-4 animate-fade-in">
            {NAV.map((item) => (
              <button
                key={item}
                onClick={() => scrollTo(item)}
                className={`text-sm font-medium text-left transition-colors ${
                  activeSection === item ? "text-[hsl(var(--accent))]" : "text-muted-foreground"
                }`}
              >
                {item}
              </button>
            ))}
            {compareIds.length > 0 && (
              <button
                onClick={() => { setCompareOpen(true); setMenuOpen(false); }}
                className="flex items-center gap-2 px-4 py-2 bg-[hsl(var(--accent))] text-white text-sm font-medium rounded w-fit"
              >
                <Icon name="GitCompare" size={15} />
                Сравнить ({compareIds.length})
              </button>
            )}
          </div>
        )}
      </nav>

      {/* HERO */}
      <section id="Главная" className="pt-16 min-h-screen flex flex-col justify-center">
        <div className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-up">
            <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--accent))] mb-6">
              Техника нового поколения
            </p>
            <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6">
              Выбирай<br />осознанно.
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10 max-w-md">
              Сравнивай технику по характеристикам, читай честные отзывы и принимай
              лучшее решение без лишнего шума.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollTo("Каталог")}
                className="px-7 py-3.5 bg-foreground text-background text-sm font-semibold rounded transition-opacity hover:opacity-80"
              >
                Перейти в каталог
              </button>
              <button
                onClick={() => scrollTo("Каталог")}
                className="px-7 py-3.5 border border-border text-foreground text-sm font-semibold rounded transition-colors hover:bg-secondary flex items-center gap-2"
              >
                <Icon name="GitCompare" size={16} />
                Как сравнивать?
              </button>
            </div>
          </div>
          <div className="relative animate-fade-in">
            <div className="aspect-square rounded-2xl overflow-hidden bg-secondary">
              <img src={HERO_IMG} alt="Техника" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white border border-border rounded-xl px-5 py-4 shadow-sm">
              <p className="font-mono text-xs text-muted-foreground mb-1">Товаров в каталоге</p>
              <p className="text-2xl font-bold">6+</p>
            </div>
            <div className="absolute -top-4 -right-4 bg-[hsl(var(--accent))] text-white rounded-xl px-5 py-4 shadow-sm">
              <p className="font-mono text-xs opacity-80 mb-1">Сравнение до</p>
              <p className="text-2xl font-bold">3 товаров</p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto px-6 pb-16 grid grid-cols-3 gap-8 border-t border-border pt-12">
          {[
            { icon: "Zap", label: "Быстрая доставка", sub: "по всей России" },
            { icon: "ShieldCheck", label: "Гарантия 2 года", sub: "на всю технику" },
            { icon: "RefreshCcw", label: "Возврат 30 дней", sub: "без вопросов" },
          ].map((item) => (
            <div key={item.label} className="flex flex-col gap-1">
              <Icon name={item.icon as "Zap"} size={20} className="text-[hsl(var(--accent))] mb-1" />
              <p className="text-sm font-semibold">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CATALOGUE */}
      <section id="Каталог" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <div className="mb-12">
            <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--accent))] mb-3">
              Каталог
            </p>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <h2 className="text-4xl font-bold tracking-tight">Все товары</h2>
              {compareIds.length > 0 && (
                <p className="text-sm text-muted-foreground">
                  Выбрано для сравнения: <span className="font-semibold text-foreground">{compareIds.length}/3</span>
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const selected = compareIds.includes(product.id);
              return (
                <div
                  key={product.id}
                  className={`group bg-card rounded-xl border transition-all duration-200 overflow-hidden flex flex-col ${
                    selected
                      ? "border-[hsl(var(--accent))] shadow-md"
                      : "border-border hover:border-foreground/30 hover:shadow-sm"
                  }`}
                >
                  <div className="aspect-[4/3] bg-secondary overflow-hidden">
                    <img
                      src={product.img}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <span className="font-mono text-[11px] tracking-widest uppercase text-muted-foreground mb-2">
                      {product.category}
                    </span>
                    <h3 className="font-semibold text-base mb-1 leading-snug">{product.name}</h3>
                    <div className="flex items-center gap-1 mb-4">
                      <Icon name="Star" size={13} className="text-amber-400 fill-amber-400" />
                      <span className="text-xs font-medium">{product.rating}</span>
                      <span className="text-xs text-muted-foreground ml-1">({product.reviews} отзывов)</span>
                    </div>
                    <p className="text-xl font-bold mt-auto mb-4">
                      {product.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <div className="flex gap-2">
                      <button className="flex-1 py-2.5 bg-foreground text-background text-sm font-medium rounded transition-opacity hover:opacity-80">
                        Купить
                      </button>
                      <button
                        onClick={() => toggleCompare(product.id)}
                        className={`px-3 py-2.5 rounded border text-sm transition-all ${
                          selected
                            ? "bg-[hsl(var(--accent))] border-[hsl(var(--accent))] text-white"
                            : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                        }`}
                        title="Добавить в сравнение"
                      >
                        <Icon name="GitCompare" size={15} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="Отзывы" className="py-24 bg-secondary/40 border-t border-border">
        <div className="max-w-6xl mx-auto px-6">
          <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--accent))] mb-3">
            Отзывы
          </p>
          <h2 className="text-4xl font-bold tracking-tight mb-12">Что говорят покупатели</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r) => (
              <div key={r.id} className="bg-card border border-border rounded-xl p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">
                  {Array.from({ length: r.rating }).map((_, i) => (
                    <Icon key={i} name="Star" size={14} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">«{r.text}»</p>
                <div className="border-t border-border pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{r.product}</p>
                  </div>
                  <Icon name="Quote" size={20} className="text-border" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="Контакты" className="py-24 border-t border-border">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="font-mono text-xs tracking-widest uppercase text-[hsl(var(--accent))] mb-3">
              Контакты
            </p>
            <h2 className="text-4xl font-bold tracking-tight mb-6">Есть вопрос?</h2>
            <p className="text-muted-foreground leading-relaxed mb-10">
              Мы поможем выбрать технику, ответим на вопросы о доставке и гарантии.
              Обычно отвечаем в течение часа.
            </p>
            <div className="flex flex-col gap-5">
              {[
                { icon: "Phone", label: "+7 (800) 000-00-00", sub: "Пн–Пт, 9:00–20:00" },
                { icon: "Mail", label: "hello@techstore.ru", sub: "Отвечаем за 1 час" },
                { icon: "MapPin", label: "Москва, ул. Примерная, 1", sub: "Шоурум" },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                    <Icon name={item.icon as "Phone"} size={17} className="text-[hsl(var(--accent))]" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  className="px-4 py-3 rounded border border-border bg-card text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-muted-foreground">Телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (999) 999-99-99"
                  className="px-4 py-3 rounded border border-border bg-card text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-muted-foreground">Сообщение</label>
              <textarea
                placeholder="Расскажите, чем мы можем помочь..."
                rows={4}
                className="px-4 py-3 rounded border border-border bg-card text-sm outline-none focus:border-[hsl(var(--accent))] transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="py-3.5 bg-foreground text-background text-sm font-semibold rounded transition-opacity hover:opacity-80"
            >
              Отправить сообщение
            </button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <span className="font-mono tracking-widest uppercase text-foreground text-xs">
            Tech<span className="text-[hsl(var(--accent))]">Store</span>
          </span>
          <p className="text-xs text-muted-foreground">© 2024 TechStore. Все права защищены.</p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-foreground transition-colors">Условия использования</a>
          </div>
        </div>
      </footer>

      {/* COMPARE PANEL */}
      {compareOpen && compareProducts.length > 0 && (
        <div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-foreground/40 backdrop-blur-sm"
          onClick={() => setCompareOpen(false)}
        >
          <div
            className="w-full max-w-5xl bg-background border border-border rounded-t-2xl md:rounded-2xl shadow-2xl max-h-[85vh] overflow-y-auto animate-compare-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg">Сравнение товаров</h3>
                <p className="text-xs text-muted-foreground">{compareProducts.length} товара выбраны</p>
              </div>
              <button onClick={() => setCompareOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                <Icon name="X" size={22} />
              </button>
            </div>
            <div className="p-6 overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead>
                  <tr>
                    <td className="pb-6 text-xs text-muted-foreground font-medium w-32">Характеристика</td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="pb-6 px-4 text-center">
                        <div className="relative">
                          <button
                            onClick={() => toggleCompare(p.id)}
                            className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-muted-foreground/20 hover:bg-muted-foreground/40 flex items-center justify-center text-muted-foreground transition-colors"
                          >
                            <Icon name="X" size={10} />
                          </button>
                          <img src={p.img} alt={p.name} className="w-20 h-20 object-cover rounded-lg mx-auto mb-2" />
                          <p className="text-sm font-semibold leading-tight">{p.name}</p>
                          <p className="text-[hsl(var(--accent))] font-bold text-base mt-1">{p.price.toLocaleString("ru-RU")} ₽</p>
                        </div>
                      </td>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="border-t border-border">
                      <td className="py-3.5 text-xs text-muted-foreground font-medium pr-4">{key}</td>
                      {compareProducts.map((p) => (
                        <td key={p.id} className="py-3.5 px-4 text-center text-sm font-medium">
                          {(p.specs as Record<string, string>)[key] ?? <span className="text-muted-foreground">—</span>}
                        </td>
                      ))}
                    </tr>
                  ))}
                  <tr className="border-t border-border">
                    <td className="pt-5"></td>
                    {compareProducts.map((p) => (
                      <td key={p.id} className="pt-5 px-4 text-center">
                        <button className="w-full py-2.5 bg-foreground text-background text-xs font-semibold rounded hover:opacity-80 transition-opacity">
                          Купить
                        </button>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* COMPARE FLOATING BTN (mobile) */}
      {compareIds.length > 0 && !compareOpen && (
        <button
          onClick={() => setCompareOpen(true)}
          className="fixed bottom-6 right-6 md:hidden z-40 flex items-center gap-2 px-5 py-3 bg-[hsl(var(--accent))] text-white text-sm font-semibold rounded-full shadow-lg animate-fade-in"
        >
          <Icon name="GitCompare" size={16} />
          Сравнить ({compareIds.length})
        </button>
      )}
    </div>
  );
};

export default Index;