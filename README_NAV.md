# WIL
## tailwind CSS
    w-[calc(86px+3.4vw)]와 같이 붙여서 적어야한다.

## useSearchParams should be implemented in <Suspense> tag 

# purge cache
    next js에 배포시 캐시가 revalidate 되지 않아서 stale 버젼의 이미지나 자료들을 참조하고 반환하는 경우 
    https://vercel.com/luxleo/nextjs-tutorial/settings/data-cache 에서 purge every thing 실행 해주면 된다.