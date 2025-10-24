# Toss Inspired UI 템플릿

> React + TypeScript + Vite + Tailwind CSS v3 조합으로 제작한 토스 감성 UI 디자인 템플릿입니다. 메인 · 로그인/회원가입 · 게시판 페이지와 상품화 가능한 컴포넌트 문서를 포함합니다.

## 주요 특징

- **Tailwind CSS v3 기반 디자인 토큰**: `brand` 외에도 남색(`navy`), 빨강(`red`), 파랑(`blue`), 초록(`green`), 갈색(`brown`) 팔레트를 확장해 다양한 상태/그래프 톤을 바로 사용할 수 있습니다.
- **풍부한 UI 모듈 제공**: 버튼, 폼 필드, 스위치, 탭뿐 아니라 Alert, Avatar, Breadcrumb, Pagination, ProgressBar, StatCard, DataTable 등 Toss 감성의 컴포넌트를 폭넓게 제공합니다.
- **팔레트 인터랙션**: 문서 페이지에서 색상 칩을 클릭하면 각 컴포넌트가 즉시 해당 톤으로 바뀌어 브랜드 컬러 적용을 쉽게 검토할 수 있습니다.
- **샘플 페이지 3종**: 메인 랜딩, 로그인/회원가입 전환 플로우, 게시판(검색·필터·탭) 페이지를 바로 활용할 수 있습니다.
- **한글 문서화**: `docs/컴포넌트-가이드.md`와 앱 내 `컴포넌트 문서` 페이지에서 사용 방법과 속성을 한눈에 파악할 수 있습니다.

## 기술 스택

- React 19 + TypeScript
- Vite
- Tailwind CSS v3 (`tailwindcss@^3.4.15`)
- @tailwindcss/forms

> ⚠️ 네트워크가 제한된 환경에서는 `npm install` 명령이 실패할 수 있습니다. 인터넷 연결이 가능한 환경에서 한 번 `npm install`을 실행해 의존성을 맞춰주세요.

## 빠른 시작

```bash
npm install
npm run dev
```

브라우저에서 `http://localhost:5173/#home`을 열어 템플릿 화면을 확인합니다. 상단 네비게이션 또는 URL 해시(`#auth`, `#board`, `#docs`)를 통해 페이지를 전환할 수 있습니다.

## 폴더 구조

```
src/
├─ components/
│  ├─ layout/        # 전체 레이아웃 및 네비게이션
│  └─ ui/            # 재사용 가능한 UI 컴포넌트 모음
├─ pages/            # 메인, 인증, 게시판, 문서 페이지
├─ theme/            # 디자인 토큰 정보
└─ utils/            # 공용 유틸리티 (cn)
docs/
└─ 컴포넌트-가이드.md # 상품화용 문서
```

## 제공 페이지

- `#home`: 브랜드 메시지, 특징 소개, 디자인 토큰 하이라이트
- `#auth`: 로그인/회원가입 전환이 가능한 폼 레이아웃
- `#board`: 검색/필터와 상태 탭을 포함한 게시판 화면
- `#docs`: 스토리북 스타일 문서(미리보기/코드 복사/Props 표)

## 커스터마이징 가이드

1. 색상 확장  
   `tailwind.config.js`의 `extend.colors.brand` 값을 서비스에 맞게 수정합니다.
2. 컴포넌트 추가  
   `src/components/ui` 디렉터리에 새로운 컴포넌트를 생성하고 `index.ts`에 export를 추가합니다.
3. 스토리북/MDX 연동  
   `docs` 폴더의 마크다운을 기반으로 스토리북 또는 노션, 위키로 쉽게 이관할 수 있습니다.

## 라이선스

이 템플릿은 사내/개인 프로젝트에서 자유롭게 사용할 수 있습니다. 브랜드 자산(로고, 이미지 등)을 사용할 경우 관련 가이드를 준수해주세요.
# tailwindUI
