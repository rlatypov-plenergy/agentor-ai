import type { Converters, Field, Option } from "../converters-types";

const sizes: Option[] = [
  { v: "1–10", label: "1–10" },
  { v: "11–49", label: "11–49" },
  { v: "50–199", label: "50–199" },
  { v: "200–999", label: "200–999" },
  { v: "1,000–5,000", label: "1 000–5 000" },
  { v: "5,000+", label: "5 000+" },
];
const countries: Option[] = [
  { v: "United States", label: "США" },
  { v: "United Kingdom", label: "Велика Британія" },
  { v: "Poland", label: "Польща" },
  { v: "Ukraine", label: "Україна" },
  { v: "Kazakhstan", label: "Казахстан" },
  { v: "Other", label: "Інша" },
];
const industries: Option[] = [
  { v: "Construction", label: "Будівництво" },
  { v: "Transport & logistics", label: "Транспорт і логістика" },
  { v: "Manufacturing", label: "Виробництво" },
  { v: "Public procurement", label: "Публічні закупівлі" },
  { v: "Professional services", label: "Професійні послуги" },
  { v: "E-commerce & retail", label: "E-commerce і роздрібна торгівля" },
  { v: "Other", label: "Інша" },
];

const company: Field[] = [
  { name: "name", label: "Ваше ім'я", type: "text", required: true },
  { name: "email", label: "Робочий email", type: "email", required: true },
  { name: "company", label: "Компанія", type: "text", required: true },
];

export const converters: Converters = {
  common: {
    sending: "Надсилаємо…",
    error: "Щось пішло не так. Спробуйте ще раз або напишіть нам напряму.",
    consent: "Погоджуюся на обробку моїх даних для отримання відповіді (див. Політику конфіденційності).",
    freeMail: "Якщо можете, вкажіть робочий email: це допоможе нам перевірити компанію.",
    smallCompany: "Для компаній до 50 співробітників ми радимо почати з безкоштовної 30-хвилинної консультації. Ви все одно можете надіслати цю форму, і ми спрямуємо її туди.",
    thanksTitle: "Дякуємо, ми отримали вашу заявку",
    thanksText: "Ми відповімо протягом одного робочого дня.",
    thanksSmall: "Оскільки у вашій компанії менше 50 співробітників, ми запросимо вас на безкоштовну консультацію.",
    nextSteps: ["Ми розглядаємо вашу заявку", "Пишемо вам про наступний крок", "Домовляємося про час дзвінка"],
    bookCall: "Записатися на дзвінок",
    required: "Це поле обов'язкове",
    back: "Назад",
    next: "Далі",
    skip: "Пропустити",
    step: "Крок",
    of: "з",
    devNote: "Тестовий режим: заявку не було надіслано на реальну пошту.",
  },
  consultation: {
    title: "Безкоштовна 30-хвилинна консультація",
    lead: "На короткому дзвінку ми розберемо ваші процеси та покажемо, який AI-агент окупиться першим.",
    bullets: ["Карта ваших процесів", "3 ідеї AI-агентів з оцінкою ROI", "План пілота, терміни та бюджет", "Без зобов'язань"],
    calNote: "Хочете самі обрати час? Скористайтеся календарем нижче.",
    form: {
      submit: "Замовити дзвінок",
      fields: [...company, { name: "message", label: "Що б ви хотіли обговорити?", type: "textarea" }],
    },
  },
  discovery: {
    title: "Безкоштовний AI Discovery одного відділу",
    lead: "Інтерв'ю, AS-IS карти процесів та пріоритезована карта автоматизації з ROI для компаній, що відповідають критеріям.",
    badge: "Ринкова вартість ≈ $2,000 — безкоштовно для компаній, що відповідають критеріям",
    included: { title: "Що входить", items: ["До 5 інтерв'ю з ключовими співробітниками (45–60 хв)", "AS-IS опис бізнес-процесів відділу (карти у стилі BPMN + текст)", "Аналіз рутини, втрат часу та вузьких місць", "Пріоритезована карта автоматизації: топ-5 можливостей з трудомісткістю, ефектом і орієнтовним ROI", "60-хвилинна презентація результатів"] },
    receive: { title: "Що ви отримаєте", items: ["Описані бізнес-процеси відділу", "Короткий перелік автоматизацій з ROI"] },
    value: { title: "Як ми оцінюємо вартість", text: "Близько 40 годин по $50/год, без ПДВ.", rows: [["Інтерв'ю", "10 год"], ["Картування процесів", "14 год"], ["Аналіз і ROI", "8 год"], ["Звіт і презентація", "5 год"], ["Координація", "3 год"]] },
    who: "Для компаній із 50+ співробітників.",
    form: {
      submit: "Подати заявку на безкоштовний Discovery",
      fields: [
        ...company,
        { name: "website", label: "Сайт компанії", type: "url", placeholder: "https://" },
        { name: "size", label: "Розмір компанії", type: "select", required: true, options: sizes },
        { name: "industry", label: "Галузь", type: "select", required: true, options: industries },
        { name: "department", label: "Відділ для Discovery", type: "text", required: true, placeholder: "Продажі, підтримка, операції…" },
        { name: "pain", label: "Головна проблема", type: "textarea", required: true },
        { name: "country", label: "Країна", type: "select", required: true, options: countries },
      ],
    },
  },
  mvp: {
    title: "Безкоштовний MVP за 5 робочих днів",
    lead: "Ми створимо робочий MVP однієї AI-автоматизації на ваших даних. Сподобалося: платите фіксовану ціну. Ні: не платите нічого.",
    badge: "Нульовий ризик",
    how: { title: "Як це працює", steps: [{ title: "День 1: старт", text: "30-хвилинний дзвінок, щоб узгодити обсяг робіт і доступи." }, { title: "Дні 2–4: розробка", text: "Ми будуємо MVP для одного визначеного процесу." }, { title: "День 5: демо", text: "Живе демо на ваших реальних або тестових даних." }] },
    get: { title: "Що ви отримуєте", items: ["Робочий MVP однієї автоматизації або агента", "Демо на ваших реальних або тестових даних", "Фіксовану ціну, якщо захочете його залишити", "Код і передачу проєкту, якщо ви його придбаєте"] },
    outcome: { title: "Два варіанти", like: "Вам сподобалося: ви платите фіксовану ціну та забираєте рішення (код + передача) і/або продовжуєте роботу з нами.", dislike: "Не сподобалося: ви нічого не платите і нічим не зобов'язані." },
    conditions: { title: "Умови", items: ["Один процес, обсяг узгоджується на 30-хвилинному стартовому дзвінку", "Ви надаєте доступи або тестові дані та відповідальну особу", "Кількість слотів на місяць обмежена (TODO: number)", "Компанії із 50+ співробітників", "Права інтелектуальної власності переходять після оплати"] },
    examples: { title: "Приклади MVP за 5 днів", items: ["Голосовий агент", "Чатбот на базі ваших знань", "Парсер лідів", "Вилучення даних із документів", "Воркфлоу на n8n"] },
    faq: [
      { q: "Кому належить код?", a: "Вам. Права інтелектуальної власності переходять після оплати." },
      { q: "Що, якщо нам потрібно більше часу?", a: "Безкоштовний MVP охоплює один визначений процес за 5 робочих днів. Усе більше ми оцінюємо разом." },
      { q: "Як щодо безпеки та NDA?", a: "Ми підписуємо NDA до того, як побачимо ваші дані, і можемо працювати на тестових даних." },
      { q: "А якщо результат нам не сподобається?", a: "Ви нічого не платите і нічим не зобов'язані." },
    ],
    form: {
      submit: "Замовити безкоштовний MVP",
      fields: [
        ...company,
        { name: "size", label: "Розмір компанії", type: "select", required: true, options: sizes },
        { name: "process", label: "Процес для автоматизації", type: "textarea", required: true },
        { name: "systems", label: "Задіяні системи", type: "text", placeholder: "CRM, ERP, Telegram…" },
        { name: "data", label: "Наявність даних", type: "select", required: true, options: [{ v: "yes", label: "Так, реальні дані" }, { v: "sample", label: "Тестові дані" }, { v: "no", label: "Даних поки немає" }] },
        { name: "success", label: "MVP вважатиметься успішним, якщо…", type: "textarea", required: true },
        { name: "start", label: "Бажана дата старту", type: "date" },
      ],
    },
  },
  assessment: {
    title: "AI-оцінка автоматизації",
    lead: "2–3 хвилини. Отримайте миттєву оцінку економії, індекс готовності та топ-3 автоматизації. Персональний план автоматизації прийде вам на пошту протягом 48 годин.",
    start: "Розпочати оцінку",
    restart: "Почати спочатку",
    steps: [
      { title: "Компанія", skippable: true, fields: [
        { name: "company", label: "Назва компанії", type: "text" },
        { name: "website", label: "Сайт", type: "url", placeholder: "https://" },
        { name: "country", label: "Країна", type: "select", options: countries },
        { name: "industry", label: "Галузь", type: "select", options: industries },
        { name: "size", label: "Розмір компанії", type: "select", options: sizes },
        { name: "revenue", label: "Річний дохід (необов'язково)", type: "select", options: [
          { v: "Under $1M", label: "До $1M" }, { v: "$1–10M", label: "$1–10M" }, { v: "$10–50M", label: "$10–50M" }, { v: "$50M+", label: "$50M+" },
        ] },
        { name: "model", label: "Бізнес-модель", type: "select", options: [
          { v: "B2B", label: "B2B" }, { v: "B2C", label: "B2C" }, { v: "Both", label: "Обидві" },
        ] },
      ] },
      { title: "Чим займається компанія", skippable: true, fields: [
        { name: "about", label: "Короткий опис", type: "textarea" },
        { name: "products", label: "Основні продукти або послуги", type: "text" },
        { name: "customers", label: "Типові клієнти", type: "text" },
        { name: "volume", label: "Лідів / замовлень / звернень на місяць", type: "select", options: [
          { v: "Under 100", label: "До 100" }, { v: "100–500", label: "100–500" }, { v: "500–2,000", label: "500–2 000" }, { v: "2,000+", label: "2 000+" },
        ] },
      ] },
      { title: "Поточні системи", skippable: true, fields: [
        { name: "systems", label: "Якими системами ви користуєтеся?", type: "multi", options: [
          { v: "CRM", label: "CRM" },
          { v: "ERP / 1C / Odoo / SAP", label: "ERP / 1С / Odoo / SAP" },
          { v: "Accounting", label: "Бухгалтерія" },
          { v: "E-commerce platform", label: "E-commerce платформа" },
          { v: "Telephony", label: "Телефонія" },
          { v: "Messengers (Telegram / WhatsApp / Viber)", label: "Месенджери (Telegram / WhatsApp / Viber)" },
          { v: "Email", label: "Електронна пошта" },
          { v: "Document storage", label: "Сховище документів" },
          { v: "BI", label: "BI" },
          { v: "Custom software", label: "Власне ПЗ" },
        ] },
        { name: "systemsOther", label: "Інше", type: "text" },
      ] },
      { title: "Що автоматизувати", skippable: true, fields: [
        { name: "departments", label: "Відділи для автоматизації", type: "multi", options: [
          { v: "sales", label: "Продажі" }, { v: "support", label: "Підтримка клієнтів" }, { v: "marketing", label: "Маркетинг" }, { v: "operations", label: "Операції / логістика" }, { v: "procurement", label: "Закупівлі / тендери" }, { v: "finance", label: "Фінанси та бухгалтерія" }, { v: "hr", label: "HR / рекрутинг" }, { v: "production", label: "Виробництво / якість" }, { v: "reporting", label: "Управлінська звітність" },
        ] },
        { name: "firstProcess", label: "Опишіть процес, який ви автоматизували б першим", type: "textarea" },
      ] },
      { title: "Масштаб проблеми", skippable: true, fields: [
        { name: "people", label: "Скільки людей залучено", type: "number", placeholder: "5" },
        { name: "hours", label: "Годин на тиждень, які кожен витрачає на рутину", type: "number", placeholder: "10" },
        { name: "cost", label: "Середня повна вартість години (USD)", type: "number", hint: "Підставлено за країною; змініть, якщо знаєте точніше." },
        { name: "errors", label: "Частка помилок / переробок", type: "select", options: [{ v: "low", label: "Низька" }, { v: "med", label: "Середня" }, { v: "high", label: "Висока" }] },
        { name: "response", label: "Поточний час відповіді на запит клієнта", type: "select", options: [
          { v: "Minutes", label: "Хвилини" }, { v: "Hours", label: "Години" }, { v: "1 day", label: "1 день" }, { v: "Several days", label: "Кілька днів" },
        ] },
      ] },
      { title: "Цілі та обмеження", skippable: true, fields: [
        { name: "goals", label: "Цілі", type: "multi", options: [
          { v: "Cut costs", label: "Скоротити витрати" }, { v: "Faster response", label: "Швидша відповідь" }, { v: "More leads", label: "Більше лідів" }, { v: "Fewer errors", label: "Менше помилок" }, { v: "Scale without hiring", label: "Масштабуватися без найму" }, { v: "Better reporting", label: "Краща звітність" },
        ] },
        { name: "sensitivity", label: "Чутливість даних", type: "select", options: [{ v: "low", label: "Низька" }, { v: "med", label: "Середня" }, { v: "high", label: "Висока (варто розглянути приватну LLM)" }] },
        { name: "compliance", label: "Вимоги до відповідності", type: "text", placeholder: "GDPR, …" },
        { name: "timeline", label: "Бажані терміни", type: "select", options: [
          { v: "ASAP", label: "Якнайшвидше" }, { v: "1–3 months", label: "1–3 місяці" }, { v: "3–6 months", label: "3–6 місяців" }, { v: "Just exploring", label: "Поки що придивляємося" },
        ] },
        { name: "budget", label: "Діапазон бюджету", type: "select", options: [
          { v: "Under $5k", label: "До $5k" }, { v: "$5–20k", label: "$5–20k" }, { v: "$20–50k", label: "$20–50k" }, { v: "$50k+", label: "$50k+" }, { v: "Not sure", label: "Ще не визначився" },
        ] },
        { name: "role", label: "Ваша роль", type: "select", options: [{ v: "decision", label: "Особа, що ухвалює рішення" }, { v: "influencer", label: "Впливаю на рішення" }, { v: "other", label: "Інше" }] },
      ] },
      { title: "Контакти", skippable: false, fields: [
        { name: "name", label: "Ваше ім'я", type: "text", required: true },
        { name: "email", label: "Робочий email", type: "email", required: true },
        { name: "phone", label: "Телефон / Telegram / WhatsApp (необов'язково)", type: "tel" },
      ] },
    ],
    result: {
      title: "Ваш результат",
      savedHours: "Зекономлено годин на рік",
      savedMoney: "Орієнтовна економія на рік",
      payback: "Термін окупності",
      readiness: "Індекс готовності",
      top: "Топ-3 рекомендовані автоматизації",
      next: "Рекомендований наступний крок",
      assumptions: "Оцінка ґрунтується на припущеннях: близько 40% годин рутини можна автоматизувати, вартість впровадження — $8k–$25k. Це орієнтир, а не пропозиція. TODO: owner to confirm assumptions.",
      promise: "Персональний план автоматизації прийде вам на пошту протягом 48 годин.",
      months: "міс.",
      perYear: "на рік",
      hoursYear: "годин / рік",
      nextLabels: { discovery: "Безкоштовний AI Discovery відділу", mvp: "Безкоштовний MVP за 5 днів", consultation: "Безкоштовна 30-хвилинна консультація" },
      bands: { low: "Початковий етап", mid: "Готові до пілота", high: "Готові до масштабування" },
      recs: {
        sales: { title: "AI-агент з продажів", text: "Пошук лідів, скоринг і перший контакт." },
        support: { title: "Чатбот / голосовий агент підтримки", text: "Відповіді на базі ваших знань 24/7." },
        marketing: { title: "Автоматизація маркетингу", text: "Контент і потоки лідів на n8n або Make." },
        operations: { title: "Автоматизація воркфлоу", text: "З'єднуємо системи та прибираємо ручні передачі." },
        procurement: { title: "AI для документів і тендерів", text: "Вилучення вимог і підготовка пропозицій." },
        finance: { title: "Автоматизація бек-офісу", text: "Документи, погодження та звірка." },
        hr: { title: "HR-асистент", text: "Автоматизація відбору кандидатів і планування співбесід." },
        production: { title: "Облік процесів і якості", text: "Реєстри та AI-аналіз інцидентів." },
        reporting: { title: "Дашборд звітності", text: "Управлінська звітність у реальному часі." },
        default: { title: "Дослідження процесів", text: "Знаходимо найкращу першу ціль для автоматизації." },
      },
    },
  },
  exit: { title: "Перш ніж піти: безкоштовний AI Discovery", text: "До 5 інтерв'ю, карти процесів і пріоритезована карта автоматизації одного відділу. Ринкова вартість ≈ $2,000, безкоштовно для компаній, що відповідають критеріям.", cta: "Дізнатися, як це працює", close: "Ні, дякую" },
  sticky: "Безкоштовний дзвінок",
  legal: { privacy: "Політика конфіденційності", terms: "Умови використання", cookies: "Політика cookie", body: "Це тимчасовий текст. Остаточний юридичний текст надасть компанія до запуску. TODO: legal text.", updated: "Чернетка" },
};
