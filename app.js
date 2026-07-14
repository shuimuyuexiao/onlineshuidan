const form = document.querySelector("#receiptForm");
const previewSurface = document.querySelector("#previewSurface");
const saveState = document.querySelector("#saveState");
const resetDemoBtn = document.querySelector("#resetDemoBtn");
const newIdBtn = document.querySelector("#newIdBtn");
const timeNowBtn = document.querySelector("#timeNowBtn");
const exportPngBtn = document.querySelector("#exportPngBtn");
const exportPdfBtn = document.querySelector("#exportPdfBtn");
const randomDocumentIdBtn = document.querySelector("#randomDocumentIdBtn");
const randomPayerIdBtn = document.querySelector("#randomPayerIdBtn");
const documentIdLabel = document.querySelector("#documentIdLabel");
const amountLabel = document.querySelector("#amountLabel");
const purposeLabel = document.querySelector("#purposeLabel");
const memoLabel = document.querySelector("#memoLabel");

const payerIdStorageKey = "payoutGenerator.payerIdsByPayerName.v2";
const templateNames = {
  gc: "1 GC模版",
  jialian: "2 嘉联模版",
  uq: "3 UQ模版",
  py: "4 PY模版"
};

const payerCompanies = {
  "LOCAL OPTION TECH LIMITED": "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
  "NO FIVE CONSOLIDATE IMPORT & EXPORT CO., LIMITED": "NO.16 6/F TOWER B NEW MANDARIN PLAZA NO.14 SCIENCE MUSEUM RD TSIM SHA TSUI HONG KONG",
  "MONOLITH TECHNOLOGY LIMITED": "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
  "STARPORT TRADING LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK",
  "CLICKBRIDGE TECHNOLOGY LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK",
  "MAYGOGH TRADING CO., LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK"
};

const styleDefaults = {
  gc: {
    language: "zh",
    receiptStyle: "gc",
    documentId: "42446071418192700706",
    documentDate: "2026-07-14",
    startedAt: "2026-07-14T18:21:25",
    completedAt: "2026-07-14T18:50:15",
    payoutDate: "2026-07-14",
    completeDate: "2026-07-14",
    status: "处理中",
    amount: "50000.00",
    payCurrency: "USD",
    receiveCurrency: "USD",
    receiveAmount: "50000.00",
    fee: "25.00",
    feeCurrency: "USD",
    paymentMethod: "SWIFT",
    exchangeRate: "-",
    paymentPurpose: "",
    memo: "",
    payerName: "CHIEN YU HUANG",
    payerAddress: "",
    payerEntityType: "COMPANY",
    payerReference: "",
    payerIdLabel: "公司ID",
    payerId: "004937100053",
    payerRef: "42446071418192700706",
    recipientName: "CHIEN YU HUANG",
    recipientAddress: "",
    recipientBank: "",
    recipientAccount: "049867609833",
    recipientSwift: "",
    routingNumber: "",
    recipientAccountLabel: "账户号码",
    recipientType: "Individual"
  },
  jialian: {
    language: "zh",
    receiptStyle: "jialian",
    documentId: "62118683074062844928",
    documentDate: "2026-07-14",
    startedAt: "2026-07-08T18:36:05",
    completedAt: "2026-07-08T18:36:05",
    payoutDate: "2026-07-08",
    completeDate: "2026-07-14",
    status: "Success",
    amount: "4631.00",
    payCurrency: "USD",
    receiveCurrency: "USD",
    receiveAmount: "4624.00",
    fee: "7.00",
    feeCurrency: "USD",
    paymentMethod: "SWIFT",
    exchangeRate: "-",
    paymentPurpose: "技术服务费",
    memo: "",
    payerName: "MONOLITH TECHNOLOGY LIMITED",
    payerAddress: "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
    payerEntityType: "COMPANY",
    payerReference: "",
    payerIdLabel: "公司ID",
    payerId: "",
    payerRef: "",
    recipientName: "NextHub Technologies LLC",
    recipientAddress: "",
    recipientBank: "Community Federal Savings Bank",
    recipientAccount: "8488788344",
    recipientSwift: "",
    routingNumber: "026073150",
    recipientAccountLabel: "银行账号",
    recipientType: "Company"
  },
  uq: {
    language: "en",
    receiptStyle: "uq",
    documentId: "P260714-STEBAFE0",
    documentDate: "2026-07-14",
    startedAt: "2026-07-14T11:56:30",
    completedAt: "",
    payoutDate: "2026-07-14",
    completeDate: "",
    status: "Pending",
    amount: "100000.00",
    payCurrency: "USD",
    receiveCurrency: "USD",
    receiveAmount: "100000.00",
    fee: "0.00",
    feeCurrency: "USD",
    paymentMethod: "SWIFT",
    exchangeRate: "-",
    paymentPurpose: "bill payment",
    memo: "",
    payerName: "STARPORT TRADING LIMITED",
    payerAddress: "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK",
    payerEntityType: "COMPANY",
    payerReference: "STARPORT TRADING LIMITED",
    payerIdLabel: "公司ID",
    payerId: "",
    payerRef: "",
    recipientName: "3U INTERNATIONAL TRADING (HK) LIMITED",
    recipientAddress: "FLAT/ROOM 1405B, 14/F, THE BELGIAN BANK BUILDING, NOS. 721-725 NATHAN ROAD, MONGKOK, KOWLOON, HONG KONG HK, HK, 999077, HK",
    recipientBank: "DBS BANK (HONG KONG) LIMITED",
    recipientAccount: "79829000687",
    recipientSwift: "DHBKHKHHXXX",
    routingNumber: "",
    recipientAccountLabel: "银行账号",
    recipientType: "Company"
  },
  py: {
    language: "en",
    receiptStyle: "py",
    documentId: "P2607142076598424801553196",
    documentDate: "2026-07-14",
    startedAt: "2026-07-14T14:59:03",
    completedAt: "",
    payoutDate: "2026-07-14",
    completeDate: "",
    status: "Processing",
    amount: "98980.00",
    payCurrency: "USD",
    receiveCurrency: "USD",
    receiveAmount: "98955.00",
    fee: "25.00",
    feeCurrency: "USD",
    paymentMethod: "SWIFT",
    exchangeRate: "-",
    paymentPurpose: "",
    memo: "-",
    payerName: "NO FIVE CONSOLIDATE IMPORT & EXPORT CO., LIMITED",
    payerAddress: "NO.16 6/F TOWER B NEW MANDARIN PLAZA NO.14 SCIENCE MUSEUM RD TSIM SHA TSUI HONG KONG",
    payerEntityType: "COMPANY",
    payerReference: "",
    payerIdLabel: "公司ID",
    payerId: "",
    payerRef: "",
    recipientName: "JAZ HAIR LIMITED",
    recipientAddress: "",
    recipientBank: "Standard Chartered Bank (China) Limited Shanghai Branch",
    recipientAccount: "NRA000000501511471324",
    recipientSwift: "SCBLCNSXSHA",
    routingNumber: "",
    recipientAccountLabel: "银行账号",
    recipientType: "Company"
  }
};

const templateUi = {
  gc: {
    idLabel: "订单编号",
    amountLabel: "金额",
    purposeLabel: "付款用途",
    memoLabel: "交易附言"
  },
  jialian: {
    idLabel: "交易编号",
    amountLabel: "您汇出",
    purposeLabel: "付款原因",
    memoLabel: "备注"
  },
  uq: {
    idLabel: "Reference ID",
    amountLabel: "Amount Paid",
    purposeLabel: "Payout Reason",
    memoLabel: "备注"
  },
  py: {
    idLabel: "Transaction ID",
    amountLabel: "Amount paid",
    purposeLabel: "付款原因",
    memoLabel: "Payment note"
  }
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
let activeStyle = getInitialStyle();
let isLoadingStyle = false;
const styleData = Object.fromEntries(Object.entries(styleDefaults).map(([key, value]) => [key, { ...value }]));

function pad(value) {
  return String(value).padStart(2, "0");
}

function getInitialStyle() {
  try {
    const style = new URLSearchParams(globalThis.location?.search || "").get("style");
    return styleDefaults[style] ? style : "gc";
  } catch (error) {
    return "gc";
  }
}

function applyCaptureMode() {
  try {
    const capture = new URLSearchParams(globalThis.location?.search || "").get("capture");
    document.body.classList.toggle("capture-preview", capture === "preview");
  } catch (error) {
    document.body.classList.remove("capture-preview");
  }
}

function randomNumber(max) {
  if (globalThis.crypto?.getRandomValues) {
    const values = new Uint32Array(1);
    globalThis.crypto.getRandomValues(values);
    return values[0] % max;
  }
  return Math.floor(Math.random() * max);
}

function randomDigits(length) {
  return Array.from({ length }, () => randomNumber(10)).join("");
}

function randomAlphaNum(length) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return Array.from({ length }, () => chars[randomNumber(chars.length)]).join("");
}

function compactDateStamp(date = new Date()) {
  return `${String(date.getFullYear()).slice(-2)}${pad(date.getMonth() + 1)}${pad(date.getDate())}`;
}

function generateDocumentId(style) {
  const now = new Date();
  if (style === "gc") return `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}${randomDigits(6)}`;
  if (style === "jialian") return randomDigits(20);
  if (style === "uq") return `P${compactDateStamp(now)}-${randomAlphaNum(8)}`;
  return `P${compactDateStamp(now)}${randomDigits(19)}`;
}

function generatePayerId(label) {
  if (label === "客户编号") return `CUS${randomDigits(9)}`;
  if (label === "账户号码") return randomDigits(12);
  return randomDigits(12);
}

function toLocalInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function toDateInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function parseDateInput(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateGc(value) {
  const date = parseDateInput(value);
  if (!date) return "";
  return `${pad(date.getDate())}-${monthNames[date.getMonth()]}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} (CST)`;
}

function formatDateTime(value) {
  const date = parseDateInput(value);
  if (!date) return "--";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatDateOnly(value) {
  const date = parseDateInput(value);
  if (!date) return "--";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatDotDate(value) {
  const date = parseDateInput(value);
  if (!date) return "--";
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

function formatMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "0.00";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function moneyToCents(value) {
  const amount = Number.parseFloat(value);
  if (!Number.isFinite(amount)) return 0;
  return Math.round(amount * 100);
}

function centsToInputValue(cents) {
  return (cents / 100).toFixed(2);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function displayLanguage(data) {
  if (data.receiptStyle === "uq" || data.receiptStyle === "py") return "en";
  return data.language || "zh";
}

function titleCaseMethod(value) {
  if (!value) return "";
  if (value.toUpperCase() === "SWIFT") return "Swift";
  return value;
}

function translateStatus(value, language, style) {
  if (style === "uq" || style === "py") {
    const map = { 处理中: "Processing", 已完成: "Success", 待确认: "Pending", 已取消: "Cancelled" };
    return map[value] || value;
  }
  if (language === "en") {
    const map = { 处理中: "Processing", 已完成: "Completed", 待确认: "Pending Confirmation", 已取消: "Cancelled" };
    return map[value] || value;
  }
  const map = { Success: "付款成功", Pending: "待处理", Processing: "处理中" };
  return map[value] || value;
}

function translatePurpose(value, language, style) {
  if (!value) return "";
  if (style === "uq" || style === "py") return value;
  const zhToEn = {
    技术服务费: "Technical service fees",
    供应商付款: "Supplier payment",
    账单付款: "bill payment"
  };
  const enToZh = {
    "Technical service fees": "技术服务费",
    "bill payment": "账单付款",
    "Supplier payment": "供应商付款"
  };
  return language === "en" ? zhToEn[value] || value : enToZh[value] || value;
}

function readStoredPayerIds() {
  try {
    return JSON.parse(globalThis.localStorage?.getItem(payerIdStorageKey) || "{}");
  } catch (error) {
    return {};
  }
}

function writeStoredPayerIds(values) {
  try {
    globalThis.localStorage?.setItem(payerIdStorageKey, JSON.stringify(values));
  } catch (error) {
    // Local storage is optional.
  }
}

function saveCurrentPayerId() {
  if (activeStyle !== "gc") return;
  const payerKey = form.elements.payerName.value.trim().toUpperCase();
  const value = form.elements.payerId.value.trim();
  if (!payerKey) return;
  const stored = readStoredPayerIds();
  if (value) stored[payerKey] = value;
  else delete stored[payerKey];
  writeStoredPayerIds(stored);
}

function applyStoredPayerId({ clearIfMissing = false } = {}) {
  if (activeStyle !== "gc") return;
  const payerKey = form.elements.payerName.value.trim().toUpperCase();
  if (!payerKey) return;
  const stored = readStoredPayerIds();
  if (stored[payerKey]) {
    form.elements.payerId.value = stored[payerKey];
  } else if (clearIfMissing) {
    form.elements.payerId.value = "";
  }
}

function getFormData() {
  return Object.fromEntries(new FormData(form).entries());
}

function setFormValues(values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value ?? "";
  });
}

function getStyleValues() {
  return getFormData();
}

function getData() {
  const data = getFormData();
  data.receiptStyle = data.receiptStyle || activeStyle;
  return normalizeData(data);
}

function normalizeData(data) {
  const normalized = { ...data };
  if (["jialian", "py"].includes(normalized.receiptStyle)) {
    const paidCents = moneyToCents(normalized.receiveAmount) + moneyToCents(normalized.fee);
    normalized.amount = centsToInputValue(paidCents);
  }
  normalized.language = displayLanguage(normalized);
  normalized.amountText = `${formatMoney(normalized.amount)} ${normalized.payCurrency}`;
  normalized.receiveAmountText = `${formatMoney(normalized.receiveAmount)} ${normalized.receiveCurrency}`;
  normalized.feeText = `${formatMoney(normalized.fee)} ${normalized.feeCurrency}`;
  normalized.statusText = translateStatus(normalized.status, normalized.language, normalized.receiptStyle);
  normalized.paymentPurposeText = translatePurpose(normalized.paymentPurpose, normalized.language, normalized.receiptStyle);
  normalized.startedAtGc = formatDateGc(normalized.startedAt);
  normalized.completedAtGc = normalized.completedAt ? formatDateGc(normalized.completedAt) : "";
  normalized.startedAtDisplay = formatDateTime(normalized.startedAt);
  normalized.completedAtDisplay = normalized.completedAt ? formatDateTime(normalized.completedAt) : "--";
  normalized.documentDateDisplay = formatDateOnly(normalized.documentDate);
  normalized.documentDateDot = formatDotDate(normalized.documentDate);
  normalized.payoutDateDisplay = formatDateOnly(normalized.payoutDate);
  normalized.completeDateDisplay = normalized.completeDate ? formatDateOnly(normalized.completeDate) : "--";
  normalized.paymentMethodDisplay = normalized.receiptStyle === "gc" || normalized.receiptStyle === "jialian" ? normalized.paymentMethod : titleCaseMethod(normalized.paymentMethod);
  return normalized;
}

function saveActiveStyleData() {
  if (isLoadingStyle) return;
  syncAmounts();
  styleData[activeStyle] = {
    ...styleData[activeStyle],
    ...getStyleValues()
  };
}

function loadStyleData(style) {
  isLoadingStyle = true;
  setFormValues({
    ...styleData[style],
    receiptStyle: style
  });
  activeStyle = style;
  syncTemplateReferences();
  syncAmounts();
  applyFormMode(style);
  isLoadingStyle = false;
}

function syncTemplateReferences() {
  if (activeStyle === "gc") {
    form.elements.payerRef.value = form.elements.documentId.value;
  }
  if (activeStyle === "uq" && !form.elements.payerReference.value) {
    form.elements.payerReference.value = form.elements.payerName.value;
  }
}

function syncCompanyAddress({ force = false } = {}) {
  const name = form.elements.payerName.value.trim().toUpperCase();
  const address = payerCompanies[name];
  if (address && (force || !form.elements.payerAddress.value.trim())) {
    form.elements.payerAddress.value = address;
  }
  if (activeStyle === "uq" && (!form.elements.payerReference.value.trim() || force)) {
    form.elements.payerReference.value = form.elements.payerName.value;
  }
}

function syncAmounts(event) {
  const target = event?.target;
  if (["jialian", "py"].includes(activeStyle)) {
    const paidCents = moneyToCents(form.elements.receiveAmount.value) + moneyToCents(form.elements.fee.value);
    form.elements.amount.value = centsToInputValue(paidCents);
  } else if (target?.name === "amount") {
    form.elements.receiveAmount.value = target.value;
  }
  if (target?.name === "payCurrency") {
    form.elements.receiveCurrency.value = target.value;
    form.elements.feeCurrency.value = target.value;
  }
}

function applyFormMode(style) {
  const ui = templateUi[style];
  documentIdLabel.textContent = ui.idLabel;
  amountLabel.textContent = ui.amountLabel;
  purposeLabel.textContent = ui.purposeLabel;
  memoLabel.textContent = ui.memoLabel;
  form.elements.amount.readOnly = ["jialian", "py"].includes(style);
  form.elements.language.disabled = false;
  form.querySelectorAll("[data-templates]").forEach((node) => {
    const templates = node.dataset.templates.split(/\s+/);
    node.classList.toggle("is-hidden", !templates.includes(style));
  });
}

function field(label, value, className = "") {
  return `<div class="${className}"><div class="doc-label">${escapeHtml(label)}</div><div class="doc-value">${escapeHtml(value || "")}</div></div>`;
}

function renderGc(data) {
  const en = data.language === "en";
  const labels = en
    ? {
        title: "PAYMENT RECEIPT",
        status: "Transaction Status:",
        order: "Order ID:",
        details: "Transaction Details",
        started: "Initiated Date",
        completed: "Completion Date",
        amount: "Amount",
        method: "Payment Method",
        fee: "Processing Fee",
        memo: "Transaction Remarks",
        payer: "Payer",
        recipient: "Recipient",
        payerId: data.payerIdLabel === "客户编号" ? "Customer ID:" : data.payerIdLabel === "账户号码" ? "Account No.:" : "Company ID:",
        ref: "Payment Reference:",
        account: data.recipientAccountLabel === "银行账号" ? "Bank Account No.:" : data.recipientAccountLabel === "IBAN" ? "IBAN:" : "Account Number:",
        type: "Recipient Type:",
        summary: "Payment Summary",
        payCurrency: "Currency",
        payAmount: "Amount Sent",
        receiveCurrency: "Currency",
        receiveAmount: "Amount Received",
        total: "Total:",
        printDate: "Document Generation Date:",
        valid: "This electronic receipt is valid without signature"
      }
    : {
        title: "付款回单",
        status: "交易状态:",
        order: "订单编号:",
        details: "交易详情",
        started: "交易发起日期",
        completed: "交易完成日期",
        amount: "金额",
        method: "支付方式",
        fee: "手续费",
        memo: "交易附言",
        payer: "付款方",
        recipient: "收款方",
        payerId: `${data.payerIdLabel}:`,
        ref: "付款参考号:",
        account: `${data.recipientAccountLabel}:`,
        type: "收款方类型:",
        summary: "支付摘要",
        payCurrency: "支付币种",
        payAmount: "支付金额",
        receiveCurrency: "收款币种",
        receiveAmount: "收款金额",
        total: "总计:",
        printDate: "打印日期:",
        valid: "本电子通知单无需签名即有效"
      };
  return `
    <div class="gc-title">${labels.title}</div>
    <div class="gc-rule"></div>
    <div class="gc-topline">
      <div>${labels.status} <strong>${escapeHtml(data.statusText)}</strong></div>
      <div>${labels.order} <strong>${escapeHtml(data.documentId)}</strong></div>
    </div>
    <section class="gc-section">
      <h3>${labels.details}</h3>
      <div class="gc-detail-table">
        <div class="gc-row"><span>${labels.started}</span><strong>${escapeHtml(data.startedAtGc)}</strong></div>
        <div class="gc-row"><span>${labels.completed}</span><strong>${escapeHtml(data.completedAtGc)}</strong></div>
        <div class="gc-row"><span>${labels.amount}</span><strong>${escapeHtml(formatMoney(data.amount))}</strong></div>
        <div class="gc-row"><span>${labels.method}</span><strong>${escapeHtml(data.paymentMethodDisplay)}</strong></div>
        <div class="gc-row"><span>${labels.fee}</span><strong>${escapeHtml(data.feeText)}</strong></div>
        <div class="gc-row"><span>${labels.memo}</span><strong>${escapeHtml(data.memo)}</strong></div>
      </div>
    </section>
    <section class="gc-section gc-party-grid">
      <div>
        <h3 class="gc-party-title">${labels.payer}</h3>
        <div class="gc-party-card">
          <div class="gc-party-name">${escapeHtml(data.payerName)}</div>
          <div class="doc-label">${labels.payerId}</div>
          <div class="doc-value">${escapeHtml(data.payerId)}</div>
          <div class="doc-label">${labels.ref}</div>
          <div class="doc-value">${escapeHtml(data.payerRef)}</div>
        </div>
      </div>
      <div>
        <h3 class="gc-party-title">${labels.recipient}</h3>
        <div class="gc-party-card">
          <div class="gc-party-name">${escapeHtml(data.recipientName)}</div>
          <div class="doc-label">${labels.account}</div>
          <div class="doc-value">${escapeHtml(data.recipientAccount)}</div>
          <div class="doc-label">${labels.type}</div>
          <div class="doc-value">${escapeHtml(data.recipientType)}</div>
        </div>
      </div>
    </section>
    <section class="gc-section">
      <h3>${labels.summary}</h3>
      <div class="gc-summary-table">
        <div class="gc-summary-row gc-summary-head"><span>${labels.payCurrency}</span><span>${labels.payAmount}</span><span>${labels.receiveCurrency}</span><span>${labels.receiveAmount}</span></div>
        <div class="gc-summary-row"><span>${escapeHtml(data.payCurrency)}</span><span>${escapeHtml(formatMoney(data.amount))}</span><span>${escapeHtml(data.receiveCurrency)}</span><span>${escapeHtml(formatMoney(data.receiveAmount))}</span></div>
        <div class="gc-summary-row"><span>${labels.total}</span><strong>${escapeHtml(data.amountText)}</strong><span>${labels.total}</span><strong>${escapeHtml(data.receiveAmountText)}</strong></div>
      </div>
    </section>
    <footer class="gc-footer"><span>${labels.printDate}</span><span>${escapeHtml(data.documentDateDisplay)}</span><span>${labels.valid}</span></footer>
  `;
}

function renderJialian(data) {
  const en = data.language === "en";
  const labels = en
    ? {
        id: "Transaction ID",
        time: "Timestamp",
        title: "Payment Confirmation Letter",
        details: "Payment Details",
        enterprise: "Enterprise Name",
        sent: "You sent",
        fee: "Transaction Fee",
        rate: "Exchange Rate",
        received: "Received",
        paymentTime: "Payment Time",
        status: "Status",
        reason: "Payment Reason",
        payee: "Payee Information",
        accountName: "Account Name",
        bankName: "Bank Name",
        accountNo: "Bank Account Number",
        routing: "Routing Number"
      }
    : {
        id: "交易编号",
        time: "生成时间",
        title: "支付确认函",
        details: "付款明细",
        enterprise: "企业名称",
        sent: "您汇出",
        fee: "手续费",
        rate: "汇率",
        received: "收款方收到",
        paymentTime: "付款时间",
        status: "付款状态",
        reason: "付款原因",
        payee: "收款方信息",
        accountName: "账户名称",
        bankName: "银行名称",
        accountNo: "银行账号",
        routing: "Routing Number"
      };
  return `
    <div class="jl-meta">
      ${field(labels.id, data.documentId)}
      ${field(labels.time, data.documentDateDot)}
    </div>
    <h1 class="jl-title">${labels.title}</h1>
    <section class="jl-section">
      <h3>${labels.details}</h3>
      <div class="jl-grid">
        ${field(labels.enterprise, data.payerName)}
        ${field(labels.sent, data.amountText)}
        ${field(labels.fee, data.feeText)}
        ${field(labels.rate, data.exchangeRate || "-")}
        ${field(labels.received, data.receiveAmountText)}
        ${field(labels.paymentTime, data.startedAtDisplay)}
        ${field(labels.status, data.statusText)}
        ${field(labels.reason, data.paymentPurposeText)}
      </div>
    </section>
    <section class="jl-section">
      <h3>${labels.payee}</h3>
      <div class="jl-grid">
        ${field(labels.accountName, data.recipientName)}
        ${field(labels.bankName, data.recipientBank)}
        ${field(labels.accountNo, data.recipientAccount)}
        ${field(labels.routing, data.routingNumber)}
      </div>
    </section>
  `;
}

function renderUq(data) {
  return `
    <div class="uq-meta">
      ${field("Reference ID", data.documentId)}
      ${field("Complete Date", data.completeDateDisplay)}
    </div>
    <h1 class="uq-title">Payout Confirmation</h1>
    <section class="uq-section">
      <h3>Payout Detail</h3>
      <div class="uq-grid">
        ${field("Amount Paid", data.amountText)}
        ${field("Amount Received", data.receiveAmountText)}
        ${field("Create Time", data.startedAtDisplay)}
        ${field("Payout Date", data.payoutDateDisplay)}
        ${field("Complete Time", data.completedAtDisplay)}
        ${field("Payout Status", data.statusText)}
        ${field("Payout Reason", data.paymentPurposeText)}
        ${field("Payment Method", data.paymentMethodDisplay)}
        ${field("Payout Reference", data.payerReference, "doc-wide")}
      </div>
    </section>
    <section class="uq-section">
      <h3>Receipt Detail</h3>
      <div class="uq-grid">
        ${field("Recipient Name", data.recipientName)}
        ${field("Bank Name", data.recipientBank)}
        ${field("Swift Code", data.recipientSwift)}
        ${field("Account Number", data.recipientAccount)}
        ${field("Address", data.recipientAddress, "doc-wide")}
      </div>
    </section>
    <section class="uq-section">
      <h3>Payer Detail</h3>
      <div class="uq-grid">
        ${field("Payer Name", data.payerName)}
        ${field("Entity Type", data.payerEntityType)}
        ${field("Address", data.payerAddress, "doc-wide")}
      </div>
    </section>
    <footer class="uq-footer">Page 1 of 1</footer>
  `;
}

function renderPy(data) {
  return `
    <header class="py-header">
      <h1 class="py-title">Transfer Notice</h1>
      <div class="py-meta">${field("Transaction ID", data.documentId)}</div>
    </header>
    <section class="py-card">
      <h3>Payment details</h3>
      <div class="py-grid">
        ${field("Amount paid", data.amountText)}
        ${field("Amount received", data.receiveAmountText)}
        ${field("Transaction fee", data.feeText)}
        ${field("Payment method", data.paymentMethodDisplay)}
        ${field("Creation time", data.startedAtDisplay)}
        ${field("Payment time", data.completedAtDisplay)}
        ${field("Payment Status", data.statusText)}
        ${field("Payment note", data.memo || "-")}
        ${field("Payer Name", data.payerName, "doc-wide")}
      </div>
    </section>
    <section class="py-card">
      <h3>Recipient Information</h3>
      <div class="py-grid">
        ${field("Account Name", data.recipientName)}
        ${field("Bank Account Number", data.recipientAccount)}
        ${field("Bank Name", data.recipientBank)}
        ${field("Swift Remittance Routing Number", data.recipientSwift)}
      </div>
    </section>
    <div class="py-note">1.Time zone: China / Hong Kong<br />2.Not including intermediary or recipient bank charges</div>
  `;
}

function renderPreview() {
  const data = getData();
  previewSurface.className = `paper ${data.receiptStyle}-paper`;
  document.documentElement.lang = data.language === "en" ? "en" : "zh-CN";
  if (data.receiptStyle === "gc") previewSurface.innerHTML = renderGc(data);
  if (data.receiptStyle === "jialian") previewSurface.innerHTML = renderJialian(data);
  if (data.receiptStyle === "uq") previewSurface.innerHTML = renderUq(data);
  if (data.receiptStyle === "py") previewSurface.innerHTML = renderPy(data);
  saveState.textContent = "已同步";
}

function updateAll(event) {
  if (event?.target?.name === "receiptStyle") {
    saveActiveStyleData();
    loadStyleData(event.target.value);
    renderPreview();
    return;
  }
  saveState.textContent = "同步中";
  if (event?.target?.name === "documentId") syncTemplateReferences();
  if (event?.target?.name === "payerName") {
    syncCompanyAddress({ force: event.type === "change" });
    applyStoredPayerId({ clearIfMissing: event.type === "change" });
  }
  if (event?.target?.name === "payerIdLabel") applyStoredPayerId();
  syncAmounts(event);
  saveActiveStyleData();
  renderPreview();
}

function resetDemo() {
  styleData[activeStyle] = { ...styleDefaults[activeStyle] };
  loadStyleData(activeStyle);
  applyStoredPayerId();
  renderPreview();
}

function newDocumentId() {
  form.elements.documentId.value = generateDocumentId(activeStyle);
  syncTemplateReferences();
  saveActiveStyleData();
  renderPreview();
}

function setCurrentTime() {
  const now = new Date();
  const done = new Date(now.getTime() + 2 * 60 * 1000);
  form.elements.documentDate.value = toDateInputValue(now);
  form.elements.payoutDate.value = toDateInputValue(now);
  form.elements.completeDate.value = toDateInputValue(done);
  form.elements.startedAt.value = toLocalInputValue(now);
  form.elements.completedAt.value = toLocalInputValue(done);
  saveActiveStyleData();
  renderPreview();
}

function randomizePayerId() {
  form.elements.payerId.value = generatePayerId(form.elements.payerIdLabel.value);
  saveCurrentPayerId();
  saveActiveStyleData();
  renderPreview();
}

function createCanvas() {
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 1200;
  const height = 1700;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);
  return { canvas, ctx, width, height };
}

const bankFont = 'Arial, Helvetica, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Microsoft YaHei", sans-serif';

function setFont(ctx, size, weight = 400, family = bankFont) {
  ctx.font = `${weight} ${size}px ${family}`;
}

function drawText(ctx, text, x, y, options = {}) {
  const {
    size = 22,
    weight = 400,
    color = "#111722",
    align = "left",
    maxWidth = 1000,
    family = bankFont
  } = options;
  ctx.fillStyle = color;
  setFont(ctx, size, weight, family);
  ctx.textBaseline = "top";
  ctx.textAlign = align;
  ctx.fillText(String(text || ""), x, y, maxWidth);
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 3) {
  const raw = String(text || "");
  const words = raw.includes(" ") ? raw.split(/(\s+)/) : Array.from(raw);
  let line = "";
  let lines = 0;
  for (let i = 0; i < words.length; i += 1) {
    const test = line + words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line.trimEnd(), x, y);
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines) return lines;
      line = words[i].trimStart();
    } else {
      line = test;
    }
  }
  if (line && lines < maxLines) {
    ctx.fillText(line.trimEnd(), x, y);
    lines += 1;
  }
  return lines;
}

function drawWrapped(ctx, text, x, y, maxWidth, options = {}) {
  const { size = 22, weight = 700, color = "#111722", lineHeight = size + 8, maxLines = 3 } = options;
  ctx.fillStyle = color;
  setFont(ctx, size, weight);
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  return wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines);
}

function drawLabelValue(ctx, label, value, x, y, width, options = {}) {
  const labelSize = options.labelSize || 20;
  const valueSize = options.valueSize || 23;
  drawText(ctx, label, x, y, { size: labelSize, color: options.labelColor || "#687082", maxWidth: width });
  drawWrapped(ctx, value, x, y + labelSize + 10, width, {
    size: valueSize,
    weight: options.weight || 700,
    lineHeight: valueSize + 8,
    maxLines: options.maxLines || 2
  });
}

function drawGcCanvas(data) {
  const { canvas, ctx, width, height } = createCanvas();
  const en = data.language === "en";
  const labels = en
    ? {
        title: "PAYMENT RECEIPT",
        status: "Transaction Status:",
        order: "Order ID:",
        details: "Transaction Details",
        rows: ["Initiated Date", "Completion Date", "Amount", "Payment Method", "Processing Fee", "Transaction Remarks"],
        payer: "Payer",
        recipient: "Recipient",
        payerId: data.payerIdLabel === "客户编号" ? "Customer ID:" : data.payerIdLabel === "账户号码" ? "Account No.:" : "Company ID:",
        ref: "Payment Reference:",
        account: data.recipientAccountLabel === "银行账号" ? "Bank Account No.:" : "Account Number:",
        type: "Recipient Type:",
        summary: "Payment Summary",
        head: ["Currency", "Amount Sent", "Currency", "Amount Received"],
        total: "Total:",
        footerDate: "Document Generation Date:",
        valid: "This electronic receipt is valid without signature"
      }
    : {
        title: "付款回单",
        status: "交易状态:",
        order: "订单编号:",
        details: "交易详情",
        rows: ["交易发起日期", "交易完成日期", "金额", "支付方式", "手续费", "交易附言"],
        payer: "付款方",
        recipient: "收款方",
        payerId: `${data.payerIdLabel}:`,
        ref: "付款参考号:",
        account: `${data.recipientAccountLabel}:`,
        type: "收款方类型:",
        summary: "支付摘要",
        head: ["支付币种", "支付金额", "收款币种", "收款金额"],
        total: "总计:",
        footerDate: "打印日期:",
        valid: "本电子通知单无需签名即有效"
      };
  const margin = 36;
  drawText(ctx, labels.title, width - margin, 100, { size: 29, weight: 700, align: "right", color: "#263244" });
  ctx.strokeStyle = "#dfe3ea";
  ctx.beginPath();
  ctx.moveTo(0, 172);
  ctx.lineTo(width, 172);
  ctx.stroke();
  drawText(ctx, labels.status, margin + 4, 218, { size: 23 });
  drawText(ctx, data.statusText, margin + 148, 218, { size: 23, weight: 700 });
  drawText(ctx, `${labels.order} ${data.documentId}`, width - margin, 218, { size: 23, align: "right" });
  drawText(ctx, labels.details, margin + 4, 296, { size: 24, weight: 700, color: "#344154" });
  const tableX = margin;
  let tableY = 332;
  const labelW = 306;
  const rowH = 66;
  const rows = [
    [labels.rows[0], data.startedAtGc],
    [labels.rows[1], data.completedAtGc],
    [labels.rows[2], formatMoney(data.amount)],
    [labels.rows[3], data.paymentMethodDisplay],
    [labels.rows[4], data.feeText],
    [labels.rows[5], data.memo]
  ];
  rows.forEach(([label, value]) => {
    ctx.fillStyle = "#f7f8fa";
    ctx.fillRect(tableX, tableY, labelW, rowH);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(tableX + labelW, tableY, width - margin * 2 - labelW, rowH);
    ctx.strokeStyle = "#d9dee7";
    ctx.strokeRect(tableX, tableY, width - margin * 2, rowH);
    drawText(ctx, label, tableX + 18, tableY + 18, { size: 22 });
    drawText(ctx, value, tableX + labelW + 8, tableY + 18, { size: 22, maxWidth: width - margin * 2 - labelW - 20 });
    tableY += rowH;
  });
  const partyY = tableY + 92;
  const cardW = (width - margin * 2 - 46) / 2;
  function partyCard(x, title, name, firstLabel, firstValue, secondLabel, secondValue) {
    drawText(ctx, title, x, partyY - 32, { size: 23, weight: 700, color: "#344154" });
    ctx.strokeStyle = "#d9dee7";
    ctx.strokeRect(x, partyY, cardW, 258);
    drawWrapped(ctx, name, x + 28, partyY + 28, cardW - 56, { size: 24, weight: 500, maxLines: 3 });
    drawLabelValue(ctx, firstLabel, firstValue, x + 28, partyY + 104, cardW - 56, { labelSize: 20, valueSize: 22, weight: 500 });
    drawLabelValue(ctx, secondLabel, secondValue, x + 28, partyY + 174, cardW - 56, { labelSize: 20, valueSize: 22, weight: 500 });
  }
  partyCard(margin, labels.payer, data.payerName, labels.payerId, data.payerId, labels.ref, data.payerRef);
  partyCard(margin + cardW + 46, labels.recipient, data.recipientName, labels.account, data.recipientAccount, labels.type, data.recipientType);
  const summaryY = partyY + 360;
  drawText(ctx, labels.summary, margin, summaryY - 34, { size: 23, weight: 700, color: "#344154" });
  const colW = (width - margin * 2) / 4;
  const summaryRows = [labels.head, [data.payCurrency, formatMoney(data.amount), data.receiveCurrency, formatMoney(data.receiveAmount)], [labels.total, data.amountText, labels.total, data.receiveAmountText]];
  summaryRows.forEach((row, ri) => {
    row.forEach((text, ci) => {
      const x = margin + colW * ci;
      const y = summaryY + rowH * ri;
      ctx.fillStyle = ri === 0 ? "#f7f8fa" : "#ffffff";
      ctx.fillRect(x, y, colW, rowH);
      ctx.strokeStyle = "#d9dee7";
      ctx.strokeRect(x, y, colW, rowH);
      drawText(ctx, text, x + 22, y + 18, { size: 22, weight: ri === 0 || ri === 2 ? 700 : 400, maxWidth: colW - 44 });
    });
  });
  ctx.strokeStyle = "#dfe3ea";
  ctx.beginPath();
  ctx.moveTo(0, height - 92);
  ctx.lineTo(width, height - 92);
  ctx.stroke();
  drawText(ctx, `${labels.footerDate} ${data.documentDateDisplay}`, width - 330, height - 70, { size: 17 });
  drawText(ctx, labels.valid, width - 330, height - 38, { size: 17 });
  return canvas;
}

function drawJialianCanvas(data) {
  const { canvas, ctx, width } = createCanvas();
  const en = data.language === "en";
  const labels = en
    ? {
        id: "Transaction ID",
        time: "Timestamp",
        title: "Payment Confirmation Letter",
        details: "Payment Details",
        enterprise: "Enterprise Name",
        sent: "You sent",
        fee: "Transaction Fee",
        rate: "Exchange Rate",
        received: "Received",
        paymentTime: "Payment Time",
        status: "Status",
        reason: "Payment Reason",
        payee: "Payee Information",
        accountName: "Account Name",
        bankName: "Bank Name",
        accountNo: "Bank Account Number",
        routing: "Routing Number"
      }
    : {
        id: "交易编号",
        time: "生成时间",
        title: "支付确认函",
        details: "付款明细",
        enterprise: "企业名称",
        sent: "您汇出",
        fee: "手续费",
        rate: "汇率",
        received: "收款方收到",
        paymentTime: "付款时间",
        status: "付款状态",
        reason: "付款原因",
        payee: "收款方信息",
        accountName: "账户名称",
        bankName: "银行名称",
        accountNo: "银行账号",
        routing: "Routing Number"
      };
  const margin = 144;
  const colW = 360;
  drawLabelValue(ctx, labels.id, data.documentId, width - 530, 64, 250, { labelSize: 20, valueSize: 21 });
  drawLabelValue(ctx, labels.time, data.documentDateDot, width - 250, 64, 180, { labelSize: 20, valueSize: 21 });
  drawText(ctx, labels.title, margin, 232, { size: en ? 42 : 44, weight: 700 });
  drawText(ctx, labels.details, margin, 370, { size: 34, weight: 700 });
  const left = margin;
  const right = margin + 500;
  let y = 460;
  drawLabelValue(ctx, labels.enterprise, data.payerName, left, y, colW);
  drawLabelValue(ctx, labels.sent, data.amountText, right, y, colW);
  y += 90;
  drawLabelValue(ctx, labels.fee, data.feeText, left, y, colW);
  drawLabelValue(ctx, labels.rate, data.exchangeRate || "-", right, y, colW);
  y += 90;
  drawLabelValue(ctx, labels.received, data.receiveAmountText, left, y, colW);
  drawLabelValue(ctx, labels.paymentTime, data.startedAtDisplay, right, y, colW);
  y += 90;
  drawLabelValue(ctx, labels.status, data.statusText, left, y, colW);
  drawLabelValue(ctx, labels.reason, data.paymentPurposeText, right, y, colW);
  y += 150;
  drawText(ctx, labels.payee, margin, y, { size: 34, weight: 700 });
  y += 90;
  drawLabelValue(ctx, labels.accountName, data.recipientName, left, y, colW, { maxLines: 2 });
  drawLabelValue(ctx, labels.bankName, data.recipientBank, right, y, colW, { maxLines: 2 });
  y += 90;
  drawLabelValue(ctx, labels.accountNo, data.recipientAccount, left, y, colW);
  drawLabelValue(ctx, labels.routing, data.routingNumber, right, y, colW);
  return canvas;
}

function drawUqCanvas(data) {
  const { canvas, ctx, width, height } = createCanvas();
  const margin = 120;
  const rightX = margin + 515;
  const colW = 430;
  drawLabelValue(ctx, "Reference ID", data.documentId, width - 510, 48, 220, { labelSize: 20, valueSize: 22 });
  drawLabelValue(ctx, "Complete Date", data.completeDateDisplay, width - 260, 48, 160, { labelSize: 20, valueSize: 22 });
  drawText(ctx, "Payout Confirmation", margin, 150, { size: 40, weight: 700 });
  drawText(ctx, "Payout Detail", margin, 260, { size: 31, weight: 700 });
  let y = 320;
  drawLabelValue(ctx, "Amount Paid", data.amountText, margin, y, colW);
  drawLabelValue(ctx, "Amount Received", data.receiveAmountText, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Create Time", data.startedAtDisplay, margin, y, colW);
  drawLabelValue(ctx, "Payout Date", data.payoutDateDisplay, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Complete Time", data.completedAtDisplay, margin, y, colW);
  drawLabelValue(ctx, "Payout Status", data.statusText, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Payout Reason", data.paymentPurposeText, margin, y, colW);
  drawLabelValue(ctx, "Payment Method", data.paymentMethodDisplay, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Payout Reference", data.payerReference, margin, y, colW * 2);
  y += 120;
  drawText(ctx, "Receipt Detail", margin, y, { size: 31, weight: 700 });
  y += 58;
  drawLabelValue(ctx, "Recipient Name", data.recipientName, margin, y, colW);
  drawLabelValue(ctx, "Bank Name", data.recipientBank, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Swift Code", data.recipientSwift, margin, y, colW);
  drawLabelValue(ctx, "Account Number", data.recipientAccount, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Address", data.recipientAddress, margin, y, colW * 2 + 80, { maxLines: 3 });
  y += 150;
  drawText(ctx, "Payer Detail", margin, y, { size: 31, weight: 700 });
  y += 58;
  drawLabelValue(ctx, "Payer Name", data.payerName, margin, y, colW);
  drawLabelValue(ctx, "Entity Type", data.payerEntityType, rightX, y, colW);
  y += 70;
  drawLabelValue(ctx, "Address", data.payerAddress, margin, y, colW * 2 + 80, { maxLines: 3 });
  ctx.fillStyle = "#f2f3f5";
  ctx.fillRect(0, height - 130, width, 130);
  drawText(ctx, "Page 1 of 1", width - 120, height - 84, { size: 18, align: "right" });
  return canvas;
}

function drawPyCanvas(data) {
  const { canvas, ctx, width } = createCanvas();
  const margin = 72;
  drawText(ctx, "Transfer Notice", margin, 230, { size: 50, weight: 700 });
  drawLabelValue(ctx, "Transaction ID", data.documentId, width - 455, 200, 390, { labelSize: 27, valueSize: 31, weight: 500 });
  function card(x, y, h, title) {
    ctx.strokeStyle = "#dfe3eb";
    ctx.strokeRect(x, y, width - margin * 2, h);
    drawText(ctx, title, x + 40, y + 46, { size: 40, weight: 700 });
  }
  const left = margin + 40;
  const right = margin + 520;
  const colW = 450;
  card(margin, 322, 640, "Payment details");
  let y = 436;
  drawLabelValue(ctx, "Amount paid", data.amountText, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  drawLabelValue(ctx, "Amount received", data.receiveAmountText, right, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  y += 98;
  drawLabelValue(ctx, "Transaction fee", data.feeText, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  drawLabelValue(ctx, "Payment method", data.paymentMethodDisplay, right, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  y += 98;
  drawLabelValue(ctx, "Creation time", data.startedAtDisplay, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  drawLabelValue(ctx, "Payment time", data.completedAtDisplay, right, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  y += 98;
  drawLabelValue(ctx, "Payment Status", data.statusText, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  drawLabelValue(ctx, "Payment note", data.memo || "-", right, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  y += 98;
  drawLabelValue(ctx, "Payer Name", data.payerName, left, y, colW * 2, { labelSize: 27, valueSize: 31, weight: 500, maxLines: 2 });
  card(margin, 998, 354, "Recipient Information");
  y = 1122;
  drawLabelValue(ctx, "Account Name", data.recipientName, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500, maxLines: 2 });
  drawLabelValue(ctx, "Bank Account Number", data.recipientAccount, right, y, colW, { labelSize: 27, valueSize: 31, weight: 500, maxLines: 2 });
  y += 104;
  drawLabelValue(ctx, "Bank Name", data.recipientBank, left, y, colW, { labelSize: 27, valueSize: 31, weight: 500, maxLines: 2 });
  drawLabelValue(ctx, "Swift Remittance Routing Number", data.recipientSwift, right, y, colW, { labelSize: 27, valueSize: 31, weight: 500 });
  ctx.fillStyle = "#f4f4f8";
  ctx.fillRect(margin, 1400, width - margin * 2, 192);
  drawText(ctx, "1.Time zone: China / Hong Kong", margin + 30, 1440, { size: 25, color: "#667085" });
  drawText(ctx, "2.Not including intermediary or recipient bank charges", margin + 30, 1480, { size: 25, color: "#667085" });
  return canvas;
}

function drawReceiptCanvas() {
  syncAmounts();
  const data = getData();
  if (data.receiptStyle === "gc") return drawGcCanvas(data);
  if (data.receiptStyle === "jialian") return drawJialianCanvas(data);
  if (data.receiptStyle === "uq") return drawUqCanvas(data);
  return drawPyCanvas(data);
}

function downloadBlob(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function canvasToJpegBytes(canvas) {
  const dataUrl = canvas.toDataURL("image/jpeg", 0.94);
  const binary = atob(dataUrl.split(",")[1]);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function buildPdf(canvas) {
  const jpegBytes = canvasToJpegBytes(canvas);
  const pageWidth = 595.28;
  const pageHeight = 841.89;
  const margin = 0;
  const imageRatio = canvas.width / canvas.height;
  let imageWidth = pageWidth - margin * 2;
  let imageHeight = imageWidth / imageRatio;
  if (imageHeight > pageHeight - margin * 2) {
    imageHeight = pageHeight - margin * 2;
    imageWidth = imageHeight * imageRatio;
  }
  const imageX = (pageWidth - imageWidth) / 2;
  const imageY = (pageHeight - imageHeight) / 2;
  const encoder = new TextEncoder();
  const pageContent = `q\n${imageWidth.toFixed(2)} 0 0 ${imageHeight.toFixed(2)} ${imageX.toFixed(2)} ${imageY.toFixed(2)} cm\n/Im1 Do\nQ\n`;
  const pageContentBytes = encoder.encode(pageContent);
  const objects = [
    encoder.encode("1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n"),
    encoder.encode("2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n"),
    encoder.encode(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth.toFixed(2)} ${pageHeight.toFixed(2)}] /Resources << /XObject << /Im1 4 0 R >> >> /Contents 5 0 R >>\nendobj\n`),
    encoder.encode(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${canvas.width} /Height ${canvas.height} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`),
    jpegBytes,
    encoder.encode("\nendstream\nendobj\n"),
    encoder.encode(`5 0 obj\n<< /Length ${pageContentBytes.length} >>\nstream\n`),
    pageContentBytes,
    encoder.encode("endstream\nendobj\n")
  ];
  const header = encoder.encode("%PDF-1.4\n%\u00e2\u00e3\u00cf\u00d3\n");
  const chunks = [header];
  const offsets = [0];
  let length = header.length;
  const packedObjects = [
    [objects[0]],
    [objects[1]],
    [objects[2]],
    [objects[3], objects[4], objects[5]],
    [objects[6], objects[7], objects[8]]
  ];
  packedObjects.forEach((parts) => {
    offsets.push(length);
    parts.forEach((part) => {
      chunks.push(part);
      length += part.length;
    });
  });
  const xrefOffset = length;
  let xref = "xref\n0 6\n0000000000 65535 f \n";
  for (let i = 1; i <= 5; i += 1) {
    xref += `${String(offsets[i]).padStart(10, "0")} 00000 n \n`;
  }
  xref += `trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;
  chunks.push(encoder.encode(xref));
  return new Blob(chunks, { type: "application/pdf" });
}

function exportPng() {
  syncTemplateReferences();
  syncAmounts();
  saveActiveStyleData();
  saveCurrentPayerId();
  const canvas = drawReceiptCanvas();
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `${activeStyle}-${form.elements.documentId.value || "export"}.png`);
  }, "image/png");
}

function exportPdf() {
  syncTemplateReferences();
  syncAmounts();
  saveActiveStyleData();
  saveCurrentPayerId();
  const canvas = drawReceiptCanvas();
  downloadBlob(buildPdf(canvas), `${activeStyle}-${form.elements.documentId.value || "export"}.pdf`);
}

function init() {
  applyCaptureMode();
  setFormValues(styleData[activeStyle]);
  syncTemplateReferences();
  syncCompanyAddress();
  syncAmounts();
  applyFormMode(activeStyle);
  renderPreview();
}

form.addEventListener("input", updateAll);
form.addEventListener("change", updateAll);
resetDemoBtn.addEventListener("click", resetDemo);
newIdBtn.addEventListener("click", newDocumentId);
timeNowBtn.addEventListener("click", setCurrentTime);
randomDocumentIdBtn.addEventListener("click", newDocumentId);
randomPayerIdBtn.addEventListener("click", randomizePayerId);
exportPngBtn.addEventListener("click", exportPng);
exportPdfBtn.addEventListener("click", exportPdf);

init();
