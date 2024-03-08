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
[적용 파일](app/dashboard/layout.tsx)
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

# chap 7 - Fetching Data
    rendering 을 하기 위해 데이터가 필요한 경우 비동기 적으로 요청을 해야한다.
    이때 요청하는 쿼리 문이 클라이언트 단에 노출 되지 않도록
    React Server component를 이용한다.
    (React client component는 'use client'로 작동한다.)
    
## waterfall
    async - await 구조로 요청하는 경우 순차적으로 요청을 하기에 낙수 효과로 동작한다.
    Promise.all(async func1, async func2 ... )로 호출하면 다수의 비동기 요청을 병렬적으로 처리한다.
[참조 코드](./app/lib/data.ts)
## 해결하지 못한 문제점
    위에서 기술한 waterfall 문제는 Promise.all()로 병렬처리하여 해결하였다.
    하지만 next.js는 기본적으로 static rendering을 진행한다. 이로 인해 서버의 부하가 줄어들고
    렌더링 시간이 단축되는 효과가 있지만, 최신 데이터를 반영하지 못하는 문제점이 있다.
    이를 dynamic rendering으로 해결한다.
# chap 8 - static and dynamic rendering
## static rendering
     data fetching and rendering happens on the server at build time
## static rendering usage
    1. Faster Websites - Prerendered content can be cached and globally distributed. This ensures that users around the world can access your website's content more quickly and reliably.
    2. Reduced Server Load - Because the content is cached, your server does not have to dynamically generate content for each user request.
    3. SEO - Prerendered content is easier for search engine crawlers to index, as the content is already available when the page loads. This can lead to improved search engine rankings.
    
    위와 같은 특성으로 인해 static rendering은 업데이트가 거의 없는 블로그 포스트나 공통영역에 이용된다.
## dynamic rendering usage
    1. Real-Time Data - Dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often.
    2. User-Specific Content - It's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction.
    3. Request Time Information - Dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.
## next js dynamic rendering 설정
    적용할 페이지에서 export const dynamic = "force-dynamic"; 으로 동적 렌더링을 지시한다.
# chap 9 - streaming
## what is streaming
    비동기적으로 데이터를 호출하고 렌더링 하는 컴포넌트의 경우 가장 느리게 데이터를 반환 받는 컴포넌트에 따라 
    전체 페이지의 렌더링 시간이 결정된다. -> 그 동안 클라이언트는 해당 페이지에 접근할 수 없으므로 
    접근하는 동안 렌더링 할 페이지를 보여주어서 UX를 향상 시킨다.
## streaming whole page
    처리할 페이지의 루트에 loading.tsx를 작성한다.
## streaming component
    <Suspense fallback = {fallback component}/>로 컴포넌트를 감싼다.
## streaming component group
    <Suspense fallback = {fallback component}/>로 컴포넌트 그룹을 감싼다.
# trouble shooting 
## [intellij] Invalid VSC root mapping 에러
    intellij에서 git init을 최초의 루트 폴더가 추후의 폴더와 다른 경우 발생하는 에러이다. 이 경우 configure 에서 
    에러가 발생하는 부분을 none으로 바꾸어주면 해결된다.
## node moudle : bcrypt 
    bcrypt의 경우 c 프로그램이므로 c와 버젼이 맞지 않으면 에러가 발생한다.
    따라서 순수 자바스크립트로 짜인 bcryptjs를 이용하여 해결한다.