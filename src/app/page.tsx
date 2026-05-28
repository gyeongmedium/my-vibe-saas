import Link from 'next/link';

const PROBLEMS = [
  { icon: '!', text: '과제와 온라인 강의 마감을 놓친다' },
  { icon: '?', text: '시험 범위가 넓어 공부를 어떻게 나눠야 할지 모른다' },
  { icon: 'Z', text: '시험기간에는 집중이 잘 안 된다' },
];

const FEATURES = [
  { icon: 'D', title: '마감기한 관리',    desc: '과제와 강의 마감일을 한눈에 정리해요' },
  { icon: 'C', title: '시험 범위 배분',   desc: '범위를 입력하면 날짜별 공부량을 자동으로 계산해요' },
  { icon: 'T', title: '캐릭터 공부 모드', desc: '집중 타이머와 함께 공부해요' },
];

export default function LandingPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#008080', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 40 }}>
      <div style={{ width: '100%', maxWidth: 600, background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff' }}>

        {/* 타이틀바 */}
        <div style={{ background: 'linear-gradient(to right, #000080, #1084d0)', color: '#fff', padding: '6px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', userSelect: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 'bold', fontSize: 13 }}>
            <span style={{ display: 'inline-block', width: 16, height: 16, background: '#ffff00', border: '1px solid #000', fontSize: 10, textAlign: 'center', lineHeight: '16px', fontWeight: 'bold', color: '#000' }}>S</span>
            시험 플래너
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            {['?', 'X'].map((b) => (
              <span key={b} style={{ background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', width: 20, height: 18, fontSize: 10, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'default', fontWeight: 'bold', color: '#000' }}>{b}</span>
            ))}
          </div>
        </div>

        {/* 콘텐츠 */}
        <div style={{ padding: '48px 56px', fontFamily: "'MS Sans Serif', Arial, sans-serif" }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 12, color: '#808080', marginBottom: 14 }}>ver 1.0 — 대학생 시험기간 관리 도구</div>
            <h1 style={{ fontSize: 22, fontWeight: 'bold', color: '#000080', marginBottom: 20, lineHeight: 1.5 }}>
              시험기간, 이제 헤매지 마세요
            </h1>
            <p style={{ fontSize: 13, color: '#404040', lineHeight: 2, marginBottom: 32 }}>
              과제·강의·시험 범위를 한 곳에서 관리하고<br />
              날짜별 공부량을 자동으로 계산해드려요.
            </p>
            <Link href="/app">
              <button style={{ background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', padding: '10px 48px', fontSize: 14, fontWeight: 'bold', cursor: 'pointer', fontFamily: "'MS Sans Serif', Arial, sans-serif" }}>
                시작하기
              </button>
            </Link>
          </div>

          {/* 구분선 */}
          <div style={{ border: 'none', borderTop: '1px solid #808080', borderBottom: '1px solid #ffffff', margin: '0 0 36px' }} />

          {/* 문제 섹션 */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>이런 적 있지 않으셨나요?</div>
            <div style={{ border: '2px solid', borderColor: '#808080 #ffffff #ffffff #808080', background: '#fff' }}>
              {PROBLEMS.map((p, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', borderBottom: i < PROBLEMS.length - 1 ? '1px solid #e8e8e8' : 'none', fontSize: 13 }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 24, height: 24, background: '#000080', color: '#fff', fontSize: 12, fontWeight: 'bold', flexShrink: 0 }}>{p.icon}</span>
                  {p.text}
                </div>
              ))}
            </div>
          </div>

          {/* 기능 섹션 */}
          <div style={{ marginBottom: 36 }}>
            <div style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16 }}>이렇게 도와드릴게요</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {FEATURES.map((f, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16, background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', padding: '16px 20px' }}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, background: '#000080', color: '#fff', fontSize: 14, fontWeight: 'bold', flexShrink: 0 }}>{f.icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 'bold', marginBottom: 6 }}>{f.title}</div>
                    <div style={{ fontSize: 12, color: '#404040', lineHeight: 1.6 }}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 하단 버튼 */}
          <div style={{ borderTop: '1px solid #808080', paddingTop: 28, display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            <Link href="/app">
              <button style={{ background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', padding: '8px 32px', fontSize: 13, fontWeight: 'bold', cursor: 'pointer', fontFamily: "'MS Sans Serif', Arial, sans-serif" }}>
                시작하기
              </button>
            </Link>
            <button style={{ background: '#c0c0c0', border: '2px solid', borderColor: '#ffffff #808080 #808080 #ffffff', padding: '8px 32px', fontSize: 13, cursor: 'pointer', fontFamily: "'MS Sans Serif', Arial, sans-serif" }}>
              취소
            </button>
          </div>

        </div>
      </div>
    </main>
  );
}
