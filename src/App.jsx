import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ChevronRight,
  CheckCircle2,
  Phone,
  Globe2,
} from "lucide-react";

const i18n = {
  en: {
    loginTitle: "Welcome back",
    loginSubtitle: "Sign in to your OKX account and manage your digital assets",
    registerTitle: "Create account",
    registerSubtitle: "Join OKX and start your digital asset journey",
    emailPlaceholder: "Email address",
    passwordPlaceholder: "Password",
    passwordSetPlaceholder: "Password (at least 8 characters)",
    confirmPlaceholder: "Confirm password",
    usernamePlaceholder: "Username",
    forgotPassword: "Forgot password?",
    loginSuccess: "Signed in successfully",
    loginBtn: "Sign in",
    registerSuccess: "Registration successful",
    createAccount: "Create account",
    or: "or",
    phoneLogin: "Sign in with phone",
    noAccount: "Don't have an account?",
    registerNow: "Sign up now →",
    hasAccount: "Already have an account?",
    loginNow: "Sign in now →",
    pwdMismatch: "Passwords do not match",
    pwdMatch: "✓ Passwords match",
    agreePrefix: "I have read and agree to the",
    terms: "Terms of Service",
    and: "and",
    privacy: "Privacy Policy",
    footer: "© 2025 OKX. All rights reserved.",
  },
  es: {
    loginTitle: "Bienvenido",
    loginSubtitle: "Inicia sesión en tu cuenta OKX y gestiona tus activos digitales",
    registerTitle: "Crear cuenta",
    registerSubtitle: "Únete a OKX y comienza tu viaje en activos digitales",
    emailPlaceholder: "Correo electrónico",
    passwordPlaceholder: "Contraseña",
    passwordSetPlaceholder: "Contraseña (mínimo 8 caracteres)",
    confirmPlaceholder: "Confirmar contraseña",
    usernamePlaceholder: "Nombre de usuario",
    forgotPassword: "¿Olvidaste tu contraseña?",
    loginSuccess: "Inicio de sesión exitoso",
    loginBtn: "Iniciar sesión",
    registerSuccess: "Registro exitoso",
    createAccount: "Crear cuenta",
    or: "o",
    phoneLogin: "Iniciar con teléfono",
    noAccount: "¿No tienes cuenta?",
    registerNow: "Regístrate ahora →",
    hasAccount: "¿Ya tienes cuenta?",
    loginNow: "Inicia sesión →",
    pwdMismatch: "Las contraseñas no coinciden",
    pwdMatch: "✓ Contraseñas coinciden",
    agreePrefix: "He leído y acepto los",
    terms: "Términos de servicio",
    and: "y la",
    privacy: "Política de privacidad",
    footer: "© 2025 OKX. Todos los derechos reservados.",
  },
  ar: {
    loginTitle: "مرحباً بعودتك",
    loginSubtitle: "سجّل الدخول إلى حساب OKX وإدارة أصولك الرقمية",
    registerTitle: "إنشاء حساب",
    registerSubtitle: "انضم إلى OKX وابدأ رحلتك في الأصول الرقمية",
    emailPlaceholder: "البريد الإلكتروني",
    passwordPlaceholder: "كلمة المرور",
    passwordSetPlaceholder: "كلمة المرور (8 أحرف على الأقل)",
    confirmPlaceholder: "تأكيد كلمة المرور",
    usernamePlaceholder: "اسم المستخدم",
    forgotPassword: "نسيت كلمة المرور؟",
    loginSuccess: "تم تسجيل الدخول بنجاح",
    loginBtn: "تسجيل الدخول",
    registerSuccess: "تم التسجيل بنجاح",
    createAccount: "إنشاء حساب",
    or: "أو",
    phoneLogin: "تسجيل الدخول بالهاتف",
    noAccount: "ليس لديك حساب؟",
    registerNow: "سجّل الآن ←",
    hasAccount: "لديك حساب بالفعل؟",
    loginNow: "سجّل الدخول ←",
    pwdMismatch: "كلمتا المرور غير متطابقتين",
    pwdMatch: "✓ كلمتا المرور متطابقتان",
    agreePrefix: "لقد قرأت ووافقت على",
    terms: "شروط الخدمة",
    and: "و",
    privacy: "سياسة الخصوصية",
    footer: "© 2025 OKX. جميع الحقوق محفوظة.",
  },
  fr: {
    loginTitle: "Bon retour",
    loginSubtitle: "Connectez-vous à votre compte OKX et gérez vos actifs numériques",
    registerTitle: "Créer un compte",
    registerSubtitle: "Rejoignez OKX et commencez votre parcours crypto",
    emailPlaceholder: "Adresse e-mail",
    passwordPlaceholder: "Mot de passe",
    passwordSetPlaceholder: "Mot de passe (8 caractères minimum)",
    confirmPlaceholder: "Confirmer le mot de passe",
    usernamePlaceholder: "Nom d'utilisateur",
    forgotPassword: "Mot de passe oublié ?",
    loginSuccess: "Connexion réussie",
    loginBtn: "Se connecter",
    registerSuccess: "Inscription réussie",
    createAccount: "Créer un compte",
    or: "ou",
    phoneLogin: "Connexion par téléphone",
    noAccount: "Pas encore de compte ?",
    registerNow: "S'inscrire →",
    hasAccount: "Déjà un compte ?",
    loginNow: "Se connecter →",
    pwdMismatch: "Les mots de passe ne correspondent pas",
    pwdMatch: "✓ Mots de passe identiques",
    agreePrefix: "J'ai lu et j'accepte les",
    terms: "Conditions d'utilisation",
    and: "et la",
    privacy: "Politique de confidentialité",
    footer: "© 2025 OKX. Tous droits réservés.",
  },
};

const LANG_STORAGE_KEY = "okx-auth-lang";
const LANG_MANUAL_KEY = "okx-auth-lang-manual";
const SUPPORTED_LANGS = ["en", "es", "ar", "fr"];

function getDeviceLang() {
  const locales = [
    ...(typeof navigator !== "undefined" && navigator.languages?.length
      ? navigator.languages
      : []),
    typeof navigator !== "undefined" ? navigator.language : "",
    "en",
  ]
    .filter(Boolean)
    .map((l) => String(l).toLowerCase());

  for (const locale of locales) {
    const base = locale.split("-")[0];
    if (base === "es" || locale.startsWith("es")) return "es";
    if (base === "ar" || locale.startsWith("ar")) return "ar";
    if (base === "fr" || locale.startsWith("fr")) return "fr";
    if (base === "en" || locale.startsWith("en")) return "en";
  }
  return "en";
}

function getInitialLang() {
  try {
    const saved = localStorage.getItem(LANG_STORAGE_KEY);
    const manual = localStorage.getItem(LANG_MANUAL_KEY);
    const hasManualChoice =
      manual === "1" || (manual === null && saved && SUPPORTED_LANGS.includes(saved));
    if (hasManualChoice && saved && SUPPORTED_LANGS.includes(saved)) return saved;
  } catch {
    // private mode / storage disabled
  }
  return getDeviceLang();
}

function persistLang(lang) {
  try {
    localStorage.setItem(LANG_STORAGE_KEY, lang);
    localStorage.setItem(LANG_MANUAL_KEY, "1");
  } catch {
    // ignore
  }
}

function LangSelect({ lang, onLangChange }) {
  return (
    <div className="lang-select">
      <Globe2 size={15} />
      <select value={lang} onChange={(e) => onLangChange(e.target.value)} aria-label="Language">
        <option value="en">English</option>
        <option value="es">Español</option>
        <option value="ar">العربية</option>
        <option value="fr">Français</option>
      </select>
    </div>
  );
}

function OkxLogo() {
  return (
    <div className="okx-logo">
      <div className="okx-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <span key={i} className={[1, 3, 4, 5, 7].includes(i) ? "active" : ""} />
        ))}
      </div>
    </div>
  );
}

function hexPoints(cx, cy, r) {
  const pts = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 6;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function AuthBg() {
  return (
    <svg
      className="auth-bg"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="ag1" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#00f5c4" stopOpacity="0.1" />
          <stop offset="100%" stopColor="#00f5c4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ag2" cx="14%" cy="18%" r="42%">
          <stop offset="0%" stopColor="#00f5c4" stopOpacity="0.09" />
          <stop offset="100%" stopColor="#00f5c4" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="ag3" cx="86%" cy="82%" r="38%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.045" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1440" height="900" fill="url(#ag1)" />
      <rect width="1440" height="900" fill="url(#ag2)" />
      <rect width="1440" height="900" fill="url(#ag3)" />

      {/* Concentric rings behind card */}
      <circle cx="720" cy="450" r="190" fill="none" stroke="rgba(0,245,196,0.08)" strokeWidth="0.8" />
      <circle cx="720" cy="450" r="300" fill="none" stroke="rgba(0,245,196,0.055)" strokeWidth="0.7" />
      <circle cx="720" cy="450" r="430" fill="none" stroke="rgba(0,245,196,0.035)" strokeWidth="0.6" />
      <circle cx="720" cy="450" r="580" fill="none" stroke="rgba(0,245,196,0.02)" strokeWidth="0.5" />
      <circle cx="720" cy="450" r="740" fill="none" stroke="rgba(0,245,196,0.012)" strokeWidth="0.4" />

      {/* Left hexagon cluster */}
      <polygon points={hexPoints(118, 198, 168)} fill="none" stroke="rgba(0,245,196,0.07)" strokeWidth="1" />
      <polygon points={hexPoints(118, 198, 116)} fill="none" stroke="rgba(0,245,196,0.05)" strokeWidth="0.9" />
      <polygon points={hexPoints(118, 198, 66)} fill="none" stroke="rgba(0,245,196,0.065)" strokeWidth="0.8" />

      {/* Right hexagon cluster */}
      <polygon points={hexPoints(1322, 702, 158)} fill="none" stroke="rgba(0,245,196,0.07)" strokeWidth="1" />
      <polygon points={hexPoints(1322, 702, 108)} fill="none" stroke="rgba(0,245,196,0.05)" strokeWidth="0.9" />
      <polygon points={hexPoints(1322, 702, 60)} fill="none" stroke="rgba(0,245,196,0.065)" strokeWidth="0.8" />

      {/* Network cluster — bottom-left */}
      <circle cx="298" cy="648" r="4" fill="rgba(0,245,196,0.32)" />
      <circle cx="298" cy="648" r="9" fill="rgba(0,245,196,0.09)" />
      <circle cx="378" cy="598" r="2.5" fill="rgba(0,245,196,0.22)" />
      <circle cx="238" cy="708" r="2.5" fill="rgba(0,245,196,0.19)" />
      <circle cx="348" cy="728" r="2" fill="rgba(0,245,196,0.17)" />
      <circle cx="198" cy="618" r="2" fill="rgba(0,245,196,0.15)" />
      <circle cx="420" cy="680" r="1.8" fill="rgba(0,245,196,0.14)" />
      <line x1="298" y1="648" x2="378" y2="598" stroke="rgba(0,245,196,0.1)" strokeWidth="0.85" />
      <line x1="298" y1="648" x2="238" y2="708" stroke="rgba(0,245,196,0.09)" strokeWidth="0.85" />
      <line x1="298" y1="648" x2="348" y2="728" stroke="rgba(0,245,196,0.08)" strokeWidth="0.75" />
      <line x1="298" y1="648" x2="198" y2="618" stroke="rgba(0,245,196,0.08)" strokeWidth="0.75" />
      <line x1="378" y1="598" x2="420" y2="680" stroke="rgba(0,245,196,0.06)" strokeWidth="0.7" />

      {/* Network cluster — top-right */}
      <circle cx="1142" cy="252" r="4" fill="rgba(0,245,196,0.3)" />
      <circle cx="1142" cy="252" r="9" fill="rgba(0,245,196,0.09)" />
      <circle cx="1222" cy="192" r="2.5" fill="rgba(0,245,196,0.2)" />
      <circle cx="1082" cy="182" r="2.5" fill="rgba(0,245,196,0.18)" />
      <circle cx="1202" cy="322" r="2" fill="rgba(0,245,196,0.17)" />
      <circle cx="1060" cy="300" r="2" fill="rgba(0,245,196,0.15)" />
      <circle cx="1270" cy="280" r="1.8" fill="rgba(0,245,196,0.14)" />
      <line x1="1142" y1="252" x2="1222" y2="192" stroke="rgba(0,245,196,0.1)" strokeWidth="0.85" />
      <line x1="1142" y1="252" x2="1082" y2="182" stroke="rgba(0,245,196,0.09)" strokeWidth="0.85" />
      <line x1="1142" y1="252" x2="1202" y2="322" stroke="rgba(0,245,196,0.08)" strokeWidth="0.75" />
      <line x1="1142" y1="252" x2="1060" y2="300" stroke="rgba(0,245,196,0.08)" strokeWidth="0.75" />
      <line x1="1222" y1="192" x2="1270" y2="280" stroke="rgba(0,245,196,0.06)" strokeWidth="0.7" />

      {/* Scattered small hexagons */}
      <polygon points={hexPoints(448, 822, 28)} fill="none" stroke="rgba(0,245,196,0.1)" strokeWidth="0.8" />
      <polygon points={hexPoints(982, 78, 26)} fill="none" stroke="rgba(0,245,196,0.1)" strokeWidth="0.8" />
      <polygon points={hexPoints(76, 498, 20)} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.7" />
      <polygon points={hexPoints(1382, 428, 20)} fill="none" stroke="rgba(0,245,196,0.1)" strokeWidth="0.7" />
      <polygon points={hexPoints(200, 340, 16)} fill="none" stroke="rgba(0,245,196,0.08)" strokeWidth="0.7" />
      <polygon points={hexPoints(1240, 560, 16)} fill="none" stroke="rgba(0,245,196,0.08)" strokeWidth="0.7" />

      {/* Diagonal accent lines */}
      <line x1="0" y1="316" x2="278" y2="0" stroke="rgba(0,245,196,0.05)" strokeWidth="1" />
      <line x1="1162" y1="900" x2="1440" y2="678" stroke="rgba(0,245,196,0.05)" strokeWidth="1" />
      <line x1="0" y1="760" x2="140" y2="900" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />
      <line x1="1300" y1="0" x2="1440" y2="140" stroke="rgba(255,255,255,0.028)" strokeWidth="1" />

      {/* Diamond shapes */}
      <polygon points="42,58 54,70 42,82 30,70" fill="none" stroke="rgba(0,245,196,0.26)" strokeWidth="0.9" />
      <polygon points="1398,818 1410,830 1398,842 1386,830" fill="none" stroke="rgba(0,245,196,0.22)" strokeWidth="0.9" />
      <polygon points="498,44 508,54 498,64 488,54" fill="none" stroke="rgba(0,245,196,0.17)" strokeWidth="0.8" />
      <polygon points="932,848 942,858 932,868 922,858" fill="none" stroke="rgba(0,245,196,0.17)" strokeWidth="0.8" />
      <polygon points="1060,28 1070,38 1060,48 1050,38" fill="none" stroke="rgba(255,255,255,0.11)" strokeWidth="0.8" />
      <polygon points="370,862 380,872 370,882 360,872" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="0.8" />

      {/* Plus marks */}
      <line x1="418" y1="158" x2="418" y2="168" stroke="rgba(0,245,196,0.24)" strokeWidth="1.1" />
      <line x1="413" y1="163" x2="423" y2="163" stroke="rgba(0,245,196,0.24)" strokeWidth="1.1" />
      <line x1="1022" y1="742" x2="1022" y2="752" stroke="rgba(0,245,196,0.22)" strokeWidth="1.1" />
      <line x1="1017" y1="747" x2="1027" y2="747" stroke="rgba(0,245,196,0.22)" strokeWidth="1.1" />
      <line x1="680" y1="24" x2="680" y2="32" stroke="rgba(0,245,196,0.18)" strokeWidth="1" />
      <line x1="676" y1="28" x2="684" y2="28" stroke="rgba(0,245,196,0.18)" strokeWidth="1" />
      <line x1="762" y1="870" x2="762" y2="878" stroke="rgba(0,245,196,0.18)" strokeWidth="1" />
      <line x1="758" y1="874" x2="766" y2="874" stroke="rgba(0,245,196,0.18)" strokeWidth="1" />
      <line x1="20" y1="698" x2="20" y2="706" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="16" y1="702" x2="24" y2="702" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="1418" y1="198" x2="1418" y2="206" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />
      <line x1="1414" y1="202" x2="1422" y2="202" stroke="rgba(255,255,255,0.12)" strokeWidth="1" />

      {/* Glow dots */}
      <circle cx="1418" cy="158" r="2.5" fill="rgba(0,245,196,0.34)" />
      <circle cx="1418" cy="158" r="6" fill="rgba(0,245,196,0.1)" />
      <circle cx="20" cy="418" r="2.5" fill="rgba(0,245,196,0.3)" />
      <circle cx="20" cy="418" r="6" fill="rgba(0,245,196,0.09)" />
      <circle cx="720" cy="18" r="2" fill="rgba(0,245,196,0.22)" />
      <circle cx="720" cy="882" r="2" fill="rgba(0,245,196,0.2)" />
      <circle cx="22" cy="200" r="1.8" fill="rgba(0,245,196,0.2)" />
      <circle cx="1420" cy="700" r="1.8" fill="rgba(0,245,196,0.2)" />
    </svg>
  );
}

function InputField({ icon, type, placeholder, value, onChange, rightEl }) {
  return (
    <div className="input-wrap">
      <span className="input-icon">{icon}</span>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="auth-input"
        autoComplete="off"
      />
      {rightEl && <span className="input-right">{rightEl}</span>}
    </div>
  );
}

function LoginForm({ t, onSwitch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || loading || done) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  return (
    <motion.div
      key="login"
      initial={{ opacity: 0, x: -24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 24 }}
      transition={{ duration: 0.26 }}
    >
      <div className="auth-header">
        <h1>{t.loginTitle}</h1>
        <p>{t.loginSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          icon={<Mail size={16} />}
          type="email"
          placeholder={t.emailPlaceholder}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <InputField
          icon={<Lock size={16} />}
          type={showPwd ? "text" : "password"}
          placeholder={t.passwordPlaceholder}
          value={password}
          onChange={e => setPassword(e.target.value)}
          rightEl={
            <button type="button" onClick={() => setShowPwd(v => !v)} className="eye-btn">
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />

        <div className="forgot-row">
          <span />
          <a href="#" className="forgot-link">{t.forgotPassword}</a>
        </div>

        <motion.button
          type="submit"
          whileTap={!loading && !done ? { scale: 0.97 } : {}}
          disabled={loading || done}
          className={`auth-btn${loading || done ? " auth-btn-disabled" : ""}`}
        >
          {done ? (
            <><CheckCircle2 size={18} />{t.loginSuccess}</>
          ) : loading ? (
            <span className="auth-spinner" />
          ) : (
            <>{t.loginBtn}<ChevronRight size={18} /></>
          )}
        </motion.button>
      </form>

      <div className="divider"><span>{t.or}</span></div>

      <button className="social-btn">
        <Phone size={16} />
        {t.phoneLogin}
      </button>

      <p className="auth-switch">
        {t.noAccount}
        <button onClick={onSwitch} className="switch-btn">{t.registerNow}</button>
      </p>
    </motion.div>
  );
}

function RegisterForm({ t, onSwitch }) {
  const [form, setForm] = useState({ username: "", email: "", password: "", confirm: "" });
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function field(key) {
    return e => setForm(f => ({ ...f, [key]: e.target.value }));
  }

  const pwdMatch = form.password.length > 0 && form.confirm.length > 0 && form.password === form.confirm;
  const pwdMismatch = form.confirm.length > 0 && form.password !== form.confirm;

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || !pwdMatch || !agreed || loading || done) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 1500);
  }

  return (
    <motion.div
      key="register"
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.26 }}
    >
      <div className="auth-header">
        <h1>{t.registerTitle}</h1>
        <p>{t.registerSubtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <InputField
          icon={<User size={16} />}
          type="text"
          placeholder={t.usernamePlaceholder}
          value={form.username}
          onChange={field("username")}
        />

        <InputField
          icon={<Mail size={16} />}
          type="email"
          placeholder={t.emailPlaceholder}
          value={form.email}
          onChange={field("email")}
        />

        <InputField
          icon={<Lock size={16} />}
          type={showPwd ? "text" : "password"}
          placeholder={t.passwordSetPlaceholder}
          value={form.password}
          onChange={field("password")}
          rightEl={
            <button type="button" onClick={() => setShowPwd(v => !v)} className="eye-btn">
              {showPwd ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          }
        />

        <div className="input-group">
          <InputField
            icon={<Lock size={16} />}
            type={showConfirm ? "text" : "password"}
            placeholder={t.confirmPlaceholder}
            value={form.confirm}
            onChange={field("confirm")}
            rightEl={
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="eye-btn">
                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
          />
          {pwdMismatch && <p className="msg-error">{t.pwdMismatch}</p>}
          {pwdMatch && <p className="msg-ok">{t.pwdMatch}</p>}
        </div>

        <label className="agree-row">
          <input
            type="checkbox"
            checked={agreed}
            onChange={e => setAgreed(e.target.checked)}
            className="agree-check"
          />
          <span>
            {t.agreePrefix}&nbsp;
            <a href="#" className="terms-link">{t.terms}</a>
            &nbsp;{t.and}&nbsp;
            <a href="#" className="terms-link">{t.privacy}</a>
          </span>
        </label>

        <motion.button
          type="submit"
          whileTap={!loading && !done ? { scale: 0.97 } : {}}
          disabled={loading || done}
          className={`auth-btn${loading || done ? " auth-btn-disabled" : ""}`}
        >
          {done ? (
            <><CheckCircle2 size={18} />{t.registerSuccess}</>
          ) : loading ? (
            <span className="auth-spinner" />
          ) : (
            <>{t.createAccount}<ChevronRight size={18} /></>
          )}
        </motion.button>
      </form>

      <p className="auth-switch">
        {t.hasAccount}
        <button onClick={onSwitch} className="switch-btn">{t.loginNow}</button>
      </p>
    </motion.div>
  );
}

export default function App() {
  const [view, setView] = useState("login");
  const [lang, setLang] = useState(getInitialLang);

  const handleLangChange = (nextLang) => {
    if (!SUPPORTED_LANGS.includes(nextLang)) return;
    setLang(nextLang);
    persistLang(nextLang);
  };

  const t = useMemo(() => i18n[lang] || i18n.en, [lang]);
  const isRtl = lang === "ar";

  return (
    <div className="app" dir={isRtl ? "rtl" : "ltr"}>
      <div className="bg-layer">
        <div className="glow glow-left" />
        <div className="glow glow-right" />
      </div>

      <AuthBg />

      <LangSelect lang={lang} onLangChange={handleLangChange} />

      <div className="auth-wrap">
        <div className="auth-brand">
          <OkxLogo />
          <span className="brand-name">OKX</span>
        </div>

        <div className="auth-card">
          <AnimatePresence mode="wait">
            {view === "login"
              ? <LoginForm key="login" t={t} onSwitch={() => setView("register")} />
              : <RegisterForm key="register" t={t} onSwitch={() => setView("login")} />
            }
          </AnimatePresence>
        </div>

        <p className="footer-note">{t.footer}</p>
      </div>
    </div>
  );
}
