const form = document.querySelector("#receiptForm");
const preview = document.querySelector(".preview-column");
const saveState = document.querySelector("#saveState");
const newOrderBtn = document.querySelector("#newOrderBtn");
const resetDemoBtn = document.querySelector("#resetDemoBtn");
const exportPngBtn = document.querySelector("#exportPngBtn");
const exportPdfBtn = document.querySelector("#exportPdfBtn");
const randomPayerIdBtn = document.querySelector("#randomPayerIdBtn");
const randomPayerRefBtn = document.querySelector("#randomPayerRefBtn");
const payerIdStorageKey = "payoutGenerator.payerIdsByPayerName";
const payerCompanies = {
  "LOCAL OPTION TECH LIMITED": "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
  "NO FIVE CONSOLIDATE IMPORT & EXPORT CO., LIMITED": "NO.16 6/F TOWER B NEW MANDARIN PLAZA NO.14 SCIENCE MUSEUM RD TSIM SHA TSUI HONG KONG",
  "MONOLITH TECHNOLOGY LIMITED": "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
  "STARPORT TRADING LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK",
  "CLICKBRIDGE TECHNOLOGY LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK",
  "MAYGOGH TRADING CO., LIMITED": "UNIT 01 13F THE GOLDSILVER COMM BLDG NOS.12-18 MERCER ST SHEUNG WAN HK"
};

const defaults = {
  language: "zh",
  receiptStyle: "table",
  status: "处理中",
  orderNo: "42236070214310308064",
  startedAt: "2026-07-02T14:45:22",
  completedAt: "2026-07-02T15:31:13",
  amount: "150000.00",
  payCurrency: "USD",
  receiveCurrency: "USD",
  paymentMethod: "SWIFT",
  fee: "25.00",
  feeCurrency: "USD",
  exchangeRate: "1",
  paymentPurpose: "供应商付款",
  memo: "Invoice payment / Contract settlement",
  payerName: "LOCAL OPTION TECH LIMITED",
  payerAddress: "RM 1312 TELFORD HSE 16 WANG HOI RD KLN BAY HONG KONG",
  payerIdLabel: "公司ID",
  payerId: "004937100053",
  payerRef: "42236070214310308064",
  payerVerify: "",
  recipientName: "HONG KONG HEJIS EXPRESS CO.,LIMITED",
  recipientCountry: "中国香港特别行政区",
  recipientBank: "HONG KONG HEJIS EXPRESS CO.,LIMITED",
  recipientAccountLabel: "账户号码",
  recipientAccount: "147850366838",
  recipientSwift: "HSBCHKHHHKH",
  recipientType: "Individual",
  recipientVerify: "",
  receiveAmount: "150000.00"
};

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fixedValueTranslations = {
  en: {
    "供应商付款": "Supplier Payment",
    "中国香港特别行政区": "Hong Kong SAR, China"
  }
};
const receiptCopy = {
  zh: {
    statusLabel: "交易状态:",
    orderNoLabel: "订单编号:",
    transactionDetails: "交易详情",
    startedAt: "交易发起日期",
    completedAt: "交易完成日期",
    amount: "金额",
    paymentMethod: "支付方式",
    fee: "手续费",
    memo: "交易附言",
    payer: "付款方",
    recipient: "收款方",
    paymentReference: "付款参考号:",
    recipientType: "收款方类型:",
    paymentSummary: "支付摘要",
    voucherTitle: "付款凭证",
    paymentDetails: "付款明细",
    serialNo: "交易流水号",
    issuedAt: "签发日期",
    timezone: "时区",
    paymentAmount: "付款金额",
    exchangeRate: "汇率",
    clearingNetwork: "清算网络",
    paymentPurpose: "付款用途",
    transactionTime: "交易时间",
    completedTime: "完成时间",
    remittanceMemo: "汇款附言",
    name: "名称",
    country: "国家",
    bank: "银行",
    bankAccount: "银行账号",
    payerName: "付款人名称",
    businessAddress: "经营地址",
    payCurrency: "支付币种",
    payAmount: "支付金额",
    receiveCurrency: "收款币种",
    receiveAmount: "收款金额",
    totalLabel: "总计:",
    synced: "已同步",
    syncing: "同步中",
    timezoneValue: "中国香港",
    statuses: {
      处理中: "处理中",
      已完成: "已完成",
      待确认: "待确认",
      已取消: "已取消"
    },
    payerLabels: {
      公司ID: "公司ID",
      客户编号: "客户编号",
      账户号码: "账户号码"
    },
    recipientLabels: {
      账户号码: "账户号码",
      银行账号: "银行账号",
      钱包号码: "钱包号码",
      IBAN: "IBAN"
    }
  },
  en: {
    statusLabel: "Transaction Status:",
    orderNoLabel: "Order No:",
    transactionDetails: "Transaction Details",
    startedAt: "Date Initiated",
    completedAt: "Date Completed",
    amount: "Amount",
    paymentMethod: "Payment Method",
    fee: "Fee",
    memo: "Transaction Memo",
    payer: "Payer",
    recipient: "Recipient",
    paymentReference: "Payment Reference No:",
    recipientType: "Recipient Type:",
    paymentSummary: "Payment Summary",
    voucherTitle: "Payment Voucher",
    paymentDetails: "Payment Details",
    serialNo: "Transaction Reference",
    issuedAt: "Issue Date",
    timezone: "Time Zone",
    paymentAmount: "Payment Amount",
    exchangeRate: "Exchange Rate",
    clearingNetwork: "Clearing Network",
    paymentPurpose: "Payment Purpose",
    transactionTime: "Transaction Time",
    completedTime: "Completion Time",
    remittanceMemo: "Remittance Memo",
    name: "Name",
    country: "Country",
    bank: "Bank",
    bankAccount: "Bank Account",
    payerName: "Payer Name",
    businessAddress: "Business Address",
    payCurrency: "Payment Currency",
    payAmount: "Payment Amount",
    receiveCurrency: "Receiving Currency",
    receiveAmount: "Receiving Amount",
    totalLabel: "Total:",
    synced: "Synced",
    syncing: "Syncing",
    timezoneValue: "Hong Kong, China",
    statuses: {
      处理中: "Processing",
      已完成: "Completed",
      待确认: "Pending Confirmation",
      已取消: "Cancelled"
    },
    payerLabels: {
      公司ID: "Company ID",
      客户编号: "Customer ID",
      账户号码: "Account No."
    },
    recipientLabels: {
      账户号码: "Account No.",
      银行账号: "Bank Account No.",
      钱包号码: "Wallet No.",
      IBAN: "IBAN"
    }
  }
};

function pad(value) {
  return String(value).padStart(2, "0");
}

function getReceiptCopy(language) {
  return receiptCopy[language] || receiptCopy.zh;
}

function translateFixedValue(value, language) {
  return fixedValueTranslations[language]?.[value] || value;
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

function generateOrderNo() {
  const now = new Date();
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const random = randomDigits(6);
  return `${stamp}${random}`;
}

function generatePayerId(label) {
  if (label === "客户编号") return `CUS${randomDigits(9)}`;
  if (label === "账户号码") return randomDigits(12);
  return randomDigits(12);
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
    // The generator still works if local storage is unavailable.
  }
}

function getPayerIdentityKey() {
  return form.elements.payerName.value.trim().toUpperCase();
}

function saveCurrentPayerId() {
  const payerKey = getPayerIdentityKey();
  const value = form.elements.payerId.value.trim();
  if (!payerKey) return;
  const stored = readStoredPayerIds();
  if (value) {
    stored[payerKey] = value;
  } else {
    delete stored[payerKey];
  }
  writeStoredPayerIds(stored);
}

function applyStoredPayerId({ clearIfMissing = false } = {}) {
  const payerKey = getPayerIdentityKey();
  if (!payerKey) return false;
  const stored = readStoredPayerIds();
  const savedValue = stored[payerKey];
  if (savedValue) {
    form.elements.payerId.value = savedValue;
    return true;
  } else if (clearIfMissing) {
    form.elements.payerId.value = "";
  }
  return false;
}

function syncPayerReference() {
  form.elements.payerRef.value = form.elements.orderNo.value;
}

function toLocalInputValue(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function parseDateInput(value) {
  if (!value) return null;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDate(value) {
  const date = parseDateInput(value);
  if (!date) return "";
  return `${date.getDate()}-${monthNames[date.getMonth()]}-${date.getFullYear()} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())} (CST)`;
}

function formatDateTimeCompact(value) {
  const date = parseDateInput(value);
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}

function formatDateOnly(value) {
  const date = parseDateInput(value);
  if (!date) return "";
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function formatMoney(value) {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "0.00";
  return amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function getData() {
  return Object.fromEntries(new FormData(form).entries());
}

function setFormValues(values) {
  Object.entries(values).forEach(([key, value]) => {
    const field = form.elements[key];
    if (field) field.value = value;
  });
}

function buildDisplayData(data) {
  const amount = formatMoney(data.amount);
  const receiveAmount = formatMoney(data.receiveAmount || data.amount);
  const language = data.language || "zh";
  const t = getReceiptCopy(language);
  return {
    ...data,
    language,
    status: t.statuses[data.status] || data.status,
    paymentPurpose: translateFixedValue(data.paymentPurpose, language),
    recipientCountry: translateFixedValue(data.recipientCountry, language),
    startedAtDisplay: formatDate(data.startedAt),
    completedAtDisplay: formatDate(data.completedAt),
    startedAtVoucher: formatDateTimeCompact(data.startedAt),
    completedAtVoucher: formatDateTimeCompact(data.completedAt),
    issueDateDisplay: formatDateOnly(data.completedAt || data.startedAt),
    timezoneDisplay: t.timezoneValue,
    amountDisplay: amount,
    receiveAmountDisplay: receiveAmount,
    feeDisplay: `${formatMoney(data.fee)} ${data.feeCurrency}`,
    amountWithCurrency: `${amount} ${data.payCurrency}`,
    paymentAmountWithCurrency: `${amount} ${data.payCurrency}`,
    receiveAmountWithCurrency: `${receiveAmount} ${data.receiveCurrency}`,
    recipientBankDisplay: data.recipientBank || data.recipientName,
    payerIdLabelDisplay: `${t.payerLabels[data.payerIdLabel] || data.payerIdLabel}:`,
    recipientAccountLabelDisplay: `${t.recipientLabels[data.recipientAccountLabel] || data.recipientAccountLabel}:`
  };
}

function applyReceiptLanguage(language) {
  const t = getReceiptCopy(language);
  document.documentElement.lang = language === "en" ? "en" : "zh-CN";
  preview.querySelectorAll("[data-i18n]").forEach((node) => {
    node.textContent = t[node.dataset.i18n] || "";
  });
}

function applyReceiptStyle(style) {
  preview.querySelectorAll("[data-style-panel]").forEach((panel) => {
    panel.classList.toggle("is-hidden", panel.dataset.stylePanel !== style);
  });
}

function applyFormStyle(style) {
  form.querySelectorAll("[data-form-style]").forEach((node) => {
    const styles = node.dataset.formStyle.split(/\s+/);
    node.classList.toggle("is-hidden", !styles.includes(style));
  });
}

function syncPayerAddress() {
  const address = payerCompanies[form.elements.payerName.value];
  if (address) {
    form.elements.payerAddress.value = address;
  }
}

function updatePreview() {
  const data = getData();
  const display = buildDisplayData(data);
  applyReceiptLanguage(display.language);
  applyReceiptStyle(display.receiptStyle || "table");
  applyFormStyle(display.receiptStyle || "table");
  preview.querySelectorAll("[data-preview]").forEach((node) => {
    const key = node.dataset.preview;
    node.textContent = display[key] || "";
  });
  saveState.textContent = getReceiptCopy(display.language).synced;
}

function syncAmounts(event) {
  const target = event?.target;
  if (!target) return;
  if (target.name === "amount") {
    form.elements.receiveAmount.value = target.value;
  }
  if (target.name === "payCurrency") {
    form.elements.receiveCurrency.value = target.value;
  }
  if (target.name === "orderNo") {
    syncPayerReference();
  }
  if (target.name === "payerName") {
    syncPayerAddress();
    applyStoredPayerId({ clearIfMissing: event.type === "change" });
  }
  if (target.name === "payerIdLabel") {
    applyStoredPayerId();
  }
}

function resetDemo() {
  setFormValues(defaults);
  syncPayerAddress();
  applyStoredPayerId();
  syncPayerReference();
  updatePreview();
}

function newOrder() {
  const orderNo = generateOrderNo();
  form.elements.orderNo.value = orderNo;
  syncPayerReference();
  updatePreview();
}

function randomizePayerId() {
  form.elements.payerId.value = generatePayerId(form.elements.payerIdLabel.value);
  updatePreview();
}

function randomizePayerReference() {
  syncPayerReference();
  updatePreview();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines = 2) {
  const chars = Array.from(String(text || ""));
  let line = "";
  let drawn = 0;
  chars.forEach((char, index) => {
    const testLine = line + char;
    const isLast = index === chars.length - 1;
    if (ctx.measureText(testLine).width > maxWidth && line) {
      drawn += 1;
      if (drawn >= maxLines) return;
      ctx.fillText(line, x, y);
      y += lineHeight;
      line = char;
    } else {
      line = testLine;
    }
    if (isLast && drawn < maxLines) {
      ctx.fillText(line, x, y);
    }
  });
}

function drawRoundRect(ctx, x, y, width, height, radius) {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + height, r);
  ctx.arcTo(x + width, y + height, x, y + height, r);
  ctx.arcTo(x, y + height, x, y, r);
  ctx.arcTo(x, y, x + width, y, r);
  ctx.closePath();
}

function drawCell(ctx, x, y, width, height, text, options = {}) {
  const {
    fill = "#ffffff",
    stroke = "#d9dee7",
    color = "#080f18",
    weight = 400,
    size = 25,
    align = "left",
    padding = 22,
    wrap = false
  } = options;
  ctx.fillStyle = fill;
  ctx.fillRect(x, y, width, height);
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, width, height);
  ctx.fillStyle = color;
  ctx.font = `${weight} ${size}px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial`;
  ctx.textBaseline = "middle";
  ctx.textAlign = align;
  const textX = align === "right" ? x + width - padding : x + padding;
  const textY = y + height / 2;
  if (wrap) {
    ctx.textBaseline = "top";
    wrapText(ctx, text, textX, y + 16, width - padding * 2, size + 8, 2);
    ctx.textBaseline = "middle";
  } else {
    ctx.fillText(String(text || ""), textX, textY, width - padding * 2);
  }
}

function drawReceiptCanvas() {
  const data = buildDisplayData(getData());
  if (data.receiptStyle === "voucher") {
    return drawVoucherCanvas(data);
  }
  const t = getReceiptCopy(data.language);
  const canvas = document.createElement("canvas");
  const scale = 2;
  const width = 1200;
  const height = 1340;
  canvas.width = width * scale;
  canvas.height = height * scale;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  const margin = 54;
  const content = width - margin * 2;

  ctx.fillStyle = "#080f18";
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";
  ctx.fillText(t.statusLabel, margin, 58);
  const statusLabelWidth = ctx.measureText(t.statusLabel).width;
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.fillText(data.status, margin + statusLabelWidth + 14, 58);
  ctx.font = '700 24px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.textAlign = "right";
  ctx.fillText(data.orderNo, width - margin, 58);
  const orderNoWidth = ctx.measureText(data.orderNo).width;
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.fillText(t.orderNoLabel, width - margin - orderNoWidth - 14, 58);

  ctx.textAlign = "left";
  ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.fillText(t.transactionDetails, margin, 152);

  const tableX = margin;
  let tableY = 178;
  const labelW = 320;
  const valueW = content - labelW;
  const rowH = 70;
  const details = [
    [t.startedAt, data.startedAtDisplay],
    [t.completedAt, data.completedAtDisplay],
    [t.amount, data.amountDisplay],
    [t.paymentMethod, data.paymentMethod],
    [t.fee, data.feeDisplay],
    [t.memo, data.memo]
  ];
  details.forEach(([label, value]) => {
    drawCell(ctx, tableX, tableY, labelW, rowH, label, { fill: "#f7f8fa", weight: 600, size: 24 });
    drawCell(ctx, tableX + labelW, tableY, valueW, rowH, value, { weight: 700, size: 24, wrap: label === t.memo });
    tableY += rowH;
  });

  const partyY = tableY + 72;
  ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.fillStyle = "#080f18";
  ctx.fillText(t.payer, margin, partyY - 26);
  ctx.fillText(t.recipient, margin + content / 2 + 24, partyY - 26);

  function drawPartyCard(x, y, cardData) {
    const cardW = content / 2 - 24;
    const hasVerify = Boolean(cardData.verify);
    const cardH = hasVerify ? 290 : 246;
    drawRoundRect(ctx, x, y, cardW, cardH, 5);
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.strokeStyle = "#d9dee7";
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = "#080f18";
    ctx.font = '700 27px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
    ctx.fillText(cardData.name, x + 28, y + 48, cardW - 56);
    ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
    ctx.fillStyle = "#4b5563";
    ctx.fillText(cardData.firstLabel, x + 28, y + 94);
    ctx.fillStyle = "#080f18";
    ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
    ctx.fillText(cardData.firstValue, x + 28, y + 136, cardW - 56);
    ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
    ctx.fillStyle = "#4b5563";
    ctx.fillText(cardData.secondLabel, x + 28, y + 180);
    ctx.fillStyle = "#080f18";
    ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
    ctx.fillText(cardData.secondValue, x + 28, y + 222, cardW - 56);

    if (hasVerify) {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(x, y + cardH - 54, cardW, 54);
      ctx.strokeStyle = "#edf0f4";
      ctx.beginPath();
      ctx.moveTo(x, y + cardH - 54);
      ctx.lineTo(x + cardW, y + cardH - 54);
      ctx.stroke();
      ctx.fillStyle = "#4b5563";
      ctx.font = '400 20px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
      ctx.fillText(cardData.verify, x + 24, y + cardH - 27, cardW - 48);
    }
  }

  drawPartyCard(margin, partyY, {
    name: data.payerName,
    firstLabel: data.payerIdLabelDisplay,
    firstValue: data.payerId,
    secondLabel: t.paymentReference,
    secondValue: data.payerRef,
    verify: data.payerVerify
  });
  drawPartyCard(margin + content / 2 + 24, partyY, {
    name: data.recipientName,
    firstLabel: data.recipientAccountLabelDisplay,
    firstValue: data.recipientAccount,
    secondLabel: t.recipientType,
    secondValue: data.recipientType,
    verify: data.recipientVerify
  });

  const summaryY = partyY + 390;
  ctx.font = '700 25px -apple-system, BlinkMacSystemFont, "PingFang SC", Arial';
  ctx.fillStyle = "#080f18";
  ctx.fillText(t.paymentSummary, margin, summaryY - 24);

  const colW = content / 4;
  const summaryRows = [
    [t.payCurrency, t.payAmount, t.receiveCurrency, t.receiveAmount],
    [data.payCurrency, data.amountDisplay, data.receiveCurrency, data.receiveAmountDisplay],
    [t.totalLabel, data.amountWithCurrency, t.totalLabel, data.receiveAmountWithCurrency]
  ];
  summaryRows.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      drawCell(ctx, margin + colW * colIndex, summaryY + rowH * rowIndex, colW, rowH, value, {
        fill: rowIndex === 0 ? "#f8fafc" : rowIndex === 2 ? "#fbfcfd" : "#ffffff",
        weight: rowIndex === 0 ? 700 : 700,
        size: rowIndex === 0 ? 22 : 24
      });
    });
  });

  return canvas;
}

function drawVoucherCanvas(data) {
  const t = getReceiptCopy(data.language);
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

  const margin = 140;
  const right = width - margin;
  const colGap = 190;
  const colW = (right - margin - colGap) / 2;

  function text(value, x, y, options = {}) {
    const {
      size = 22,
      weight = 400,
      color = "#111111",
      align = "left",
      family = 'Georgia, "Times New Roman", "PingFang SC", serif',
      maxWidth
    } = options;
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px ${family}`;
    ctx.textAlign = align;
    ctx.textBaseline = "top";
    ctx.fillText(String(value || ""), x, y, maxWidth);
  }

  function labelValue(label, value, x, y, maxWidth = colW) {
    text(label, x, y, { size: 20, color: "#777777", maxWidth });
    text(value, x, y + 30, { size: 21, weight: 700, maxWidth });
  }

  function labelValueWrapped(label, value, x, y, maxWidth = colW) {
    text(label, x, y, { size: 20, color: "#777777", maxWidth });
    ctx.fillStyle = "#111111";
    ctx.font = '700 21px Georgia, "Times New Roman", "PingFang SC", serif';
    ctx.textAlign = "left";
    ctx.textBaseline = "top";
    wrapText(ctx, value, x, y + 30, maxWidth, 30, 3);
  }

  const metaY = 58;
  const metaW = 150;
  labelValue(t.serialNo, data.orderNo, right - metaW * 3 - 36, metaY, metaW + 20);
  labelValue(t.issuedAt, data.issueDateDisplay, right - metaW * 2 + 4, metaY, metaW);
  labelValue(t.timezone, data.timezoneDisplay, right - metaW + 40, metaY, metaW);

  ctx.strokeStyle = "#e7e7e7";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(margin, 150);
  ctx.lineTo(right, 150);
  ctx.stroke();

  text(t.voucherTitle, margin, 205, { size: 34, weight: 700 });

  let y = 330;
  text(t.paymentDetails, margin, y, { size: 28, weight: 700 });
  y += 70;
  labelValue(t.paymentAmount, data.paymentAmountWithCurrency, margin, y);
  labelValue(t.fee, data.feeDisplay, margin + colW + colGap, y);
  y += 80;
  labelValue(t.receiveAmount, data.receiveAmountWithCurrency, margin, y);
  labelValue(t.exchangeRate, data.exchangeRate, margin + colW + colGap, y);
  y += 80;
  labelValue(t.clearingNetwork, data.paymentMethod, margin, y);
  labelValue(t.paymentPurpose, data.paymentPurpose, margin + colW + colGap, y);
  y += 80;
  labelValue(t.transactionTime, data.startedAtVoucher, margin, y);
  labelValue(t.completedTime, data.completedAtVoucher, margin + colW + colGap, y);
  y += 80;
  labelValueWrapped(t.remittanceMemo, data.memo, margin, y, right - margin);

  y += 140;
  text(t.recipient, margin, y, { size: 28, weight: 700 });
  y += 70;
  labelValueWrapped(t.name, data.recipientName, margin, y);
  labelValueWrapped(t.country, data.recipientCountry, margin + colW + colGap, y);
  y += 90;
  labelValueWrapped(t.bank, data.recipientBankDisplay, margin, y);
  labelValue(t.bankAccount, data.recipientAccount, margin + colW + colGap, y);
  y += 90;
  labelValue("SWIFT CODE", data.recipientSwift, margin, y);

  y += 130;
  text(t.payer, margin, y, { size: 28, weight: 700 });
  y += 70;
  labelValueWrapped(t.payerName, data.payerName, margin, y, right - margin);
  y += 90;
  labelValueWrapped(t.businessAddress, data.payerAddress, margin, y, right - margin);

  ctx.fillStyle = "#f4f5f8";
  ctx.fillRect(0, height - 120, width, 120);
  text("Photon Dance (Hong Kong) Limited", margin, height - 92, { size: 17, color: "#333333" });
  text(data.language === "en" ? "Page 1 of 1" : "第 1 页，共 1 页", right, height - 92, {
    size: 17,
    color: "#333333",
    align: "right"
  });

  return canvas;
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
  const margin = 24;
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
  saveCurrentPayerId();
  syncPayerReference();
  const canvas = drawReceiptCanvas();
  canvas.toBlob((blob) => {
    if (blob) downloadBlob(blob, `payout-confirmation-${form.elements.orderNo.value || "export"}.png`);
  }, "image/png");
}

function exportPdf() {
  saveCurrentPayerId();
  syncPayerReference();
  const canvas = drawReceiptCanvas();
  const pdfBlob = buildPdf(canvas);
  downloadBlob(pdfBlob, `payout-confirmation-${form.elements.orderNo.value || "export"}.pdf`);
}

form.addEventListener("input", (event) => {
  saveState.textContent = getReceiptCopy(form.elements.language.value).syncing;
  syncAmounts(event);
  updatePreview();
});
form.addEventListener("change", (event) => {
  syncAmounts(event);
  updatePreview();
});
newOrderBtn.addEventListener("click", newOrder);
resetDemoBtn.addEventListener("click", resetDemo);
randomPayerIdBtn.addEventListener("click", randomizePayerId);
randomPayerRefBtn.addEventListener("click", randomizePayerReference);
exportPngBtn.addEventListener("click", exportPng);
exportPdfBtn.addEventListener("click", exportPdf);

resetDemo();

if (!form.elements.startedAt.value || !form.elements.completedAt.value) {
  const now = new Date();
  const done = new Date(now.getTime() + 45 * 60 * 1000);
  form.elements.startedAt.value = toLocalInputValue(now);
  form.elements.completedAt.value = toLocalInputValue(done);
  updatePreview();
}
