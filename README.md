<a href="https://github.com/devxb/gitanimals">
  <img src="https://render.gitanimals.org/lines/luxleo?pet-id=1" width="1000" height="120"/>
</a>

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

# chap 11 - Adding search and pagination
## benefit of implementing search with url params
    - Bookmarkable and Shareable URLs: Since the search parameters are in the URL, users can bookmark the current state of the application, including their search queries and filters, for future reference or sharing.
    - Server-Side Rendering and Initial Load: URL parameters can be directly consumed on the server to render the initial state, making it easier to handle server rendering.
    - Analytics and Tracking: Having search queries and filters directly in the URL makes it easier to track user behavior without requiring additional client-side logic.
## search functionality of next js
    - useSearchParams : Allows you to access the parameters of the current URL. For example, the search params for this URL /dashboard/invoices?page=1&query=pending would look like this: {page: '1', query: 'pending'}.
    - usePathName : Lets you read the current URL's pathname. For example, for the route /dashboard/invoices, usePathname would return '/dashboard/invoices'
    - useRouter : Enables navigation between routes within client components programmatically. There are multiple methods you can use.
[참조 코드 line 8-19](./app/ui/search.tsx)
##  Keeping the URL and input in sync
    To ensure the input field is in sync with the URL and will be populated when sharing, you can pass a defaultValue to input by reading from search
[참조 코드 line 47](./app/ui/search.tsx)

## debounce || throttling
    검색 조건이 변할때 마다 api 요청을 날리는 것은 바람직 하지 않다.
    유저의 입력이 멈춘후 일정 시간 후에 요청을 처리하는 것을 debouncing이라 한다.
    일정 주기로 요청 하는 것을 throttling이라고 한다.
[참조 코드 line 11-32](./app/ui/search.tsx)

# chap 12 - Mutating data
## 'use server' directive in react
    By adding the 'use server', you mark all the exported functions within the file as server functions. These server functions can then be imported into Client and Server components, making them extremely versatile.
## react 'action' attribute in form
    Good to know: In HTML, you'd pass a URL to the action attribute. This URL would be the destination where your form data should be submitted (usually an API endpoint).

    However, in React, the action attribute is considered a special prop - meaning React builds on top of it to allow actions to be invoked.

    Behind the scenes, Server Actions create a POST API endpoint. This is why you don't need to create API endpoints manually when using Server Actions.
## object.fromEntries(object.entries())
    Tip: If you're working with forms that have many fields, you may want to consider using the entries() method with JavaScript's Object.fromEntries(). For example:

    const rawFormData = Object.fromEntries(formData.entries())
[참조 코드 line 40](./app/lib/action.ts)

## Type validation and coercion with Zod
[참조 코드 line 7-13](./app/lib/action.ts)

## Revalidate and redirect - revalidatePath, redirect
    Next.js has a Client-side Router Cache that stores the route segments in the user's browser for a time. Along with prefetching, this cache ensures that users can quickly navigate between routes while reducing the number of requests made to the server.

    Since you're updating the data displayed in the invoices route, you want to clear this cache and trigger a new request to the server. You can do this with the revalidatePath function from Next.js:
[참조 코드 line 34-35](./app/lib/action.ts)

##  Pass the id to the Server Action - using js bind()
    Instead, you can pass id to the Server Action using JS bind. This will ensure that any values passed to the Server Action are encoded.
[참조 코드 line 21](./app/ui/invoices/edit-form.tsx)

# chap - 13 Handling errors

## try - catch cannot reach revalidatePath()
    try catch로 에러 처리시 revalidatePath에 코드 영역이 닿을 수 없다.
    뿐만 아니라 에러 발생시 에러 로그를 보여 주어야한다. => error.tsx로 해결
## notFound() => not-found.tsx
    not-found.tsx는 찾는 페이지가 없을 때 기본적으로 반환하는 에러페이지 이다.
    error.tsx는 모든 에러를 검출하지만 페이지가 없거나 찾는 리소스가 없는 경우 404로 응답코드를 내려 주기 위하여 적용함.
    
    찾는 리소스가 없는 경우 'next/navigation' 의 notFound()함수를 호출하면 자동으로 not-found.tsx페이지로 리다이렉트 한다.
[참조 코드 line 14](./app/dashboard/invoices/[id]/edit/page.tsx)

# chap -14 Improving Accessibility && server side validation(with zod)
    accessibility 란 유저 친화적 기능을 의미한다.
## Form Validation with Accessibility
    폼에 입력하지 않은 값이 있거나 유효하지 않은값을 입력한 경우 유저에게 정보를 제공한다.
## useFormState && zod 로 타입 검사 및 accessibility 제공
[참조 코드1](./app/ui/invoices/create-form.tsx)
[참조 코드2 line : 14-73](./app/lib/action.ts)

# chap - 15 Adding Authentication
    NextAuth 이용하여 authentication 적용시 순서는 다음과 같다.
    auth.config.ts (auth 정보 설정) => middleware.ts ( 설정한 auth 정보 이용) => auth.ts (bcrypt를 이용할 수 없기에 별도의 모듈을 파줌다.)
    => client 단에서 useFormState에 dispatcher 함수를 등록하여 authentication 진행

# chap -16 MetaData
## MetaData 종류
    title : 
    descriptio : 서비스에 대한 간단한 설명 
    keywords :  seo시 index 를 제공한다.
    open graph :   (소셜 미디어 등 )공유시에 사용하는 데이터
    favicon : 
## Adding metadata
    1. next js 파일시스템을 활용하는 방법 : 규칙에 맞는 파일명을 /app 에 추가 해주면 자동으로 등록함.
    - favicon.ico, apple-icon.jpg, and icon.jpg: Utilized for favicons and icons
    - opengraph-image.jpg and twitter-image.jpg: Employed for social media images
    - robots.txt: Provides instructions for search engine crawling
    - sitemap.xml: Offers information about the website's structure
    
    2. Metadata 자료구조 이용하기 => layout.tsx / page.tsx 에 선언 해줄수 있다.
## template title
    

# trouble shooting 
## [intellij] Invalid VSC root mapping 에러
    intellij에서 git init을 최초의 루트 폴더가 추후의 폴더와 다른 경우 발생하는 에러이다. 이 경우 configure 에서 
    에러가 발생하는 부분을 none으로 바꾸어주면 해결된다.
## node moudle : bcrypt 
    bcrypt의 경우 c 프로그램이므로 c와 버젼이 맞지 않으면 에러가 발생한다.
    따라서 순수 자바스크립트로 짜인 bcryptjs를 이용하여 해결한다. => import 시 from 'bcryptjs'로 해주어야한다.

## docker build 
    next.config.js에서 output을 "standalone"으로 지정해주면 더 빌드에 지장이 없다.

## useFormState 콜백 함수 인자
    (prevState : string | undefind, formData : FormData) 로 해주어야한다.
    prevState : string | null로 하면 에러를 반환한다.

## 성능 지표 - lighthouse 이용
## unit / integration / end to end test
## kakaomap 에러 날 경우
    로컬에서 잘 구동 될 경우 kakao API 서버에 허용 도메인을 확인해야한다.
    Third party Cookie 에러가 콘솔에 찍히는것과는 무관하다.

# dev tip
## responsive 작성 요령
    사이즈 별로 다른 컴포넌트를 아예 작성함 
    <div className={"md:hidden"}>
        작은 화면
    </div>
    <div className={"hidden md:table"}>
        // md 이상의 사이즈에서는 
        큰 화면
    </div>
