import { useState, useEffect } from "react";

/* ───────── BTS & ARMY Text Logos ───────── */

function BTSLogo({ size = 40, glow = false }) {
  return <span style={{ fontFamily:"'Playfair Display',serif", fontSize:size*0.45, fontWeight:900, color:"#BF94E4", letterSpacing:2, filter:glow?"drop-shadow(0 0 10px rgba(191,148,228,.9))":"none" }}>BTS</span>;
}

function ARMYLogo({ size = 40, glow = false }) {
  return <span style={{ fontFamily:"'Playfair Display',serif", fontSize:size*0.35, fontWeight:900, color:"#BF94E4", letterSpacing:2, filter:glow?"drop-shadow(0 0 10px rgba(191,148,228,.9))":"none" }}>ARMY</span>;
}

function BothLogos({ btsSize = 36, armySize = 36, gap = 16 }) {
  return (
    <div style={{ display:"flex",alignItems:"center",gap,justifyContent:"center" }}>
      <BTSLogo size={btsSize} glow />
      <div style={{ width:1,height:btsSize*0.5,background:"rgba(191,148,228,.25)" }} />
      <ARMYLogo size={armySize} glow />
    </div>
  );
}

const SECTIONS = [
  { id: "hero", label: "HOME" },
  { id: "reservation", label: "예약" },
  { id: "schedule", label: "일정" },
  { id: "stages", label: "스테이지" },
  { id: "landmarks", label: "랜드마크" },
  { id: "promos", label: "프로모션" },
  { id: "events", label: "이벤트" },
  { id: "popups", label: "팝업스토어" },
  { id: "fnb", label: "F&B" },
  { id: "mobility", label: "모빌리티" },
  { id: "stays", label: "스테이" },
];

const LANDMARK_DATA = [
  { name: "숭례문 BTS 컴백 미디어 파사드", date: "03.20 (금)", time: "19:00~24:00", note: "예약자 한정 참여", stamp: true, reserve: true, mapUrl: "https://map.naver.com/p/search/숭례문" },
  { name: "남산서울타워 미디어 파사드", date: "03.20 (금)", time: "19:00~22:30", note: "상시 관람 가능", stamp: false, mapUrl: "https://map.naver.com/p/search/남산서울타워" },
  { name: "광화문광장 BTS 컴백 OOH", date: "03.20~03.21", time: "19:00~24:00", note: "매시 5분/25분/45분 관람", stamp: false, mapUrl: "https://map.naver.com/p/search/광화문광장" },
  { name: "DDP 뮤직 라이트쇼", date: "03.20~04.12", time: "19:00~22:00", note: "30분 간격 관람", stamp: false, mapUrl: "https://map.naver.com/p/search/DDP" },
  { name: "반포대교 달빛무지개분수 뮤직 라이트쇼", date: "03.21~03.22", time: "19:30~20:30", note: "기상 상황에 따라 변동 가능", stamp: false, mapUrl: "https://map.naver.com/p/search/반포대교" },
];

const PROMO_DATA = [
  { name: "BTS 컴백 드론 라이트쇼", date: "03.20 (금) 20:30~20:45", loc: "뚝섬 한강공원", note: "단 15분! 별도 신청 없이 자유 관람", stamp: true, mapUrl: "https://map.naver.com/p/search/뚝섬한강공원" },
  { name: "신세계스퀘어 미디어 파사드", date: "03.20 (금) 13:00 ~ 05.10", loc: "신세계백화점 스퀘어", note: "매시 정각 관람", stamp: true, mapUrl: "https://map.naver.com/p/search/신세계백화점본점" },
  { name: "시청역 삼성본관빌딩 모니모 파사드", date: "03.20~04.19 | 19:00~23:00", loc: "태평로 삼성본관빌딩", note: "상시 관람", stamp: true, mapUrl: "https://map.naver.com/p/search/삼성본관빌딩" },
];

const QUARTER_DATA = [
  { name: "청계천 러브쿼터 1", period: "04.06~04.19 | 19:00~22:00", loc: "모전교~광통교", stamp: false, mapUrl: "https://map.naver.com/p/search/청계천모전교" },
  { name: "청계천 러브쿼터 2", period: "04.06~04.19 | 20:00~21:00", loc: "버들다리~오간수교", stamp: false, mapUrl: "https://map.naver.com/p/search/청계천버들다리" },
  { name: "용산역 러브쿼터", period: "04.06~04.19", loc: "용산역 광장 계단", stamp: false, mapUrl: "https://map.naver.com/p/search/용산역" },
  { name: "국립현대미술관 러브쿼터", period: "03.20~04.19 | 10:00~21:00", loc: "국립현대미술관 서울 미술관마당", note: "월·화·목·금·일 18:00~21:00 외부 파사드 관람", stamp: true, mapUrl: "https://map.naver.com/p/search/국립현대미술관서울" },
];

const EVENT_DATA = [
  { name: "DDP 아미 마당", date: "04.06 (월) ~ 04.12 (일)", loc: "DDP 전시1관", tags: ["스탬프랠리", "사전예약"], mapUrl: "https://map.naver.com/p/search/DDP" },
  { name: "러브 송 라운지", date: "03.20 (금) ~ 03.22 (일) 10:00~20:00", loc: "여의도 한강공원 이벤트 광장", tags: ["스탬프랠리", "현장예약"], mapUrl: "https://map.naver.com/p/search/여의도한강공원" },
  { name: "리스닝파티 CJ CGV", date: "03.22 (일) 12:00~18:00", loc: "CGV용산아이파크몰 6~7층", tags: ["예매필수"], contact: "@cgv_korea", contactUrl: "https://instagram.com/cgv_korea", mapUrl: "https://map.naver.com/p/search/CGV용산아이파크몰" },
  { name: "애프터 파티", date: "04.08 (수) ~ 04.12 (일)", loc: "EDLS", tags: ["예매필수"], contact: "@edls_official", contactUrl: "https://instagram.com/edls_official" },
  { name: "포토이즘 (Photoism)", date: "03.20 (금) ~ 04.19 (일)", loc: "서울 곳곳 숨겨진 포토부스", tags: ["자유참여"], note: "한정판 포토프레임", contact: "@photoism.kr", contactUrl: "https://instagram.com/photoism.kr" },
  { name: "삼성 강남 갤럭시 스튜디오", date: "03.20 (금) ~ 04.19 (일)", loc: "삼성 강남", tags: ["스탬프랠리"], note: "갤럭시 S26 울트라 체험 · 1일 500명 한정 굿즈", mapUrl: "https://map.naver.com/p/search/삼성강남" },
];

const POPUP_DATA = [
  { name: "BTS POP-UP : ARIRANG", sub: "@HYBE YONGSAN", date: "03.20 (금) ~ 04.12 (일)", loc: "하이브 용산 1층", mapUrl: "https://map.naver.com/p/search/하이브용산" },
  { name: "BTS POP-UP : ARIRANG", sub: "@SHINSEGAE THE MAIN", date: "03.20 (금) ~ 04.12 (일)", loc: "신세계백화점 본점 더 헤리티지 4층", mapUrl: "https://map.naver.com/p/search/신세계백화점본점" },
];

const FNB_DATA = [
  { name: "컴포즈커피", period: "03.20~04.13", loc: "서울/고양 직가맹점", contact: "@compose_coffee", contactUrl: "https://instagram.com/compose_coffee" },
  { name: "청기와타운", period: "03.20~04.19", loc: "영등포·남영·왕십리 외 21개 지점", contact: "@c_town.official", contactUrl: "https://instagram.com/c_town.official" },
  { name: "아티제", period: "03.20~04.19", loc: "서울/경기 직영점", contact: "@cafeartisee", contactUrl: "https://instagram.com/cafeartisee" },
  { name: "쿠차라", period: "03.20~04.19", loc: "서울/경기 직영점", contact: "@cuchara_official", contactUrl: "https://instagram.com/cuchara_official" },
  { name: "아워홈 컬리너리스퀘어", period: "03.20~04.13", loc: "인천공항 제1·2여객터미널점", contact: "@ourhome_mansion", contactUrl: "https://instagram.com/ourhome_mansion" },
  { name: "윤해운대갈비", period: "03.20~04.13", loc: "서울 강남점", contact: "@yoon_seoul_1964", contactUrl: "https://instagram.com/yoon_seoul_1964" },
  { name: "서촌/북촌 카페 with 배달의민족", period: "04.06~04.19", loc: "배달의민족앱 픽업 주문" },
];

const STAY_DATA = [
  { name: "파라다이스 시티", date: "03.20~04.19", contact: "@pcitykorea", contactUrl: "https://instagram.com/pcitykorea", phone: "1833-8855", note: "특별 F&B 협업 프로그램" },
  { name: "JW 메리어트 호텔 서울", date: "03.20~04.19", contact: "@jwmarriottseoul", contactUrl: "https://instagram.com/jwmarriottseoul", phone: "02-6282-6282", note: "특별 F&B 협업 칵테일" },
  { name: "웨스틴 서울 파르나스", date: "03.20~04.19", contact: "@westin_seoul_parnas", contactUrl: "https://instagram.com/westin_seoul_parnas", note: "특별 F&B 협업 프로그램" },
  { name: "서울드래곤시티", date: "04.03~04.18", contact: "@seouldragoncity", contactUrl: "https://instagram.com/seouldragoncity", note: "ibis Styles · Novotel · Novotel Suites · Grand Mercure" },
];

const FINANCE_DATA = [
  { name: "모니모 한정판 기프트카드/굿즈", period: "03.20~04.19", desc: "모니모앱에서 구매 가능" },
  { name: "모니모 나눔키오스크", period: "03.20~04.19", desc: "모니모앱에서 팬 이름으로 기부" },
  { name: "모니모페이 할인", period: "04.06~04.19", desc: "북촌/서촌 F&B 매장 7천원 이상 결제 시 7천원 할인 · 매장별 선착순 100명 한정판 굿즈" },
];

/* ───────── components ───────── */

function FloatingParticle({ delay, size, x }) {
  return <div style={{ position:"absolute",width:size,height:size,borderRadius:"50%",background:"radial-gradient(circle,rgba(191,148,228,.85) 0%,transparent 70%)",left:`${x}%`,bottom:"-20px",animation:`floatUp ${8+Math.random()*6}s ease-in-out infinite`,animationDelay:`${delay}s`,pointerEvents:"none" }} />;
}

function Tag({ children, variant = "stamp" }) {
  const m = {
    "스탬프랠리":{ bg:"rgba(191,148,228,.2)",border:"rgba(191,148,228,.9)",text:"#BF94E4" },
    "사전예약":{ bg:"rgba(255,214,102,.15)",border:"rgba(255,214,102,.4)",text:"#FFD666" },
    "현장예약":{ bg:"rgba(255,180,100,.15)",border:"rgba(255,180,100,.4)",text:"#FFB464" },
    "예매필수":{ bg:"rgba(130,200,255,.15)",border:"rgba(130,200,255,.4)",text:"#82C8FF" },
    "자유참여":{ bg:"rgba(120,220,170,.15)",border:"rgba(120,220,170,.4)",text:"#78DCAA" },
    "NEW":{ bg:"rgba(255,100,120,.15)",border:"rgba(255,100,120,.4)",text:"#FF6478" },
  };
  const c = m[variant] || m["스탬프랠리"];
  return <span style={{ display:"inline-block",padding:"3px 10px",fontSize:"11px",fontWeight:600,letterSpacing:".5px",borderRadius:"4px",background:c.bg,border:`1px solid ${c.border}`,color:c.text,marginRight:"6px",marginBottom:"4px" }}>{children}</span>;
}

function LinkButton({ href, children, icon, primary }) {
  const bg = primary ? "rgba(191,148,228,.18)" : "rgba(191,148,228,.08)";
  const bgHover = primary ? "rgba(191,148,228,.32)" : "rgba(191,148,228,.18)";
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{
      display:"inline-flex",alignItems:"center",gap:5,padding:"5px 12px",borderRadius:8,
      background:bg,border:"1px solid rgba(191,148,228,.2)",
      color:"#BF94E4",fontSize:11,fontWeight:600,textDecoration:"none",
      transition:"all .2s",cursor:"pointer",marginRight:6,marginTop:8,
    }}
      onMouseEnter={e=>{e.currentTarget.style.background=bgHover;e.currentTarget.style.transform="translateY(-1px)";}}
      onMouseLeave={e=>{e.currentTarget.style.background=bg;e.currentTarget.style.transform="none";}}
    ><span style={{fontSize:12}}>{icon}</span> {children}</a>
  );
}

function SectionTitle({ children, sub }) {
  return (
    <div style={{ marginBottom:40,textAlign:"center" }}>
      <h2 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,5vw,42px)",fontWeight:700,color:"#fff",margin:0,lineHeight:1.2,letterSpacing:"-.5px" }}>{children}</h2>
      {sub && <p style={{ fontFamily:"'Noto Sans KR',sans-serif",fontSize:12,color:"rgba(191,148,228,.85)",marginTop:10,letterSpacing:"3px",textTransform:"uppercase" }}>{sub}</p>}
      <div style={{ width:60,height:2,background:"linear-gradient(90deg,transparent,#BF94E4,transparent)",margin:"14px auto 0" }} />
    </div>
  );
}

function CountdownTimer({ target, label }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const id = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(id); }, []);
  const diff = Math.max(0, target - now);
  if (diff === 0) return <span style={{ color:"#BF94E4",fontWeight:700,fontSize:16,fontFamily:"'Space Mono',monospace" }}>NOW OPEN</span>;
  const d=Math.floor(diff/864e5),h=Math.floor((diff%864e5)/36e5),m=Math.floor((diff%36e5)/6e4),s=Math.floor((diff%6e4)/1e3);
  return (
    <div style={{ display:"flex",gap:10,justifyContent:"center" }}>
      {[{v:d,l:"DAYS"},{v:h,l:"HRS"},{v:m,l:"MIN"},{v:s,l:"SEC"}].map((u,i)=>(
        <div key={i} style={{ textAlign:"center" }}>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:"clamp(20px,3.5vw,30px)",fontWeight:700,color:"#fff",background:"rgba(191,148,228,.08)",border:"1px solid rgba(191,148,228,.22)",borderRadius:8,padding:"6px 12px",minWidth:42 }}>{String(u.v).padStart(2,"0")}</div>
          <div style={{ fontSize:8,color:"rgba(191,148,228,.9)",marginTop:3,letterSpacing:"2px",fontWeight:600 }}>{u.l}</div>
        </div>
      ))}
    </div>
  );
}

function Card({ children, style: extra, href }) {
  const base = { background:"rgba(15,15,28,.8)",border:"1px solid rgba(191,148,228,.12)",borderRadius:16,padding:"24px 22px",position:"relative",overflow:"hidden" };
  const inner = (
    <div className="card-hover" style={{ ...base,cursor:href?"pointer":"default",...extra }}>
      {children}
      {href && <div style={{ position:"absolute",top:12,right:12,width:26,height:26,borderRadius:"50%",background:"rgba(191,148,228,.08)",display:"flex",alignItems:"center",justifyContent:"center" }}>
        <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="#BF94E4" strokeWidth="1.5" strokeLinecap="round"><path d="M2 10L10 2M10 2H4M10 2V8"/></svg>
      </div>}
    </div>
  );
  if (href) return <a href={href} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",color:"inherit",display:"block" }}>{inner}</a>;
  return inner;
}

function Accordion({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ background:"rgba(191,148,228,.03)",border:"1px solid rgba(191,148,228,.1)",borderRadius:12,overflow:"hidden",marginTop:10 }}>
      <button onClick={()=>setOpen(!open)} style={{
        width:"100%",padding:"14px 18px",background:"none",border:"none",cursor:"pointer",
        display:"flex",alignItems:"center",justifyContent:"space-between",color:"#fff",
      }}>
        <span style={{ fontSize:13,fontWeight:600,color:"rgba(191,148,228,.85)" }}>{title}</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="rgba(191,148,228,.9)" strokeWidth="1.5" strokeLinecap="round"
          style={{ transform:open?"rotate(180deg)":"rotate(0)",transition:"transform .2s" }}>
          <path d="M3 5l4 4 4-4"/>
        </svg>
      </button>
      {open && <div style={{ padding:"0 18px 16px",fontSize:12,color:"rgba(255,255,255,.9)",lineHeight:1.9 }}>{children}</div>}
    </div>
  );
}

/* ───────── app ───────── */

export default function App() {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      const secs = SECTIONS.map(s => { const el = document.getElementById(s.id); return el ? { id:s.id, top:el.offsetTop-120 } : null; }).filter(Boolean);
      for (let i = secs.length-1; i >= 0; i--) { if (window.scrollY >= secs[i].top) { setActiveSection(secs[i].id); break; } }
    };
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior:"smooth" });
  const preReserve = new Date("2026-03-17T10:00:00+09:00").getTime();
  const sungReserve = new Date("2026-03-18T15:00:00+09:00").getTime();
  const ddpReserve = new Date("2026-04-02T15:00:00+09:00").getTime();

  const sec = { maxWidth:1100,margin:"0 auto",padding:"90px clamp(16px,4vw,40px)" };
  const altBg = { padding:"90px 0",background:"linear-gradient(180deg,transparent,rgba(120,60,180,.025),transparent)" };

  return (
    <div style={{ minHeight:"100vh",background:"#08081a",color:"#fff",fontFamily:"'Noto Sans KR',sans-serif",position:"relative",overflow:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Noto+Sans+KR:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap');
        @keyframes floatUp{0%{transform:translateY(0) scale(1);opacity:0}10%{opacity:.5}90%{opacity:.08}100%{transform:translateY(-100vh) scale(.3);opacity:0}}
        @keyframes fadeInUp{from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulse{0%,100%{box-shadow:0 0 0 0 rgba(191,148,228,.35)}50%{box-shadow:0 0 18px 4px rgba(191,148,228,.15)}}
        @keyframes glow{0%,100%{border-color:rgba(191,148,228,.25)}50%{border-color:rgba(191,148,228,.9)}}
        *{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}body{background:#08081a}
        .card-hover{transition:transform .25s ease,box-shadow .25s ease,border-color .25s ease}
        .card-hover:hover{transform:translateY(-3px);box-shadow:0 10px 36px rgba(191,148,228,.1);border-color:rgba(191,148,228,.28)!important}
        .nav-link{position:relative;cursor:pointer;padding:6px 0;transition:color .2s}
        .nav-link::after{content:'';position:absolute;bottom:0;left:0;width:0;height:1.5px;background:#BF94E4;transition:width .3s ease}
        .nav-link:hover::after,.nav-link.active::after{width:100%}
        ::-webkit-scrollbar{width:5px}::-webkit-scrollbar-track{background:#08081a}::-webkit-scrollbar-thumb{background:rgba(191,148,228,.2);border-radius:3px}
        .reservation-card{animation:glow 3s ease-in-out infinite}
      `}</style>

      <div style={{ position:"fixed",inset:0,zIndex:0,opacity:.02,pointerEvents:"none",backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`}} />
      <div style={{ position:"fixed",inset:0,zIndex:0,pointerEvents:"none" }}>
        {Array.from({length:12},(_,i)=><FloatingParticle key={i} delay={i*1.3} size={`${4+Math.random()*7}px`} x={Math.random()*100}/>)}
      </div>

      {/* NAV */}
      <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,background:scrollY>50?"rgba(8,8,26,.92)":"transparent",backdropFilter:scrollY>50?"blur(14px)":"none",borderBottom:scrollY>50?"1px solid rgba(191,148,228,.06)":"none",transition:"all .4s",padding:"0 clamp(16px,4vw,40px)" }}>
        <div style={{ maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"center",justifyContent:"space-between",height:58 }}>
          <div onClick={()=>scrollTo("hero")} style={{ display:"flex",alignItems:"center",gap:8,cursor:"pointer" }}>
            <BTSLogo size={24} />
            <span style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:900,letterSpacing:"1px",background:"linear-gradient(135deg,#BF94E4,#E8D5F5)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>ARIRANG</span>
          </div>
          <div style={{ display:"flex",gap:16,alignItems:"center",flexWrap:"wrap" }}>
            {SECTIONS.slice(1).map(s=>(
              <span key={s.id} className={`nav-link ${activeSection===s.id?"active":""}`} onClick={()=>scrollTo(s.id)}
                style={{ fontSize:11,fontWeight:500,letterSpacing:"1px",color:activeSection===s.id?"#BF94E4":"rgba(255,255,255,.92)" }}>{s.label}</span>
            ))}
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section id="hero" style={{ minHeight:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",textAlign:"center",padding:"80px 20px 60px" }}>
        <div style={{ position:"absolute",width:"50vw",height:"50vw",maxWidth:500,maxHeight:500,borderRadius:"50%",background:"radial-gradient(circle,rgba(120,60,180,.1) 0%,transparent 70%)",top:"14%",left:"50%",transform:"translateX(-50%)",filter:"blur(60px)",pointerEvents:"none" }} />
        <div style={{ position:"relative",zIndex:1,animation:"fadeInUp 1s ease" }}>
          <div style={{ marginBottom:28 }}>
            <BothLogos btsSize={48} armySize={48} gap={20} />
          </div>
          <div style={{ fontSize:11,letterSpacing:"6px",color:"rgba(191,148,228,.85)",fontWeight:600,marginBottom:22 }}>BTS THE CITY</div>
          <h1 style={{ fontFamily:"'Playfair Display',serif",fontSize:"clamp(50px,11vw,108px)",fontWeight:900,lineHeight:.92,marginBottom:8,background:"linear-gradient(180deg,#fff 30%,rgba(191,148,228,.9) 100%)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent" }}>ARIRANG</h1>
          <div style={{ fontFamily:"'Space Mono',monospace",fontSize:"clamp(13px,2.5vw,18px)",fontWeight:400,letterSpacing:"10px",color:"rgba(255,255,255,.9)",marginBottom:40 }}>— SEOUL —</div>
          <p style={{ fontSize:"clamp(14px,1.8vw,16px)",color:"rgba(255,255,255,.92)",maxWidth:460,margin:"0 auto 44px",lineHeight:1.9,fontWeight:300 }}>
            도시 전체가 보랏빛으로 물드는 순간,<br/>방탄소년단의 새로운 여정을 함께 즐기는 마스터 가이드
          </p>
          <div style={{ marginBottom:20 }}>
            <div style={{ fontSize:11,letterSpacing:"3px",color:"rgba(191,148,228,.9)",fontWeight:600,marginBottom:14 }}>사전 예약 오픈</div>
            <CountdownTimer target={preReserve} />
          </div>
          <div style={{ marginTop:24,display:"flex",gap:10,justifyContent:"center",flexWrap:"wrap" }}>
            <a href="https://weverse.io/bts/notice/34163" target="_blank" rel="noopener noreferrer" style={{
              display:"inline-flex",alignItems:"center",gap:6,padding:"11px 26px",borderRadius:50,
              background:"linear-gradient(135deg,#BF94E4,#8B5CF6)",color:"#fff",fontSize:13,fontWeight:600,
              textDecoration:"none",letterSpacing:".5px",transition:"transform .2s,box-shadow .2s",
            }} onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 8px 28px rgba(191,148,228,.25)";}}
               onMouseLeave={e=>{e.currentTarget.style.transform="none";e.currentTarget.style.boxShadow="none";}}>
              사전 예약 신청하기 →
            </a>
            <a href="https://weverse.io/bts/notice/34162" target="_blank" rel="noopener noreferrer" style={{
              display:"inline-flex",alignItems:"center",gap:6,padding:"11px 26px",borderRadius:50,
              background:"transparent",border:"1px solid rgba(191,148,228,.35)",color:"#BF94E4",fontSize:13,fontWeight:600,
              textDecoration:"none",letterSpacing:".5px",transition:"all .2s",
            }} onMouseEnter={e=>{e.currentTarget.style.background="rgba(191,148,228,.08)";}}
               onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>
              전체 공지 보기
            </a>
          </div>
          <div style={{ marginTop:36 }}>
            <div onClick={()=>scrollTo("reservation")} style={{ display:"inline-block",cursor:"pointer",animation:"pulse 2s ease infinite" }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(191,148,228,.4)" strokeWidth="1.5"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
            </div>
          </div>
        </div>
      </section>

      {/* ──── RESERVATION GUIDE (NEW) ──── */}
      <section id="reservation" style={{ ...altBg }}>
        <div style={sec}>
          <SectionTitle sub="PRE-RESERVATION GUIDE">사전 예약 신청 안내</SectionTitle>
          <p style={{ textAlign:"center",fontSize:13,color:"rgba(255,255,255,.92)",maxWidth:600,margin:"-20px auto 12px",lineHeight:1.8 }}>
            예약은 위버스 줄서기 시스템을 통해 선착순으로 진행됩니다.<br/>
            예약 완료 후 입장 안내 사항을 반드시 확인해 주세요.
          </p>
          <div style={{ textAlign:"center",marginBottom:36 }}>
            <LinkButton href="https://weverse.io/bts/notice/34163" icon="🔗" primary>사전 예약 공지 전문 보기</LinkButton>
          </div>

          <div style={{ display:"flex",flexDirection:"column",gap:24,maxWidth:800,margin:"0 auto" }}>

            {/* 1. 숭례문 */}
            <div className="reservation-card" style={{ background:"linear-gradient(135deg,rgba(191,148,228,.06),rgba(15,15,28,.9))",border:"1px solid rgba(191,148,228,.22)",borderRadius:20,padding:"28px 26px",position:"relative",overflow:"hidden" }}>
              <div style={{ position:"absolute",top:-40,right:-40,width:100,height:100,borderRadius:"50%",background:"radial-gradient(circle,rgba(191,148,228,.08),transparent)",pointerEvents:"none" }} />
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:10 }}>
                <Tag variant="스탬프랠리">스탬프랠리</Tag><Tag variant="사전예약">사전예약</Tag><Tag variant="NEW">예약 오픈 D-1</Tag>
              </div>
              <h3 style={{ fontSize:19,fontWeight:700,color:"#fff",marginBottom:6 }}>1. 숭례문 BTS 컴백 미디어 파사드</h3>
              <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 14px",fontSize:13,color:"rgba(255,255,255,.92)",marginBottom:14,lineHeight:1.8 }}>
                <span style={{ color:"rgba(191,148,228,.85)" }}>행사 일정</span><span>2026.03.20 (금) 19:00~24:00</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>장소</span><span>숭례문</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>예약 오픈</span><span style={{ color:"#FFD666",fontWeight:600 }}>2026.03.18 (수) 15:00 KST</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>인원</span><span>1인 1명 신청 가능</span>
              </div>
              <div style={{ background:"rgba(191,148,228,.05)",borderRadius:10,padding:"14px 16px",marginBottom:14 }}>
                <div style={{ fontSize:12,fontWeight:600,color:"rgba(191,148,228,.8)",marginBottom:8 }}>⏰ 숭례문 예약 오픈까지</div>
                <CountdownTimer target={sungReserve} />
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                <LinkButton href="https://map.naver.com/p/search/숭례문" icon="📍">네이버 지도</LinkButton>
                <LinkButton href="https://www.google.com/maps/search/숭례문" icon="📍">구글 지도</LinkButton>
              </div>
              <Accordion title="📍 입장 안내 사항 (필독)">
                <strong style={{ color:"rgba(255,255,255,.9)" }}>입장 확인 프로세스</strong><br/>
                1) 서울역 5번 출구 앞 예약 확인 부스에서 예약 확인<br/>
                2) 위버스 예약 확인 페이지를 미리 준비<br/>
                3) 예약 회차 기준 1시간 전부터 입장 확인 가능<br/>
                ※ 60분 전 / 40분 전 / 20분 전 지정 대기 구역으로 이동<br/><br/>
                <strong style={{ color:"rgba(255,255,255,.9)" }}>유의사항</strong><br/>
                • 1시간 이상 일찍 도착 시 대기열 진입 제한<br/>
                • 사전 예약자만 입장 가능 (미예약자 현장 대기 불가)<br/>
                • 대리 예약·양도 불가<br/>
                • 예약 회차 시간 경과 시 입장 불가 (재입장 불가)
              </Accordion>
              <Accordion title="📍 행사 안내 사항 (필독)">
                • 회차당 총 20분 (입장 10분 + 영상 3분 + 퇴장 7분)<br/>
                • 총 6개 구역 스탠딩 관람 (돗자리 사용 불가)<br/>
                • 화장실 미설치 — 인근 공공화장실 이용<br/>
                • 물품 보관 불가 — 인근 지하철 물품보관함 이용 권장<br/><br/>
                <strong style={{ color:"rgba(255,255,255,.9)" }}>반입 불가 품목</strong><br/>
                A3 이상 가방·캐리어 / 500ml 이하 생수 외 음식물 / 대형 카메라·셀카봉·삼각대 / 드론 / 장우산 / 풍선 / 레이저·폭죽 / 동물 (의료보조동물 제외) / 바퀴 달린 이동수단 (휠체어 제외) / 화기류
              </Accordion>
            </div>

            {/* 2. 러브 송 라운지 */}
            <div style={{ background:"rgba(15,15,28,.85)",border:"1px solid rgba(191,148,228,.15)",borderRadius:20,padding:"28px 26px" }}>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:10 }}>
                <Tag variant="스탬프랠리">스탬프랠리</Tag><Tag variant="현장예약">현장예약</Tag>
              </div>
              <h3 style={{ fontSize:19,fontWeight:700,color:"#fff",marginBottom:6 }}>2. 러브 송 라운지</h3>
              <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 14px",fontSize:13,color:"rgba(255,255,255,.92)",marginBottom:14,lineHeight:1.8 }}>
                <span style={{ color:"rgba(191,148,228,.85)" }}>행사 기간</span><span>2026.03.20 (금) ~ 03.22 (일) 매일 10:00~20:00</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>장소</span><span>여의도 한강공원 멀티 플라자</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>현장 예약</span><span style={{ color:"#FFB464",fontWeight:600 }}>2026.03.20 (금) 10:00 KST 현장 오픈</span>
              </div>
              <div style={{ background:"rgba(255,180,100,.06)",borderRadius:8,padding:"10px 14px",fontSize:12,color:"rgba(255,180,100,.7)",marginBottom:14,lineHeight:1.6 }}>
                ⚠️ 현장에서만 예약 가능합니다. 현장 내 설치된 배너를 확인하세요.
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                <LinkButton href="https://map.naver.com/p/search/여의도한강공원 멀티플라자" icon="📍">네이버 지도</LinkButton>
                <LinkButton href="https://www.google.com/maps/search/여의도한강공원" icon="📍">구글 지도</LinkButton>
              </div>
              <Accordion title="📍 입장 및 행사 안내 (필독)">
                <strong style={{ color:"rgba(255,255,255,.9)" }}>입장 프로세스</strong><br/>
                1) 메인 입구 → REST AREA 안내 테이블 위치 확인<br/>
                2) REST AREA 테이블에서 예약 확인(인증)<br/>
                3) 예약 인증 표식 수령 → 원하는 REST 구역 대기<br/>
                4) 좌석에 표식 비치 후 프로그램 이용<br/><br/>
                <strong style={{ color:"rgba(255,255,255,.9)" }}>유의사항</strong><br/>
                • 시작 10분 전부터 입장, 시작 후 10분 초과 시 자동 노쇼 처리<br/>
                • REST 구역별 좌석 수 상이, 선착순 운영<br/>
                • 기본 이용 시간 40분 / 마지막 회차 1시간<br/>
                • 반려동물 출입 제한 · 물품 보관 불가
              </Accordion>
            </div>

            {/* 3. DDP 아미 마당 */}
            <div style={{ background:"rgba(15,15,28,.85)",border:"1px solid rgba(191,148,228,.15)",borderRadius:20,padding:"28px 26px" }}>
              <div style={{ display:"flex",gap:8,flexWrap:"wrap",marginBottom:10 }}>
                <Tag variant="스탬프랠리">스탬프랠리</Tag><Tag variant="사전예약">사전예약</Tag>
              </div>
              <h3 style={{ fontSize:19,fontWeight:700,color:"#fff",marginBottom:6 }}>3. DDP 아미 마당</h3>
              <div style={{ display:"grid",gridTemplateColumns:"auto 1fr",gap:"4px 14px",fontSize:13,color:"rgba(255,255,255,.92)",marginBottom:14,lineHeight:1.8 }}>
                <span style={{ color:"rgba(191,148,228,.85)" }}>행사 기간</span><span>2026.04.06 (월) ~ 04.12 (일)</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>장소</span><span>DDP 전시1관</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>예약 오픈</span><span style={{ color:"#FFD666",fontWeight:600 }}>2026.04.02 (목) 15:00 KST</span>
                <span style={{ color:"rgba(191,148,228,.85)" }}>비고</span><span>사전 예약 + 현장 예약 모두 가능</span>
              </div>
              <div style={{ background:"rgba(191,148,228,.05)",borderRadius:10,padding:"14px 16px",marginBottom:14 }}>
                <div style={{ fontSize:12,fontWeight:600,color:"rgba(191,148,228,.8)",marginBottom:8 }}>⏰ DDP 아미 마당 예약 오픈까지</div>
                <CountdownTimer target={ddpReserve} />
              </div>
              <div style={{ display:"flex",flexWrap:"wrap",gap:6 }}>
                <LinkButton href="https://map.naver.com/p/search/DDP" icon="📍">네이버 지도</LinkButton>
                <LinkButton href="https://www.google.com/maps/search/DDP서울" icon="📍">구글 지도</LinkButton>
              </div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,.92)",marginTop:10,lineHeight:1.6 }}>
                ※ 운영 시간 추후 업데이트 예정<br/>
                ※ 입장 안내·행사 안내는 2026.04.01까지 추가 공지 예정
              </div>
            </div>
          </div>

          {/* Weverse 줄서기 안내 */}
          <div style={{ maxWidth:800,margin:"30px auto 0" }}>
            <Accordion title="📱 위버스 줄서기 유의사항">
              1. 위버스 앱 접속 권장 (최신 버전 업데이트)<br/>
              2. 위버스 로그인 필수<br/>
              3. 신청 완료 시 이메일 발송 — 올바른 이메일 확인 필수<br/>
              4. 입장 시 신청 내역 화면 확인 (캡처본·타인 공유 불인정)<br/>
              5. 사전 예약은 1일 1회만 신청 가능<br/>
              6. 줄서기 취소 시 기존 내역 복구 불가 — 재신청 필요<br/>
              7. 당일 운영 종료 후 해당 일자 내역 무효 처리
            </Accordion>
          </div>
        </div>
      </section>

      {/* SCHEDULE */}
      <section id="schedule" style={sec}>
        <SectionTitle sub="KEY DATES">주요 오픈 일정</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:18,maxWidth:880,margin:"0 auto" }}>
          {[
            { date:"2026.03.17",time:"10:00",title:"사전 예약 오픈",icon:"📋",desc:"숭례문 파사드 · 아미 마당 · 러브 송 라운지" },
            { date:"2026.03.18",time:"15:00",title:"숭례문 파사드 예약 오픈",icon:"🏛️",desc:"위버스 줄서기 선착순" },
            { date:"2026.03.19",time:"11:00",title:"스탬프 랠리 상세 공지",icon:"🏆",desc:"총 10곳 미션 스팟" },
            { date:"2026.03.20",time:"11:00",title:"드론 라이트쇼 상세 공지",icon:"✨",desc:"뚝섬 한강공원 · 단 15분" },
            { date:"2026.04.02",time:"15:00",title:"DDP 아미 마당 예약 오픈",icon:"🎪",desc:"사전예약 + 현장예약" },
          ].map((item,i)=>(
            <Card key={i} style={{ background:"linear-gradient(135deg,rgba(191,148,228,.05),rgba(10,10,20,.8))",border:"1px solid rgba(191,148,228,.13)" }}>
              <div style={{ fontSize:24,marginBottom:8 }}>{item.icon}</div>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:11,color:"#BF94E4",letterSpacing:"1px",marginBottom:4 }}>{item.date} · {item.time} KST</div>
              <div style={{ fontSize:15,fontWeight:600,color:"#fff",marginBottom:4 }}>{item.title}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.9)",lineHeight:1.5 }}>{item.desc}</div>
            </Card>
          ))}
        </div>
      </section>

      {/* STAGES */}
      <section id="stages" style={altBg}><div style={sec}>
        <SectionTitle sub="MAIN STAGES">두 개의 메인 스테이지</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:22,maxWidth:860,margin:"0 auto" }}>
          {[
            { title:"BTS 컴백 라이브:\nARIRANG",date:"2026.03.21 (토)",loc:"광화문",accent:"linear-gradient(135deg,#BF94E4,#8B5CF6)",mapUrl:"https://map.naver.com/p/search/광화문광장",extra:"Netflix 전 세계 동시 생중계" },
            { title:"BTS WORLD TOUR\n'ARIRANG' IN GOYANG",date:"04.09 / 04.11 / 04.12",loc:"고양 종합운동장",accent:"linear-gradient(135deg,#E8D5F5,#BF94E4)",mapUrl:"https://map.naver.com/p/search/고양종합운동장" },
          ].map((s,i)=>(
            <Card key={i} href={s.mapUrl} style={{ border:"1px solid rgba(191,148,228,.18)" }}>
              <div style={{ position:"absolute",top:0,left:0,right:0,height:3,background:s.accent }} />
              <Tag variant="스탬프랠리">스탬프랠리</Tag>
              <h3 style={{ fontFamily:"'Playfair Display',serif",fontSize:20,fontWeight:700,color:"#fff",marginTop:12,marginBottom:5,lineHeight:1.4,whiteSpace:"pre-line" }}>{s.title}</h3>
              {s.extra && <div style={{ fontSize:12,color:"#BF94E4",fontWeight:500,marginBottom:8 }}>{s.extra}</div>}
              <div style={{ fontSize:12,color:"rgba(255,255,255,.92)",marginBottom:3 }}><span style={{ color:"rgba(191,148,228,.9)",marginRight:8 }}>일정</span>{s.date}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.92)" }}><span style={{ color:"rgba(191,148,228,.9)",marginRight:8 }}>장소</span>{s.loc}</div>
              <LinkButton href={s.mapUrl} icon="📍">지도 보기</LinkButton>
            </Card>
          ))}
        </div>
      </div></section>

      {/* LANDMARKS */}
      <section id="landmarks" style={sec}>
        <SectionTitle sub="LANDMARK LIGHTING">랜드마크 라이팅</SectionTitle>
        <div style={{ display:"flex",flexDirection:"column",gap:10,maxWidth:800,margin:"0 auto" }}>
          {LANDMARK_DATA.map((lm,i)=>(
            <a key={i} href={lm.mapUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none",color:"inherit" }}>
              <div className="card-hover" style={{ display:"grid",gridTemplateColumns:"1fr auto auto",alignItems:"center",gap:14,background:"rgba(15,15,28,.7)",border:"1px solid rgba(191,148,228,.08)",borderRadius:12,padding:"15px 20px",cursor:"pointer" }}>
                <div>
                  <div style={{ fontSize:13,fontWeight:600,color:"#fff",marginBottom:3,display:"flex",alignItems:"center",flexWrap:"wrap",gap:5 }}>
                    {lm.name}{lm.stamp && <Tag variant="스탬프랠리">스탬프랠리</Tag>}{lm.reserve && <Tag variant="사전예약">사전예약</Tag>}
                  </div>
                  <div style={{ fontSize:11,color:"rgba(255,255,255,.9)" }}>{lm.note}</div>
                </div>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.9)",textAlign:"right",whiteSpace:"nowrap" }}>{lm.date}</div>
                <div style={{ fontSize:11,color:"rgba(255,255,255,.9)",textAlign:"right",whiteSpace:"nowrap" }}>{lm.time}</div>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* PROMOS + QUARTERS */}
      <section id="promos" style={altBg}><div style={sec}>
        <SectionTitle sub="OFFLINE PROMOTIONS">오프라인 프로모션</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:16,maxWidth:880,margin:"0 auto" }}>
          {PROMO_DATA.map((p,i)=>(
            <Card key={i} href={p.mapUrl} style={{ border:"1px solid rgba(191,148,228,.14)" }}>
              <Tag variant="스탬프랠리">스탬프랠리</Tag>
              <h4 style={{ fontSize:15,fontWeight:600,color:"#fff",margin:"9px 0 5px" }}>{p.name}</h4>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.85)",marginBottom:5 }}>{p.date}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.92)",marginBottom:3 }}>{p.loc}</div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,.92)",fontStyle:"italic" }}>{p.note}</div>
              <LinkButton href={p.mapUrl} icon="📍">지도 보기</LinkButton>
            </Card>
          ))}
        </div>
        <div style={{ marginTop:56 }}>
          <h3 style={{ textAlign:"center",fontSize:19,fontWeight:600,color:"rgba(255,255,255,.82)",marginBottom:6,fontFamily:"'Playfair Display',serif" }}>러브쿼터 특화 거리</h3>
          <p style={{ textAlign:"center",fontSize:11,color:"rgba(191,148,228,.85)",marginBottom:24,letterSpacing:"2px" }}>LOVE QUARTERS</p>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,maxWidth:880,margin:"0 auto" }}>
            {QUARTER_DATA.map((q,i)=>(
              <Card key={i} href={q.mapUrl} style={{ border:q.stamp?"1px solid rgba(191,148,228,.28)":"1px solid rgba(191,148,228,.08)" }}>
                {q.stamp && <Tag variant="스탬프랠리">스탬프랠리</Tag>}
                <h4 style={{ fontSize:14,fontWeight:600,color:"#fff",margin:q.stamp?"7px 0 4px":"0 0 4px" }}>{q.name}</h4>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.9)",marginBottom:3 }}>{q.period}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.9)" }}>{q.loc}</div>
                {q.note && <div style={{ fontSize:10,color:"rgba(255,255,255,.92)",marginTop:3 }}>{q.note}</div>}
                <LinkButton href={q.mapUrl} icon="📍">지도</LinkButton>
              </Card>
            ))}
          </div>
        </div>
      </div></section>

      {/* EVENTS */}
      <section id="events" style={sec}>
        <SectionTitle sub="FAN ACTIVITIES">오프라인 액티비티</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(270px,1fr))",gap:16,maxWidth:900,margin:"0 auto" }}>
          {EVENT_DATA.map((ev,i)=>(
            <Card key={i} style={{ border:"1px solid rgba(191,148,228,.1)" }}>
              <div style={{ marginBottom:7 }}>{ev.tags.map((t,j)=><Tag key={j} variant={t}>{t}</Tag>)}</div>
              <h4 style={{ fontSize:15,fontWeight:700,color:"#fff",marginBottom:6 }}>{ev.name}</h4>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.85)",marginBottom:3 }}>{ev.date}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.92)" }}>{ev.loc}</div>
              {ev.note && <div style={{ fontSize:11,color:"rgba(255,255,255,.9)",marginTop:3 }}>{ev.note}</div>}
              <div style={{ marginTop:6,display:"flex",flexWrap:"wrap",gap:4 }}>
                {ev.contactUrl && <LinkButton href={ev.contactUrl} icon="📷">{ev.contact}</LinkButton>}
                {ev.mapUrl && <LinkButton href={ev.mapUrl} icon="📍">지도</LinkButton>}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* POP-UPS */}
      <section id="popups" style={altBg}><div style={sec}>
        <SectionTitle sub="POP-UP STORES">공식 팝업스토어</SectionTitle>
        <p style={{ textAlign:"center",fontSize:12,color:"rgba(191,148,228,.85)",marginTop:-24,marginBottom:26,fontWeight:500 }}>두 곳 모두 사전 예약자에 한해 입장 가능</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20,maxWidth:780,margin:"0 auto" }}>
          {POPUP_DATA.map((p,i)=>(
            <Card key={i} href={p.mapUrl} style={{ background:"linear-gradient(135deg,rgba(191,148,228,.06),rgba(15,15,28,.9))",border:"1px solid rgba(191,148,228,.2)" }}>
              <Tag variant="사전예약">사전예약</Tag>
              <h4 style={{ fontFamily:"'Playfair Display',serif",fontSize:17,fontWeight:700,color:"#fff",marginTop:10,marginBottom:2 }}>{p.name}</h4>
              <div style={{ fontSize:12,color:"#BF94E4",fontWeight:500,marginBottom:10 }}>{p.sub}</div>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(255,255,255,.92)" }}>{p.date}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.9)",marginTop:3 }}>{p.loc}</div>
              <LinkButton href={p.mapUrl} icon="📍">지도 보기</LinkButton>
            </Card>
          ))}
        </div>
      </div></section>

      {/* F&B */}
      <section id="fnb" style={sec}>
        <SectionTitle sub="F&B COLLABORATION">공식 F&B 콜라보레이션</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14,maxWidth:880,margin:"0 auto" }}>
          {FNB_DATA.map((f,i)=>(
            <Card key={i} href={f.contactUrl} style={{ border:"1px solid rgba(191,148,228,.08)" }}>
              <h4 style={{ fontSize:14,fontWeight:700,color:"#fff",marginBottom:5 }}>{f.name}</h4>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.85)",marginBottom:3 }}>{f.period}</div>
              <div style={{ fontSize:12,color:"rgba(255,255,255,.9)" }}>{f.loc}</div>
              {f.contact && <LinkButton href={f.contactUrl} icon="📷">{f.contact}</LinkButton>}
            </Card>
          ))}
        </div>
        <div style={{ marginTop:48 }}>
          <h3 style={{ textAlign:"center",fontSize:17,fontWeight:600,color:"rgba(255,255,255,.75)",marginBottom:20,fontFamily:"'Playfair Display',serif" }}>모니모 프로모션</h3>
          <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:14,maxWidth:880,margin:"0 auto" }}>
            {FINANCE_DATA.map((f,i)=>(
              <Card key={i} style={{ border:"1px solid rgba(191,148,228,.08)" }}>
                <h4 style={{ fontSize:13,fontWeight:600,color:"#fff",marginBottom:5 }}>{f.name}</h4>
                <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.9)",marginBottom:5 }}>{f.period}</div>
                <div style={{ fontSize:12,color:"rgba(255,255,255,.9)",lineHeight:1.6 }}>{f.desc}</div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* MOBILITY */}
      <section id="mobility" style={altBg}><div style={sec}>
        <SectionTitle sub="MOBILITY">모빌리티</SectionTitle>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))",gap:20,maxWidth:780,margin:"0 auto" }}>
          <Card style={{ border:"1px solid rgba(191,148,228,.14)" }}>
            <div style={{ fontSize:26,marginBottom:8 }}>🚕</div>
            <h4 style={{ fontSize:15,fontWeight:600,color:"#fff",marginBottom:4 }}>카카오 T & k.ride</h4>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.85)",marginBottom:8 }}>03.20~04.19</div>
            <div style={{ fontSize:12,color:"rgba(255,255,255,.92)",lineHeight:1.7 }}>
              외국인 전용 택시 앱에서<br/>할인 코드 <span style={{ color:"#BF94E4",fontWeight:700,fontFamily:"'Space Mono',monospace",background:"rgba(191,148,228,.08)",padding:"2px 7px",borderRadius:4 }}>BTSKRIDE</span>
            </div>
            <div style={{ fontSize:10,color:"rgba(255,255,255,.92)",marginTop:6 }}>k.ride 앱 → My → COUPONS → 코드 입력</div>
          </Card>
          <Card href="https://map.naver.com/p/search/광화문매표소" style={{ border:"1px solid rgba(191,148,228,.14)" }}>
            <div style={{ fontSize:26,marginBottom:8 }}>🚌</div>
            <h4 style={{ fontSize:15,fontWeight:600,color:"#fff",marginBottom:4 }}>서울시티투어버스 | 타이거버스</h4>
            <Tag variant="예매필수">예매필수</Tag>
            <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.85)",marginTop:6,marginBottom:6 }}>03.22~04.19</div>
            <div style={{ fontSize:12,color:"rgba(255,255,255,.92)",lineHeight:1.7 }}>종로구/중구 (북촌·서촌 중심)<br/>광화문 매표소 (중구 태평로1가 68-2)</div>
            <div style={{ fontSize:10,color:"rgba(255,255,255,.92)",marginTop:5 }}>📞 02-777-6090</div>
            <LinkButton href="https://map.naver.com/p/search/광화문매표소" icon="📍">매표소 위치</LinkButton>
          </Card>
        </div>
      </div></section>

      {/* STAYS */}
      <section id="stays" style={sec}>
        <SectionTitle sub="THEMED STAYS">오프라인 테마 스테이</SectionTitle>
        <p style={{ textAlign:"center",fontSize:11,color:"rgba(255,255,255,.92)",marginTop:-24,marginBottom:24 }}>호텔 예약 후 이용 가능 · 각 호텔별 특별 F&B 협업</p>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))",gap:14,maxWidth:880,margin:"0 auto" }}>
          {STAY_DATA.map((h,i)=>(
            <Card key={i} href={h.contactUrl} style={{ border:"1px solid rgba(191,148,228,.1)" }}>
              <h4 style={{ fontSize:14,fontWeight:600,color:"#fff",marginBottom:5 }}>{h.name}</h4>
              <div style={{ fontFamily:"'Space Mono',monospace",fontSize:10,color:"rgba(191,148,228,.9)",marginBottom:5 }}>{h.date}</div>
              <div style={{ fontSize:11,color:"rgba(255,255,255,.9)",lineHeight:1.5 }}>{h.note}</div>
              <LinkButton href={h.contactUrl} icon="📷">{h.contact}</LinkButton>
              {h.phone && <div style={{ fontSize:10,color:"rgba(255,255,255,.92)",marginTop:5 }}>📞 {h.phone}</div>}
            </Card>
          ))}
        </div>
      </section>

      {/* NOTICE */}
      <section style={{ padding:"50px clamp(16px,4vw,40px)",maxWidth:780,margin:"0 auto" }}>
        <div style={{ background:"rgba(191,148,228,.03)",border:"1px solid rgba(191,148,228,.08)",borderRadius:14,padding:"24px 22px" }}>
          <h4 style={{ fontSize:13,fontWeight:600,color:"rgba(191,148,228,.9)",marginBottom:10 }}>유의사항</h4>
          <div style={{ fontSize:11,color:"rgba(255,255,255,.92)",lineHeight:2 }}>
            ※ 모든 프로그램은 현장 상황 및 기상 여건에 따라 변경될 수 있습니다.<br/>
            ※ 일부 프로그램은 사전 예약 또는 예매를 통해 진행됩니다.<br/>
            ※ 일부 프로그램은 인원 제한이 있으며, 안전 규정에 따라 운영됩니다.<br/>
            ※ 행사장에서 촬영된 사진·영상은 주최 측 홍보 목적으로 사용될 수 있습니다.
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:"44px 20px 32px",borderTop:"1px solid rgba(191,148,228,.05)",textAlign:"center" }}>
        <div style={{ marginBottom:14 }}>
          <BothLogos btsSize={28} armySize={28} gap={14} />
        </div>
        <div style={{ fontFamily:"'Playfair Display',serif",fontSize:24,fontWeight:900,background:"linear-gradient(135deg,rgba(191,148,228,.3),rgba(191,148,228,.1))",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",marginBottom:12 }}>ARIRANG — SEOUL</div>
        <div style={{ display:"flex",gap:14,justifyContent:"center",marginBottom:16,flexWrap:"wrap" }}>
          <a href="https://weverse.io/bts/notice/34163" target="_blank" rel="noopener noreferrer" style={{ fontSize:11,color:"rgba(191,148,228,.9)",textDecoration:"none" }}>사전 예약 공지</a>
          <span style={{ color:"rgba(191,148,228,.15)" }}>|</span>
          <a href="https://weverse.io/bts/notice/34162" target="_blank" rel="noopener noreferrer" style={{ fontSize:11,color:"rgba(191,148,228,.9)",textDecoration:"none" }}>상세 공지</a>
          <span style={{ color:"rgba(191,148,228,.15)" }}>|</span>
          <a href="https://weverse.io/bts" target="_blank" rel="noopener noreferrer" style={{ fontSize:11,color:"rgba(191,148,228,.9)",textDecoration:"none" }}>BTS Weverse</a>
        </div>
        <div style={{ fontSize:10,color:"rgba(255,255,255,.1)",letterSpacing:"2px" }}>BTS THE CITY ARIRANG SEOUL © 2026</div>
      </footer>
    </div>
  );
}
