# chap 1
# chap 2
# chap 3 - optimizing fonts and image
## next/font 
    It hosts font files with other static assets so that there are no additional network requests.
    빌드 타임에 필요한 모든 네트워크 폰트 자원을 static 파일에 삽입 하여 유저가 사용할 때에는 더 이상의 자원이 필요없다.
### using google font
[구현 파일](./app/ui/fonts.ts)

[적용파일](./app/page.tsx)

### using <Image/> to optimize
    1. Preventing layout shift automatically when images are loading.
    2. Resizing images to avoid shipping large images to devices with a smaller viewport.
    3. Lazy loading images by default (images load as they enter the viewport).

    <Image/>의 width , height를 설정하면 aspect-ratio와 같이 동작한다.

    tailwind-css 이용하여 미디어 쿼리를 쉽게 작성하자.
    className={"block sm:hidden"} 으로 사이즈에 따라서 없어지게 할 수있다.
# chap 4 - creating layouts and pages
    넥스트는 파일 시스템으로 라우팅 경로를 정한다.
    각 라우터 파일내에 유일한 page.tsx 만이 퍼블릭하게 접근가능하다.
    
    layout.tsx는 같은 경로와 그 하부의 모든 page.tsx에 공통으로 적용된다.
    layout.tsx가 props로 받은 children 만 리렌더링의 대상이 된다. (partial rendering)
[적용 파일](./app/dashboard/layout.tsx)
# chap 5 - Navigating between pages
## <Link/> 컴포넌트
    1. <a> 태그로 라우팅 구현시 full page refresh가 발생한다.
    2. [prefetch 기능 제공] <Link/>는 viewport에 감지 될시 서버단에서 자동으로 해당 라우터에 해당하는 컴포넌트를 prefetch 하여 
    즉각적인 화면전환을 가능하게한다.
    3. [code splitting 제공] 기존 react와 같은 spa는 모든 자바스크립트 파일을 initial load시 한번에 로드한다.
    큰 용량을 한번에 로드해 오기 때문에 네트워크 통신 시간이 높고, 에러가 발생시 모든 프로세스가 중단된다.
    next js는 automatic code-splitting을 제공하여 모든 페이지를 격리하여 가져온다.(isolated page)
    
    3. 현재 라우팅 되어있는 페이지를 알기 위해서 usePathname() 함수를 제공하고 이는 클라이언트단 컴포넌트이다. 
    => 따라서 'use client' directive를 제공해주어야한다.